(() => {
  // content.html
  var content_default = '<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>{{PAGE_TITLE}} | ClickJim</title>\n</head>\n<body>\n    <div class="pattern-bg" aria-hidden="true"></div>\n\n    <nav>\n        <div class="nav-inner">\n            <a class="home-button" href="/" aria-label="Go to homepage">\n                <img class="home-icon" src="/home-icon.svg" alt="Computer icon for home" />\n                <span>Home</span>\n            </a>\n\n            <ul class="dropdown">\n                <li><a href="#" aria-label="Open navigation menu">Menu \u25BC</a>\n                    <ul class="dropdown-content">\n                        <li><a class="menu-home-link" href="/">Home</a></li>\n                        <li><a href="/editorial">Editorial</a></li>\n                        <li><a href="/projects">Projects</a></li>\n                        <li><a href="/mods">Mods</a></li>\n                        <li><a href="/prints">Prints</a></li>\n                    </ul>\n                </li>\n            </ul>\n        </div>\n    </nav>\n\n    <main class="container">\n        <h1>{{PAGE_TITLE}}</h1>\n        {{PAGE_CONTENT}}\n    </main>\n\n    <footer class="business-banner">\n        <p>ClickJim Studio \u2022 Professional Creative + Technical Services \u2022 Contact: <a href="mailto:jamesdanielwalter@outlook.com">jamesdanielwalter@outlook.com</a></p>\n    </footer>\n</body>\n</html>\n';

  // style.css
  var style_default = ":root {\n    --brand-dark: #1f2732;\n    --brand-dark-2: #2d3745;\n    --brand-accent: #2563eb;\n    --text-main: #1f2937;\n    --text-muted: #4b5563;\n    --surface: #ffffff;\n    --surface-bg: #0a2018;\n}\n\n* {\n    box-sizing: border-box;\n}\n\nbody {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    min-height: 100vh;\n    background-color: var(--surface-bg);\n    text-align: center;\n    color: var(--text-main);\n    display: flex;\n    flex-direction: column;\n    position: relative;\n    overflow-x: hidden;\n}\n\n.pattern-bg {\n    position: fixed;\n    inset: 0;\n    z-index: 0;\n    background:\n        radial-gradient(circle at 20% 20%, rgba(74, 222, 128, 0.45), transparent 42%),\n        radial-gradient(circle at 75% 35%, rgba(22, 163, 74, 0.45), transparent 48%),\n        radial-gradient(circle at 60% 85%, rgba(134, 239, 172, 0.35), transparent 45%),\n        repeating-linear-gradient(45deg, rgba(52, 211, 153, 0.12) 0 2px, transparent 2px 16px),\n        #082019;\n    background-size: 180% 180%, 160% 160%, 140% 140%, 100% 100%, 100% 100%;\n    animation: flowPattern 16s ease-in-out infinite alternate;\n}\n\n@keyframes flowPattern {\n    0% {\n        background-position: 0% 0%, 100% 0%, 50% 100%, 0 0, 0 0;\n        filter: hue-rotate(0deg);\n    }\n    100% {\n        background-position: 100% 100%, 0% 100%, 40% 0%, 80px 80px, 0 0;\n        filter: hue-rotate(12deg);\n    }\n}\n\nnav,\n.container,\n.business-banner {\n    position: relative;\n    z-index: 1;\n}\n\nnav {\n    background-color: rgba(16, 24, 39, 0.9);\n    padding: 12px;\n    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);\n    backdrop-filter: blur(4px);\n}\n\n.nav-inner {\n    width: min(980px, calc(100% - 16px));\n    margin: 0 auto;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n.home-button {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    color: white;\n    text-decoration: none;\n    font-weight: 700;\n    padding: 6px 10px;\n    border-radius: 10px;\n    background: rgba(255, 255, 255, 0.08);\n    border: 1px solid rgba(255, 255, 255, 0.18);\n}\n\n.home-button:hover {\n    background: rgba(255, 255, 255, 0.18);\n}\n\n.home-icon {\n    width: 64px;\n    height: 32px;\n    display: block;\n    object-fit: contain;\n}\n\n.dropdown {\n    list-style-type: none;\n    padding: 0;\n    margin: 0;\n    display: inline-block;\n}\n\n.dropdown li {\n    position: relative;\n    display: inline-block;\n}\n\n.dropdown a {\n    text-decoration: none;\n    color: white;\n    font-weight: 600;\n    padding: 10px 20px;\n    display: block;\n}\n\n.dropdown-content {\n    display: none;\n    position: absolute;\n    right: 0;\n    background-color: var(--brand-dark-2);\n    min-width: 190px;\n    border-radius: 8px;\n    overflow: hidden;\n    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);\n    z-index: 1;\n}\n\n.dropdown-content li {\n    display: block;\n}\n\n.dropdown-content a {\n    padding: 12px;\n    color: white;\n    text-align: left;\n}\n\n.dropdown-content a:hover {\n    background-color: var(--brand-accent);\n}\n\n\n.menu-home-link {\n    font-weight: 700;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2);\n}\n\n.dropdown li:hover .dropdown-content,\n.dropdown li:focus-within .dropdown-content {\n    display: block;\n}\n\n.container {\n    flex: 1;\n    width: min(860px, calc(100% - 28px));\n    margin: 48px auto;\n    background: rgba(255, 255, 255, 0.95);\n    padding: 32px;\n    border-radius: 14px;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);\n}\n\nh1 {\n    color: #111827;\n    margin-top: 0;\n}\n\np {\n    color: var(--text-muted);\n    font-size: 18px;\n    line-height: 1.7;\n}\n\n.business-banner {\n    background: linear-gradient(90deg, var(--brand-dark), #0f172a);\n    color: #e5e7eb;\n    padding: 16px 20px;\n    font-size: 15px;\n    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);\n}\n\n.business-banner p {\n    margin: 0;\n    color: inherit;\n    font-size: inherit;\n}\n\n.business-banner a {\n    color: #93c5fd;\n    text-decoration: none;\n    font-weight: 700;\n}\n\n.business-banner a:hover {\n    text-decoration: underline;\n}\n\n@media (max-width: 640px) {\n    .home-icon {\n        width: 52px;\n        height: 26px;\n    }\n\n    .home-button span {\n        font-size: 14px;\n    }\n\n    .container {\n        padding: 24px;\n    }\n}\n";

  // home-icon.svg
  var home_icon_default = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1126 636" role="img" aria-label="Computer tower and monitor with chip icon">\n  <rect width="1126" height="636" fill="#efefef"/>\n\n  <!-- Tower -->\n  <rect x="58" y="65" width="290" height="520" rx="34" fill="#0f1114"/>\n  <rect x="95" y="140" width="215" height="34" rx="9" fill="#efefef"/>\n  <rect x="95" y="205" width="215" height="34" rx="9" fill="#efefef"/>\n  <circle cx="203" cy="402" r="24" fill="#efefef"/>\n  <rect x="170" y="500" width="66" height="20" rx="10" fill="#efefef"/>\n\n  <!-- Monitor frame -->\n  <rect x="420" y="55" width="640" height="430" rx="36" fill="#0f1114"/>\n  <rect x="454" y="88" width="572" height="360" rx="18" fill="#efefef"/>\n\n  <!-- Chip body -->\n  <rect x="634" y="190" width="212" height="212" rx="36" fill="#0f1114"/>\n  <rect x="675" y="231" width="130" height="130" rx="12" fill="#efefef"/>\n  <rect x="709" y="265" width="62" height="62" rx="6" fill="#0f1114"/>\n\n  <!-- Chip pins top -->\n  <rect x="658" y="140" width="22" height="58" rx="11" fill="#0f1114"/>\n  <rect x="709" y="140" width="22" height="58" rx="11" fill="#0f1114"/>\n  <rect x="760" y="140" width="22" height="58" rx="11" fill="#0f1114"/>\n  <rect x="811" y="140" width="22" height="58" rx="11" fill="#0f1114"/>\n\n  <!-- Chip pins bottom -->\n  <rect x="658" y="394" width="22" height="58" rx="11" fill="#0f1114"/>\n  <rect x="709" y="394" width="22" height="58" rx="11" fill="#0f1114"/>\n  <rect x="760" y="394" width="22" height="58" rx="11" fill="#0f1114"/>\n  <rect x="811" y="394" width="22" height="58" rx="11" fill="#0f1114"/>\n\n  <!-- Chip pins left -->\n  <rect x="572" y="214" width="58" height="20" rx="10" fill="#0f1114"/>\n  <rect x="572" y="262" width="58" height="20" rx="10" fill="#0f1114"/>\n  <rect x="572" y="310" width="58" height="20" rx="10" fill="#0f1114"/>\n  <rect x="572" y="358" width="58" height="20" rx="10" fill="#0f1114"/>\n\n  <!-- Chip pins right -->\n  <rect x="850" y="214" width="58" height="20" rx="10" fill="#0f1114"/>\n  <rect x="850" y="262" width="58" height="20" rx="10" fill="#0f1114"/>\n  <rect x="850" y="310" width="58" height="20" rx="10" fill="#0f1114"/>\n  <rect x="850" y="358" width="58" height="20" rx="10" fill="#0f1114"/>\n\n  <!-- Monitor stand -->\n  <path d="M710 486h68v74h-68z" fill="#0f1114"/>\n  <rect x="580" y="560" width="328" height="40" rx="20" fill="#0f1114"/>\n</svg>\n';

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
  var aliases = {
    "/home": "/",
    "/index.html": "/",
    "/editorials": "/editorial",
    "/project": "/projects",
    "/mod": "/mods",
    "/print": "/prints"
  };
  function normalizePath(pathname) {
    let path = pathname || "/";
    try {
      path = decodeURIComponent(path);
    } catch (_error) {
    }
    path = path.toLowerCase();
    if (path.length > 1 && path.endsWith("/")) {
      path = path.replace(/\/+$/, "");
    }
    return aliases[path] || path;
  }
  function renderPage(pathname) {
    const normalizedPath = normalizePath(pathname);
    const page = pages[normalizedPath];
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
    if (url.pathname === "/home-icon.svg") {
      return new Response(home_icon_default, {
        headers: {
          "Content-Type": "image/svg+xml; charset=utf-8",
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
