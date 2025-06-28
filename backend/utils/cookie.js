const cookieExtractor = function(req, name) {
    var token = null;
    console.log(req.cookies);
    if (name === 'access_token'){
        try{
            token = req.cookies.access_token;
        }catch(err){
            console.error(err);
        }

    }else if (name === 'refresh_token'){
        try{
            token = req.cookies.refresh_token;
        }catch(err){
            console.error(err);
        }
    
    }
    console.log("###########################");
    console.log(token);
    return token;
    
};

module.exports = cookieExtractor;