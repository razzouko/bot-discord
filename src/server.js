require('dotenv').config();
const apiNews = require('./apis/apiNews.js')
const apiGoogle = require('./apis/apiGoogleLanguage.js')

const { Client, GatewayIntentBits, ChannelType, Events, GuildChannelManager } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.login(process.env.tokenDiscord)

client.on(Events.ClientReady, () => {
  console.log('Bot is working')
  client.user.setActivity("Subscribe to bot-test", { type: 'watching' })
  apiNews.obtenirNotices(['messi' , 'ronaldo' , 'futbol']);
})
