import React from "react";
import ReactDOM from "react-dom";
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function () {
//     navigator.serviceWorker.register("/sw.js").then(
//       function (registration) {
//         console.log(
//           "Service Worker registered with scope: ",
//           registration.scope
//         );
//       },
//       function (err) {
//         console.log("Service Worker registration failed: ", err);
//       }
//     );
//   });
// }

// Notification.requestPermission(function (status) {
//   console.log("Notification permission status:", status);
// });
