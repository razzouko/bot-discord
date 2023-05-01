const {EmbedBuilder } = require('discord.js');

// api requirements
const apiNews = require('../apis/apiNews.js')
const apiGoogle = require('../apis/apiGoogleLanguage.js')

function crearEmbed(noticia) {

    // afegit 
    if(noticia.description.length > 150){
        noticia.description = noticia.description.substring(0, 150) + "...";
    }

    const embed = new EmbedBuilder()
        .setTitle(noticia.title)
        .setDescription(noticia.description)
        .setImage(noticia.image_url)
        .addFields({
            name : "Fuente" , value : noticia.link
        })
    return embed;
}

function getNoticies(msg , cb){


    let entitats = apiGoogle.getEntities(msg);
    if(entitats == null) cb(null , null);
  entitats.then((entitats) => {
    console.log(entitats)
    apiNews.obtenirNoticies(entitats, (noticiesFinals) => {
            cb(noticiesFinals , entitats)
    })
  })
}

function getNoticia(msg , cb){
    apiNews.obtenirNoticies([msg], (noticiesFinals) => {
        if(noticiesFinals != null){
            cb(noticiesFinals)
        }else{
            cb(null)
        }
    })
}

function getSentimentText(msg , cb){
    apiGoogle.getSentiment(msg).then((result) => {
        cb(result)
    })
}


module.exports = {
    crearEmbed,
    getNoticies,
    getNoticia,
    getSentimentText
}