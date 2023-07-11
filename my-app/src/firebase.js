import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

export const firebaseConfig = {
  apiKey: "AIzaSyCSTwgCLCMqNNlOLvyzWP_TBHHi1HpQ684",
  authDomain: "intern-viettel.firebaseapp.com",
  projectId: "intern-viettel",
  storageBucket: "intern-viettel.appspot.com",
  messagingSenderId: "314332049778",
  appId: "1:314332049778:web:9cdc6a1b0dbb7f7daaadeb",
  measurementId: "G-7CC1QQJSPH",
};

function requestPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BGYx5H66ngB93twzn9YDICF6YzzTxIrqpqyvaCxJcYjfqpfooXVo3vjezPzBoeXg5ITx-rAqn14cXHuJQbJzQXo",
      }).then((currentToken) => {
        if (currentToken) {
          console.log(currentToken);
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
        }
      });
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
}

requestPermission();

export const requestForToken = () => {
  const messaging = getMessaging();
  return getToken(messaging, {
    vapidKey:
      "BGYx5H66ngB93twzn9YDICF6YzzTxIrqpqyvaCxJcYjfqpfooXVo3vjezPzBoeXg5ITx-rAqn14cXHuJQbJzQXo",
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

export const app = initializeApp(firebaseConfig);
