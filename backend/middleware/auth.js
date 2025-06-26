const jwt = require('jsonwebtoken');
const connectRedis = require('../utils/connect_redis');
const cookieExtractor = require('../utils/cookie');
require('dotenv').config();

const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Forbidden');
        }
        next();
    };
};


const verifyRefreshToken = () =>{
    return (req, res, next)=>{
        try{
            client = connectRedis();
            value = cookieExtractor(req, 'refresh_token')
            if (){
                
            }
            jwt.verify(req.cookies.refresh_token, process.env.REFRESH_SECRET);
            req.verified = {verified:true};
        }catch(err){
            console.error(err);
            req.verified = {verified:false};
            //;//file error401 in views
        }  

        next();
    }

}

const verifyAccessToken = ()=>{
    return (req, res, next)=>{
        try{
            jwt.verify(req.cookies.access_token, process.env.ACCESS_TOKEN_SECRET);
        }catch(err){
            console.error(err);
            res.redirect('http://localhost:3001/api/auth/refresh_token');
        }

        next();
    }
}

module.exports = {authorize, verifyAccessToken, verifyRefreshToken };
