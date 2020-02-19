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
        console.log('test============', req.user);

        let newid = req.user.newid;
        let usertype = req.user.userdetail;
        if (newid != '') {
            console.log("newid ====== ",newid)
            res.redirect("http://localhost:4200/fromoAuth?tokenstore="+newid+"&useraccess="+usertype);
        }
    }
)

router.get('/success', (req, res) => {
    // console.log(res);

    // console.log('test1',res);
    //res.send({ data: { body: { status: 200, message: "login success" } } });
    // res.redirect('http://localhost:4200');

})


module.exports = router;