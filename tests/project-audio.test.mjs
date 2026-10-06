import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { ORIGIN, API, MP3, createEnvironment, fetchWorker } from "./fixtures.mjs";

async function login(env) {
  const response = await fetchWorker(env, "/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: env.AUTH_DEMO_EMAIL, password: env.AUTH_DEMO_PASSWORD }),
  });
  assert.equal(response.status, 200);
  return response.headers.get("Set-Cookie").split(";")[0];
}

function upload(env, cookie, { filename = "demo.mp3", title = "Project demo", bytes = MP3, origin = ORIGIN } = {}) {
  const form = new FormData();
  form.set("file", new File([bytes], filename, { type: "audio/mpeg" }));
  if (title !== null) form.set("title", title);
  return fetchWorker(env, API, { method: "POST", headers: { Cookie: cookie || "", Origin: origin }, body: form });
}

async function uploadedFixture() {
  const env = createEnvironment();
  const cookie = await login(env);
  const response = await upload(env, cookie);
  assert.equal(response.status, 201);
  return { env, cookie, file: (await response.json()).file };
}

test("Projects includes MP3 UI and executable script without changing other pages", async () => {
  const env = createEnvironment();
  const response = await fetchWorker(env, "/projects");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /accept="\.mp3,audio\/mpeg,audio\/mp3"/);
  assert.match(html, /audio-upload-form[^>]*hidden/);
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  new vm.Script(script);
  for (const page of ["/", "/editorial", "/mods", "/prints"]) {
    const html = await (await fetchWorker(env, page)).text();
    assert.doesNotMatch(html, /id="audio-upload-form"/);
  }
  assert.equal((await fetchWorker(env, "/missing")).status, 404);
});

test("Logged-in upload persists title and filename; list and playback are public", async () => {
  const { env, file } = await uploadedFixture();
  assert.equal(file.title, "Project demo");
  assert.equal(file.filename, "demo.mp3");
  assert.equal(file.size, MP3.length);
  assert.match(file.id, /^[\da-f-]+\.mp3$/);
  const listing = await (await fetchWorker(env, API)).json();
  assert.deepEqual(listing.files, [file]);
  assert.equal(listing.cursor, null);
  const playback = await fetchWorker(env, file.url);
  assert.equal(playback.status, 200);
  assert.equal(playback.headers.get("Content-Type"), "audio/mpeg");
  assert.equal(playback.headers.get("Content-Length"), String(MP3.length));
  assert.equal(playback.headers.get("Accept-Ranges"), "bytes");
  assert.equal(playback.headers.get("X-Content-Type-Options"), "nosniff");
  assert.deepEqual(new Uint8Array(await playback.arrayBuffer()), MP3);
});

test("Title falls back to filename and standard untagged MPEG Layer III is accepted", async () => {
  const env = createEnvironment();
  const cookie = await login(env);
  const response = await upload(env, cookie, { filename: "Audio.MP3", title: null, bytes: new Uint8Array([0xff, 0xfb, 0x90, 0, 0, 0]) });
  assert.equal(response.status, 201);
  assert.equal((await response.json()).file.title, "Audio");
});

test("Unsigned, malformed, tampered, and revoked sessions cannot write or delete", async () => {
  const { env, cookie, file } = await uploadedFixture();
  for (const invalid of ["", "cj_session=%%%.%%%", cookie + "x", cookie + ".extra"]) {
    assert.equal((await upload(env, invalid)).status, 401);
    assert.equal((await fetchWorker(env, file.url, { method: "DELETE", headers: { Origin: ORIGIN, Cookie: invalid } })).status, 401);
  }
  await fetchWorker(env, "/api/auth/logout", { method: "POST", headers: { Cookie: cookie } });
  assert.equal((await upload(env, cookie)).status, 401);
  assert.equal(env.PROJECT_AUDIO.objects.size, 1);
});

test("Cross-origin upload and deletion are blocked", async () => {
  const { env, cookie, file } = await uploadedFixture();
  assert.equal((await upload(env, cookie, { origin: "https://other.example" })).status, 403);
  assert.equal((await fetchWorker(env, file.url, { method: "DELETE", headers: { Cookie: cookie, Origin: "https://other.example" } })).status, 403);
  assert.equal(env.PROJECT_AUDIO.objects.size, 1);
});

test("Example admin configuration cannot manage audio", async () => {
  for (const [variable, value] of [["AUTH_DEMO_PASSWORD", "change-me"], ["SESSION_SECRET", "change-this-in-production"], ["SESSION_SECRET", "development-secret"], ["SESSION_SECRET", ""]]) {
    const env = createEnvironment();
    env[variable] = value;
    const cookie = await login(env);
    assert.equal((await upload(env, cookie)).status, 503);
    assert.equal(env.PROJECT_AUDIO.objects.size, 0);
  }
});

test("Rejects wrong extension, disguised text, empty files, and excessive titles", async () => {
  const env = createEnvironment();
  const cookie = await login(env);
  for (const options of [
    { filename: "demo.wav" },
    { bytes: new TextEncoder().encode("This is not MP3 audio") },
    { bytes: new Uint8Array() },
    { title: "x".repeat(121) },
    { filename: "x".repeat(201) + ".mp3" },
  ]) assert.equal((await upload(env, cookie, options)).status, 400);
  assert.equal(env.PROJECT_AUDIO.objects.size, 0);
});

test("Missing file and malformed multipart uploads produce useful errors", async () => {
  const env = createEnvironment();
  const cookie = await login(env);
  for (const body of [new FormData(), "not a form"]) {
    const headers = { Origin: ORIGIN, Cookie: cookie };
    if (typeof body === "string") headers["Content-Type"] = "multipart/form-data; boundary=missing";
    assert.equal((await fetchWorker(env, API, { method: "POST", headers, body })).status, 400);
  }
});

