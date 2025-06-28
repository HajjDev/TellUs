const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');
const cookieExtractor = require('../utils/cookie'); 
require('dotenv').config(); //import the environment variables

//const cookieExtractor = (req) => req?.cookies?.access_token || null; less readable but do the same thing

const opts = {
    jwtFromRequest : ExtractJwt.fromExtractor([cookieExtractor]),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
};


passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{ 
    User.findById(jwt_payload.id)
        .then(user =>{
            if (user){
                return done(null, user);
            }
            return done(null, false);
        })

        .catch(err => console.error(err));
}));

module.exports = passport;