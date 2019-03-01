// This function encodes public key for chrome push API subscription into an array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
  console.log('encoding public key in public service.js')
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
  console.log('saving subscription in public service.js')
  const SERVER_URL = 'http://localhost:5000/api/save-subscription'
  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscription),
  })
  console.log('response from saving subscripion', response.json)
  return response.json()
}

// function to activate the service worker - this should only be called once
self.addEventListener("activate", async () => {
  try {
    const applicationServerKey = urlB64ToUint8Array(
      "BHkK42FkboxMTeX0ceiE6fwIWgYO7zrFDK5L6u3dolpGwAHHNg5o744YSDdgkWCcVmfo10A1Wx8ONEcw4-5za5o"
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);
		console.log('TCL: subscription', subscription)
    const response = await saveSubscription(subscription)
		console.log('TCL: response after subscribing', response)
  } catch (err) {
    console.log("Error when saving subscription", err);
  }
});

// listens for a push event and then calls the method to send a local notification with the information passed with teh push 
// through "event"
self.addEventListener("push", function(event) {
  if (event.data) {
    console.log("Push event!! ", event.data.text());
    showLocalNotification("Yolo", event.data.text(),  self.registration);
  } else {
    console.log("Push event but no data");
  }
});

// method that sends a local notification with the options for the content and other things 
const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body
    // here you can add more properties like icon, image, vibrate, etc.
  };
  swRegistration.showNotification(title, options);
};