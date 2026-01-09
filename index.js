import htmlContent from "./content.html";
import cssContent from "./style.css";

addEventListener("fetch", (event) => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  const url = new URL(request.url);

  // Serve CSS directly if requested (optional but useful)
  if (url.pathname === "/style.css") {
    return new Response(cssContent, {
      headers: {
        "Content-Type": "text/css; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  // Inject CSS into <head> regardless of whether a <link> exists
  const html =
    htmlContent.replace(/<\/head>/i, `<style>${cssContent}</style></head>`);

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
