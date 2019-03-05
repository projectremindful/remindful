const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const Memory = require("../models/Memory");
const Subscription = require("../models/Subscription");
const User = require("../models/User");

const webpush = require("web-push"); //requiring the web-push module

router.get("/my-profile", isLoggedIn, (req, res, next) => {
  req.user.password = undefined;
  res.json(req.user);
});

//update user preferences
router.put("/user/:id", isLoggedIn, (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      email: req.body.email,
      profileUrl: req.body.profileUrl,
      preference: req.body.preference,
      chosenMemory: req.body.chosenMemory
    },
    { new: true }
  )
    .then(user => {
      res.json({
        message: "user preferences updated",
        userPrefs: user
      });
    })
    .catch(error => {
      console.log("error in put user/id api: ", error);
    });
});

//-----NOTIFICATIONS PUSH API ROUTES_____
// api that saves subscription data for chrome to the database
router.post("/save-subscription", isLoggedIn, (req, res) => {
  console.log("in save-subscription route", req.user._id);
  const _owner = req.user._id;
  const {
    endpoint,
    expirationTime,
    keys: { p256dh, auth }
  } = req.body;
  const newSubscription = new Subscription({
    _owner,
    endpoint,
    expirationTime,
    keys: { p256dh, auth }
  });
  console.log("TCL: newSubscription WITH OWNER ID", newSubscription);
  return newSubscription
    .save()
    .then(result => {
      console.log("Success at saving subscription", result);
    })
    .catch(err => {
      console.log("error in save-subscription apiL: ", err);
    });
});

// Our servers registration keys saved to an object
const vapidKeys = {
  publicKey:
    "BHkK42FkboxMTeX0ceiE6fwIWgYO7zrFDK5L6u3dolpGwAHHNg5o744YSDdgkWCcVmfo10A1Wx8ONEcw4-5za5o",
  privateKey: process.env.webPushPrivateKey
};

//setting our previously generated VAPID keys
webpush.setVapidDetails(
  "mailto:myuserid@email.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend = "") => {
  webpush
    .sendNotification(subscription, dataToSend)
    .then(res => {
      console.log("sent webpush, with the result:  ");
    })
    .catch(err => {
      console.log("error in webpush.sendNotification");
    });
};

// sends notification to selected subscription endpoint with required info from backend
router.get("/send-notification", (req, res) => {
  Subscription.find()
    .populate("_owner")
    .then(subscriptions => {
      subscriptions.forEach(sub => {
        if (sub._owner) {
          console.log("investigating THE SUB: ", sub._owner);
          var memoryId = sub._owner.chosenMemory;
          const body = `http://localhost:3000/reminder/${memoryId}`; // ${sub._owner.chosenMemory};
          console.log("TCL: body", body);
          sendNotification(sub, body);
        }
      });
    });
  res.json({}); // sends empty response to avoid weird errors
});

router.post("/memories/create", isLoggedIn, (req, res, next) => {
  let _owner = req.user._id;
  req.body._owner = _owner;
  Memory.create(req.body)
    .then(newMemory => {
      console.log("Created new memory: ", newMemory, _owner);
      res.status(200).json(newMemory);
    })
    .catch(err => next(err));
});

router.delete("/memory/:id", isLoggedIn, (req, res, next) => {
  Memory.findByIdAndDelete(req.params.id)
    .then(function(success) {
      res.json();
    })
    .catch(function(err) {
      res.status(404).send(err);
    });
});

router.get("/memory/:id", (req, res, next) => {
  Memory.findById(req.params.id)
    .then(memory => {
      res.json(memory);
    })
    .catch(error => {
      next(error);
    });
});

router.put("/memory/:id", (req, res, next) => {
  Memory.findByIdAndUpdate(
    req.params.id,
    {
      notes: req.body.updatedNotes
    },
    { new: true }
  )
    .then(memory => {
      res.json({
        message: "memory updated",
        memory: memory
      });
    })
    .catch(error => {
      console.log("error in put user/id api: ", error);
    });
});

router.post("/profile/edit", isLoggedIn, (req, res, next) => {
  // console.log('body: ', req.body); ==> here we can see that all
  // the fields have the same names as the ones in the model so we can simply pass
  // req.body to the .update() method

  console.log(req.body);

  User.findByIdAndUpdate(req.user._id, req.body)
    .then(function(success) {
      res.json();
    })
    .catch(function(err) {
      res.status(404).send(err);
    });
});

router.get("/memories", isLoggedIn, (req, res, next) => {
  Memory.find({ _owner: req.user._id })
    .populate("_owner")
    .then(memories => {
      res.json(memories);
    })
    .catch(err => next(err));
});

module.exports = router;
