const cookieExtractor = function(req, name) {
    var token = null;
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

    return token;
    
};

module.exports = cookieExtractor;