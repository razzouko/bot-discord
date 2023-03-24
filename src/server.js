// node requirements
require('dotenv').config();
require('./bot-functions/actions.js')
const fs = require('fs');
const path = require('path');

// discord requirements
const { Client, GatewayIntentBits, Events, Collection, REST, Routes } = require('discord.js');
const { crearEmbed, getNoticies } = require('./bot-functions/actions.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.login(process.env.tokenDiscord)

client.commands = new Collection();
// carregar comandes del bot
carregarComandes();


var descansant = false;
var desactivat = false;
var interval = 5000;
// definir interval 
setInterval(()=>{
  if(descansant){
    descansant = false;
  }else{
    descansant = true;
  }
} , interval)


client.on(Events.ClientReady, () => {
  console.log('Bot is working')
  client.user.setActivity("Subscribe to bot-test", { type: 'watching' })
})

client.on(Events.MessageCreate, msg => {
  console.log(interval)
  if  (desactivat) return ; // el bot està desactivat fins que s'activi amb el comand /activar
  if  (descansant) return; // el bot descansa pero després de l'interbal torna a treballar
  if (msg.author.bot) return;
  
  getNoticies(msg.content, (noticiesFinals, entitats) => {
    if (noticiesFinals != null && noticiesFinals.length != 0) {
      msg.channel.send("Noticies relacionades amb " + entitats);
      noticiesFinals.forEach(noticia => {
        msg.channel.send({ embeds: [crearEmbed(noticia)] })
      });
    }
  })
})

client.on(Events.InteractionCreate, async interaction => {

  const command = interaction.client.commands.get(interaction.commandName);

  if(interaction.commandName == "activar"){
    desactivat = false;
    interaction.reply("Bot activat")
    return;
  }else if(interaction.commandName == "desactivar"){
    desactivat = true;
    interaction.reply("Bot desactivat")
    return;
  }

  if(interaction.commandName == "estat"){
      if(descansant || desactivat){
        interaction.reply("El bot està descansant")
      }else if(!descansant || !desactivat){
        interaction.reply("El bot està treballant")
      }
      return;
  }

  if(interaction.options.getString('milisegons') != null){
    interval = parseInt(interaction.options.getString('milisegons'))
    interaction.reply("Interval actualitzat a " + interval + " milisegons")
    return;
  }

  if (!command) {
    console.error(`Comanda no trobada`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
})


function carregarComandes() {

  const commands = [];
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));


  // carregar comandes al bot
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
  // carregar comandes al servidor
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: '10' }).setToken(process.env.tokenDiscord);

  (async () => {
    try {
      console.log(`Started refreshing ${commands.length} application (/) commands.`);

      const data = await rest.put(
        Routes.applicationGuildCommands(process.env.botid, process.env.serverid),
        { body: commands },
      );
      console.log(`Comandes carregades`);
    } catch (error) {
      console.error(error);
    }
  })();
}

