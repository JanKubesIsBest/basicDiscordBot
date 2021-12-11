const token = require("./settings/config.json").TOKEN
let prefix = require("./settings/config.json").prefix
const myServerID = require("./settings/config.json").guild_id
let ran = require("./settings/ran.json").ran

const my_sql = require('mysql')
const DiscordJs = require("discord.js")
const { Intents } = require('discord.js')

const setup = require("./settings/setup").setup
const new_user = require("./src/database/new_user").add_user

const client = new DiscordJs.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS
    ],
})

if (ran == 0){
    setup()
}

const db = my_sql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'discord_manager'
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)

})
let guild = ""

client.on('guildMemberAdd', function (user) {
    let role = guild.roles.cache.find(role => role.name === "Player");

    user.roles.add(role);
    new_user(db, user.user)
})

client.on("messageCreate", msg => {
    guild = msg.guild

    db.query("SELECT name, number_of_messages FROM users WHERE name=" + `"${msg.author.username}"`, function (err, result) {
        if (result != undefined) {
            db.query("UPDATE users SET number_of_messages = " + (result[0].number_of_messages + 1) + " WHERE name = " + `"${msg.author.username}"`, function (err) {
                if (err) throw err;
            })
        }
        else {
            new_user(db, msg.author)
        }
    })

    if (!msg.author.bot) {

        if (msg.content.startsWith(prefix)) {
            let cmd = msg.content.replace(prefix, "")
            cmd = cmd.split(" ")
            if (cmd == "") return;
            switch (cmd[0]){
                case 'ping':
                    msg.reply({content: "pong"});
                    break;
                case 'pocetZprav':
                    console.log(cmd)
                    if (!cmd[1] || !cmd[1].startsWith("<@")) return msg.reply({content: "Nezadal si mention... Zkus to znovu :D"})

                    let mention = cmd[1].replace("<@", "")
                    mention = mention.slice(1)
                    mention = mention.replace(">", "")
                    
                    db.query("SELECT number_of_messages, name FROM users WHERE id=" + `"${mention}"`, function (err, result) {
                        if (!result[0]){
                            msg.reply({
                                content:"Tento user pravdepodobne nenapsal zadnou zpravu nebo neni na serveru..."
                            })
                        }else {
                            msg.reply({
                                content: "Tento " + result[0].name + " napsal: " + result[0].number_of_messages + "."
                            })
                        }
                    })
                    break;
                default:
                    msg.reply({
                        content: "Command neexistuje."
                    })
            }
        }
    }
})


client.login(token)