(() => {
  // content.html
  var content_default = '<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>{{PAGE_TITLE}} | ClickJim</title>\n</head>\n<body>\n    <nav>\n        <ul class="dropdown">\n            <li><a href="#" aria-label="Open navigation menu">Menu \u25BC</a>\n                <ul class="dropdown-content">\n                    <li><a href="/editorial">Editorial</a></li>\n                    <li><a href="/projects">Projects</a></li>\n                    <li><a href="/mods">Mods</a></li>\n                    <li><a href="/prints">Prints</a></li>\n                </ul>\n            </li>\n        </ul>\n    </nav>\n\n    <main class="container">\n        <h1>{{PAGE_TITLE}}</h1>\n        {{PAGE_CONTENT}}\n    </main>\n\n    <footer class="business-banner">\n        <p>ClickJim Studio \u2022 Professional Creative + Technical Services \u2022 Contact: <a href="mailto:jamesdanielwalter@outlook.com">jamesdanielwalter@outlook.com</a></p>\n    </footer>\n</body>\n</html>\n';

  // style.css
  var style_default = ":root {\n    --brand-dark: #1f2732;\n    --brand-dark-2: #2d3745;\n    --brand-accent: #2563eb;\n    --text-main: #1f2937;\n    --text-muted: #4b5563;\n    --surface: #ffffff;\n    --surface-bg: #eef2f7;\n}\n\n* {\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    min-height: 100vh;\n    background-color: var(--surface-bg);\n    text-align: center;\n    color: var(--text-main);\n    display: flex;\n    flex-direction: column;\n}\n\nnav {\n    background-color: var(--brand-dark);\n    padding: 12px;\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);\n}\n\n.dropdown {\n    list-style-type: none;\n    padding: 0;\n    margin: 0;\n    display: inline-block;\n}\n\n.dropdown li {\n    position: relative;\n    display: inline-block;\n}\n\n.dropdown a {\n    text-decoration: none;\n    color: white;\n    font-weight: 600;\n    padding: 10px 20px;\n    display: block;\n}\n\n.dropdown-content {\n    display: none;\n    position: absolute;\n    left: 0;\n    background-color: var(--brand-dark-2);\n    min-width: 190px;\n    border-radius: 8px;\n    overflow: hidden;\n    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);\n    z-index: 1;\n}\n\n.dropdown-content li {\n    display: block;\n}\n\n.dropdown-content a {\n    padding: 12px;\n    color: white;\n    text-align: left;\n}\n\n.dropdown-content a:hover {\n    background-color: var(--brand-accent);\n}\n\n.dropdown li:hover .dropdown-content {\n    display: block;\n}\n\n.container {\n    flex: 1;\n    max-width: 860px;\n    margin: 48px auto;\n    background: var(--surface);\n    padding: 32px;\n    border-radius: 14px;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);\n}\n\nh1 {\n    color: #111827;\n    margin-top: 0;\n}\n\np {\n    color: var(--text-muted);\n    font-size: 18px;\n    line-height: 1.7;\n}\n\n.business-banner {\n    background: linear-gradient(90deg, var(--brand-dark), #0f172a);\n    color: #e5e7eb;\n    padding: 16px 20px;\n    font-size: 15px;\n    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);\n}\n\n.business-banner p {\n    margin: 0;\n    color: inherit;\n    font-size: inherit;\n}\n\n.business-banner a {\n    color: #93c5fd;\n    text-decoration: none;\n    font-weight: 700;\n}\n\n.business-banner a:hover {\n    text-decoration: underline;\n}\n";

  // index.js
  addEventListener("fetch", (event) => {
    event.respondWith(handle(event.request));
  });
  var pages = {
    "/": {
      title: "Welcome to ClickJim",
      content: `
      <p>Hi, I'm James \u2014 a tech enthusiast with experience in computer hardware engineering and IT support, specializing in networking problem-solving.</p>
      <p>Explore the work categories in the top menu to browse dedicated pages for Editorial, Projects, Mods, and Prints.</p>
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
  async function handle(request) {
    const url = new URL(request.url);
    if (url.pathname === "/style.css") {
      return new Response(style_default, {
        headers: {
          "Content-Type": "text/css; charset=utf-8",
          "Cache-Control": "public, max-age=3600"
        }
      });
    }
    const page = renderPage(url.pathname);
    const html = content_default.replace(/{{PAGE_TITLE}}/g, page.title).replace("{{PAGE_CONTENT}}", page.content).replace(/<\/head>/i, `<style>${style_default}</style></head>`);
    return new Response(html, {
      status: page.status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }
})();
