require('dotenv').config();
const apiNews = require('./apis/apiNews.js')

const { Client, GatewayIntentBits, ChannelType, Events, GuildChannelManager } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on(Events.ClientReady, () => {
  console.log('Bot is working')
  client.user.setActivity("Subscribe to bot-test", { type: 'watching' })
})

client.on(Events.MessageCreate, (msg) => {
      apiNews.obtenirNotices()
})

console.log("arriba")
