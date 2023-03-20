const https = require('https');
const token = 
 function obtenirNotices (){
    
    https.get("https://newsdata.io/api/1/news?apikey=pub_186075b5c641568c9f5bc50c66e03c39ed0e8&language=be&category=sports" , 
        res => {

            res.on('data' , dades =>{
                let results = JSON.parse(dades.toString())
                console.log(results)
            })

            res.on('end' , (dades) => {
                console.log("final")
            } )
    })
}

module.exports = {
    obtenirNotices
}