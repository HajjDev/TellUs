const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,// 15 minutes
    limit:100,//Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-8', //draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers. So the attacker won't know the rate limit.

});

module.exports = limiter;

//we will add more securities options later