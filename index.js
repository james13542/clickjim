import homeHtml from "./content.html";
import editorialsHtml from "./editorials.html";
import projectsHtml from "./projects.html";
import modsHtml from "./mods.html";
import printsHtml from "./prints.html";
import cssContent from "./style.css";

function renderPage(html) {
  return html.replace(/<\/head>/i, `<style>${cssContent}</style></head>`);
}

function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function getCookie(request, name) {
  const cookieHeader = request.headers.get("Cookie") || "";
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith(`${name}=`)) {
      return decodeURIComponent(cookie.slice(name.length + 1));
    }
  }
  return null;
}


function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function authNavHtml(username) {
  if (username) {
    return `
      <div class="auth-controls">
        <span class="auth-user">Signed in as ${escapeHtml(username)}</span>
        <form method="POST" action="/logout" class="logout-form">
          <button type="submit" class="auth-button">Logout</button>
        </form>
      </div>
    `;
  }

  return `
    <div class="auth-controls">
      <a class="auth-link" href="/login">Login</a>
    </div>
  `;
}

function withAuthNav(pageHtml, username) {
  return pageHtml.replace("</nav>", `${authNavHtml(username)}</nav>`);
}

function loginPageHtml(errorMessage = "") {
  const errorBlock = errorMessage
    ? `<p class="auth-error">${escapeHtml(errorMessage)}</p>`
    : "";

  return `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login | ClickJim</title>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <nav>
        <a class="home-link" href="/">ClickJim</a>
        <ul class="dropdown">
            <li><a href="#">Menu ▼</a>
                <ul class="dropdown-content">
                    <li><a href="/editorials">Editorials</a></li>
                    <li><a href="/projects">Projects</a></li>
                    <li><a href="/mods">Mods</a></li>
                    <li><a href="/prints">Prints</a></li>
                </ul>
            </li>
        </ul>
        <div class="auth-controls">
          <a class="auth-link" href="/login">Login</a>
        </div>
    </nav>

    <main class="container">
      <section class="content-section single-page auth-section">
        <h1>Account Login</h1>
        <p>Create an account or sign in to manage your ClickJim session.</p>
        ${errorBlock}
        <form method="POST" action="/login" class="auth-form">
          <label>
            Username
            <input name="username" type="text" required minlength="3" />
          </label>
          <label>
            Password
            <input name="password" type="password" required minlength="6" />
          </label>
          <div class="auth-actions">
            <button type="submit" name="action" value="login" class="auth-button">Login</button>
            <button type="submit" name="action" value="register" class="auth-button secondary">Register</button>
          </div>
        </form>
      </section>
    </main>

    <footer class="business-banner">
        <div class="banner-content">
            <strong>ClickJim Studio</strong>
            <span>Professional editorial, project, and creative services.</span>
            <a href="mailto:jamesdanielwalter@outlook.com">jamesdanielwalter@outlook.com</a>
        </div>
    </footer>
</body>
</html>
`;
}

async function getCurrentUser(request, env) {
  const sessionToken = getCookie(request, "clickjim_session");
  if (!sessionToken) return null;

  const stub = env.AUTH_DO.get(env.AUTH_DO.idFromName("global-auth"));
  const response = await stub.fetch("https://auth.internal/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: sessionToken }),
  });

  if (!response.ok) return null;

  const data = await response.json();
  return data.username || null;
}

async function handleLogin(request, env) {
  const formData = await request.formData();
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  const action = String(formData.get("action") || "login");

  if (!username || !password) {
    return new Response(renderPage(loginPageHtml("Username and password are required.")), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
      status: 400,
    });
  }

  const stub = env.AUTH_DO.get(env.AUTH_DO.idFromName("global-auth"));

  if (action === "register") {
    const registerRes = await stub.fetch("https://auth.internal/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!registerRes.ok) {
      const msg = await registerRes.text();
      return new Response(renderPage(loginPageHtml(msg || "Registration failed.")), {
        headers: { "Content-Type": "text/html; charset=utf-8" },
        status: 400,
      });
    }
  }

  const loginRes = await stub.fetch("https://auth.internal/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!loginRes.ok) {
    const msg = await loginRes.text();
    return new Response(renderPage(loginPageHtml(msg || "Login failed.")), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
      status: 401,
    });
  }

  const { token } = await loginRes.json();
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie": `clickjim_session=${encodeURIComponent(token)}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=604800`,
    },
  });
}

async function handleLogout(request, env) {
  const token = getCookie(request, "clickjim_session");

  if (token) {
    const stub = env.AUTH_DO.get(env.AUTH_DO.idFromName("global-auth"));
    await stub.fetch("https://auth.internal/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
      "Set-Cookie": "clickjim_session=; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=0",
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/style.css") {
      return new Response(cssContent, {
        headers: {
          "Content-Type": "text/css; charset=utf-8",
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    if (url.pathname === "/login" && request.method === "GET") {
      return new Response(renderPage(loginPageHtml()), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }

    if (url.pathname === "/login" && request.method === "POST") {
      return handleLogin(request, env);
    }

    if (url.pathname === "/logout" && request.method === "POST") {
      return handleLogout(request, env);
    }

    const routes = {
      "/": homeHtml,
      "/editorials": editorialsHtml,
      "/editorals": editorialsHtml,
      "/projects": projectsHtml,
      "/mods": modsHtml,
      "/prints": printsHtml,
    };

    const normalizedPath = normalizePath(url.pathname);
    const pageHtml = routes[normalizedPath];

    if (!pageHtml) {
      return new Response("Not Found", {
        status: 404,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }

    const username = await getCurrentUser(request, env);
    const html = withAuthNav(pageHtml, username);

    return new Response(renderPage(html), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  },
};

async function hashPassword(password) {
  const encoded = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", encoded);
  const bytes = Array.from(new Uint8Array(digest));
  return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export class AuthDurableObject {
  constructor(state) {
    this.state = state;
  }

  async fetch(request) {
    const url = new URL(request.url);

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    if (url.pathname === "/register") {
      const { username, password } = await request.json();
      const cleanUser = String(username || "").trim().toLowerCase();

      if (cleanUser.length < 3 || String(password || "").length < 6) {
        return new Response("Username must be 3+ chars and password 6+ chars.", { status: 400 });
      }

      const existing = await this.state.storage.get(`user:${cleanUser}`);
      if (existing) {
        return new Response("That username is already registered.", { status: 409 });
      }

      const passwordHash = await hashPassword(password);
      await this.state.storage.put(`user:${cleanUser}`, { passwordHash });

      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/login") {
      const { username, password } = await request.json();
      const cleanUser = String(username || "").trim().toLowerCase();
      const user = await this.state.storage.get(`user:${cleanUser}`);

      if (!user) {
        return new Response("Invalid username or password.", { status: 401 });
      }

      const passwordHash = await hashPassword(password);
      if (user.passwordHash !== passwordHash) {
        return new Response("Invalid username or password.", { status: 401 });
      }

      const token = crypto.randomUUID();
      await this.state.storage.put(`session:${token}`, {
        username: cleanUser,
        createdAt: Date.now(),
      });

      return new Response(JSON.stringify({ token }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/session") {
      const { token } = await request.json();
      const session = await this.state.storage.get(`session:${token}`);

      if (!session) {
        return new Response("Invalid session.", { status: 401 });
      }

      return new Response(JSON.stringify({ username: session.username }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    if (url.pathname === "/logout") {
      const { token } = await request.json();
      if (token) {
        await this.state.storage.delete(`session:${token}`);
      }

      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404 });
  }
}
