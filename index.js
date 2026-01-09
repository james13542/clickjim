import htmlContent from "./content.html";
import cssContent from "./style.css";

addEventListener("fetch", (event) => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  const url = new URL(request.url);

  // Optional: allow /style.css to be fetched directly
  if (url.pathname === "/style.css") {
    return new Response(cssContent, {
      headers: { "Content-Type": "text/css; charset=utf-8" },
    });
  }

  // Always inject CSS
  const html = htmlContent.replace(
    /<\/head>/i,
    `<style>${cssContent}</style></head>`
  );

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
