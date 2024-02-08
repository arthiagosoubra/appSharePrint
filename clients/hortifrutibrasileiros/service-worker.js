self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        'index.html',
        'icon.svg',
        'icon_dark.svg',
        'data.js',
        'list.js',
        'service-worker.js',
        'manifest.json',
        'https://arthiagosoubra.github.io/appSharePrint/files/style/main.css',
        'https://arthiagosoubra.github.io/appSharePrint/files/style/icons.css',
        'https://arthiagosoubra.github.io/appSharePrint/files/style/font.css',
        'https://arthiagosoubra.github.io/appSharePrint/files/style/themes.css',
        'https://arthiagosoubra.github.io/appSharePrint/files/script/jquery-3.6.4.min.js',
        'https://arthiagosoubra.github.io/appSharePrint/files/script/html2canvas.min.js',
        'https://arthiagosoubra.github.io/appSharePrint/files/script/qrcode.min.js',
        'https://arthiagosoubra.github.io/appSharePrint/files/script/jquery.vibrate.min.js',
        'https://arthiagosoubra.github.io/appSharePrint/files/script/main.js',
        'https://arthiagosoubra.github.io/appSharePrint/files/font/BHicons/BHicons.woff2',
        'https://arthiagosoubra.github.io/appSharePrint/files/font/BHicons/BHicons.ttf',
        'https://arthiagosoubra.github.io/appSharePrint/files/font/BHicons/BHicons.svg',
        'https://arthiagosoubra.github.io/appSharePrint/files/font/UbuntuMono/1.woff2',
        'https://arthiagosoubra.github.io/appSharePrint/files/font/UbuntuMono/2.woff2',
        'https://arthiagosoubra.github.io/appSharePrint/files/font/UbuntuMono/3.woff2',
        'https://arthiagosoubra.github.io/appSharePrint/files/font/UbuntuMono/4.woff2',
        'https://arthiagosoubra.github.io/appSharePrint/files/font/UbuntuMono/5.woff2',
        'https://arthiagosoubra.github.io/appSharePrint/files/font/UbuntuMono/6.woff2'
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
