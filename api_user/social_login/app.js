const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportSetup = require('./passport-setup');



router.get('/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}));


router.get('/auth/google/redirect',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/api/user/success');

    }

)

router.get('/success', (req, res) => {

    res.send({ data: { body: { status: 200, message: "login success" } } });
})


module.exports = router;