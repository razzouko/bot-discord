require('dotenv').config();
const https = require('https');
const URL = require('url').URL;

async function obtenirNoticies(entitats, cb) {


    if(entitats == null){
     cb(null);
     return;
    }
    let query = "";

    for (let i = 0; i < entitats.length; i++) {
        if (i == entitats.length - 1) {
            query += entitats[i];
        } else {
            query += entitats[i] + "%20";
        }

    }

    https.get("https://newsdata.io/api/1/news?apikey=pub_186075b5c641568c9f5bc50c66e03c39ed0e8&language=es&q=" + query,
        (res) => {

            let noticies = "";
            res.on('data', dades => {
                noticies += dades;
            })

            res.on('end', () => {
                let resultat = JSON.parse(noticies).results;

                if (resultat.length == 0) {
                    cb(null);
                 }
                else {
                    let final = false;
                    let i = 0;
                    let noticiesFinals = [];
                    while (!final && i < resultat.length) {
                        let url = resultat[i].image_url;
                        if (url != null && stringIsAValidUrl(url)) {
                            noticiesFinals.push(resultat[i]);
                        }
                        if (noticiesFinals.length == 3) {
                            final = true;
                        }
                        i++;
                    }
                    cb(noticiesFinals);
                }
            })
        })

}

const stringIsAValidUrl = (s) => {
    try {
      new URL(s);
      return true;
    } catch (err) {
      return false;
    }
  };

module.exports = {
    obtenirNoticies
}