require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const uri = process.env.MONGO_URI;
console.log(uri);

app.use(express.json());


mongoose.connect(uri)
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));

app.listen("3001", () => {
    console.log("Server is running")
});
