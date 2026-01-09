import htmlContent from "./content.html";
import cssContent from "./style.css";

addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  // When the browser requests the stylesheet directly, return the raw CSS with the correct content type
  if (url.pathname.endsWith("style.css")) {
    return event.respondWith(
      new Response(cssContent, {
        headers: { "Content-Type": "text/css" },
      }),
    );
  }
  // For all other requests, inline the CSS into the HTML and remove the original link element
  const html = htmlContent
    .replace(
      /<link rel="stylesheet" href="style\.css">/i,
      `<style>${cssContent}</style>`,
    );
  return event.respondWith(
    new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }),
  );
});

