<script>
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export default {
  name: "index",
  mounted() {
    navigator.serviceWorker
      .register("sw.js")
      .then(function (registration) {
        console.log("Service worker successfully registered.");
        return registration;
      })
      .catch(function (err) {
        console.error("Unable to register service worker.", err);
      });

    const firebaseConfig = {
      apiKey: "",
      authDomain: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: "",
    };

    // Initialize Firebase
    const firebase = initializeApp(firebaseConfig);
    const messaging = getMessaging(firebase);

    getToken(messaging, {
      vapidKey: "",
    })
      .then((token) => {
        console.log("해당 브라우저에서의 토큰 : ", token);
      })
      .catch((err) => {
        console.log(err);
      });

    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      if (Notification.permission === "granted") {
        navigator.serviceWorker.ready
          .then((registration) => {
            registration
              .showNotification("알림", {
                body: "블라블라",
                icon: "favicon.ico",
                vibrate: [200, 100, 200, 100, 200, 100, 200],
                tag: "vibration-sample",
              })
              .finally((arg) => console.log(arg));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("firebase-messaging-sw.js")
        .then(function (registration) {
          console.log("ServiceWorker registration successful with scope: ");
        });
    }
  },
};
</script>

<template>
  <div>Hello</div>
</template>
