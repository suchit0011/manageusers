const { Allmember, validate } = require('./signupauth');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
// user register api
router.post('/register', async (req, res) => {
   
    const { error } = validate(req.body);
    if (error) return res.send({ data: { body: { status: 400, message: error.details[0].message } } });

    const checkUser = await Allmember.findOne({ email: req.body.email });
    if (checkUser) return res.send({ data: { body: { status: 400, message: 'user already registered' } } });

    var genSalt = await bcrypt.genSalt(10);
    var password_hash = await bcrypt.hash(req.body.password, genSalt);

    const user = new Allmember({
        name: req.body.name,
        email: req.body.email,
        roles: req.body.roles,
        password: password_hash
    });

    const result = await user.save();
    const roles = result.roles;
    
    const token = await jwt.sign({_id:user._id},'jwtPrivateKey');
    res.send({ data: { body: { status: 200, message: "success",roles,usertoken: token,id:result._id } } });
    res.end();

});

module.exports = router;