test("Rejects files over 25 MB and bounds streaming requests without Content-Length", async () => {
  const env = createEnvironment();
  const cookie = await login(env);
  const bytes = new Uint8Array(25 * 1024 * 1024 + 1);
  bytes.set(MP3);
  assert.equal((await upload(env, cookie, { bytes })).status, 413);
  let reads = 0;
  let cancelled = false;
  const stream = new ReadableStream({
    pull(controller) { reads++; controller.enqueue(new Uint8Array(1024 * 1024)); },
    cancel() { cancelled = true; },
  });
  const response = await fetchWorker(env, API, {
    method: "POST", duplex: "half", body: stream,
    headers: { Origin: ORIGIN, Cookie: cookie, "Content-Type": "multipart/form-data; boundary=test" },
  });
  assert.equal(response.status, 413);
  assert.equal(cancelled, true);
  assert.ok(reads <= 27);
  assert.equal(env.PROJECT_AUDIO.objects.size, 0);
});

test("Playback supports closed, open, suffix, clipped ranges, and If-Range", async () => {
  const { env, file } = await uploadedFixture();
  for (const [range, start, end] of [["bytes=0-3", 0, 3], ["bytes=10-", 10, MP3.length - 1], ["bytes=-4", MP3.length - 4, MP3.length - 1], ["bytes=0-100", 0, MP3.length - 1], ["bytes=-100", 0, MP3.length - 1]]) {
    const response = await fetchWorker(env, file.url, { headers: { Range: range } });
    assert.equal(response.status, 206);
    assert.equal(response.headers.get("Content-Range"), `bytes ${start}-${end}/${MP3.length}`);
    assert.equal(response.headers.get("Content-Length"), String(end - start + 1));
    assert.deepEqual(new Uint8Array(await response.arrayBuffer()), MP3.slice(start, end + 1));
  }
  assert.equal((await fetchWorker(env, file.url, { headers: { Range: "bytes=0-3", "If-Range": '"test-etag"' } })).status, 206);
  assert.equal((await fetchWorker(env, file.url, { headers: { Range: "bytes=0-3", "If-Range": '"different"' } })).status, 200);
});

test("Unsatisfiable or invalid ranges return 416", async () => {
  const { env, file } = await uploadedFixture();
  for (const range of ["bytes=999-", "bytes=5-1", "bytes=-0", "bytes=-", "bytes=0-1,4-5", "junk"]) {
    const response = await fetchWorker(env, file.url, { headers: { Range: range } });
    assert.equal(response.status, 416);
    assert.equal(response.headers.get("Content-Range"), `bytes */${MP3.length}`);
    assert.equal(await response.text(), "");
  }
});

test("HEAD omits body and downloads encode Unicode filenames safely", async () => {
  const env = createEnvironment();
  const cookie = await login(env);
  const file = (await (await upload(env, cookie, { filename: "café's audio.mp3" })).json()).file;
  const head = await fetchWorker(env, file.url, { method: "HEAD", headers: { Range: "bytes=0-3" } });
  assert.equal(head.status, 200);
  assert.equal(head.headers.get("Content-Length"), String(MP3.length));
  assert.equal(await head.text(), "");
  const download = await fetchWorker(env, file.url + "?download=1");
  assert.match(download.headers.get("Content-Disposition"), /^attachment;/);
  assert.match(download.headers.get("Content-Disposition"), /caf%C3%A9%27s%20audio\.mp3/);
});

test("Admin deletion removes audio from listing and future playback", async () => {
  const { env, cookie, file } = await uploadedFixture();
  const response = await fetchWorker(env, file.url, { method: "DELETE", headers: { Origin: ORIGIN, Cookie: cookie } });
  assert.equal(response.status, 200);
  assert.deepEqual((await (await fetchWorker(env, API)).json()).files, []);
  assert.equal((await fetchWorker(env, file.url)).status, 404);
  assert.equal((await fetchWorker(env, file.url, { method: "HEAD" })).status, 404);
});

test("Listing includes pagination and isolates the project audio prefix", async () => {
  const env = createEnvironment();
  for (let index = 0; index < 51; index++) {
    const id = "00000000-0000-0000-0000-" + String(index).padStart(12, "0") + ".mp3";
    await env.PROJECT_AUDIO.put("projects/audio/" + id, new Blob([MP3]), { customMetadata: { title: "Demo " + index, filename: id } });
  }
  await env.PROJECT_AUDIO.put("unrelated.mp3", new Blob([MP3]), {});
  const first = await (await fetchWorker(env, API)).json();
  assert.equal(first.files.length, 50);
  assert.ok(first.cursor);
  const second = await (await fetchWorker(env, API + "?cursor=" + first.cursor)).json();
  assert.equal(second.files.length, 1);
  assert.equal(second.cursor, null);
});

test("Unknown media paths and unsupported methods return 404/405", async () => {
  const { env, file } = await uploadedFixture();
  for (const path of [API + "/../elsewhere", API + "/bad.mp3", API + "/nested/file.mp3"]) {
    assert.equal((await fetchWorker(env, path)).status, 404);
  }
  assert.equal((await fetchWorker(env, API, { method: "PUT" })).status, 405);
  assert.equal((await fetchWorker(env, file.url, { method: "POST" })).status, 405);
});

test("Missing storage returns a clear setup response", async () => {
  const env = createEnvironment();
  delete env.PROJECT_AUDIO;
  const response = await fetchWorker(env, API);
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /not configured/);
});
