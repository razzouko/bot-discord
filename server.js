require('dotenv').config();
const { Client, GatewayIntentBits, ChannelType, Events, GuildChannelManager } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on(Events.ClientReady, () => {
  console.log('Bot is working')
  client.user.setActivity("Subscribe to bot-test", { type: 'watching' })
})

client.on(Events.MessageCreate, (msg) => {

  if (msg.content === "hola") {
    msg.reply("holaaaaas")
  }else if(msg.content === "nou canal"){
    msg.guild.channels.create(
      {type: ChannelType.GUILD_TEXT,
      name : "canal prova", });
  }
})

console.log("arriba")
client.login(process.env.token)