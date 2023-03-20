require('dotenv').config();
const language = require('@google-cloud/language')
const https = require('https');


function obtenirNotices(entitats) {

    let query = "";

    for (let i = 0; i < entitats.length; i++) {
        if(i == entitats.length - 1){
            query += entitats[i];
        }else {
            query += entitats[i] + "%20";
        }

    }


    https.get("https://newsdata.io/api/1/news?apikey=pub_186075b5c641568c9f5bc50c66e03c39ed0e8&language=es&q=" + query,
     (res) =>{

        let results = "";
        res.on('data' , dades =>{
            
            results += dades;
        })

        res.on('end' , () => {
            console.log(results)
        } )

    })

}

module.exports = {
    obtenirNotices
}