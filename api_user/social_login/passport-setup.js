const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20') ;
const express = require('express');



passport.use(new GoogleStrategy({
  callbackURL: "http://localhost:3000/api/user/auth/google/redirect",
    clientID: "469460095841-du2ku11q633u0ibob23fb2uh41e16c19.apps.googleusercontent.com",
    clientSecret: "Dh4gZ_yGncmvI5u0R6Q2BKux"
    
  },
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile)
    new Allmember({
             googleid:profile.id,
             name : profile.displayName,
             email:'',
             roles:'',
             password:''
                 }).save().then((res)=>{console.log('saved')
                 return cb(null, profile)
                })
  },

));


