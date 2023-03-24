const { SlashCommandBuilder } = require('discord.js');
const { getNoticia , crearEmbed } = require('../bot-functions/actions.js');
require('../bot-functions/actions.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('noticia')
		.setDescription('retorna només una noticia relacionada amb la paraula')
		.addStringOption(option =>
			option.setName('noticia')
				.setDescription('Noticia a buscar')
				.setRequired(true)),
	async execute(interaction) {
		getNoticia(interaction.options.getString('noticia'), (noticiesFinals) => {
				if(noticiesFinals != null){
					const embed = crearEmbed(noticiesFinals[0])
					interaction.reply({ embeds: [embed] })
				}else{
					interaction.reply('No s\'ha trobat cap noticia relacionada amb la paraula')
				}
			})
	},
};