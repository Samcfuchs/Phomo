self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method === 'POST' && url.pathname.endsWith('/share-target')) {
    e.respondWith((async () => {
      const file = (await e.request.formData()).get('image');
      const cache = await caches.open('share-inbox');
      await cache.put('shared-image', new Response(file, { headers: { 'Content-Type': file.type } }));
      return Response.redirect('./?shared=1', 303);
    })());
  }
});

console.log("Service worker loaded")
