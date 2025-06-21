const express = require('express');

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
        return res.status(400).send("...");
    };

    if (password != reEnteredPassword) {
        return res.status(400).send("...");
    };

    const existingUser = await User.findOne({
        $or: [{email}, {userName}]
    });

    if (existingUser) {
        return res.status(400).send("...");
    };

    next();
}

module.exports = registerCrucialCheck;