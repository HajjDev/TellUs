const express = require('express');
const mongoose = require('mongoose');
const session = require();
const cookie_parser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const router = express.Router();

router.use(cookie-parser('1234'));
router.use(express.json());
router.use(morgan('dev'));

router.post('/login', (req, res)=>{
    req.
});

module.exports = router;