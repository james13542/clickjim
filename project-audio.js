import { forwardHomeAudio } from "./project-audio-home.js";

const AUDIO_PATH = "/api/projects/audio";
const AUDIO_PREFIX = "projects/audio/";
const MAX_AUDIO_BYTES = 25 * 1024 * 1024;
const MAX_REQUEST_BYTES = MAX_AUDIO_BYTES + 64 * 1024;
const AUDIO_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.mp3$/i;

class AudioRequestError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function handleProjectAudio(request, env, authenticate) {
  const url = new URL(request.url);
  const collection = url.pathname === AUDIO_PATH;
  const filename = url.pathname.slice(AUDIO_PATH.length + 1);
  if (!collection && !AUDIO_ID.test(filename)) {
    return json({ ok: false, error: "Audio file not found." }, 404);
  }

  const allowed = collection ? ["GET", "POST"] : ["GET", "HEAD", "DELETE"];
  if (!allowed.includes(request.method)) {
    return json({ ok: false, error: "Method not allowed." }, 405, { Allow: allowed.join(", ") });
  }

  try {
    if (request.method === "POST" || request.method === "DELETE") {
      if (request.headers.get("Origin") !== url.origin) {
        throw new AudioRequestError("Please upload or remove audio from this website.", 403);
      }
      const session = await authenticate(request, env);
      if (!(await session.json()).authenticated) {
        throw new AudioRequestError("Log in as admin to manage audio files.", 401);
      }
      if (!env.AUTH_DEMO_PASSWORD || env.AUTH_DEMO_PASSWORD === "change-me" ||
          !env.SESSION_SECRET || ["development-secret", "change-this-in-production"].includes(env.SESSION_SECRET)) {
        throw new AudioRequestError("Audio uploads require a configured admin password and session secret.", 503);
      }
    }

    if (env.PROJECT_AUDIO_SERVER_URL) {
      return forwardHomeAudio(request, env);
    }

    if (!env.PROJECT_AUDIO) {
      throw new AudioRequestError("Project audio storage is not configured yet.", 503);
    }

    if (collection && request.method === "GET") {
      const cursor = url.searchParams.get("cursor") || undefined;
      if (cursor && cursor.length > 2048) {
        throw new AudioRequestError("Invalid audio list cursor.", 400);
      }
      const result = await env.PROJECT_AUDIO.list({
        prefix: AUDIO_PREFIX,
        limit: 50,
        include: ["customMetadata"],
        cursor,
      });
      return json({
        ok: true,
        files: result.objects.filter((object) => AUDIO_ID.test(object.key.slice(AUDIO_PREFIX.length))).map(audioDetails),
        cursor: result.truncated ? result.cursor : null,
      });
    }

    if (collection) return await uploadAudio(request, env.PROJECT_AUDIO);

    const key = AUDIO_PREFIX + filename;
    if (request.method === "DELETE") {
      if (!await env.PROJECT_AUDIO.head(key)) {
        throw new AudioRequestError("Audio file not found.", 404);
      }
      await env.PROJECT_AUDIO.delete(key);
      return json({ ok: true });
    }

    return await serveAudio(request, env.PROJECT_AUDIO, key);
  } catch (error) {
    if (error instanceof AudioRequestError) {
      return json({ ok: false, error: error.message }, error.status);
    }
    console.error("Project audio request failed:", error);
    return json({ ok: false, error: "Unable to access project audio. Please try again." }, 500);
  }
}

