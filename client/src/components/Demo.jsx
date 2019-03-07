// import React, { Component } from "react";
// import { Button } from "reactstrap";

// export default class Demo extends Component {
//   requestNotificationPermission = async () => {
//     const permission = await window.Notification.requestPermission();
//     // value of permission can be 'granted', 'default', 'denied'
//     // granted: user has accepted the request
//     // default: user has dismissed the notification permission popup by clicking on x
//     // denied: user has denied the request.
//     if (permission !== "granted") {
//       throw new Error("Permission not granted for Notification");
//     }
//   };

//   registerServiceWorker = async () => {
//     const swRegistration = await navigator.serviceWorker.register("service.js");
//     return swRegistration;
//   };

//   showLocalNotification = (title, body, swRegistration) => {
//     const options = {
//       body,
//       data: {
//         dateOfArrival: Date.now(),
//         url: "http://localhost:3000/reminder/5c7ebe407077c6be1635feca"
//       }
//       // here you can add more properties like icon, image, vibrate, etc.
//     };
//     swRegistration.showNotification(title, options);
//   };

//   main = async () => {
//     await this.requestNotificationPermission();
//     const swRegistration = await this.registerServiceWorker();
//     this.showLocalNotification(
//       "Make Time for your Memory",
//       "Your daily reminder from remindful",
//       swRegistration
//     );
//   };

//   // handleClick() {
//   //   console.log("clicked");
//   //   this.main();
//   // }

//   render() {
//     return (
//       <div style={{ padding: "100px" }}>
//         <Button onClick={this.main}>Send</Button>
//       </div>
//     );
//   }
// }
