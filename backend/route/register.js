const express = require("express");
const cors = require('cors');
const router = express.Router();
const registerPersonalCheck = require('../middleware/register/registerPersonalCheck');
const registerCrucialCheck = require('../middleware/register/registerCrucialCheck');
const User = require('../models/user');

router.use(cors({
    origin:'http://127.0.0.1:5500'
}));

const registerCheck = [registerCrucialCheck, registerPersonalCheck];


router.post("/signup", registerCheck, async (request, res) => {
    try {
        const {
            firstName,
            middleName,
            surName,
            dateOfBirth,
            gender,
            userName,
            displayName,
            email,
            phoneNumber,
            password
        } = request.body;

        const newUser = new User({
            displayName,
            userName,
            name:{
                familyName:surName,
                givenName:firstName,
                middleName:middleName
            },

            dateOfBirth,
            gender,
            email,
            phoneNumber,
            password
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch(err) {
        console.log(err.message)
    };
});

module.exports = router;