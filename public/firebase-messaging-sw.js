importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyBtKprUsuuDw3ONwjcC3hnusx4_cKd2IIs",
  authDomain: "hrms-b19eb.firebaseapp.com",
  projectId: "hrms-b19eb",
  storageBucket: "hrms-b19eb.firebasestorage.app",
  messagingSenderId: "319319658224",
  appId: "1:319319658224:web:9e83d49db8d9d1141f3c35",
  measurementId: "G-7NXD45BHHM",
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
