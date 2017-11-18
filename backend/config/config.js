module.exports = {
    'secret':'cloudstrife8785',
    getToken : function (headers) {
        if(headers && headers.authorization){
            var parted = headers.authorization.split(' ');
            if(parted.length === 2){
                return parted[1];
            }
            else{
                return null;
            }

        }
        else{
            return null;
        }
    },
    generateToken : function (secret) {

    },
    'host' : 'http://localhost:7000',
    'facebook' : {
        'appID' : '1516102205104324' ,
        'appSecret' : '49bb15ba1ea91935c1830855dae3420d',
        'facebookAuthCallback' : '/auth/facebook/callback'
    }
};


