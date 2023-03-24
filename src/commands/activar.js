const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('activar')
		.setDescription('activar les noticies i torna a comensar a treballar durant un interval de temps')
};