const { SlashCommandBuilder } = require('discord.js');
require('../bot-functions/actions.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('interval')
		.setDescription('serveix per definir interval, en ms, en el que el bot escolta misstges i busca noticies')
		.addStringOption(option =>
			option.setName('milisegons')
				.setDescription('milisegons a definir')
				.setRequired(true))
};