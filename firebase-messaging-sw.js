importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyCgDQc7WQQZo78o0CAwdJGweaKP6x02BaM",
    authDomain: "covington-pd-cc4cb.firebaseapp.com",
    databaseURL: "https://covington-pd-cc4cb-default-rtdb.firebaseio.com",
    projectId: "covington-pd-cc4cb",
    storageBucket: "covington-pd-cc4cb.firebasestorage.app",
    messagingSenderId: "350585131681",
    appId: "1:350585131681:web:b98b322b23b6cf4135d6e0"
});

const messaging = firebase.messaging();

// Handle background notifications when the app/browser tab is closed
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message: ', payload);
    const notificationTitle = payload.notification?.title || "CPD Portal Alert";
    const notificationOptions = {
        body: payload.notification?.body || "New department update received.",
        icon: "https://cdn-icons-png.flaticon.com/512/1022/1022313.png"
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
