import htmlContent from "./content.html";
import cssContent from "./style.css";

const SESSION_COOKIE = "cj_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24;

const pages = {
  "/": {
    title: "Welcome to ClickJim",
    content: `
      <p>Hi, I'm James — a tech enthusiast with experience in computer hardware engineering and IT support, specializing in networking problem-solving.</p>
      <p>Explore the work categories in the top menu to browse dedicated pages for Editorial, Projects, Mods, and Prints.</p>
      <section class="auth-card" aria-labelledby="auth-title">
        <h2 id="auth-title">Client Login</h2>
        <p class="auth-note">Admin login (Try to break in please).</p>
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
    `,
  },
  "/editorial": {
    title: "Editorial",
    content: `
      <p>Editorial is where I share deep-dive writeups, technical notes, and long-form perspectives on technology, design, and performance.</p>
      <p>Each article is crafted to be clear, practical, and useful for people building real things.</p>
    `,
  },
  "/projects": {
    title: "Projects",
    content: `
      <p>This page showcases active and completed project work, from embedded and systems concepts to software prototypes.</p>
      <p>Expect progress logs, outcomes, and lessons learned from each build.</p>
    `,
  },
  "/mods": {
    title: "Mods",
    content: `
      <p>The Mods page features custom upgrades and performance-focused modifications across hardware and automotive platforms.</p>
      <p>You'll find build goals, implementation details, and before/after notes for each mod.</p>
    `,
  },
  "/prints": {
    title: "Prints",
    content: `
      <p>Prints highlights digital sculpting and physical output work, including prototypes, artistic pieces, and concept iterations.</p>
      <p>Content includes process snapshots and production-ready print highlights.</p>
    `,
  },
};

export default {
  async fetch(request, env) {
    return handleRequest(request, env);
  },
};

function renderPage(pathname) {
  const page = pages[pathname];

  if (!page) {
    return {
      status: 404,
      title: "Page Not Found",
      content: "<p>Sorry, that page does not exist. Please use the menu to navigate to an available page.</p>",
    };
  }

  return { status: 200, title: page.title, content: page.content };
}

async function handleRequest(request, env) {
  const url = new URL(request.url);

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
    return new Response(cssContent, {
      headers: {
        "Content-Type": "text/css; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  const page = renderPage(url.pathname);
  const script = url.pathname === "/" ? homepageAuthScript() : "";

  const html = htmlContent
    .replace(/{{PAGE_TITLE}}/g, page.title)
    .replace("{{PAGE_CONTENT}}", page.content)
    .replace("{{PAGE_SCRIPT}}", script)
    .replace(/<\/head>/i, `<style>${cssContent}</style></head>`);

  return new Response(html, {
    status: page.status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

async function handleLogin(request, env) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request payload." }, 400);
  }

  const email = String(payload?.email || "").trim().toLowerCase();
  const password = String(payload?.password || "");

  if (!email || !password) {
    return json({ ok: false, error: "Email and password are required." }, 400);
  }

  const allowedEmail = (env.AUTH_DEMO_EMAIL || "demo@clickjim.com").toLowerCase();
  const allowedPassword = env.AUTH_DEMO_PASSWORD || "change-me";

  if (email !== allowedEmail || password !== allowedPassword) {
    return json({ ok: false, error: "Invalid credentials." }, 401);
  }

  const userId = `demo:${email}`;
  const sessionId = crypto.randomUUID();
  const shard = env.AUTH_SESSION_DO.idFromName(userId);
  const stub = env.AUTH_SESSION_DO.get(shard);

  const createRes = await stub.fetch("https://do.internal/create", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sessionId, userId, ttlSeconds: SESSION_TTL_SECONDS }),
  });

  if (!createRes.ok) {
    return json({ ok: false, error: "Unable to create session." }, 500);
  }

  const token = await signSessionToken({ userId, sessionId }, env.SESSION_SECRET || "development-secret");

  return json(
    { ok: true, user: { email } },
    200,
    {
      "Set-Cookie": serializeCookie(SESSION_COOKIE, token, {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        path: "/",
        maxAge: SESSION_TTL_SECONDS,
      }),
    },
  );
}

async function handleSession(request, env) {
  const token = parseCookies(request.headers.get("Cookie") || "")[SESSION_COOKIE];
  if (!token) {
    return json({ ok: true, authenticated: false });
  }

  const parsed = await verifySessionToken(token, env.SESSION_SECRET || "development-secret");
  if (!parsed) {
    return json({ ok: true, authenticated: false }, 200, { "Set-Cookie": clearSessionCookie() });
  }

  const shard = env.AUTH_SESSION_DO.idFromName(parsed.userId);
  const stub = env.AUTH_SESSION_DO.get(shard);

  const validRes = await stub.fetch("https://do.internal/validate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ sessionId: parsed.sessionId }),
  });

  if (!validRes.ok) {
    return json({ ok: true, authenticated: false }, 200, { "Set-Cookie": clearSessionCookie() });
  }

  return json({ ok: true, authenticated: true, user: { email: parsed.userId.replace("demo:", "") } });
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
        body: JSON.stringify({ sessionId: parsed.sessionId }),
      });
    }
  }

  return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie() });
}

export class AuthSessionDO {
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
      const expiresAt = Date.now() + Number(body.ttlSeconds || SESSION_TTL_SECONDS) * 1000;
      await this.state.storage.put(`session:${body.sessionId}`, {
        userId: body.userId,
        expiresAt,
      });
      return json({ ok: true });
    }

    if (url.pathname === "/validate") {
      const session = await this.state.storage.get(`session:${body.sessionId}`);
      if (!session || session.expiresAt <= Date.now()) {
        if (session) await this.state.storage.delete(`session:${body.sessionId}`);
        return json({ ok: false }, 401);
      }

      return json({ ok: true });
    }

    if (url.pathname === "/revoke") {
      await this.state.storage.delete(`session:${body.sessionId}`);
      return json({ ok: true });
    }

    return new Response("Not Found", { status: 404 });
  }
}

function json(payload, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
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
    maxAge: 0,
  });
}

function serializeCookie(name, value, options = {}) {
  const pairs = [`${name}=${value}`];
  if (options.maxAge !== undefined) pairs.push(`Max-Age=${options.maxAge}`);
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
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return `${base64UrlEncode(message)}.${base64UrlEncode(signature)}`;
}

async function verifySessionToken(token, secret) {
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
    ["verify"],
  );

  const isValid = await crypto.subtle.verify("HMAC", key, signature, enc.encode(message));
  if (!isValid) return null;

  try {
    return JSON.parse(message);
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
  </script>
  `;
}
