const staticStore = "store-13-may-23"
const assets = [
	"/",
	"/index.html",
	"/books",
	"/notes",
	"/apps.html",
	"/books.html",
	"/header.jpg",
	"/ProductSans-Light.tff",
	"/script.js",
	"/serviceWorker.js",
	"/style.css",
	'/websites.html'
]

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(
		caches.open(staticStore).then(cache => {
			cache.addAll(assets)
		})
	)
})

self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request)
		})
	)
})
