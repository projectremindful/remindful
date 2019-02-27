const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const User = require("../models/User")

router.get('/allMemories', isLoggedIn, (req, res, next) => {
  User.findById(req.user.id)
  .then(user => {
    res.json(user);
  })
  .catch(err => next(err))
});

router.get('')

module.exports = router;





// all are prefixed with api/ (from app.js)
// post /memory               - creates a memory
// get /profile-details/:id   - retrieves user data
// get /allMemories/:_owner   - retrieves all memories from a particular user
// get /reminder/:id            - retrieves one memory 