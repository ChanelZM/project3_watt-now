var CACHE_NAME = 'watt-now-cache-v1';
var pageCache = [
    '/',
    '/css/style.css',
    '/html/offline.html'
];

self.addEventListener('install', function(event){
    eveny.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache){
            return cache.addAll(pageCache);
        }).then(self.skipWaiting()));
});

self.addEventListener('fetch'), function(event){
    var request = event.request;
    if(request.mode === 'navigate'){
        event.respondWith(
            fetch(request)
            .then(function(response){
                return cachePage(request, response));
            })
            .catch(function(err){
                return getCachedRequest(request);
            })
            .catch(function(err){
                return fetchCoreFile('/html/offline.html');
            })
        )
    } else {
        event.respondWith(
            fetch(request)
            .catch(function(err){
                return fetchCoreFile(request.url);
            })
            .catch(function(err){
                return fetchCoreFile('/html/offline.html');
            })
        );
    }
});
