const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {verifyAccessToken, accessErrorHandler} = require('../middleware/auth.js');

const testRoute = express.Router();

testRoute.use(cors({
    origin:'http://127.0.0.1:5500', //accept request comming from frontend
    credentials: true //allow cookie
}));

testRoute.use(express.json());

testRoute.use(morgan('dev'));

const middlewares = [verifyAccessToken, accessErrorHandler];

testRoute.get('/test',  middlewares, (req, res)=>{
    res.json({message:'cookie will be refreshed......'});
});

module.exports = testRoute;
