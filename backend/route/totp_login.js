const express = require('express');
const speakeasy = require('speakeasy');
const User = require('../models/user');
const {verifyAccessToken, accessErrorHandler, verifyRefreshToken, refreshErrorHandler, updateToken} = require('../middleware/auth');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/totp_login', async (req, res)=>{
    try{
        const userId = req.user._id;
        const user = await User.findOne({id: userId});
        const token = req.body.token;

        if (!user){
            throw new Error("User Not Found.");
        }

        const verified = speakeasy.totp.verify({
            secret: user.secret,
            encoding: 'base32',
            token,
            window:1
        });

        if (verified) {
            const access_token = jwt.sign({id: user._id,
                                        jti:crypto.randomUUID()}, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'30m'}); //1800000

            const refresh_token = jwt.sign({id: user._id, 
                                            jti:crypto.randomUUID()}, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'90 days'});//90 days

            res.cookie("access_token", access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", 
                sameSite: "Lax",       
                path: "/",
                maxAge: 1000 * 60 * 30
            });


            res.cookie("refresh_token", refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",         
                sameSite: "Lax",       
                path: "/",
                maxAge: 1000 * 60 * 30 * 2
            });

            
            res.status(201).json({message:"successfully connected", user:{
                id:user._id,
                username:user.userName
                //role:user.role
            }});

            return res.status(200).send('MFA verified');
        }else{
            return res.status(400).send('Invalid entry. Try again');
        }        

    }catch(err){
        return res.status(422).send("Something went wrong");
    }
});


module.exports = router;




