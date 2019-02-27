const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const Memory = require('../models/Memory');
const User = require("../models/User")

router.get('/my-profile', isLoggedIn, (req, res, next) => {
  req.user.password = undefined
  res.json(req.user);
});


router.get('/allMemories/:_owner', isLoggedIn, (req, res, next) => {
  Memory.find()
  .then(memoriesFromDB => {
    res.status(200).json(memoriesFromDB)
  })
  .catch(err => next(err))
})

router.post('/memories/create', (req, res, next) => {
  // console.log('body: ', req.body); ==> here we can see that all
  // the fields have the same names as the ones in the model so we can simply pass
  // req.body to the .create() method
  
  Memory.create(req.body)
  .then( aNewMemory => {
      // console.log('Created new memory: ', aNewMemory);
      res.status(200).json(aNewMemory);
  })
  .catch( err => next(err) )
})

router.get('')

module.exports = router;





// all are prefixed with api/ (from app.js)
// post /memory               - creates a memory
// get /profile-details/:id   - retrieves user data
// get /allMemories/:_owner   - retrieves all memories from a particular user
// get /reminder/:id            - retrieves one memory 