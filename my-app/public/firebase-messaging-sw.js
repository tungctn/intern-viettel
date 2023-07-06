importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCSTwgCLCMqNNlOLvyzWP_TBHHi1HpQ684",
  authDomain: "intern-viettel.firebaseapp.com",
  projectId: "intern-viettel",
  storageBucket: "intern-viettel.appspot.com",
  messagingSenderId: "314332049778",
  appId: "1:314332049778:web:9cdc6a1b0dbb7f7daaadeb",
  measurementId: "G-7CC1QQJSPH",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
