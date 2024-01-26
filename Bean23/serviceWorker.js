const static = "the-bean-bean23"
const assets = [
	"/",
	"/index.html",
]

self.addEventListener("fetch", fetchEvent => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then(res => {
			return res || fetch(fetchEvent.request)
		})
	)
})

self.addEventListener("install", installEvent => {
	installEvent.waitUntil(
		caches.open(static).then(cache => {
			cache.addAll(assets)
		})
	)
})

// Handle install button click
document.getElementById('install-btn').addEventListener('click', function() {
	if ('prompt' in window) {
		// Prompt the user to install the PWA
		window.prompt();
	}
});
