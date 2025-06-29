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

            req.user = decoded;
            
            next();

        }catch(err){
            next(err);
           
        }  

    }


const refreshErrorHandler = async (err, req, res, next)=>{
            console.log(err);
            res.clearCookie('refresh_token', { httpOnly: true, secure: process.env.NODE_ENV === "production",  path:'/', sameSite:'Lax'});

            if (err.name == 'TokenExpiredError'){
                const client = await connectRedis();
                const token = cookieExtractor(req, 'refresh_token');
                decoded = jwt.decode(token);
                await client.set(decoded.jti, 'blacklisted');
            }

            
            return res.redirect('http://localhost:3001/api/auth/login');

    }


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


            next();

        }catch(err){
            next(err)
        }
    }


const accessErrorHandler = async (err, req, res, next)=>{
        
        res.clearCookie('access_token', { httpOnly: true, secure: process.env.NODE_ENV === "production", path:'/', sameSite:'Lax'});

        if (err.name === 'TokenExpiredError'){
            const client = await connectRedis();
            const token = cookieExtractor(req, 'access_token');
            const decoded = jwt.decode(token);
            
            await client.set(decoded.jti, 'blacklisted');
            
            return res.redirect('http://localhost:3001/api/token/refresh_token');

        }

        if (err.name == 'noTokenError'){
            return res.redirect('http://localhost:3001/api/token/refresh_token');
        }

        
        return res.status(200).send('You have to login');

    }

module.exports = {authorize, verifyAccessToken, accessErrorHandler, verifyRefreshToken, refreshErrorHandler};
