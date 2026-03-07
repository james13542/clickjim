import homeHtml from "./content.html";
import editorialsHtml from "./editorials.html";
import projectsHtml from "./projects.html";
import modsHtml from "./mods.html";
import printsHtml from "./prints.html";
import cssContent from "./style.css";

function renderPage(html) {
  return html.replace(/<\/head>/i, `<style>${cssContent}</style></head>`);
}

function renderPage(html) {
  return html.replace(/<\/head>/i, `<style>${cssContent}</style></head>`);
}

function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

  if (url.pathname === "/style.css") {
    return new Response(cssContent, {
      headers: {
        "Content-Type": "text/css; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  const routes = {
    "/": homeHtml,
    "/editorials": editorialsHtml,
    "/editorals": editorialsHtml,
    "/projects": projectsHtml,
    "/mods": modsHtml,
    "/prints": printsHtml,
  };

  const pageHtml = routes[normalizePath(url.pathname)];

  if (!pageHtml) {
    return new Response("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  return new Response(renderPage(pageHtml), {
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
