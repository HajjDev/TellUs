const express = require('express');
const speakeasy = require('speakeasy');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = express.Router();

router.post('/mfa_login', async (req, res)=>{
    try{
        const userId = req.cookies.id;
        const user = await User.findOne({_id: userId});
        const token = req.body.token;

        if (!user){
            throw new Error("User Not Found.");
        }

        if (!user.verified){
            return res.status(400).send("Not verified");
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

            

            return res.status(200).send('MFA verified');
        }else{
            return res.status(400).send('Invalid entry. Try again');
        }        

    }catch(err){
        console.log(err);
        return res.status(422).send("Something went wrong");
    }
});


module.exports = router;




