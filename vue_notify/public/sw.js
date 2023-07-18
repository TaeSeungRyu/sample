self.addEventListener("install", function (event) {
  console.log("installed");
  self.skipWaiting();
});
self.addEventListener("activate", function (event) {
  console.log("activated");
  event.waitUntil(self.clients.claim());
});
