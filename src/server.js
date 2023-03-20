require('dotenv').config();
const apiNews = require('./apis/apiNews.js')
const apiGoogle = require('./apis/apiGoogleLanguage.js')

const { Client, GatewayIntentBits, Events } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

/*
var descansant = false;
var interval = 10000;
// definir interval 
setInterval(()=>{
  if(descansant){
    descansant = false;
  }else{
    descansant = true;
  }

  console.log(descansant)
} , interval)*/

client.login(process.env.tokenDiscord)

client.on(Events.ClientReady, () => {
  console.log('Bot is working')
  client.user.setActivity("Subscribe to bot-test", { type: 'watching' })
})

client.on(Events.MessageCreate, msg =>{

      //apiGoogle.getEntities(msg.content)
      apiGoogle.getSentiment(msg);

})
