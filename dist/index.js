// content.html
var content_default = '<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>{{PAGE_TITLE}} | ClickJim</title>\n</head>\n<body>\n    <div class="pattern-bg" aria-hidden="true"></div>\n\n    <nav>\n        <ul class="dropdown">\n            <li><a href="#" aria-label="Open navigation menu">Menu \u25BC</a>\n                <ul class="dropdown-content">\n                    <li><a href="/editorial">Editorial</a></li>\n                    <li><a href="/projects">Projects</a></li>\n                    <li><a href="/mods">Mods</a></li>\n                    <li><a href="/prints">Prints</a></li>\n                </ul>\n            </li>\n        </ul>\n    </nav>\n\n    <main class="container">\n        <h1>{{PAGE_TITLE}}</h1>\n        {{PAGE_CONTENT}}\n    </main>\n\n    <footer class="business-banner">\n        <p>ClickJim Studio \u2022 Professional Creative + Technical Services \u2022 Contact: <a href="mailto:jamesdanielwalter@outlook.com">jamesdanielwalter@outlook.com</a></p>\n    </footer>\n    {{PAGE_SCRIPT}}\n</body>\n</html>\n';

// style.css
var style_default = ":root {\n    --brand-dark: #1f2732;\n    --brand-dark-2: #2d3745;\n    --brand-accent: #2563eb;\n    --text-main: #1f2937;\n    --text-muted: #4b5563;\n    --surface: #ffffff;\n    --surface-bg: #eef2f7;\n}\n\n* {\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    min-height: 100vh;\n    background-color: var(--surface-bg);\n    text-align: center;\n    color: var(--text-main);\n    display: flex;\n    flex-direction: column;\n}\n\nnav {\n    background-color: var(--brand-dark);\n    padding: 12px;\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);\n}\n\n.dropdown {\n    list-style-type: none;\n    padding: 0;\n    margin: 0;\n    display: inline-block;\n}\n\n.dropdown li {\n    position: relative;\n    display: inline-block;\n}\n\n.dropdown a {\n    text-decoration: none;\n    color: white;\n    font-weight: 600;\n    padding: 10px 20px;\n    display: block;\n}\n\n.dropdown-content {\n    display: none;\n    position: absolute;\n    left: 0;\n    background-color: var(--brand-dark-2);\n    min-width: 190px;\n    border-radius: 8px;\n    overflow: hidden;\n    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);\n    z-index: 1;\n}\n\n.dropdown-content li {\n    display: block;\n}\n\n.dropdown-content a {\n    padding: 12px;\n    color: white;\n    text-align: left;\n}\n\n.dropdown-content a:hover {\n    background-color: var(--brand-accent);\n}\n\n.dropdown-content a:hover {\n    background-color: var(--brand-accent);\n}\n\n.dropdown li:hover .dropdown-content,\n.dropdown li:focus-within .dropdown-content {\n    display: block;\n}\n\n.container {\n    flex: 1;\n    max-width: 860px;\n    margin: 48px auto;\n    background: var(--surface);\n    padding: 32px;\n    border-radius: 14px;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);\n}\n\nh1 {\n    color: #111827;\n    margin-top: 0;\n}\n\np {\n    color: var(--text-muted);\n    font-size: 18px;\n    line-height: 1.7;\n}\n\n.business-banner {\n    background: linear-gradient(90deg, var(--brand-dark), #0f172a);\n    color: #e5e7eb;\n    padding: 16px 20px;\n    font-size: 15px;\n    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);\n}\n\n.business-banner p {\n    margin: 0;\n    color: inherit;\n    font-size: inherit;\n}\n\n.business-banner a {\n    color: #93c5fd;\n    text-decoration: none;\n    font-weight: 700;\n}\n\n.business-banner a:hover {\n    text-decoration: underline;\n}\n\n.auth-card {\n    margin-top: 28px;\n    border: 1px solid #dbe4f0;\n    border-radius: 12px;\n    padding: 20px;\n    text-align: left;\n    background: #f8fbff;\n}\n\n.auth-card h2 {\n    margin-top: 0;\n}\n\n.auth-note {\n    margin-top: 0;\n    font-size: 15px;\n}\n\n.auth-form {\n    display: grid;\n    gap: 10px;\n}\n\n.auth-form input {\n    width: 100%;\n    padding: 10px;\n    border: 1px solid #cbd5e1;\n    border-radius: 8px;\n}\n\n.auth-form button,\n.auth-logout {\n    margin-top: 8px;\n    border: none;\n    background: var(--brand-accent);\n    color: white;\n    padding: 10px 14px;\n    border-radius: 8px;\n    cursor: pointer;\n    font-weight: 600;\n    width: fit-content;\n}\n\n.auth-status {\n    margin-bottom: 0;\n    font-size: 15px;\n}\n\n.project-audio {\n    margin-top: 28px;\n    text-align: left;\n}\n\n.project-audio [hidden] {\n    display: none;\n}\n\n.audio-note {\n    font-size: 15px;\n    overflow-wrap: anywhere;\n}\n\n.audio-upload-form,\n.audio-card {\n    border: 1px solid #dbe4f0;\n    border-radius: 12px;\n    padding: 20px;\n    background: #f8fbff;\n    min-width: 0;\n}\n\n.audio-upload-form {\n    display: grid;\n    gap: 10px;\n}\n\n.audio-upload-form input {\n    width: 100%;\n    min-width: 0;\n    padding: 10px;\n    border: 1px solid #cbd5e1;\n    border-radius: 8px;\n    background: white;\n    font: inherit;\n}\n\n.audio-upload-form button,\n.audio-button {\n    border: none;\n    background: var(--brand-accent);\n    color: white;\n    padding: 10px 14px;\n    border-radius: 8px;\n    cursor: pointer;\n    font: inherit;\n    font-weight: 600;\n    width: fit-content;\n}\n\n.audio-upload-form button:disabled,\n.audio-button:disabled {\n    cursor: wait;\n    opacity: 0.6;\n}\n\n.audio-list {\n    display: grid;\n    gap: 16px;\n}\n\n.audio-card h3 {\n    margin: 0;\n    overflow-wrap: anywhere;\n}\n\n.audio-card audio {\n    display: block;\n    width: 100%;\n    margin: 16px 0;\n}\n\n.audio-actions {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 16px;\n}\n\n.audio-actions a,\n.project-audio a {\n    color: var(--brand-accent);\n}\n\n#audio-load-more {\n    margin-top: 16px;\n}\n\n@media (max-width: 600px) {\n    .container {\n        max-width: calc(100% - 24px);\n        margin: 24px 12px;\n        padding: 20px;\n    }\n\n    .audio-upload-form,\n    .audio-card {\n        padding: 16px;\n    }\n}\n";

