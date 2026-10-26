// Arjunpuri 1st Colony Management Portal - Service Worker
const CACHE_NAME = "arjunpuri-portal-v20261026_1230";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Push notification event listener
self.addEventListener("push", (event) => {
  let data = {
    title: "Arjunpuri 1st Colony Update",
    body: "New updates available on the colony portal.",
    icon: "map.jpg",
    badge: "map.jpg",
    tag: "arjunpuri-update"
  };

  if (event.data) {
    try {
      data = Object.assign(data, event.data.json());
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || "map.jpg",
    badge: data.badge || "map.jpg",
    tag: data.tag || "arjunpuri-update",
    vibrate: [200, 100, 200],
    data: {
      url: data.url || "./"
    }
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification click event handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) ? event.notification.data.url : "./";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
