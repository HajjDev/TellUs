const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/user');
const nodemailer = require("nodemailer");
const {v4: uuidv4} = require("uuid");
require('dotenv').config();

const sendresetLink = () => {
    // 
};

router.post("/emailInput", async (req, res) => {
    try {
        const email = req.body;
        console.log(email["email"]);
        
        const user = await User.findOne({email: email["email"]});
        if (user) {
            if (user.verified) {
                // send email
                res.json({message: "Here will we send the code"});
            } else {
                res.json({message: "please verify your account before resetting your password"});
            }
        } else {
            res.json({message: "User not registered with this email"});
        };
    } catch(err) {
        console.log(err.message)
    };
});

module.exports = router;