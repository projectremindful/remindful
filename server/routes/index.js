const express = require("express");
const app = express();
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const Memory = require("../models/Memory");
const Subscription = require("../models/Subscription");
const User = require("../models/User");
const cron = require("node-schedule");
const nodemailer = require("nodemailer");

const webpush = require("web-push"); //requiring the web-push module
// for notifications to work in dev and production - switch enviornmentIsDev to false before deploying
const environmentIsDev = true;
if (environmentIsDev) {
  baseUrl = "http://localhost:3000";
} else {
  baseUrl = "https://re-mindful.herokuapp.com";
}

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
  return newSubscription
    .save()
    .then(result => {
      console.log("Success at saving notification subscription");
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
      console.log("webpush notification sent");
    })
    .catch(err => {
      console.log("error in webpush.sendNotification", err);
    });
};

// sends notification to selected subscription endpoint with required info from backend
router.get("/send-notification", (req, res) => {
  Subscription.find()
    .populate("_owner")
    .then(subscriptions => {
      subscriptions.forEach(sub => {
        if (sub._owner.chosenMemory) {
          var memoryId = sub._owner.chosenMemory;
          const body = `${baseUrl}/reminder/${memoryId}`;
          sendNotification(sub, body);
        }
        // else {const body = `${baseUrl}/profile`; sendNotification(sub, body); }
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

// // specifying the mailOptions
// let transporter = nodemailer.createTransport({
//   // The service which will be used to send the emails
//   service: "gmail",
//   //   credentials to send emails
//   auth: {
//     user: "process.env.GMAIL_EMAIL",
//     pass: "process.env.GMAIL_PASSWORD"
//   }
// });

// app.listen(3142);
// app.get("/schedule/:dayNum/:hour/:minute", function(req, res, next) {
//   var rule2 = new cron.RecurrenceRule();
//   rule2.dayOfWeek = [req.params.dayNum];
//   rule2.hour = req.params.hour;
//   rule2.minute = req.params.minute;
//   cron.scheduleJob(rule2, function() {
//     console.log("It works!");
//     let email = req.body;
//     let mailOptions = {
//       from: "Remindful",
//       to: email,
//       subject: `Your Remindful reminder`,
//       text: `Hello ${req.body.username}!
//     <img src="${req.body.imgUrl}"/>
//     Have a remindful day`
//     };
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         throw error;
//       } else {
//         console.log("email sent");
//       }
//     });
//   });
//   res.json("sup");
// });

module.exports = router;
