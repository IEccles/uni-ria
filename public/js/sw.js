// Define the names of the cache and the files to cache
const CACHE_NAME = 'cache:v3';
const urlsToCache = [
    '/assets/css/style.min.css',

    'https://cdn.jsdelivr.net/npm/@popperjs/core@2.11/dist/umd/popper.min.js',
    'https://cdn.jsdelivr.net/npm/tippy.js@6.3/dist/tippy.umd.min.js',
    'https://cdn.jsdelivr.net/npm/tippy.js@6.3/dist/tippy.min.css',
    'https://cdn.jsdelivr.net/npm/toastr2@3.0.0-alpha.18/dist/Toastr.umd.min.js',
    'https://cdn.jsdelivr.net/npm/toastr2@3.0.0-alpha.18/dist/toastr.min.css',

    '/errors/offline'
];

// Install a service worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache and return requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                }
                // If the request fails, show the offline page
                return fetch(event.request).catch(() => caches.match('/errors/offline'));
            })
    );
});

// Update a service worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});