async function uploadAudio(request, bucket) {
  const contentType = request.headers.get("Content-Type") || "";
  if (!/^multipart\/form-data\s*;/i.test(contentType)) {
    throw new AudioRequestError("Choose an MP3 file to upload.", 400);
  }
  const contentLength = Number(request.headers.get("Content-Length"));
  if (contentLength > MAX_REQUEST_BYTES) {
    throw new AudioRequestError("MP3 files must be 25 MB or smaller.", 413);
  }

  // Bound the body before parsing, including requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader) throw new AudioRequestError("Choose an MP3 file to upload.", 400);
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_REQUEST_BYTES) {
        await reader.cancel();
        throw new AudioRequestError("MP3 files must be 25 MB or smaller.", 413);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  let form;
  try {
    const body = new Blob(chunks);
    chunks.length = 0;
    form = await new Response(body, { headers: { "Content-Type": contentType } }).formData();
  } catch {
    throw new AudioRequestError("Invalid upload. Choose an MP3 file and try again.", 400);
  }
  const file = form.get("file");
  if (!file || typeof file === "string" || !/\.mp3$/i.test(file.name)) {
    throw new AudioRequestError("Only MP3 files are supported.", 400);
  }
  if (!file.size) throw new AudioRequestError("The MP3 file is empty.", 400);
  if (file.size > MAX_AUDIO_BYTES) {
    throw new AudioRequestError("MP3 files must be 25 MB or smaller.", 413);
  }
  const header = new Uint8Array(await file.slice(0, 10).arrayBuffer());
  const id3 = header.length >= 10 && header[0] === 0x49 && header[1] === 0x44 && header[2] === 0x33;
  const frame = header.length >= 4 && header[0] === 0xff && (header[1] & 0xe0) === 0xe0 &&
    (header[1] & 0x18) !== 0x08 && (header[1] & 0x06) === 0x02 &&
    (header[2] & 0xf0) !== 0xf0 && (header[2] & 0x0c) !== 0x0c;
  if (!id3 && !frame) throw new AudioRequestError("This file does not look like an MP3.", 400);

  const originalName = file.name.split(/[\\/]/).pop();
  const titleField = form.get("title");
  if (titleField !== null && typeof titleField !== "string") {
    throw new AudioRequestError("Enter a text title for this audio file.", 400);
  }
  const title = titleField?.trim() || originalName.replace(/\.mp3$/i, "");
  if (!title || title.length > 120 || originalName.length > 200) {
    throw new AudioRequestError("Use a title up to 120 characters and a filename up to 200 characters.", 400);
  }
  const key = AUDIO_PREFIX + crypto.randomUUID() + ".mp3";
  const object = await bucket.put(key, file, {
    httpMetadata: { contentType: "audio/mpeg" },
    customMetadata: { title, filename: originalName },
  });
  return json({ ok: true, file: audioDetails(object) }, 201);
}

function audioDetails(object) {
  const id = object.key.slice(AUDIO_PREFIX.length);
  return {
    id,
    title: object.customMetadata?.title || object.customMetadata?.filename || "Project audio",
    filename: object.customMetadata?.filename || id,
    size: object.size,
    uploaded: object.uploaded.toISOString(),
    url: AUDIO_PATH + "/" + id,
  };
}

async function serveAudio(request, bucket, key) {
  const metadata = await bucket.head(key);
  if (!metadata) throw new AudioRequestError("Audio file not found.", 404);

  const download = new URL(request.url).searchParams.has("download");
  const filename = metadata.customMetadata?.filename || "project-audio.mp3";
  const encodedName = encodeURIComponent(filename).replace(/['()*]/g, (char) => "%" + char.charCodeAt(0).toString(16));
  const headers = new Headers({
    "Content-Type": "audio/mpeg",
    "Content-Length": String(metadata.size),
    "Accept-Ranges": "bytes",
    "Cache-Control": "no-store",
    "ETag": metadata.httpEtag,
    "X-Content-Type-Options": "nosniff",
    "Content-Disposition": `${download ? "attachment" : "inline"}; filename="project-audio.mp3"; filename*=UTF-8''${encodedName}`,
  });
  if (request.method === "HEAD") return new Response(null, { headers });

  const rangeHeader = request.headers.get("Range");
  let range;
  if (rangeHeader && (!request.headers.has("If-Range") || request.headers.get("If-Range") === metadata.httpEtag)) {
    range = parseRange(rangeHeader, metadata.size);
    if (!range) {
      headers.set("Content-Range", `bytes */${metadata.size}`);
      headers.delete("Content-Length");
      return new Response(null, { status: 416, headers });
    }
    headers.set("Content-Range", `bytes ${range.offset}-${range.offset + range.length - 1}/${metadata.size}`);
    headers.set("Content-Length", String(range.length));
  }
  const object = await bucket.get(key, range ? { range } : undefined);
  if (!object) throw new AudioRequestError("Audio file not found.", 404);
  return new Response(object.body, { status: range ? 206 : 200, headers });
}

function parseRange(value, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(value.trim());
  if (!match || (!match[1] && !match[2]) || !size) return null;
  let start;
  let end;
  if (!match[1]) {
    const suffix = Number(match[2]);
    if (!Number.isSafeInteger(suffix) || suffix <= 0) return null;
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] ? Number(match[2]) : size - 1;
    if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start >= size || end < start) return null;
    end = Math.min(end, size - 1);
  }
  return { offset: start, length: end - start + 1 };
}

function json(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extraHeaders },
  });
}
