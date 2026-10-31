// Service Worker: sw.js
// Handles background web push events and notification clicks

// 1. Listen for incoming push events from Supabase Edge Functions
self.addEventListener('push', (event) => {
    let data = { title: 'CPD Alert', body: 'New notification received.' };

    if (event.data) {
        try {
            data = event.data.json();
        } catch (e) {
            data.body = event.data.text();
        }
    }

    const options = {
        body: data.body || 'New department message received.',
        icon: 'https://cdn-icons-png.flaticon.com/512/1022/1022313.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/1022/1022313.png',
        vibrate: [200, 100, 200],
        data: {
            url: data.url || '/'
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'CPD Portal', options)
    );
});

// 2. Handle notification clicks (re-opens or focuses the app)
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const targetUrl = event.notification.data ? event.notification.data.url : '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // If the app tab is already open, focus it
            for (const client of clientList) {
                if (client.url.includes(targetUrl) && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not open, open a new window/tab
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});
