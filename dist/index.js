(() => {
  // content.html
  var content_default = '<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>{{PAGE_TITLE}} | ClickJim</title>\n</head>\n<body>\n    <div class="pattern-bg" aria-hidden="true"></div>\n\n    <nav>\n        <ul class="dropdown">\n            <li><a href="#" aria-label="Open navigation menu">Menu \u25BC</a>\n                <ul class="dropdown-content">\n                    <li><a href="/editorial">Editorial</a></li>\n                    <li><a href="/projects">Projects</a></li>\n                    <li><a href="/mods">Mods</a></li>\n                    <li><a href="/prints">Prints</a></li>\n                </ul>\n            </li>\n        </ul>\n    </nav>\n\n    <main class="container">\n        <h1>{{PAGE_TITLE}}</h1>\n        {{PAGE_CONTENT}}\n    </main>\n\n    <footer class="business-banner">\n        <p>ClickJim Studio \u2022 Professional Creative + Technical Services \u2022 Contact: <a href="mailto:jamesdanielwalter@outlook.com">jamesdanielwalter@outlook.com</a></p>\n    </footer>\n    {{PAGE_SCRIPT}}\n</body>\n</html>\n';

  // style.css
  var style_default = ":root {\n    --brand-dark: #1f2732;\n    --brand-dark-2: #2d3745;\n    --brand-accent: #2563eb;\n    --text-main: #1f2937;\n    --text-muted: #4b5563;\n    --surface: #ffffff;\n    --surface-bg: #eef2f7;\n}\n\n* {\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    min-height: 100vh;\n    background-color: var(--surface-bg);\n    text-align: center;\n    color: var(--text-main);\n    display: flex;\n    flex-direction: column;\n}\n\nnav {\n    background-color: var(--brand-dark);\n    padding: 12px;\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);\n}\n\n.dropdown {\n    list-style-type: none;\n    padding: 0;\n    margin: 0;\n    display: inline-block;\n}\n\n.dropdown li {\n    position: relative;\n    display: inline-block;\n}\n\n.dropdown a {\n    text-decoration: none;\n    color: white;\n    font-weight: 600;\n    padding: 10px 20px;\n    display: block;\n}\n\n.dropdown-content {\n    display: none;\n    position: absolute;\n    left: 0;\n    background-color: var(--brand-dark-2);\n    min-width: 190px;\n    border-radius: 8px;\n    overflow: hidden;\n    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);\n    z-index: 1;\n}\n\n.dropdown-content li {\n    display: block;\n}\n\n.dropdown-content a {\n    padding: 12px;\n    color: white;\n    text-align: left;\n}\n\n.dropdown-content a:hover {\n    background-color: var(--brand-accent);\n}\n\n.dropdown-content a:hover {\n    background-color: var(--brand-accent);\n}\n\n.dropdown li:hover .dropdown-content,\n.dropdown li:focus-within .dropdown-content {\n    display: block;\n}\n\n.container {\n    flex: 1;\n    max-width: 860px;\n    margin: 48px auto;\n    background: var(--surface);\n    padding: 32px;\n    border-radius: 14px;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);\n}\n\nh1 {\n    color: #111827;\n    margin-top: 0;\n}\n\np {\n    color: var(--text-muted);\n    font-size: 18px;\n    line-height: 1.7;\n}\n\n.business-banner {\n    background: linear-gradient(90deg, var(--brand-dark), #0f172a);\n    color: #e5e7eb;\n    padding: 16px 20px;\n    font-size: 15px;\n    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);\n}\n\n.business-banner p {\n    margin: 0;\n    color: inherit;\n    font-size: inherit;\n}\n\n.business-banner a {\n    color: #93c5fd;\n    text-decoration: none;\n    font-weight: 700;\n}\n\n.business-banner a:hover {\n    text-decoration: underline;\n}\n\n.auth-card {\n    margin-top: 28px;\n    border: 1px solid #dbe4f0;\n    border-radius: 12px;\n    padding: 20px;\n    text-align: left;\n    background: #f8fbff;\n}\n\n.auth-card h2 {\n    margin-top: 0;\n}\n\n.auth-note {\n    margin-top: 0;\n    font-size: 15px;\n}\n\n.auth-form {\n    display: grid;\n    gap: 10px;\n}\n\n.auth-form input {\n    width: 100%;\n    padding: 10px;\n    border: 1px solid #cbd5e1;\n    border-radius: 8px;\n}\n\n.auth-form button,\n.auth-logout {\n    margin-top: 8px;\n    border: none;\n    background: var(--brand-accent);\n    color: white;\n    padding: 10px 14px;\n    border-radius: 8px;\n    cursor: pointer;\n    font-weight: 600;\n    width: fit-content;\n}\n\n.auth-status {\n    margin-bottom: 0;\n    font-size: 15px;\n}\n";

  // index.js
  var SESSION_COOKIE = "cj_session";
  var SESSION_TTL_SECONDS = 60 * 60 * 24;
  var pages = {
    "/": {
      title: "Welcome to ClickJim",
      content: `
      <p>Hi, I'm James \u2014 a tech enthusiast with experience in computer hardware engineering and IT support, specializing in networking problem-solving.</p>
      <p>Explore the work categories in the top menu to browse dedicated pages for Editorial, Projects, Mods, and Prints.</p>
      <section class="auth-card" aria-labelledby="auth-title">
        <h2 id="auth-title">Client Login</h2>
        <p class="auth-note">Use this demo login wired to Durable Object-backed sessions.</p>
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
    const script = url.pathname === "/" ? homepageAuthScript() : "";
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
      body: JSON.stringify({ sessionId, userId, ttlSeconds: SESSION_TTL_SECONDS })
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
          maxAge: SESSION_TTL_SECONDS
        })
      }
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
      body: JSON.stringify({ sessionId: parsed.sessionId })
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
          body: JSON.stringify({ sessionId: parsed.sessionId })
        });
      }
    }
    return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie() });
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
  };
  function json(payload, status = 200, extraHeaders = {}) {
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
  <\/script>
  `;
  }
})();
