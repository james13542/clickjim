import htmlContent from "./content.html";
import cssContent from "./style.css";

addEventListener("fetch", (event) => {
  event.respondWith(handle(event.request));
});

const pages = {
  "/": {
    title: "Welcome to ClickJim",
    content: `
      <p>Hi, I'm James — a tech enthusiast with experience in computer hardware engineering and IT support, specializing in networking problem-solving.</p>
      <p>Explore the work categories in the top menu to browse dedicated pages for Editorial, Projects, Mods, and Prints.</p>
    `,
  },
  "/editorial": {
    title: "Editorial",
    content: `
      <p>Editorial is where I share deep-dive writeups, technical notes, and long-form perspectives on technology, design, and performance.</p>
      <p>Each article is crafted to be clear, practical, and useful for people building real things.</p>
    `,
  },
  "/projects": {
    title: "Projects",
    content: `
      <p>This page showcases active and completed project work, from embedded and systems concepts to software prototypes.</p>
      <p>Expect progress logs, outcomes, and lessons learned from each build.</p>
    `,
  },
  "/mods": {
    title: "Mods",
    content: `
      <p>The Mods page features custom upgrades and performance-focused modifications across hardware and automotive platforms.</p>
      <p>You'll find build goals, implementation details, and before/after notes for each mod.</p>
    `,
  },
  "/prints": {
    title: "Prints",
    content: `
      <p>Prints highlights digital sculpting and physical output work, including prototypes, artistic pieces, and concept iterations.</p>
      <p>Content includes process snapshots and production-ready print highlights.</p>
    `,
  },
};

function renderPage(pathname) {
  const page = pages[pathname];

  if (!page) {
    return {
      status: 404,
      title: "Page Not Found",
      content: "<p>Sorry, that page does not exist. Please use the menu to navigate to an available page.</p>",
    };
  }

  return { status: 200, title: page.title, content: page.content };
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

  const page = renderPage(url.pathname);

  const html = htmlContent
    .replace(/{{PAGE_TITLE}}/g, page.title)
    .replace("{{PAGE_CONTENT}}", page.content)
    .replace(/<\/head>/i, `<style>${cssContent}</style></head>`);

  return new Response(html, {
    status: page.status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
