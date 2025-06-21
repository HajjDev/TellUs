const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const router = express.Router();

router.use(express.json());
router.use(morgan('dev'));

router.post('/login', (req, res)=>{
    
});
