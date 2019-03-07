const environmentIsDev = true;
// This function encodes public key for chrome push API subscription into an array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

// function to save the subscription to the backend
const saveSubscription = async subscription => {
  var baseUrl;
  if (environmentIsDev) {
    baseUrl = "http://localhost:5000";
  } else {
    baseUrl = "https://re-mindful.herokuapp.com";
  }
  const SERVER_URL = `${baseUrl}/api/save-subscription`;
  const response = await fetch(SERVER_URL, {
    credentials: "include",
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(subscription)
  });
  return response.json();
};

// function to activate the service worker - this should only be called once
self.addEventListener("activate", async () => {
  try {
    const applicationServerKey = urlB64ToUint8Array(
      "BHkK42FkboxMTeX0ceiE6fwIWgYO7zrFDK5L6u3dolpGwAHHNg5o744YSDdgkWCcVmfo10A1Wx8ONEcw4-5za5o"
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
    const response = await saveSubscription(subscription);
  } catch (err) {
    console.log("Error when saving subscription", err);
  }
});

// listens for a push event and then calls the method to send a local notification with the information passed with teh push
// through "event"
self.addEventListener("push", function(event) {
  console.log("push event", event);
  if (event.data) {
    showLocalNotification(
      "Your Daily Reminder from Remindful",
      event.data.text(),
      self.registration
    );
  } else {
    console.log("Push event but no data");
  }
});

// method that sends a local notification with the options for the content and other things
const showLocalNotification = (title, body, swRegistration) => {
  console.log("showing local notification", body, title);
  const options = {
    body: "Make time for your memory",
    data: {
      dateOfArrival: Date.now(),
      url: body
    },
    actions: [
      {
        action: "reminder",
        title: "Go to your Memory"
      },
      {
        action: "close",
        title: "Close notification"
      }
    ]
  };
  swRegistration.showNotification(title, options);
};

self.addEventListener("notificationclose", function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  console.log("Closed notification: " + primaryKey);
});

self.addEventListener("notificationclick", function(e) {
  e.preventDefault();
  var notification = e.notification;
  var action = e.action;
  var url = notification.data.url;
  if (action === "close") {
    notification.close();
  } else {
    e.waitUntil(clients.openWindow(url, "_blank"));
  }
});
