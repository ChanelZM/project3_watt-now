var CACHE_NAME = 'watt-now-cache-v1';
var CACHE_PAGES_NAME = 'watt-now-pages';

var pageCache = [
    '/',
    '/css/style.css',
    '/html/offline.html'
];


//Create cache when serviceworker is being installed.
self.addEventListener('install', function(event){
    event.waitUntil(
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

                return cachePage(request, response);

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


function fetchCoreFile(url){
    return caches.open(CACHE_NAME)
    .then(function(cache){
        return cache.match(url);
    })
    .then(function(response){
        return response ? response : Promise.reject();
    });
}

function getCachedPage(request){
    return caches.open(CACHE_PAGES_NAME)
    .then(function(cache){
        return cache.match(request);
    })
    .then(function(response){
        return response ? response : Promise.reject();
    });
}

function cachePage(request, response){
    var clonedResponse = response.clone();
    caches.open(CACHE_PAGES_NAME)
    .then(function(cache){
        return cache.put(request, clonedResponse);
    });
    return response;
}
