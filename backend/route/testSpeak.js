const speakeasy = require('speakeasy');

var secret = speakeasy.generateSecret({length: 20});

var token = speakeasy.totp({
  secret: secret.base32,
  encoding: 'base32',
  step:10
});

console.log(secret.otpauth_url);

function verify(){
    const tokenValidates = speakeasy.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        token,
        step:10,
        window:1
    });

    console.log(tokenValidates);
}

//const Timeout = setTimeout(verify, 11000);
