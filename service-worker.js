const CACHE_NAME = 'site-cache-v1';
const urlsToCache = [
    '/index.html',
    '/about.html',
    '/app.js',
    '/confirmation.html',
    '/contact.html',
    '/foto.jpg',
    '/image.jpg',
    '/aboutoffline.html',
    '/Logo192.png',
    '/Logo512.png',
    '/manifest.json',
    '/style.css',
    '/offline.html'
];

// Instal service worker dan caching aset-aset
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Cache terbuka');
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
                .catch(error => console.error('Gagal melakukan caching: ', error));
        })
    );
});

// Aktifkan service worker dan hapus cache lama
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('Menghapus cache lama:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
        .then(() => self.clients.claim())
    );
});

// Ambil aset dari cache, dan selalu tampilkan offline.html jika tidak ada koneksi
self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url); // Log setiap permintaan fetch
    event.respondWith(
        fetch(event.request).catch(() => {
            // Jika fetch gagal (misalnya offline), tampilkan halaman offline
            console.log('Fetch gagal, menampilkan offline.html'); // Log saat fetch gagal
            return caches.match('/offline.html'); // Tampilkan halaman offline
        })
    );
});
