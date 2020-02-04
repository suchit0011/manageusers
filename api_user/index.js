const express = require('express')
var cors = require('cors')
const passport = require('passport');
const signup = require('./signup/signup');
const admin = require('./admin/user');
const login = require('./login/login');
const sociallogin = require('./social_login/app');
const passportSetup = require('./social_login/passport-setup');
const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/user', signup);
app.use('/api/user', admin);
app.use('/api/user', login);
app.use('/api/user', sociallogin);
app.listen(3000)


