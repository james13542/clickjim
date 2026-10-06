export async function forwardHomeAudio(request, env) {
  let origin;
  try {
    const configured = new URL(env.PROJECT_AUDIO_SERVER_URL);
    if (configured.protocol !== "https:" || configured.username || configured.password ||
        configured.pathname !== "/" || configured.search || configured.hash) throw new Error();
    origin = configured.origin;
  } catch {
    return json({ ok: false, error: "Configure a valid HTTPS address for the home audio server." }, 503);
  }
  if (!env.PROJECT_AUDIO_SERVER_SECRET || env.PROJECT_AUDIO_SERVER_SECRET.length < 32) {
    return json({ ok: false, error: "Configure the shared secret for the home audio server." }, 503);
  }

  const url = new URL(request.url);
  const target = origin + url.pathname + url.search;
  // Media goes directly to the home server; uploads and management stay on Clickjim.
  if (url.pathname !== "/api/projects/audio" && ["GET", "HEAD"].includes(request.method)) {
    return new Response(null, { status: 307, headers: { Location: target, "Cache-Control": "no-store" } });
  }
  const headers = new Headers({
    Authorization: "Bearer " + env.PROJECT_AUDIO_SERVER_SECRET,
    Origin: origin,
  });
  const contentType = request.headers.get("Content-Type");
  if (contentType) headers.set("Content-Type", contentType);
  const length = request.headers.get("Content-Length");
  if (length) headers.set("Content-Length", length);

  try {
    const upstream = await fetch(new Request(target, {
      method: request.method,
      headers,
      body: request.method === "POST" ? request.body : undefined,
      duplex: "half",
      redirect: "manual",
      signal: AbortSignal.timeout(120000),
    }));
    if (upstream.status >= 300 && upstream.status < 400) throw new Error("Unexpected redirect");
    if ([401, 403].includes(upstream.status)) {
      return json({ ok: false, error: "The home audio server's shared secret does not match." }, 503);
    }
    const data = await upstream.json();
    const publicFile = (file) => ({ ...file, url: origin + "/api/projects/audio/" + encodeURIComponent(file.id) });
    if (Array.isArray(data.files)) data.files = data.files.map(publicFile);
    if (data.file) data.file = publicFile(data.file);
    return json(data, upstream.status);
  } catch {
    return json({ ok: false, error: "The home audio server is unavailable. Please try again later." }, 503);
  }
}

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}
