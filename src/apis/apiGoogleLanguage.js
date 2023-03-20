require('dotenv').config();
const language = require('@google-cloud/language')
const https = require('https');

const client = new language.LanguageServiceClient();


function getSentiment(msg) {

    console.log("eiii")

    // Text for sentiment analysis
    const positiveText =
        'I am incredibly happy today! It may be the best day ever!';
    const negativeText =
        "Oh no, it's Monday. My alarm didn't go off! I have a presentation in afew minutes. This is really bad.";

    // Format for Cloud Natural Language API
    const positiveDocument = {
        type: 'PLAIN_TEXT',
        content: positiveText,
    };

    const negativeDocument = {
        type: 'PLAIN_TEXT',
        content: msg,
    };

    (async () => {
        //const positiveResults = await client.analyzeSentiment({ document: positiveDocument });
        const Results = await client.analyzeSentiment({ document: negativeDocument });
        //console.log(positiveResults);
        console.log(Results);
      })();

}

function getEntities(message){

    console.log("entities")


    let document = {
        type : "PLAIN_TEXT",
        language : "es",
        content: message,
    };

    (async () => {
        const [results] = await client.analyzeEntitySentiment({document : document , encodingType : "UTF-8"});
        
        results.entities.forEach(entity => {
            console.log(`  Name: ${entity.name}`);
            console.log(`  Type: ${entity.type}`);
            console.log(`  Score: ${entity.sentiment.score}`);
            console.log(`  Magnitude: ${entity.sentiment.magnitude}`);
          });

      })();

}

module.exports = {
    getSentiment,
    getEntities
}