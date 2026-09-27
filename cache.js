/*framework by me, cowork with Cluade
a simple service worker:
1. fetch and cache if online
2. used cache if offline
usage step:
1. in the html:
<script src="lang-core.org/cache.js"></script>
2. in the same dir of html before:
   a. create cache.js
   b. write the following line:
     importScripts("https://lang-core.org/cache.js");
}
*/
if(typeof document === "undefined"){
  //worker
  function fetch_resource(cache,url){
    if(navigator.onLine === true){
      //online,fetch and cache
      return fetch(url).then(
        (content) => {
          cache.put(url, content.clone());
          return content;
        }
      );
    }else{
      //offline, use cache
      return cache.match(url);
    }
  }
  
  function fetch_agent(resource){
    resource.respondWith(
      caches.open("cache").then(
        (cache) => fetch_resource(
          cache,
          event.request
        )
      )
    );
  }

  self.addEventListener("fetch", fetch_agent);
  
}else{
  //document
  navigator.serviceWorker?.register('cache.js');
}
