require('dotenv').config();
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();


async function getSentiment(msg) {

    const document = {
        type: 'PLAIN_TEXT',
        content: msg,
    };
    return await client.analyzeSentiment({ document: document });
}

async function getEntities(message){
    let document = {
        type : "PLAIN_TEXT",
        language : "es",
        content: message,
    };

        var [results] = await client.analyzeEntities({document : document , encodingType : "UTF-8"});

        let entitats = [];

            results.entities.forEach(entitat => {
                if(entitat.salience > 0.15){ // si la entitat té una salience major a 0.15 la guardem
                    entitats.push(entitat.name)
                }
            });

        if(entitats.length == 0) return null;
        
        return entitats;

}


module.exports = {
    getSentiment,
    getEntities
}