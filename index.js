const Discord = require('discord.js')
const client = new Discord.Client
require('dotenv').config()
const prefix = process.env.PREFIX
const fs = require('fs')

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))

for(const file of commandFiles){
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.on('ready', () =>{
  console.log(Discord)
  console.log(client)
  console.clear()
  console.log(client.user)
  console.log(`${client.user.tag} is online`)
  client.user.setPresence({ activity: { name: "To music", type: "LISTENING"}, status: "idle"})
})


client.on('message', message =>{
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase();

  if(!client.commands.has(command)) return;
  try {
    client.commands.get(command).execute(message, args, Discord, client)
  } catch(error){
    console.log(error)
    const r = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle('ERROR')
    .setDescription(':x: Oops! There was an error whole executing that command, try again later')
    .setTimestamp()
    .setFooter('Oop')

    message.channel.send(r)
  }
})

client.login(process.env.TOKEN)
