const token = require("./settings/config.json").TOKEN
const guild_id = require("./settings/config.json").guild_id
let prefix = require("./settings/config.json").prefix

const DiscordJs = require("discord.js")
const { Intents } = require('discord.js')
const mysql = require("mysql")

const add_user = require("./src/database/new_user").add_user
const new_message = require("./src/database/new_message").new_message

const client = new DiscordJs.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS
    ],
})
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lolserverdiscordusers',
})


client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)

    
    /* 
    new server
    // Fetch and get the list named 'members'
    guild.members.fetch().then(members => {
        // Loop through every members
        members.forEach(member => {
            add_user(db, member.user)
        });
    });
    */
})

client.on('guildMemberAdd', function (user) {
    let role = message.guild.roles.cache.find(role => role.name === "Player");

    user.roles.add(role);
})

client.on("messageCreate", msg => {
    if (!msg.author.bot) {
        const guild = msg.guild;
        new_message(db, msg.author, guild)

        if (msg.content.startsWith(prefix)) {
            let cmd = msg.content.replace(prefix, "")

            if (cmd === "ping") {
                msg.reply("pong");
            }
        }
    }
})


client.login(token)