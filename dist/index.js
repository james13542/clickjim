(() => {
  // content.html
  var content_default = '<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>ClickJim</title>\n    <link rel="stylesheet" href="/style.css">\n</head>\n<body>\n    <nav>\n        <ul class="dropdown">\n            <li><a href="#">Menu \u25BC</a>\n                <ul class="dropdown-content">\n                    <li><a href="#editorials">Editorials</a></li>\n                    <li><a href="#projects">Projects</a></li>\n                    <li><a href="#mods">Mods</a></li>\n                    <li><a href="#prints">Prints</a></li>\n                </ul>\n            </li>\n        </ul>\n    </nav>\n\n    <main class="container">\n        <section class="intro" id="top">\n            <h1>Welcome to ClickJim</h1>\n            <p>Technology, design, and creative development presented with a professional editorial approach.</p>\n        </section>\n\n        <section id="editorials" class="content-section">\n            <h2>Editorials</h2>\n            <p>Long-form stories, deep dives, and thoughtful commentary on innovation, engineering, and digital craftsmanship.</p>\n        </section>\n\n        <section id="projects" class="content-section">\n            <h2>Projects</h2>\n            <p>Hands-on builds and technical experiments, from software and embedded ideas to mechanical problem-solving.</p>\n        </section>\n\n        <section id="mods" class="content-section">\n            <h2>Mods</h2>\n            <p>Performance and customization logs covering practical modifications, improvements, and lessons learned.</p>\n        </section>\n\n        <section id="prints" class="content-section">\n            <h2>Prints</h2>\n            <p>Selected visual work and print-ready creations that combine precision, aesthetics, and storytelling.</p>\n        </section>\n    </main>\n\n    <footer class="business-banner">\n        <div class="banner-content">\n            <strong>ClickJim Studio</strong>\n            <span>Professional editorial, project, and creative services.</span>\n            <a href="mailto:jamesdanielwalter@outlook.com">jamesdanielwalter@outlook.com</a>\n        </div>\n    </footer>\n</body>\n</html>\n';

  // style.css
  var style_default = "body {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 0;\n    background: linear-gradient(180deg, #f4f6fa 0%, #edf1f7 100%);\n    color: #1f2937;\n    text-align: center;\n}\n\nhtml {\n    scroll-behavior: smooth;\n}\n\nnav {\n    background-color: #1f2937;\n    padding: 12px;\n    position: sticky;\n    top: 0;\n    z-index: 10;\n}\n\n.dropdown {\n    list-style-type: none;\n    padding: 0;\n    margin: 0;\n    display: inline-block;\n}\n\n.dropdown li {\n    position: relative;\n    display: inline-block;\n}\n\n.dropdown a {\n    text-decoration: none;\n    color: #fff;\n    padding: 10px 20px;\n    display: block;\n    font-weight: 600;\n}\n\n.dropdown-content {\n    display: none;\n    position: absolute;\n    background-color: #111827;\n    min-width: 180px;\n    border-radius: 8px;\n    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);\n    z-index: 1;\n}\n\n.dropdown-content li {\n    display: block;\n}\n\n.dropdown-content a {\n    padding: 12px;\n    color: #f9fafb;\n    display: block;\n    text-align: left;\n}\n\n.dropdown-content a:hover {\n    background-color: #374151;\n    border-radius: 8px;\n}\n\n.dropdown li:hover .dropdown-content {\n    display: block;\n}\n\n.container {\n    max-width: 900px;\n    margin: 40px auto 120px;\n    background: #fff;\n    padding: 32px;\n    border-radius: 14px;\n    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);\n}\n\n.intro p {\n    margin-bottom: 28px;\n}\n\n.content-section {\n    padding: 24px 0;\n    border-top: 1px solid #e5e7eb;\n}\n\nh1, h2 {\n    color: #111827;\n}\n\nh2 {\n    margin-bottom: 10px;\n}\n\np {\n    color: #4b5563;\n    font-size: 18px;\n    line-height: 1.6;\n    margin: 0 auto;\n    max-width: 700px;\n}\n\n.business-banner {\n    position: fixed;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: #111827;\n    color: #f9fafb;\n    padding: 12px 16px;\n    border-top: 3px solid #2563eb;\n}\n\n.banner-content {\n    max-width: 1100px;\n    margin: 0 auto;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    gap: 14px;\n    flex-wrap: wrap;\n    font-size: 14px;\n}\n\n.business-banner a {\n    color: #93c5fd;\n    text-decoration: none;\n    font-weight: 700;\n}\n\n.business-banner a:hover {\n    text-decoration: underline;\n}\n";

  // index.js
  addEventListener("fetch", (event) => {
    event.respondWith(handle(event.request));
  });
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
    const html = content_default.replace(/<\/head>/i, `<style>${style_default}</style></head>`);
    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }
})();
