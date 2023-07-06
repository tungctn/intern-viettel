// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSTwgCLCMqNNlOLvyzWP_TBHHi1HpQ684",
  authDomain: "intern-viettel.firebaseapp.com",
  projectId: "intern-viettel",
  storageBucket: "intern-viettel.appspot.com",
  messagingSenderId: "314332049778",
  appId: "1:314332049778:web:9cdc6a1b0dbb7f7daaadeb",
  measurementId: "G-7CC1QQJSPH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
getToken(messaging, {
  vapidKey:
    "BGYx5H66ngB93twzn9YDICF6YzzTxIrqpqyvaCxJcYjfqpfooXVo3vjezPzBoeXg5ITx-rAqn14cXHuJQbJzQXo",
})
  .then((currentToken) => {
    if (currentToken) {
      console.log("current token for client: ", currentToken);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // shows on the UI that permission is required
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });

function requestPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      // TODO(developer): Retrieve a registration token for use with FCM.
      // ...
    } else {
      console.log("Unable to get permission to notify.");
    }
  });
}

requestPermission();
