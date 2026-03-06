(() => {
  // content.html
  var content_default = '<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>ClickJim</title>\n    <link rel="stylesheet" href="/style.css">\n</head>\n<body>\n    <nav>\n        <a class="home-link" href="/">ClickJim</a>\n        <ul class="dropdown">\n            <li><a href="#">Menu \u25BC</a>\n                <ul class="dropdown-content">\n                    <li><a href="/editorials">Editorials</a></li>\n                    <li><a href="/projects">Projects</a></li>\n                    <li><a href="/mods">Mods</a></li>\n                    <li><a href="/prints">Prints</a></li>\n                </ul>\n            </li>\n        </ul>\n    </nav>\n\n    <main class="container">\n        <section class="intro">\n            <h1>Welcome to ClickJim</h1>\n            <p>A professional creative and technical studio site.</p>\n            <p>Use the top menu to browse Editorials, Projects, Mods, and Prints as separate pages.</p>\n        </section>\n    </main>\n\n    <footer class="business-banner">\n        <div class="banner-content">\n            <strong>ClickJim Studio</strong>\n            <span>Professional editorial, project, and creative services.</span>\n            <a href="mailto:jamesdanielwalter@outlook.com">jamesdanielwalter@outlook.com</a>\n        </div>\n    </footer>\n</body>\n</html>\n';

  // editorials.html
  var editorials_default = '<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Editorials | ClickJim</title>\n    <link rel="stylesheet" href="/style.css">\n</head>\n<body>\n    <nav>\n        <a class="home-link" href="/">ClickJim</a>\n        <ul class="dropdown">\n            <li><a href="#">Menu \u25BC</a>\n                <ul class="dropdown-content">\n                    <li><a href="/editorials">Editorials</a></li>\n                    <li><a href="/projects">Projects</a></li>\n                    <li><a href="/mods">Mods</a></li>\n                    <li><a href="/prints">Prints</a></li>\n                </ul>\n            </li>\n        </ul>\n    </nav>\n\n    <main class="container">\n        <section class="content-section single-page">\n            <h1>Editorials</h1>\n            <p>Long-form insights, thought pieces, and technical commentary from ClickJim.</p>\n        </section>\n    </main>\n\n    <footer class="business-banner">\n        <div class="banner-content">\n            <strong>ClickJim Studio</strong>\n            <span>Professional editorial, project, and creative services.</span>\n            <a href="mailto:jamesdanielwalter@outlook.com">jamesdanielwalter@outlook.com</a>\n        </div>\n    </footer>\n</body>\n</html>\n';

  // projects.html
  var projects_default = '<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Projects | ClickJim</title>\n    <link rel="stylesheet" href="/style.css">\n</head>\n<body>\n    <nav>\n        <a class="home-link" href="/">ClickJim</a>\n        <ul class="dropdown">\n            <li><a href="#">Menu \u25BC</a>\n                <ul class="dropdown-content">\n                    <li><a href="/editorials">Editorials</a></li>\n                    <li><a href="/projects">Projects</a></li>\n                    <li><a href="/mods">Mods</a></li>\n                    <li><a href="/prints">Prints</a></li>\n                </ul>\n            </li>\n        </ul>\n    </nav>\n\n    <main class="container">\n        <section class="content-section single-page">\n            <h1>Projects</h1>\n            <p>Hands-on software, embedded, and build projects documented with practical detail.</p>\n        </section>\n    </main>\n\n    <footer class="business-banner">\n        <div class="banner-content">\n            <strong>ClickJim Studio</strong>\n            <span>Professional editorial, project, and creative services.</span>\n            <a href="mailto:jamesdanielwalter@outlook.com">jamesdanielwalter@outlook.com</a>\n        </div>\n    </footer>\n</body>\n</html>\n';

  // mods.html
  var mods_default = '<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Mods | ClickJim</title>\n    <link rel="stylesheet" href="/style.css">\n</head>\n<body>\n    <nav>\n        <a class="home-link" href="/">ClickJim</a>\n        <ul class="dropdown">\n            <li><a href="#">Menu \u25BC</a>\n                <ul class="dropdown-content">\n                    <li><a href="/editorials">Editorials</a></li>\n                    <li><a href="/projects">Projects</a></li>\n                    <li><a href="/mods">Mods</a></li>\n                    <li><a href="/prints">Prints</a></li>\n                </ul>\n            </li>\n        </ul>\n    </nav>\n\n    <main class="container">\n        <section class="content-section single-page">\n            <h1>Mods</h1>\n            <p>Modification logs, upgrades, and performance-focused refinement work.</p>\n        </section>\n    </main>\n\n    <footer class="business-banner">\n        <div class="banner-content">\n            <strong>ClickJim Studio</strong>\n            <span>Professional editorial, project, and creative services.</span>\n            <a href="mailto:jamesdanielwalter@outlook.com">jamesdanielwalter@outlook.com</a>\n        </div>\n    </footer>\n</body>\n</html>\n';

  // prints.html
  var prints_default = '<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Prints | ClickJim</title>\n    <link rel="stylesheet" href="/style.css">\n</head>\n<body>\n    <nav>\n        <a class="home-link" href="/">ClickJim</a>\n        <ul class="dropdown">\n            <li><a href="#">Menu \u25BC</a>\n                <ul class="dropdown-content">\n                    <li><a href="/editorials">Editorials</a></li>\n                    <li><a href="/projects">Projects</a></li>\n                    <li><a href="/mods">Mods</a></li>\n                    <li><a href="/prints">Prints</a></li>\n                </ul>\n            </li>\n        </ul>\n    </nav>\n\n    <main class="container">\n        <section class="content-section single-page">\n            <h1>Prints</h1>\n            <p>Print-ready visual work built to blend clarity, aesthetics, and professional polish.</p>\n        </section>\n    </main>\n\n    <footer class="business-banner">\n        <div class="banner-content">\n            <strong>ClickJim Studio</strong>\n            <span>Professional editorial, project, and creative services.</span>\n            <a href="mailto:jamesdanielwalter@outlook.com">jamesdanielwalter@outlook.com</a>\n        </div>\n    </footer>\n</body>\n</html>\n';

  // style.css
  var style_default = "body {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 0;\n    background: linear-gradient(180deg, #f4f6fa 0%, #edf1f7 100%);\n    color: #1f2937;\n    text-align: center;\n}\n\nhtml {\n    scroll-behavior: smooth;\n}\n\nnav {\n    background-color: #1f2937;\n    padding: 12px 18px;\n    position: sticky;\n    top: 0;\n    z-index: 10;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 20px;\n}\n\n\n.home-link {\n    color: #fff;\n    text-decoration: none;\n    font-weight: 700;\n    letter-spacing: 0.3px;\n}\n\n.home-link:hover {\n    color: #93c5fd;\n}\n\n.dropdown {\n    list-style-type: none;\n    padding: 0;\n    margin: 0;\n    display: inline-block;\n}\n\n.dropdown li {\n    position: relative;\n    display: inline-block;\n}\n\n.dropdown a {\n    text-decoration: none;\n    color: #fff;\n    padding: 10px 20px;\n    display: block;\n    font-weight: 600;\n}\n\n.dropdown-content {\n    display: none;\n    position: absolute;\n    background-color: #111827;\n    min-width: 180px;\n    border-radius: 8px;\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);\n    z-index: 1;\n}\n\n.dropdown-content li {\n    display: block;\n}\n\n.dropdown-content a {\n    padding: 12px;\n    color: #f9fafb;\n    display: block;\n    text-align: left;\n}\n\n.dropdown-content a:hover {\n    background-color: #374151;\n    border-radius: 8px;\n}\n\n.dropdown li:hover .dropdown-content {\n    display: block;\n}\n\n.dropdown li:focus-within .dropdown-content {\n    display: block;\n}\n\n.container {\n    max-width: 900px;\n    margin: 40px auto 120px;\n    background: #fff;\n    padding: 32px;\n    border-radius: 14px;\n    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);\n}\n\n.intro p {\n    margin-bottom: 28px;\n}\n\n.content-section {\n    padding: 24px 0;\n    border-top: 1px solid #e5e7eb;\n}\n\nh1, h2 {\n    color: #111827;\n}\n\nh2 {\n    margin-bottom: 10px;\n}\n\np {\n    color: #4b5563;\n    font-size: 18px;\n    line-height: 1.6;\n    margin: 0 auto;\n    max-width: 700px;\n}\n\n.business-banner {\n    position: fixed;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #111827;\n    color: #f9fafb;\n    padding: 12px 16px;\n    border-top: 3px solid #2563eb;\n}\n\n.banner-content {\n    max-width: 1100px;\n    margin: 0 auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 14px;\n    flex-wrap: wrap;\n    font-size: 14px;\n}\n\n.business-banner a {\n    color: #93c5fd;\n    text-decoration: none;\n    font-weight: 700;\n}\n\n.business-banner a:hover {\n    text-decoration: underline;\n}\n\n\n.single-page {\n    border-top: 0;\n    padding-top: 0;\n}\n\n.auth-controls {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n}\n\n.auth-link,\n.auth-button {\n    background: #2563eb;\n    color: #fff;\n    text-decoration: none;\n    border: none;\n    border-radius: 8px;\n    padding: 8px 14px;\n    font-weight: 600;\n    cursor: pointer;\n}\n\n.auth-link:hover,\n.auth-button:hover {\n    background: #1d4ed8;\n}\n\n.auth-button.secondary {\n    background: #4b5563;\n}\n\n.auth-button.secondary:hover {\n    background: #374151;\n}\n\n.auth-user {\n    color: #e5e7eb;\n    font-size: 14px;\n}\n\n.logout-form {\n    margin: 0;\n}\n\n.auth-section {\n    max-width: 540px;\n    margin: 0 auto;\n}\n\n.auth-form {\n    display: flex;\n    flex-direction: column;\n    gap: 14px;\n    margin-top: 18px;\n}\n\n.auth-form label {\n    display: flex;\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 6px;\n    text-align: left;\n    color: #374151;\n    font-weight: 600;\n}\n\n.auth-form input {\n    width: 100%;\n    box-sizing: border-box;\n    padding: 10px 12px;\n    border: 1px solid #d1d5db;\n    border-radius: 8px;\n    font-size: 16px;\n}\n\n.auth-actions {\n    display: flex;\n    gap: 10px;\n    flex-wrap: wrap;\n}\n\n.auth-error {\n    color: #b91c1c;\n    font-weight: 700;\n    margin-top: 12px;\n}\n";

  // index.js
  function renderPage(html) {
    return html.replace(/<\/head>/i, `<style>${style_default}</style></head>`);
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
  function authNavHtml(username) {
    if (username) {
      return `
      <div class="auth-controls">
        <span class="auth-user">Signed in as ${username}</span>
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
    const errorBlock = errorMessage ? `<p class="auth-error">${errorMessage}</p>` : "";
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
            <li><a href="#">Menu \u25BC</a>
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
      body: JSON.stringify({ token: sessionToken })
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
        status: 400
      });
    }
    const stub = env.AUTH_DO.get(env.AUTH_DO.idFromName("global-auth"));
    if (action === "register") {
      const registerRes = await stub.fetch("https://auth.internal/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!registerRes.ok) {
        const msg = await registerRes.text();
        return new Response(renderPage(loginPageHtml(msg || "Registration failed.")), {
          headers: { "Content-Type": "text/html; charset=utf-8" },
          status: 400
        });
      }
    }
    const loginRes = await stub.fetch("https://auth.internal/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (!loginRes.ok) {
      const msg = await loginRes.text();
      return new Response(renderPage(loginPageHtml(msg || "Login failed.")), {
        headers: { "Content-Type": "text/html; charset=utf-8" },
        status: 401
      });
    }
    const { token } = await loginRes.json();
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie": `clickjim_session=${encodeURIComponent(token)}; HttpOnly; Secure; Path=/; SameSite=Lax; Max-Age=604800`
      }
    });
  }
  async function handleLogout(request, env) {
    const token = getCookie(request, "clickjim_session");
    if (token) {
      const stub = env.AUTH_DO.get(env.AUTH_DO.idFromName("global-auth"));
      await stub.fetch("https://auth.internal/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });
    }
    return new Response(null, {
      status: 302,
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
