var GHPATH = "/Musuem-Discount-Age-Calculator"
var APP_PREFIX = "gppwa_"
var VERSION = "version_001"
var URLS = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/css/style.css`, //
  `${GHPATH}/android-chrome-512x512.png`,
  `${GHPATH}/js/script.js`,
  `${GHPATH}/images/mesumTikect.jpg`, 
  `${GHPATH}/apple-touch-icon.png`,
  `${GHPATH}/favicon-32x32.png`,
  `${GHPATH}/favicon-16x16.png`,
]

var CACHE_NAME = APP_PREFIX + VERSION

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Installing cache: " + CACHE_NAME)
      return cache.addAll(URLS)
    }).catch(function (error) {
      console.error("Cache install failed:", error)
    })
  )
})

self.addEventListener("fetch", function (e) {
  console.log("Fetch request: " + e.request.url)
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        console.log("Responding from cache: " + e.request.url)
        return request
      } else {
        console.log("Fetching from network: " + e.request.url)
        return fetch(e.request)
      }
    })
  )
})

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX) === 0
      })
      cacheWhitelist.push(CACHE_NAME)

      return Promise.all(
        keyList.map(function (key, i) {
          if (!cacheWhitelist.includes(key)) {
            console.log("Deleting cache: " + keyList[i])
            return caches.delete(keyList[i])
          }
        })
      )
    })
  )
})
