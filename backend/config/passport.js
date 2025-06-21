const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
require('dotenv').config(); //import the environment variables

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};


passport.use(new JwtStrategy(opts, (jwt_playload, done)=>{ 
    User.findById(jwt_playload.id)
        .then(user =>{
            if (user){
                return done(null, user);
            }
            return done(null, false);
        })
        .catch(err => console.error(err));
}));

module.exports = passport;