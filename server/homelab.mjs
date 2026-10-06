import { createServer } from "node:http";
import { timingSafeEqual } from "node:crypto";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { handleProjectAudio } from "../project-audio.js";
import { DiskBucket } from "./disk-bucket.mjs";

const API = "/api/projects/audio";
const MAX_BODY_BYTES = 25 * 1024 * 1024 + 64 * 1024;

export async function createAudioServer({ directory, secret, publicUrl }) {
  if (!secret || secret.length < 32 || secret.startsWith("REPLACE_")) {
    throw new Error("Set PROJECT_AUDIO_SERVER_SECRET to a random secret of at least 32 characters.");
  }
  const origin = new URL(publicUrl).origin;
  const bucket = new DiskBucket(directory);
  await bucket.init();
  const env = { PROJECT_AUDIO: bucket, AUTH_DEMO_PASSWORD: secret, SESSION_SECRET: secret };
  const trusted = (headers) => {
    const expected = Buffer.from("Bearer " + secret);
    const supplied = Buffer.from(headers.get("Authorization") || "");
    return supplied.length === expected.length && timingSafeEqual(supplied, expected);
  };
  const authenticate = async (request) => Response.json({ authenticated: trusted(request.headers) });

  const server = createServer(async (input, output) => {
    try {
      const url = new URL(input.url, origin);
      if (url.pathname === "/healthz" && input.method === "GET") {
        output.writeHead(200, { "Content-Type": "application/json", "Cache-Control": "no-store" });
        output.end('{"ok":true}');
        return;
      }
      if (url.pathname !== API && !url.pathname.startsWith(API + "/")) {
        output.writeHead(404);
        output.end("Not found");
        return;
      }
      const headers = new Headers(input.headers);
      const mediaRead = url.pathname !== API && ["GET", "HEAD"].includes(input.method);
      if (!mediaRead && !trusted(headers)) {
        output.writeHead(401, { "Content-Type": "application/json", "Connection": "close", "Cache-Control": "no-store" });
        output.end('{"ok":false,"error":"Unauthorized audio server request."}');
        return;
      }
      const body = input.method === "POST" ? await readBody(input) : undefined;
      const request = new Request(url, { method: input.method, headers, body });
      const response = await handleProjectAudio(request, env, authenticate);
      const responseHeaders = Object.fromEntries(response.headers);
      if (response.status >= 400) responseHeaders.Connection = "close";
      output.writeHead(response.status, responseHeaders);
      if (response.body && input.method !== "HEAD") {
        await pipeline(Readable.fromWeb(response.body), output);
      } else output.end();
    } catch (error) {
      if (!output.headersSent) {
        output.writeHead(error.status || 500, { "Content-Type": "application/json", "Connection": "close", "Cache-Control": "no-store" });
        output.end(JSON.stringify({ ok: false, error: error.status === 413 ? "MP3 files must be 25 MB or smaller." : "Unable to access project audio." }));
      } else output.destroy();
      if (error.status !== 413 && !["ERR_STREAM_PREMATURE_CLOSE", "ECONNRESET"].includes(error.code)) {
        console.error("Home audio server request failed:", error.message);
      }
    }
  });
  server.requestTimeout = 120000;
  return server;
}

function readBody(input) {
  return new Promise((resolveBody, rejectBody) => {
    let length = 0;
    const chunks = [];
    const cleanup = () => {
      input.off("data", onData);
      input.off("end", onEnd);
      input.off("error", onError);
      input.off("aborted", onAbort);
    };
    const onData = (chunk) => {
      length += chunk.length;
      if (length > MAX_BODY_BYTES) {
        input.pause();
        cleanup();
        rejectBody(Object.assign(new Error("Upload too large"), { status: 413 }));
        return;
      }
      chunks.push(chunk);
    };
    const onEnd = () => { cleanup(); resolveBody(Buffer.concat(chunks)); };
    const onError = (error) => { cleanup(); rejectBody(error); };
    const onAbort = () => onError(new Error("Upload interrupted"));
    if (Number(input.headers["content-length"]) > MAX_BODY_BYTES) {
      input.pause();
      rejectBody(Object.assign(new Error("Upload too large"), { status: 413 }));
      return;
    }
    input.on("data", onData);
    input.on("end", onEnd);
    input.on("error", onError);
    input.on("aborted", onAbort);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const server = await createAudioServer({
      directory: process.env.PROJECT_AUDIO_DIRECTORY || "/var/lib/clickjim-audio",
      secret: process.env.PROJECT_AUDIO_SERVER_SECRET,
      publicUrl: process.env.PROJECT_AUDIO_SERVER_URL || "https://audio.clickjim.com",
    });
    const host = process.env.PROJECT_AUDIO_HOST || "127.0.0.1";
    const port = Number(process.env.PROJECT_AUDIO_PORT || 8080);
    server.listen(port, host, () => console.log(`Clickjim audio server listening on ${host}:${port}`));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