// project-audio.js
var AUDIO_PATH = "/api/projects/audio";
var AUDIO_PREFIX = "projects/audio/";
var MAX_AUDIO_BYTES = 25 * 1024 * 1024;
var MAX_REQUEST_BYTES = MAX_AUDIO_BYTES + 64 * 1024;
var AUDIO_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.mp3$/i;
var AudioRequestError = class extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
};
async function handleProjectAudio(request, env, authenticate) {
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
      if (!env.AUTH_DEMO_PASSWORD || env.AUTH_DEMO_PASSWORD === "change-me" || !env.SESSION_SECRET || ["development-secret", "change-this-in-production"].includes(env.SESSION_SECRET)) {
        throw new AudioRequestError("Audio uploads require a configured admin password and session secret.", 503);
      }
    }
    if (!env.PROJECT_AUDIO) {
      throw new AudioRequestError("Project audio storage is not configured yet.", 503);
    }
    if (collection && request.method === "GET") {
      const cursor = url.searchParams.get("cursor") || void 0;
      if (cursor && cursor.length > 2048) {
        throw new AudioRequestError("Invalid audio list cursor.", 400);
      }
      const result = await env.PROJECT_AUDIO.list({
        prefix: AUDIO_PREFIX,
        limit: 50,
        include: ["customMetadata"],
        cursor
      });
      return json({
        ok: true,
        files: result.objects.filter((object) => AUDIO_ID.test(object.key.slice(AUDIO_PREFIX.length))).map(audioDetails),
        cursor: result.truncated ? result.cursor : null
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
  const id3 = header.length >= 10 && header[0] === 73 && header[1] === 68 && header[2] === 51;
  const frame = header.length >= 4 && header[0] === 255 && (header[1] & 224) === 224 && (header[1] & 24) !== 8 && (header[1] & 6) === 2 && (header[2] & 240) !== 240 && (header[2] & 12) !== 12;
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
    customMetadata: { title, filename: originalName }
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
    url: AUDIO_PATH + "/" + id
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
    "Content-Disposition": `${download ? "attachment" : "inline"}; filename="project-audio.mp3"; filename*=UTF-8''${encodedName}`
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
  const object = await bucket.get(key, range ? { range } : void 0);
  if (!object) throw new AudioRequestError("Audio file not found.", 404);
  return new Response(object.body, { status: range ? 206 : 200, headers });
}
function parseRange(value, size) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(value.trim());
  if (!match || !match[1] && !match[2] || !size) return null;
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
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", ...extraHeaders }
  });
}

