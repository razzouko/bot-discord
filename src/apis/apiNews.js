require('dotenv').config();
const language = require('@google-cloud/language')
const https = require('https');
const tokenGoogle = process.env.tokenGoogle;

 function obtenirNotices (){
    
   language. ({
    version : 'v1',
    auth : tokenGoogle
   })

   lan
}

module.exports = {
    obtenirNotices
}