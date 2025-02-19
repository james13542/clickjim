import htmlContent from "./content.html";

addEventListener("fetch", event => {
  event.respondWith(
    new Response(htmlContent, {
      headers: { "Content-Type": "text/html" }
    })
  );
});