// project-audio-ui.js
var projectAudioMarkup = `
  <section class="project-audio" aria-labelledby="project-audio-title">
    <h2 id="project-audio-title">Project audio</h2>
    <p class="audio-note">Listen to audio from my projects, or download an MP3 to keep.</p>
    <p id="audio-login-note" class="audio-note"><a href="/">Log in as admin</a> to add or remove MP3 files.</p>
    <form id="audio-upload-form" class="audio-upload-form" enctype="multipart/form-data" hidden>
      <label for="audio-title">Title (optional)</label>
      <input id="audio-title" name="title" type="text" maxlength="120" placeholder="Audio title" />
      <label for="audio-file">MP3 file</label>
      <input id="audio-file" name="file" type="file" accept=".mp3,audio/mpeg,audio/mp3" aria-describedby="audio-upload-help" required />
      <p id="audio-upload-help" class="audio-note">MP3 files up to 25 MB. Leave the title blank to use the filename.</p>
      <button type="submit">Upload MP3</button>
    </form>
    <p id="audio-upload-status" class="audio-note" role="status" aria-live="polite"></p>
    <p id="audio-list-status" class="audio-note" role="status" aria-live="polite">Loading project audio\u2026</p>
    <div id="audio-list" class="audio-list"></div>
    <button id="audio-load-more" class="audio-button" type="button" hidden>Load more audio</button>
    <noscript><p>Enable JavaScript to browse and upload project audio.</p></noscript>
  </section>
`;
function projectAudioScript() {
  return `<script>(${initProjectAudio.toString()})();<\/script>`;
}
function initProjectAudio() {
  const form = document.getElementById("audio-upload-form");
  const uploadStatus = document.getElementById("audio-upload-status");
  const listStatus = document.getElementById("audio-list-status");
  const list = document.getElementById("audio-list");
  const loginNote = document.getElementById("audio-login-note");
  const moreButton = document.getElementById("audio-load-more");
  let authenticated = false;
  let cursor = null;
  const setAuthenticated = (value) => {
    authenticated = value;
    form.hidden = !value;
    loginNote.hidden = value;
    list.querySelectorAll(".audio-remove").forEach((button) => {
      button.hidden = !value;
    });
  };
  const requestJson = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) setAuthenticated(false);
      throw new Error(data.error || "Unable to access project audio. Please try again.");
    }
    return data;
  };
  const addAudio = (file, prepend = false) => {
    const card = document.createElement("article");
    card.className = "audio-card";
    card.dataset.audioId = file.id;
    const heading = document.createElement("h3");
    heading.textContent = file.title;
    const details = document.createElement("p");
    details.className = "audio-note";
    details.textContent = file.filename + " \xB7 " + (file.size / (1024 * 1024)).toFixed(2) + " MB";
    const player = document.createElement("audio");
    player.controls = true;
    player.preload = "none";
    player.src = file.url;
    player.setAttribute("aria-label", file.title);
    player.addEventListener("error", () => {
      details.textContent = "Unable to play this MP3. Try downloading the file below.";
    });
    const actions = document.createElement("div");
    actions.className = "audio-actions";
    const download = document.createElement("a");
    download.href = file.url + "?download=1";
    download.download = file.filename;
    download.textContent = "Download MP3";
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "audio-button audio-remove";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", "Remove " + file.title);
    remove.hidden = !authenticated;
    remove.addEventListener("click", async () => {
      if (!window.confirm('Remove "' + file.title + '" from project audio?')) return;
      remove.disabled = true;
      try {
        await requestJson(file.url, { method: "DELETE" });
        player.pause();
        player.removeAttribute("src");
        player.load();
        card.remove();
        uploadStatus.textContent = "Audio file removed.";
        if (!list.children.length && !cursor) listStatus.textContent = "No project audio yet.";
      } catch (error) {
        uploadStatus.textContent = error.message;
        remove.disabled = false;
      }
    });
    actions.append(download, remove);
    card.append(heading, details, player, actions);
    if (prepend) list.prepend(card);
    else list.append(card);
    listStatus.textContent = "";
  };
  const loadAudio = async () => {
    moreButton.disabled = true;
    listStatus.textContent = "Loading project audio\u2026";
    try {
      const data = await requestJson("/api/projects/audio" + (cursor ? "?cursor=" + encodeURIComponent(cursor) : ""));
      data.files.forEach((file) => {
        if (!Array.from(list.children).some((card) => card.dataset.audioId === file.id)) addAudio(file);
      });
      cursor = data.cursor;
      moreButton.hidden = !cursor;
      moreButton.textContent = "Load more audio";
      listStatus.textContent = list.children.length ? "" : "No project audio yet.";
    } catch (error) {
      listStatus.textContent = error.message;
      moreButton.hidden = false;
      moreButton.textContent = "Retry loading audio";
    } finally {
      moreButton.disabled = false;
    }
  };
  moreButton.addEventListener("click", loadAudio);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const file = document.getElementById("audio-file").files[0];
    if (!file || !/\.mp3$/i.test(file.name)) {
      uploadStatus.textContent = "Choose an MP3 file to upload.";
      return;
    }
    if (!file.size || file.size > 25 * 1024 * 1024) {
      uploadStatus.textContent = "Choose a nonempty MP3 file up to 25 MB.";
      return;
    }
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    uploadStatus.textContent = "Uploading MP3\u2026";
    const payload = new FormData(form);
    try {
      const data = await requestJson("/api/projects/audio", { method: "POST", body: payload });
      addAudio(data.file, true);
      form.reset();
      uploadStatus.textContent = "MP3 uploaded. It is now available on this page.";
    } catch (error) {
      uploadStatus.textContent = error.message;
    } finally {
      submit.disabled = false;
    }
  });
  fetch("/api/auth/session").then((response) => response.ok ? response.json() : { authenticated: false }).then((session) => setAuthenticated(Boolean(session.authenticated))).catch(() => setAuthenticated(false));
  loadAudio();
}

