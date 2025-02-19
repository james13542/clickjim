addEventListener("fetch", event => {
  event.respondWith(
    new Response(content.html, {
      headers: { "content-type": "text/html" },
    })
  );
});
