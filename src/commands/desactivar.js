const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('desactivar')
		.setDescription('desactiva les noticies fins que es torni a activar')
};