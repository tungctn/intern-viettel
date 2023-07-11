// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyCSTwgCLCMqNNlOLvyzWP_TBHHi1HpQ684",
  authDomain: "intern-viettel.firebaseapp.com",
  projectId: "intern-viettel",
  storageBucket: "intern-viettel.appspot.com",
  messagingSenderId: "314332049778",
  appId: "1:314332049778:web:9cdc6a1b0dbb7f7daaadeb",
  measurementId: "G-7CC1QQJSPH",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, {
    vapidKey: "fv6Oef_IUDJZjtwFBnXpF4qVTzwxacHIMUFtrac5YQI",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
