const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const Memory = require('../models/Memory');
const Subscription = require('../models/Subscription');
const User = require("../models/User")

const webpush = require('web-push') //requiring the web-push module


router.get('/my-profile', isLoggedIn, (req, res, next) => {
  req.user.password = undefined
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
      tranquility: req.body.tranquility,
      empowerment: req.body.empowerment,
      amusement: req.body.amusement,
      inspiration: req.body.inspiration,
      selfGrowth: req.body.selfGrowth,
      motivation: req.body.motivation,
      nostalgia: req.body.nostalgia
    },
    { new: true }
  ).then(user => {
    res.json({
      message: "user preferences updated",
      userPrefs: user
    });
  });
});


//-----NOTIFICATIONS PUSH API ROUTES_____
// api that saves subscription data for chrome to the database
router.post('/save-subscription', (req, res) => {
  console.log("req.body", req.body)
  const { endpoint, expirationTime, keys: {p256dh,auth} } = req.body
  const newSubscription = new Subscription ({ endpoint, expirationTime, keys:{p256dh, auth} })
  return newSubscription.save()
  .then(result =>{
    console.log("Success at saving subscription", result)
  })
})

// Out servers registration keys saved to an object
const vapidKeys = {
  publicKey:'BHkK42FkboxMTeX0ceiE6fwIWgYO7zrFDK5L6u3dolpGwAHHNg5o744YSDdgkWCcVmfo10A1Wx8ONEcw4-5za5o',
  privateKey: process.env.webPushPrivateKey,
}

//setting our previously generated VAPID keys
webpush.setVapidDetails(
  'mailto:myuserid@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

//function to send the notification to the subscribed device
const sendNotification = (subscription, dataToSend='') => {
  webpush.sendNotification(subscription, dataToSend)
}

// route to test send notification. Gets subscription
// data from database and uses it to send a notifications message
router.get('/send-notification', (req, res) => {
  const message = 'Hello World'
  Subscription.find()
  .then(subscription => {
    console.log('subscription retrieved', subscription[0])
    sendNotification(subscription[0], message)
    console.log('message sent from index.js', message )
  })
})
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
  Memory.find()
  .populate("_owner")
  .then(memories => {
    res.json(memories);
  })
  .catch(err => next(err));
});

// router.get("/all-memories/:_owner", isLoggedIn, (req, res, next) => {
//   Memory.find()
//     .populate("_owner")
//     .then(memoriesFromDB => {
//       res.status(200).json(memoriesFromDB);
//     })
//     .catch(err => next(err));
// });


module.exports = router;

// all are prefixed with api/ (from app.js)
// post /memory               - creates a memory
// get /profile-details/:id   - retrieves user data
// get /allMemories/:_owner   - retrieves all memories from a particular user
// get /reminder/:id            - retrieves one memory
