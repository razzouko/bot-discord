const { SlashCommandBuilder } = require('discord.js');
require('../bot-functions/actions.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('estat')
		.setDescription('serveix per obtenir estat en que està el bot')
};