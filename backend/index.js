require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express()
const uri = process.env.MONGO_URI;

mongoose.connect(uri)

app.listen("3001", () => {
    console.log("Server is running")
})