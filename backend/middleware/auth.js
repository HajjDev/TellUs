const jwt = require('jsonwebtoken');
const connectRedis = require('../utils/connect_redis');
const cookieExtractor = require('../utils/cookie');
const crypto = require('crypto');
require('dotenv').config();

const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('Forbidden');
        }

        next();
    };
};


const verifyAccessToken = async (req, res, next)=>{
        const client = await connectRedis();
        const token = cookieExtractor(req, 'access_token');

        try{

            if (!token){
                throw {name: 'noTokenError',
                    message:'No access token'
                }
            }

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (decoded && await client.get(decoded.jti)){
                throw {name:'TokenBlacklistedError',    message: 'jwt replaying'};
            }

            req.user = {id:decoded.id};
            next();

        }catch(err){
            next(err)
        }
    }


const accessErrorHandler = async (err, req, res, next)=>{
        res.clearCookie('access_token');

        res.clearCookie('access_token');
        if (err.name === 'TokenExpiredError'){
            const client = await connectRedis();
            const token = cookieExtractor(req, 'access_token');
            const decoded = jwt.decode(token);
            
            await client.set(decoded.jti, 'blacklisted');
            delete req.cookies.access_token;

            return next();

        }

        if (err.name === 'noTokenError'){
            return next();
        }
        res.clearCookie('refresh_token');
        return res.redirect('http://localhost:3001/api/auth/login');
    }


const verifyRefreshToken = async (req, res, next)=>{
        let token = cookieExtractor(req, 'access_token');

        if (token){
            return next();//if there is an access token it means that this token has been verified earlier. so we can proceed the user request
        }

        const client = await connectRedis();
        token = cookieExtractor(req, 'refresh_token');

        try{
            if (!token){
                throw {name: 'noTokenError',
                    message:'No refresh token'
                }
            }

            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

            if (decoded && await client.get(decoded.jti)){
                throw {name:'TokenBlacklistedError', message: 'jwt replaying'};
            }

            req.user = {id:decoded.id};
            next();

        }catch(err){
            next(err);  
        }  

    }


const refreshErrorHandler = async (err, req, res, next)=>{
        res.clearCookie('refresh_token', { httpOnly: true, secure: process.env.NODE_ENV === "production",  path:'/', sameSite:'Lax'});
        let token = cookieExtractor(req, 'access_token');
        if (token){
            return next();
        }

        if (err.name == 'TokenExpiredError'){
            const client = await connectRedis();
            token = cookieExtractor(req, 'refresh_token');
            const decoded = jwt.decode(token);
            await client.set(decoded.jti, 'blacklisted');
        }

        
        return res.redirect('http://localhost:3001/api/auth/login');

    }



const updateToken = async (req, res, next)=>{
    let token = cookieExtractor(req, 'access_token');
    if (token){
        return next();
    }

    console.log('Tokens refreshed');
    const access_token = jwt.sign({id: req.user.id, 
                                    jti:crypto.randomUUID()}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'30m'});
    //here the request contain the data of the user|| req.params.id could also be used depending on where the frontend has stored the id, URI or req body


    res.cookie('access_token', access_token, {
        httpOnly: true, //Aigainst XSS Attacks: never accessible via js
        secure: process.env.NODE_ENV === "production", //it must be false for localhost
        sameSite: "Lax",       
        path: "/",
        maxAge: 1000 * 60 * 30
    });

    next();
}

module.exports = {authorize, verifyAccessToken, accessErrorHandler, verifyRefreshToken, refreshErrorHandler, updateToken};
