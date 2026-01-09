import htmlContent from "./content.html";
import cssContent from "./style.css";

addEventListener("fetch", event => {
  const html = htmlContent.replace("</head>", `<style>${cssContent}</style></head>`);
  event.respondWith(
    new Response(html, {
      headers: { "Content-Type": "text/html" }
    })
  );
});

