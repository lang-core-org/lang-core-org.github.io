/*framework by me, cowork with Cluade, Deepseek
a simple service worker:
1. fetch and cache if online
2. used cache if offline
usage step:
1. in the html:
<script src="https://lang-core.org/cache.js"></script>

2. in the same dir of html before:
   a. create cache.js
   b. write the following line:
importScripts("https://lang-core.org/cache.js");

*/
if(typeof document === "undefined"){
  //worker
  function fetch_resource(cache,request){
    if(request.method !== "GET"){
       //fetch, no chache
       return fetch(request);
    }else if(navigator.onLine === true){
      //online, fetch and cache
      return fetch(request).then(
        (content) => {
          cache.put(request, content.clone());
          return content;
        }
      );
    }else{
      //offline, use cache
      return cache.match(request);
    }
  }
  
  function fetch_agent(resource){
    resource.respondWith(
      caches.open("cache").then(
        (cache) => fetch_resource(
          cache,
          resource.request
        )
      )
    );
  }

  self.addEventListener("fetch", fetch_agent);
  
}else{
  //document
  navigator.serviceWorker?.register('cache.js');
}
