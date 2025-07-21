const express = require('express');
const transporter = require('../config/transporter');
const User = require('../models/user');
const speakeasy = require('speakeasy');
require('dotenv').config();

const router = express.Router();

router.post('/otp_login',async (req, res)=>{
    try{
        
        const userId = req.user._id;
        console.log(req.user);
        let user = await User.findOne({_id:userId});
        if (!user) {
            throw new Error('User not registered');
        }
        
        if (!user.verified){
            return res.status(400).send("Not verified");
        }





    }catch(err){
        res.status(422).send("Something went wrong");
        console.log(err);

    }
});



module.exports = router;