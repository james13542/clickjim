(() => {
  // content.html
  var content_default = '<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>ClickJim</title>\n    <link rel="stylesheet" href="/style.css">\n</head>\n<body>\n    <nav>\n        <ul class="dropdown">\n            <li><a href="#">Menu \u25BC</a>\n                <ul class="dropdown-content">\n                    <li><a href="#editorials">Editorials</a></li>\n                    <li><a href="#projects">Projects</a></li>\n                    <li><a href="#mods">Mods</a></li>\n                    <li><a href="#prints">Prints</a></li>\n                </ul>\n            </li>\n        </ul>\n    </nav>\n\n    <main class="container">\n        <section class="intro" id="top">\n            <h1>Welcome to ClickJim</h1>\n            <p>Technology, design, and creative development presented with a professional editorial approach.</p>\n        </section>\n\n        <section id="editorials" class="content-section">\n            <h2>Editorials</h2>\n            <p>Long-form stories, deep dives, and thoughtful commentary on innovation, engineering, and digital craftsmanship.</p>\n        </section>\n\n        <section id="projects" class="content-section">\n            <h2>Projects</h2>\n            <p>Hands-on builds and technical experiments, from software and embedded ideas to mechanical problem-solving.</p>\n        </section>\n\n        <section id="mods" class="content-section">\n            <h2>Mods</h2>\n            <p>Performance and customization logs covering practical modifications, improvements, and lessons learned.</p>\n        </section>\n\n        <section id="prints" class="content-section">\n            <h2>Prints</h2>\n            <p>Selected visual work and print-ready creations that combine precision, aesthetics, and storytelling.</p>\n        </section>\n    </main>\n\n    <footer class="business-banner">\n        <div class="banner-content">\n            <strong>ClickJim Studio</strong>\n            <span>Professional editorial, project, and creative services.</span>\n            <a href="mailto:jamesdanielwalter@outlook.com">jamesdanielwalter@outlook.com</a>\n        </div>\n    </footer>\n</body>\n</html>\n';

  // style.css
  var style_default = "body {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 0;\n    background: linear-gradient(180deg, #f4f6fa 0%, #edf1f7 100%);\n    color: #1f2937;\n    text-align: center;\n}\n\nhtml {\n    scroll-behavior: smooth;\n}\n\nnav {\n    background-color: #1f2937;\n    padding: 12px;\n    position: sticky;\n    top: 0;\n    z-index: 10;\n}\n\n.dropdown {\n    list-style-type: none;\n    padding: 0;\n    margin: 0;\n    display: inline-block;\n}\n\n.dropdown li {\n    position: relative;\n    display: inline-block;\n}\n\n.dropdown a {\n    text-decoration: none;\n    color: #fff;\n    padding: 10px 20px;\n    display: block;\n    font-weight: 600;\n}\n\n.dropdown-content {\n    display: none;\n    position: absolute;\n    background-color: #111827;\n    min-width: 180px;\n    border-radius: 8px;\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);\n    z-index: 1;\n}\n\n.dropdown-content li {\n    display: block;\n}\n\n.dropdown-content a {\n    padding: 12px;\n    color: #f9fafb;\n    display: block;\n    text-align: left;\n}\n\n.dropdown-content a:hover {\n    background-color: #374151;\n    border-radius: 8px;\n}\n\n.dropdown li:hover .dropdown-content {\n    display: block;\n}\n\n.container {\n    max-width: 900px;\n    margin: 40px auto 120px;\n    background: #fff;\n    padding: 32px;\n    border-radius: 14px;\n    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);\n}\n\n.intro p {\n    margin-bottom: 28px;\n}\n\n.content-section {\n    padding: 24px 0;\n    border-top: 1px solid #e5e7eb;\n}\n\nh1, h2 {\n    color: #111827;\n}\n\nh2 {\n    margin-bottom: 10px;\n}\n\np {\n    color: #4b5563;\n    font-size: 18px;\n    line-height: 1.6;\n    margin: 0 auto;\n    max-width: 700px;\n}\n\n.business-banner {\n    position: fixed;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #111827;\n    color: #f9fafb;\n    padding: 12px 16px;\n    border-top: 3px solid #2563eb;\n}\n\n.banner-content {\n    max-width: 1100px;\n    margin: 0 auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 14px;\n    flex-wrap: wrap;\n    font-size: 14px;\n}\n\n.business-banner a {\n    color: #93c5fd;\n    text-decoration: none;\n    font-weight: 700;\n}\n\n.business-banner a:hover {\n    text-decoration: underline;\n}\n";

  // index.js
  addEventListener("fetch", (event) => {
    event.respondWith(handle(event.request));
  });
  function renderPage(html) {
    return html.replace(/<\/head>/i, `<style>${style_default}</style></head>`);
  }
  function normalizePath(pathname) {
    if (pathname.length > 1 && pathname.endsWith("/")) {
      return pathname.slice(0, -1);
    }
    return pathname;
  }
  async function handle(request) {
    const url = new URL(request.url);
    if (url.pathname === "/style.css") {
      return new Response(style_default, {
        headers: {
          "Content-Type": "text/css; charset=utf-8",
          "Cache-Control": "public, max-age=3600"
        }
      });
      if (!registerRes.ok) {
        const msg = await registerRes.text();
        return new Response(renderPage(loginPageHtml(msg || "Registration failed.")), {
          headers: { "Content-Type": "text/html; charset=utf-8" },
          status: 400
        });
      }
    }
    const routes = {
      "/": content_default,
      "/editorials": editorials_default,
      "/editorals": editorials_default,
      "/projects": projects_default,
      "/mods": mods_default,
      "/prints": prints_default
    };
    const pageHtml = routes[normalizePath(url.pathname)];
    if (!pageHtml) {
      return new Response("Not Found", {
        status: 404,
        headers: {
          "Content-Type": "text/plain; charset=utf-8"
        }
      });
    }
    return new Response(renderPage(pageHtml), {
      headers: {
        Location: "/",
        "Set-Cookie": "clickjim_session=; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=0"
      }
    });
  }
  var index_default = {
    async fetch(request, env) {
      const url = new URL(request.url);
      if (url.pathname === "/style.css") {
        return new Response(style_default, {
          headers: {
            "Content-Type": "text/css; charset=utf-8",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
      if (url.pathname === "/login" && request.method === "GET") {
        return new Response(renderPage(loginPageHtml()), {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store"
          }
        });
      }
      if (url.pathname === "/login" && request.method === "POST") {
        return handleLogin(request, env);
      }
      if (url.pathname === "/logout" && request.method === "POST") {
        return handleLogout(request, env);
      }
      const routes = {
        "/": content_default,
        "/editorials": editorials_default,
        "/editorals": editorials_default,
        "/projects": projects_default,
        "/mods": mods_default,
        "/prints": prints_default
      };
      const normalizedPath = normalizePath(url.pathname);
      const pageHtml = routes[normalizedPath];
      if (!pageHtml) {
        return new Response("Not Found", {
          status: 404,
          headers: {
            "Content-Type": "text/plain; charset=utf-8"
          }
        });
      }
      const username = await getCurrentUser(request, env);
      const html = withAuthNav(pageHtml, username);
      return new Response(renderPage(html), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store"
        }
      });
    }
  };
  async function hashPassword(password) {
    const encoded = new TextEncoder().encode(password);
    const digest = await crypto.subtle.digest("SHA-256", encoded);
    const bytes = Array.from(new Uint8Array(digest));
    return bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  var AuthDurableObject = class {
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
          headers: { "Content-Type": "application/json" }
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
          createdAt: Date.now()
        });
        return new Response(JSON.stringify({ token }), {
          headers: { "Content-Type": "application/json" }
        });
      }
      if (url.pathname === "/session") {
        const { token } = await request.json();
        const session = await this.state.storage.get(`session:${token}`);
        if (!session) {
          return new Response("Invalid session.", { status: 401 });
        }
        return new Response(JSON.stringify({ username: session.username }), {
          headers: { "Content-Type": "application/json" }
        });
      }
      if (url.pathname === "/logout") {
        const { token } = await request.json();
        if (token) {
          await this.state.storage.delete(`session:${token}`);
        }
        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json" }
        });
      }
      return new Response("Not Found", { status: 404 });
    }
  };
})();
