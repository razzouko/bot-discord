const https = require('https');

 function obtenirNotices (){
    
    https.get("https://newsdata.io/api/1/news?apikey=pub_186075b5c641568c9f5bc50c66e03c39ed0e8" , 
        res => {

            res.on('data' , dades =>{
                console.log(dades.totalResults)
            })

            res.on('end' , () => {
                console.log("resposta total")
            } )
    })
}

module.exports = {
    obtenirNotices
}