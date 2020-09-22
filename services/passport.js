const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { googleClientId, googleClientSecret } = require('../config/keys')
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, end) => {
    return end(null, user.id);
})

passport.deserializeUser((id, end) => {
    User.findById(id)
        .then(user => {
             end(null, user);
        })
 })

passport.use(new GoogleStrategy({
    clientID: googleClientId,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, end) => {
        
        User.findOne({
            googleId : profile.id
        })
        .then(existingUser => {
            if (existingUser) {
                end(null, existingUser);
            } else {
                new User({
                    googleId: profile.id
                })
                .save()
                .then(user => {
                    end(null, user);
                })
             }
        })
         
    })
);

 