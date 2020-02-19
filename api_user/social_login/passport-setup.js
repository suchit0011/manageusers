const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const express = require('express');
const { Allmember } = require('../signup/signupauth');
const bcrypt = require('bcrypt');

passport.use(new GoogleStrategy({
  callbackURL: "http://localhost:3000/api/user/auth/google/redirect",
  clientID: "469460095841-du2ku11q633u0ibob23fb2uh41e16c19.apps.googleusercontent.com",
  clientSecret: "Dh4gZ_yGncmvI5u0R6Q2BKux"

},
  function (accessToken, refreshToken, profile, done) {
    async function userAuth() {
      const checkUser = await Allmember.findOne({ email: profile.emails[0].value });
      
      if (checkUser) return done(null, { profile: profile.emails[0].value, userdetail: checkUser.roles, newid: checkUser._id });

      var genSalt = await bcrypt.genSalt(10);
      var password_hash = await bcrypt.hash('default@123', genSalt);
      
      const user = await new Allmember({
        name: profile.displayName,
        email: profile.emails[0].value,
        roles: 'user',
        password: password_hash
      });

      const result = await user.save();
      return done(null, { profile: profile.emails[0].value, userdetail: result.roles, newid: result._id });
    }
    userAuth()

  }


));


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

