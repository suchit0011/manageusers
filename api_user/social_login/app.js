const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('./passport-setup');



router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to 
router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
    if (req.user) {
        res.send({ data: { body: { status: 200, message: "login success" } } });
    }
})

module.exports = router;