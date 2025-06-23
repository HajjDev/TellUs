const express = require("express")
const xss = require("xss")

const registerPersonalCheck = async (request, res, next) => {
    request.body.firstName = xss(request.body.firstName);
    request.body.middleName = xss(request.body.middleName);
    request.body.surName = xss(request.body.surName);
    request.body.dateOfBirth = xss(request.body.dateOfBirth);
    request.body.gender = xss(request.body.gender);

    console.log(request.body);

    const {
        firstName,
        middleName,
        surName, 
        dateOfBirth, 
        gender
    } = request.body;

    if (!firstName || !surName || !dateOfBirth || !gender) {
        return res.status(400).send("Lacking usefull Data")
    };

    next();
}

module.exports = registerPersonalCheck;