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


const verifyRefreshToken = async (req, res, next)=>{
        const client = await connectRedis();
        const token = cookieExtractor(req, 'refresh_token');

        if (!token){
            return res.redirect('http://localhost:3001/api/auth/login');
        }

        try{
            
            decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

            if (decoded && await client.get(decoded.jti)){
                throw {name:'TokenBlacklistedError', message: 'jwt replaying'};
            }

            next();

        }catch(err){
            next(err);
           
        }  

    }


const refreshErrorHandler = async (err, req, res, next)=>{
            const client = connectRedis();
            const token = cookieExtractor(req, 'refresh_token');

            res.clearCookie('refresh_token', { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'None' });

            if (err.name == 'TokenExpiredError'){
                decoded = jwt.decode(token);
                await client.set(decoded.jti, 'blacklisted');
            }

            
            return res.redirect('http://localhost:3001/api/auth/login');

    }


const verifyAccessToken = async (req, res, next)=>{
        const client = await connectRedis();
        console.log(req.cookies);
        const token = cookieExtractor(req, 'refresh_token');
        try{
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            if (decoded && await client.get(decoded.jti)){
                throw {name:'TokenBlacklistedError',    message: 'jwt replaying'};
            }

            next();

        }catch(err){
            next(err)
        }
    }


const accessErrorHandler = async (err, req, res, next)=>{
        const client = await connectRedis();
        const token = cookieExtractor(req, 'refresh_token');

        res.clearCookie('access_token', { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'None' });

        if (err.name == 'TokenExpiredError'){
            const decoded = jwt.decode(token);
            await client.set(decoded.jti, 'blacklisted');
            return res.redirect('http://localhost:3001/api/auth/refresh_token');

        }

        
        return res.redirect('http://localhost:3001/api/auth/login');

    }

module.exports = {authorize, verifyAccessToken, accessErrorHandler, verifyRefreshToken, refreshErrorHandler};
