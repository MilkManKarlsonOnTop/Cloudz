const Discord = require('discord.js')
const client = new Discord.Client
require('dotenv').config()
const db = require('quick.db')

client.on('ready', () =>{
    console.log(Discord)
    console.log(client)
    console.log(client.user)
    console.log(`${client.user.tag} is online`)
    client.user.setPresence({ activity: { name: "To music", type: "LISTENING"}, status: "idle"})
})

client.login(process.env.TOKEN)