// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
 apiKey: "AIzaSyDlvoBcww7ykAepqIpU2Dl6Kk330OlGD7w",
  authDomain: "denthub-d6def.firebaseapp.com",
  projectId: "denthub-d6def",
  storageBucket: "denthub-d6def.firebasestorage.app",
  messagingSenderId: "645591146559",
  appId: "1:645591146559:web:cf14218216f500948cd88a",
  measurementId: "G-J6KNE0SL4X"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('📦 Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/icons/icon-192x192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
