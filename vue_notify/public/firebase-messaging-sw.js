importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Message background received. ", payload);
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.showNotification("알림", {
          body: "블라블라",
          icon: "favicon.ico",
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: "vibration-sample",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
