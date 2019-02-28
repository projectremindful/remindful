import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./components/App.jsx";

// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
// registerServiceWorker();

const check = () => {
  if (!("serviceWorker" in navigator)) {
    throw new Error("No Service Worker support!");
  }
  if (!("PushManager" in window)) {
    throw new Error("No Push API Support!");
  }
};
const registerServiceWorker = async () => {
  const swRegistration = await navigator.serviceWorker.register("service.js");
  return swRegistration;
};
const requestNotificationPermission = async () => {
  const permission = await window.Notification.requestPermission();
  // value of permission can be 'granted', 'default', 'denied'
  // granted: user has accepted the request
  // default: user has dismissed the notification permission popup by clicking on x
  // denied: user has denied the request.
  if (permission !== "granted") {
    throw new Error("Permission not granted for Notification");
  }
  console.log(permission);
};

// i don't have th button to ask for permission 0- it wont' work as he has written is because of react syntax and exporting / importing functins.

const main = async () => {
  console.log("in main() in index.js");
  check();
  const swRegistration = await registerServiceWorker();
  const permission = await requestNotificationPermission();
};

// self.addEventListener("activate", async () => {
//   // This will be called only once when the service worker is activated.
//   console.log("service worker activate");
// });

main(); //we will not call main in the beginning.
