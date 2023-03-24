const {SlashCommandBuilder} = require('@discordjs/builders');
const {getSentiment} = require('../apis/apiGoogleLanguage.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sentiment')
        .setDescription('Retorna el sentiment de la frase')
        .addStringOption(option =>
            option.setName('frase')
                .setDescription('Frase a analitzar')
                .setRequired(true)),
    async execute(interaction) {
        const frase = interaction.options.getString('frase');
        const docSentiment = await getSentiment(frase);
        let magnitud = docSentiment[0].documentSentiment.magnitude; // magnitud de la frase
        let sentiment = docSentiment[0].documentSentiment.score; // sentiment de la frase

        if(sentiment < -0.5){
            interaction.reply('El text es negatiu mira de afegir més vida a les paraules');
        }else if(sentiment > -0.5 && sentiment < 0.5){
            interaction.reply('El text és neutre, ni molt positiu ni molt negatiu');
        }else if(sentiment > 0.5 && magnitud > 0.5){
            interaction.reply('El text és positiu');
        }

    },
};