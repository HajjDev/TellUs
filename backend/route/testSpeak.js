const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

var secret = speakeasy.generateSecret({length: 20});

var token = speakeasy.totp({
  secret: secret.base32,
  encoding: 'base32',
  step:10
});


async function display(sec){
  img.code = await QRCodeGen(sec);
  console.log(img.code);
}


display(secret.otpauth_url);



// QRCodeGen(secret.otpauth_url);
// console.log(img);

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

//const Timeout = setTimeout(()=>{console.log(img.code);}, 2000);
