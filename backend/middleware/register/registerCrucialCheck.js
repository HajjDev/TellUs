const express = require('express');
const xss = require('xss');
const User = require("../../models/user");

const registerCrucialCheck = async (request, res, next) => {
    request.body.userName = xss(request.body.userName);
    request.body.displayName = xss(request.body.displayName);
    request.body.email = xss(request.body.email);
    request.body.phoneNumber = xss(request.body.phoneNumber);
    request.body.password = xss(request.body.password);
    request.body.reEnteredPassword = xss(request.body.reEnteredPassword);

    const {
        userName,
        displayName,
        email,
        phoneNumber,
        password,
        reEnteredPassword
    } = request.body;

    if (!userName || !displayName || !email || !phoneNumber || !password || !reEnteredPassword) {
        return res.status(400).send("Lacking Data");
    };

    if (password != reEnteredPassword) {
        return res.status(400).send("password not corresponding");
    };

    const existingUser = await User.findOne({
        $or: [{email}, {userName}]
    });

    if (existingUser) {
        console.log("Already registered");
        return res.status(400).redirect('http://localhost:3001/api/auth/login');
    };

    next();
}

module.exports = registerCrucialCheck;