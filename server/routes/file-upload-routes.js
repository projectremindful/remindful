const express = require('express');
const router  = express.Router();

// include CLOUDINARY:
const uploader = require('../configs/cloudinary.js');

router.post('/upload', uploader.single("imgUrl"), (req, res, next) => {
    console.log('file is: ', req.file)

    if (!req.file) {
      res.json({ secure_url: "https://res.cloudinary.com/fracloudo/image/upload/v1551962224/defaultMemory.jpg" });
      // next(new Error('No file uploaded!'));
      return;
    }
    // get secure_url from the file object and save it in the 
    // variable 'secure_url', but this can be any name, just make sure you remember to use the same in frontend
    res.json({ secure_url: req.file.secure_url });
})


module.exports = router;