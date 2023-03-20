require('dotenv').config();
const language = require('@google-cloud/language')
const https = require('https');

const client = new language.LanguageServiceClient();


function getSentiment() {

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
        content: negativeText,
    };

    (async () => {
        const positiveResults = await client.analyzeSentiment({ document: positiveDocument });
        const negativeResults = await client.analyzeSentiment({ document: negativeDocument });
        console.log(positiveResults);
        console.log(negativeResults);
      })();

}

function getEntities(){

    console.log("entities")

    let text = "yes, yesterday barcelona played against madrid";

    let document = {
        type : "PLAIN_TEXT",
        language : "en",
        referenceWebUri : "",
        boilerplateHandling : "BOILERPLATE_HANDLING_UNSPECIFIED",
        content: text,
    };

    (async () => {
        const results = await client.analyzeEntities({document : document , encodingType : "UTF-8"});
        
        let entitat1={
            nom : results[0].entities[0].name,
            tipus : results[0].entities[0].type,
            importancia : results[0].entities[0].salience
        };

        console.log(entitat1)
      })();




}

module.exports = {
    getSentiment,
    getEntities
}