// index.js
var SESSION_COOKIE = "cj_session";
var SESSION_TTL_SECONDS = 60 * 60 * 24;
var pages = {
  "/": {
    title: "Welcome to ClickJim",
    content: `
      <p>Hi, I'm James \u2014 a tech enthusiast with experience in computer hardware engineering and IT support, specializing in networking and system integration problem-solving.</p>
      <p>Explore the work categories in the top menu to browse dedicated pages for Editorial, Projects, Mods, and Prints.</p>
      <section class="auth-card" aria-labelledby="auth-title">
        <h2 id="auth-title">Admin Login</h2>
        <p class="auth-note">(Try to break in please).</p>
        <form id="login-form" class="auth-form" autocomplete="on">
          <label for="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="name@example.com" />
          <label for="password">Password</label>
          <input id="password" name="password" type="password" required />
          <button type="submit">Log in</button>
        </form>
        <button id="logout-button" class="auth-logout" type="button">Log out</button>
        <p id="auth-status" class="auth-status" role="status" aria-live="polite"></p>
      </section>
    `
  },
  "/editorial": {
    title: "Editorial",
    content: `
      <p>Editorial is where I share deep-dive writeups, technical notes, and long-form perspectives on technology, design, and performance.</p>
      <p>Each article is crafted to be clear, practical, and useful for people building real things.</p>
    `
  },
  "/projects": {
    title: "Projects",
    content: `
      <p>This page showcases active and completed project work, from embedded and systems concepts to software prototypes.</p>
      <p>Expect progress logs, outcomes, and lessons learned from each build.</p>
      ${projectAudioMarkup}
    `
  },
  "/mods": {
    title: "Mods",
    content: `
      <p>The Mods page features custom upgrades and performance-focused modifications across hardware and automotive platforms.</p>
      <p>You'll find build goals, implementation details, and before/after notes for each mod.</p>
    `
  },
  "/prints": {
    title: "Prints",
    content: `
      <p>Prints highlights digital sculpting and physical output work, including prototypes, artistic pieces, and concept iterations.</p>
      <p>Content includes process snapshots and production-ready print highlights.</p>
    `
  }
};
var index_default = {
  async fetch(request, env) {
    return handleRequest(request, env);
  }
};
function renderPage(pathname) {
  const page = pages[pathname];
  if (!page) {
    return {
      status: 404,
      title: "Page Not Found",
      content: "<p>Sorry, that page does not exist. Please use the menu to navigate to an available page.</p>"
    };
  }
  return { status: 200, title: page.title, content: page.content };
}
async function handleRequest(request, env) {
  const url = new URL(request.url);
  if (url.pathname === "/api/projects/audio" || url.pathname.startsWith("/api/projects/audio/")) {
    return handleProjectAudio(request, env, handleSession);
  }
  if (request.method === "POST" && url.pathname === "/api/auth/login") {
    return handleLogin(request, env);
  }
  if (request.method === "GET" && url.pathname === "/api/auth/session") {
    return handleSession(request, env);
  }
  if (request.method === "POST" && url.pathname === "/api/auth/logout") {
    return handleLogout(request, env);
  }
  if (url.pathname === "/style.css") {
    return new Response(style_default, {
      headers: {
        "Content-Type": "text/css; charset=utf-8",
        "Cache-Control": "public, max-age=3600"
      }
    });
  }
  const page = renderPage(url.pathname);
  const script = url.pathname === "/" ? homepageAuthScript() : url.pathname === "/projects" ? projectAudioScript() : "";
  const html = content_default.replace(/{{PAGE_TITLE}}/g, page.title).replace("{{PAGE_CONTENT}}", page.content).replace("{{PAGE_SCRIPT}}", script).replace(/<\/head>/i, `<style>${style_default}</style></head>`);
  return new Response(html, {
    status: page.status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
async function handleLogin(request, env) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json2({ ok: false, error: "Invalid request payload." }, 400);
  }
  const email = String(payload?.email || "").trim().toLowerCase();
  const password = String(payload?.password || "");
  if (!email || !password) {
    return json2({ ok: false, error: "Email and password are required." }, 400);
  }
  const allowedEmail = (env.AUTH_DEMO_EMAIL || "demo@clickjim.com").toLowerCase();
  const allowedPassword = env.AUTH_DEMO_PASSWORD || "change-me";
  if (email !== allowedEmail || password !== allowedPassword) {
    return json2({ ok: false, error: "Invalid credentials." }, 401);
  }
  const userId = `demo:${email}`;
  const sessionId = crypto.randomUUID();
  const shard = env.AUTH_SESSION_DO.idFromName(userId);
  const stub = env.AUTH_SESSION_DO.get(shard);
  const createRes = await stub.fetch("https://do.internal/create", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sessionId, userId, ttlSeconds: SESSION_TTL_SECONDS })
  });
  if (!createRes.ok) {
    return json2({ ok: false, error: "Unable to create session." }, 500);
  }
  const token = await signSessionToken({ userId, sessionId }, env.SESSION_SECRET || "development-secret");
  return json2(
    { ok: true, user: { email } },
    200,
    {
      "Set-Cookie": serializeCookie(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        path: "/",
        maxAge: SESSION_TTL_SECONDS
      })
    }
  );
}
async function handleSession(request, env) {
  const token = parseCookies(request.headers.get("Cookie") || "")[SESSION_COOKIE];
  if (!token) {
    return json2({ ok: true, authenticated: false });
  }
  const parsed = await verifySessionToken(token, env.SESSION_SECRET || "development-secret");
  if (!parsed) {
    return json2({ ok: true, authenticated: false }, 200, { "Set-Cookie": clearSessionCookie() });
  }
  const shard = env.AUTH_SESSION_DO.idFromName(parsed.userId);
  const stub = env.AUTH_SESSION_DO.get(shard);
  const validRes = await stub.fetch("https://do.internal/validate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sessionId: parsed.sessionId })
  });
  if (!validRes.ok) {
    return json2({ ok: true, authenticated: false }, 200, { "Set-Cookie": clearSessionCookie() });
  }
  return json2({ ok: true, authenticated: true, user: { email: parsed.userId.replace("demo:", "") } });
}
async function handleLogout(request, env) {
  const token = parseCookies(request.headers.get("Cookie") || "")[SESSION_COOKIE];
  if (token) {
    const parsed = await verifySessionToken(token, env.SESSION_SECRET || "development-secret");
    if (parsed) {
      const shard = env.AUTH_SESSION_DO.idFromName(parsed.userId);
      const stub = env.AUTH_SESSION_DO.get(shard);
      await stub.fetch("https://do.internal/revoke", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId: parsed.sessionId })
      });
    }
  }
  return json2({ ok: true }, 200, { "Set-Cookie": clearSessionCookie() });
}
var AuthSessionDO = class {
  constructor(state) {
    this.state = state;
  }
  async fetch(request) {
    const url = new URL(request.url);
    const body = await request.json().catch(() => ({}));
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }
    if (url.pathname === "/create") {
      const expiresAt = Date.now() + Number(body.ttlSeconds || SESSION_TTL_SECONDS) * 1e3;
      await this.state.storage.put(`session:${body.sessionId}`, {
        userId: body.userId,
        expiresAt
      });
      return json2({ ok: true });
    }
    if (url.pathname === "/validate") {
      const session = await this.state.storage.get(`session:${body.sessionId}`);
      if (!session || session.expiresAt <= Date.now()) {
        if (session) await this.state.storage.delete(`session:${body.sessionId}`);
        return json2({ ok: false }, 401);
      }
      return json2({ ok: true });
    }
    if (url.pathname === "/revoke") {
      await this.state.storage.delete(`session:${body.sessionId}`);
      return json2({ ok: true });
    }
    return new Response("Not Found", { status: 404 });
  }
};
function json2(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders
    }
  });
}
function parseCookies(cookieHeader) {
  return cookieHeader.split(";").reduce((acc, part) => {
    const [key, ...rest] = part.trim().split("=");
    if (!key) return acc;
    acc[key] = rest.join("=");
    return acc;
  }, {});
}
function clearSessionCookie() {
  return serializeCookie(SESSION_COOKIE, "", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    maxAge: 0
  });
}
function serializeCookie(name, value, options = {}) {
  const pairs = [`${name}=${value}`];
  if (options.maxAge !== void 0) pairs.push(`Max-Age=${options.maxAge}`);
  if (options.path) pairs.push(`Path=${options.path}`);
  if (options.httpOnly) pairs.push("HttpOnly");
  if (options.secure) pairs.push("Secure");
  if (options.sameSite) pairs.push(`SameSite=${options.sameSite}`);
  return pairs.join("; ");
}
async function signSessionToken(payload, secret) {
  const message = JSON.stringify(payload);
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return `${base64UrlEncode(message)}.${base64UrlEncode(signature)}`;
}
async function verifySessionToken(token, secret) {
  try {
    return await decodeSessionToken(token, secret);
  } catch {
    return null;
  }
}
async function decodeSessionToken(token, secret) {
  if (token.split(".").length !== 2) return null;
  const [payloadB64, signatureB64] = token.split(".");
  if (!payloadB64 || !signatureB64) return null;
  const message = base64UrlDecode(payloadB64);
  const signature = base64UrlDecodeToBytes(signatureB64);
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const isValid = await crypto.subtle.verify("HMAC", key, signature, enc.encode(message));
  if (!isValid) return null;
  try {
    const payload = JSON.parse(message);
    if (typeof payload?.userId !== "string" || !payload.userId || typeof payload?.sessionId !== "string" || !payload.sessionId) return null;
    return payload;
  } catch {
    return null;
  }
}
function base64UrlEncode(input) {
  const bytes = typeof input === "string" ? new TextEncoder().encode(input) : new Uint8Array(input);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function base64UrlDecode(input) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4);
  return atob(padded);
}
function base64UrlDecodeToBytes(input) {
  const decoded = base64UrlDecode(input);
  const bytes = new Uint8Array(decoded.length);
  for (let i = 0; i < decoded.length; i += 1) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
}
function homepageAuthScript() {
  return `
  <script>
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button');
    const status = document.getElementById('auth-status');

    const setState = (authenticated, email = '') => {
      loginForm.style.display = authenticated ? 'none' : 'grid';
      logoutButton.style.display = authenticated ? 'inline-flex' : 'none';
      status.textContent = authenticated
        ? 'Logged in as ' + email
        : 'Not logged in';
    };

    const refreshSession = async () => {
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      setState(Boolean(data.authenticated), data.user?.email || '');
    };

    loginForm?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const payload = Object.fromEntries(new FormData(loginForm).entries());
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        status.textContent = data.error || 'Login failed';
        return;
      }
      setState(true, data.user.email);
    });

    logoutButton?.addEventListener('click', async () => {
      await fetch('/api/auth/logout', { method: 'POST' });
      setState(false);
    });

    refreshSession();
  <\/script>
  `;
}
export {
  AuthSessionDO,
  index_default as default
};
