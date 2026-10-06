import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { once } from "node:events";
import { createAudioServer } from "../server/homelab.mjs";
import { DiskBucket } from "../server/disk-bucket.mjs";
import { ORIGIN, API, MP3, createEnvironment, fetchWorker } from "./fixtures.mjs";

const HOME = "https://audio.clickjim.test";
const SECRET = "test-home-audio-secret-with-32-characters-minimum";
const httpFetch = globalThis.fetch;

async function startServer(t, directory) {
  const root = directory || await mkdtemp(join(tmpdir(), "clickjim-audio-"));
  const server = await createAudioServer({ directory: root, secret: SECRET, publicUrl: HOME });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = "http://127.0.0.1:" + server.address().port;
  t.after(async () => {
    server.closeAllConnections();
    if (server.listening) await new Promise((resolve) => server.close(resolve));
    if (!directory) await rm(root, { recursive: true, force: true });
  });
  return { root, server, address };
}

function form(filename = "home-demo.mp3", bytes = MP3) {
  const body = new FormData();
  body.set("file", new File([bytes], filename, { type: "audio/mpeg" }));
  body.set("title", "Home lab demo");
  return body;
}

function headers(secret = SECRET) { return { Origin: HOME, Authorization: "Bearer " + secret }; }

test("Disk-backed HTTP uploads, range playback, HEAD, and downloads", async (t) => {
  const { address } = await startServer(t);
  const response = await httpFetch(address + API, { method: "POST", headers: headers(), body: form() });
  assert.equal(response.status, 201);
  const file = (await response.json()).file;
  assert.equal(file.title, "Home lab demo");
  assert.equal(file.size, MP3.length);
  const listing = await httpFetch(address + API, { headers: headers() });
  assert.equal((await listing.json()).files[0].id, file.id);
  const playback = await httpFetch(address + file.url, { headers: { Range: "bytes=2-5" } });
  assert.equal(playback.status, 206);
  assert.equal(playback.headers.get("Content-Range"), `bytes 2-5/${MP3.length}`);
  assert.deepEqual(new Uint8Array(await playback.arrayBuffer()), MP3.slice(2, 6));
  const head = await httpFetch(address + file.url, { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
  const download = await httpFetch(address + file.url + "?download=1");
  assert.match(download.headers.get("Content-Disposition"), /^attachment;/);
  assert.deepEqual(new Uint8Array(await download.arrayBuffer()), MP3);
});

test("Files and titles survive a server restart", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "clickjim-audio-restart-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const first = await startServer(t, root);
  const file = (await (await httpFetch(first.address + API, { method: "POST", headers: headers(), body: form() })).json()).file;
  first.server.closeAllConnections();
  await new Promise((resolve) => first.server.close(resolve));
  const restarted = await startServer(t, root);
  const list = await (await httpFetch(restarted.address + API, { headers: headers() })).json();
  assert.equal(list.files[0].title, "Home lab demo");
  assert.equal(list.files[0].id, file.id);
  const download = await httpFetch(restarted.address + file.url);
  assert.deepEqual(new Uint8Array(await download.arrayBuffer()), MP3);
});

test("Home API requires the shared secret for listing and changes", async (t) => {
  const { address, root } = await startServer(t);
  for (const secret of ["", "wrong-secret"]) {
    assert.equal((await httpFetch(address + API, { headers: headers(secret) })).status, 401);
    assert.equal((await httpFetch(address + API, { method: "POST", headers: headers(secret), body: form() })).status, 401);
  }
  const uploaded = (await (await httpFetch(address + API, { method: "POST", headers: headers(), body: form() })).json()).file;
  assert.equal((await httpFetch(address + uploaded.url, { method: "DELETE" })).status, 401);
  assert.equal((await httpFetch(address + uploaded.url, { method: "DELETE", headers: headers() })).status, 200);
  assert.equal((await httpFetch(address + uploaded.url)).status, 404);
  assert.deepEqual(await readdir(join(root, "files")), []);
  assert.deepEqual(await readdir(join(root, "metadata")), []);
});

test("Rejects invalid MP3s and path traversal on the real home server", async (t) => {
  const { address, root } = await startServer(t);
  assert.equal((await httpFetch(address + API, { method: "POST", headers: headers(), body: form("fake.mp3", new TextEncoder().encode("not audio")) })).status, 400);
  assert.equal((await httpFetch(address + API + "/bad.mp3")).status, 404);
  assert.equal((await httpFetch(address + "/server/homelab.env.example")).status, 404);
  const bucket = new DiskBucket(root);
  await assert.rejects(bucket.head("projects/audio/../../etc/passwd"), /Invalid/);
  assert.deepEqual(await readdir(join(root, "files")), []);
});

test("Home server bounds oversized HTTP requests before form parsing", async (t) => {
  const { address, root } = await startServer(t);
  const bytes = new Uint8Array(25 * 1024 * 1024 + 128 * 1024);
  bytes.set(MP3);
  const response = await httpFetch(address + API, { method: "POST", headers: headers(), body: form("big.mp3", bytes) });
  assert.equal(response.status, 413);
  assert.match((await response.json()).error, /25 MB/);
  assert.deepEqual(await readdir(join(root, "files")), []);
});

async function login(env) {
  const response = await fetchWorker(env, "/api/auth/login", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: env.AUTH_DEMO_EMAIL, password: env.AUTH_DEMO_PASSWORD }),
  });
  assert.equal(response.status, 200);
  return response.headers.get("Set-Cookie").split(";")[0];
}

