import homeHtml from "./content.html";
import editorialsHtml from "./editorials.html";
import projectsHtml from "./projects.html";
import modsHtml from "./mods.html";
import printsHtml from "./prints.html";
import cssContent from "./style.css";

addEventListener("fetch", (event) => {
  event.respondWith(handle(event.request));
});

function renderPage(html) {
  return html.replace(/<\/head>/i, `<style>${cssContent}</style></head>`);
}

function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

async function handle(request) {
  const url = new URL(request.url);

  if (url.pathname === "/style.css") {
    return new Response(cssContent, {
      headers: {
        "Content-Type": "text/css; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }

  const routes = {
    "/": homeHtml,
    "/editorials": editorialsHtml,
    "/editorals": editorialsHtml,
    "/projects": projectsHtml,
    "/mods": modsHtml,
    "/prints": printsHtml,
  };

  const pageHtml = routes[normalizePath(url.pathname)];

  if (!pageHtml) {
    return new Response("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  return new Response(renderPage(pageHtml), {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
