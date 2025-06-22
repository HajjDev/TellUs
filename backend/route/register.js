const express = require("express");
const router = express.Router();
const registerPersonalCheck = require('../middleware/registerPersonalCheck');
const registerCrucialCheck = require('../middleware/registerCrucialCheck');
const User = require('../models/user');

const registerCheck = [registerCrucialCheck, registerPersonalCheck];
router.post("/register", registerCheck, async (request, res) => {
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
        });

        await newUser.save();
        res.status.json({ message: "User registered successfully" });

    } catch(err) {
        console.log(err.message)
    };
});

module.exports = router;