test("Worker uses the home server without R2, forwards uploads, and keeps credentials private", async (t) => {
  const { address } = await startServer(t);
  const env = createEnvironment();
  delete env.PROJECT_AUDIO;
  env.PROJECT_AUDIO_SERVER_URL = HOME;
  env.PROJECT_AUDIO_SERVER_SECRET = SECRET;
  const cookie = await login(env);
  const forwarded = [];
  globalThis.fetch = async (request) => {
    forwarded.push(request);
    const url = new URL(request.url);
    assert.equal(url.origin, HOME);
    assert.equal(request.headers.get("Cookie"), null);
    assert.equal(request.headers.get("Authorization"), "Bearer " + SECRET);
    return httpFetch(new Request(address + url.pathname + url.search, request));
  };
  t.after(() => { globalThis.fetch = httpFetch; });
  const upload = await fetchWorker(env, API, { method: "POST", headers: { Origin: ORIGIN, Cookie: cookie }, body: form() });
  assert.equal(upload.status, 201);
  const file = (await upload.json()).file;
  assert.equal(file.url, HOME + API + "/" + file.id);
  const list = await (await fetchWorker(env, API)).json();
  assert.equal(list.files[0].url, file.url);
  assert.ok(!JSON.stringify(list).includes(SECRET));
  const redirect = await fetchWorker(env, API + "/" + file.id + "?download=1");
  assert.equal(redirect.status, 307);
  assert.equal(redirect.headers.get("Location"), file.url + "?download=1");
  assert.equal((await fetchWorker(env, API + "/" + file.id, { method: "DELETE", headers: { Origin: ORIGIN, Cookie: cookie } })).status, 200);
  assert.ok(forwarded.every((request) => request.redirect === "manual"));
});

test("Worker rejects unauthorized or cross-origin changes before contacting home", async (t) => {
  const env = createEnvironment();
  env.PROJECT_AUDIO_SERVER_URL = HOME;
  env.PROJECT_AUDIO_SERVER_SECRET = SECRET;
  let calls = 0;
  globalThis.fetch = async () => { calls++; throw new Error("Must not forward"); };
  t.after(() => { globalThis.fetch = httpFetch; });
  assert.equal((await fetchWorker(env, API, { method: "POST", headers: { Origin: ORIGIN }, body: form() })).status, 401);
  const cookie = await login(env);
  assert.equal((await fetchWorker(env, API, { method: "POST", headers: { Origin: "https://other.test", Cookie: cookie }, body: form() })).status, 403);
  assert.equal(calls, 0);
});

test("Configuration, offline server, mismatched key, and redirects produce useful 503 responses", async (t) => {
  const env = createEnvironment();
  env.PROJECT_AUDIO_SERVER_URL = HOME;
  env.PROJECT_AUDIO_SERVER_SECRET = SECRET;
  t.after(() => { globalThis.fetch = httpFetch; });
  for (const address of ["http://audio.test", "https://user:password@audio.test", HOME + "/path", HOME + "?query=1"]) {
    env.PROJECT_AUDIO_SERVER_URL = address;
    assert.equal((await fetchWorker(env, API)).status, 503);
  }
  env.PROJECT_AUDIO_SERVER_URL = HOME;
  env.PROJECT_AUDIO_SERVER_SECRET = "short";
  assert.equal((await fetchWorker(env, API)).status, 503);
  env.PROJECT_AUDIO_SERVER_SECRET = SECRET;
  globalThis.fetch = async () => { throw new Error("Server offline"); };
  assert.equal((await fetchWorker(env, API)).status, 503);
  globalThis.fetch = async () => new Response(null, { status: 401 });
  const mismatch = await fetchWorker(env, API);
  assert.equal(mismatch.status, 503);
  assert.match((await mismatch.json()).error, /does not match/);
  globalThis.fetch = async () => new Response(null, { status: 307, headers: { Location: "https://other.test" } });
  assert.equal((await fetchWorker(env, API)).status, 503);
});

test("Server refuses missing or placeholder secrets", async () => {
  for (const secret of ["", "short", "REPLACE_WITH_A_RANDOM_SECRET_OF_AT_LEAST_32_CHARACTERS"]) {
    await assert.rejects(createAudioServer({ directory: "/unused", publicUrl: HOME, secret }), /random secret/);
  }
});
