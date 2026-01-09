(() => {
  // content.html
  var content_default = `<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Me</title>
    <!-- Stylesheet reference removed; CSS will be inlined by the Worker. -->
</head>
<body>
    <nav>
        <ul class="dropdown">
            <li><a href="#">Menu \u25BC</a>
                <ul class="dropdown-content">
                    <li><a href="#editorials">Editorials</a></li>
                    <li><a href="#projects">Projects</a></li>
                    <li><a href="#mods">Mods</a></li>
                    <li><a href="#prints">Prints</a></li>
                </ul>
            </li>
        </ul>
    </nav>
    <div class="container">
        <h1>Welcome to My Website</h1>
        <p>Hi, I'm a tech enthusiast with experience in computer hardware engineering and IT support, specializing in networking problem-solving.</p>
        <p>I have a passion for AI in embedded systems, digital sculpting, and high-performance vehicles. I engine swapped and turbocharged my Miata, so you know I'm cool!</p>
        <p>I need to make my FR-S have a motor-generator in place of the alternator to get better mpg. I'm also slowly creating a Rust-based multiplayer card game that should be on here eventually.</p>
        <p>Follow along as I document my projects and interests!</p>
    </div>
</body>
</html>
`;

  // style.css
  var style_default = "body {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 0;\n    background-color: #f4f4f4;\n    text-align: center;\n}\n\nnav {\n    background-color: #333;\n    padding: 10px;\n}\n\n.dropdown {\n    list-style-type: none;\n    padding: 0;\n    margin: 0;\n    display: inline-block;\n}\n\n.dropdown li {\n    position: relative;\n    display: inline-block;\n}\n\n.dropdown a {\n    text-decoration: none;\n    color: white;\n    padding: 10px 20px;\n    display: block;\n}\n\n.dropdown-content {\n    display: none;\n    position: absolute;\n    background-color: #444;\n    min-width: 150px;\n    box-shadow: 0px 8px 16px rgba(0,0,0,0.2);\n    z-index: 1;\n}\n\n.dropdown-content li {\n    display: block;\n}\n\n.dropdown-content a {\n    padding: 10px;\n    color: white;\n    display: block;\n}\n\n.dropdown li:hover .dropdown-content {\n    display: block;\n}\n\n.container {\n    max-width: 800px;\n    margin: 50px auto;\n    background: white;\n    padding: 20px;\n    border-radius: 10px;\n    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n}\n\nh1 {\n    color: #333;\n}\n\np {\n    color: #667;\n    font-size: 18px;\n    line-height: 1.6;\n}\n";

  // index.js
  addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    if (url.pathname.endsWith("style.css")) {
      return event.respondWith(
        new Response(style_default, {
          headers: { "Content-Type": "text/css" }
        })
      );
    }
    const html = content_default.replace(
      /<link rel="stylesheet" href="style\.css">/i,
      `<style>${style_default}</style>`
    );
    return event.respondWith(
      new Response(html, {
        headers: { "Content-Type": "text/html; charset=utf-8" }
      })
    );
  });
})();
