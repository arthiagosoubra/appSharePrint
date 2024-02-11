self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('the-cache').then((cache) => {
      return cache.addAll([
        'index.html',
        'list.js',

        'https://arthiagosoubra.github.io/appSharePrint/clients/ifruts/icon.svg',
        'https://arthiagosoubra.github.io/appSharePrint/clients/ifruts/icon_dark.svg',
        'https://arthiagosoubra.github.io/appSharePrint/clients/ifruts/data.js',

        'https://arthiagosoubra.github.io/appSharePrint/files/styles.css',
        'https://arthiagosoubra.github.io/appSharePrint/files/jquery-3.6.4.min.js',
        'https://arthiagosoubra.github.io/appSharePrint/files/dependences.js',
        'https://arthiagosoubra.github.io/appSharePrint/files/scripts.js',

        'https://arthiagosoubra.github.io/appSharePrint/files/fonts/BHicons/BHicons.woff2',
        'https://arthiagosoubra.github.io/appSharePrint/files/fonts/BHicons/BHicons.ttf',
        'https://arthiagosoubra.github.io/appSharePrint/files/fonts/BHicons/BHicons.svg',

        'https://arthiagosoubra.github.io/appSharePrint/files/fonts/UbuntuMono/1.woff2',
        'https://arthiagosoubra.github.io/appSharePrint/files/fonts/UbuntuMono/2.woff2',
        'https://arthiagosoubra.github.io/appSharePrint/files/fonts/UbuntuMono/3.woff2',
        'https://arthiagosoubra.github.io/appSharePrint/files/fonts/UbuntuMono/4.woff2',
        'https://arthiagosoubra.github.io/appSharePrint/files/fonts/UbuntuMono/5.woff2',
        'https://arthiagosoubra.github.io/appSharePrint/files/fonts/UbuntuMono/6.woff2'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
      caches.keys().then(function(cacheNames) {
          return Promise.all(
              cacheNames.filter(function(cacheName) {
                  return true;
              }).map(function(cacheName) {
                  return caches.delete(cacheName);
              })
          );
      })
  );
});
