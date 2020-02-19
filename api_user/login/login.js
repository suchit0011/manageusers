const { Allmember } = require('../signup/signupauth');
const { validlogin } = require('./loginauth');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');

// user create by admin
router.post('/login', async (req, res) => {

    const { error } = validlogin(req.body);
    if (error) return res.send({ data: { body: { status: 400, message: error.details[0].message } } });

    const user = await Allmember.findOne({ email: req.body.email })
    if (!user) return res.send({ data: { body: { status: 400, message: 'User not registered' } } });
    
     const userRole = user.roles;
     const userId = user._id;

    const password = await bcrypt.compare(req.body.password, user.password);
    if (!password) return res.send({ data: { body: { status: 400, message: 'Invalid password' } } });

    const token = await jwt.sign({_id:user._id},'jwtPrivateKey');
    
    res.send({ data: { body: { status: 200,message: "success", usertoken: token,userRole,userId } } });


})


module.exports = router;


