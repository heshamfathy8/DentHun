// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
   apiKey: "AIzaSyBeMojZejk00rGUQat1EdkslWKeloWpRCg",
  authDomain: "denthub-52578.firebaseapp.com",
  projectId: "denthub-52578",
  storageBucket: "denthub-52578.firebasestorage.app",
  messagingSenderId: "36728579705",
  appId: "1:36728579705:web:02ecdd7966ce5494f4d6a8",
  measurementId: "G-VJY6S0WXFH"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('📦 Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
  body: payload.notification.body,
  icon: '/assets/icons/icon-192x192.png',
  data: { 
    click_action: payload.data?.click_action 
  }
};

  self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  // خُد الداتا من الإشعار بشكل صحيح
  const url = event.notification.data?.click_action || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {

      // لو فيه نافذة مفتوحة بالفعل → اعملها focus
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }

      // لو مفيش → افتح نافذة جديدة
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
