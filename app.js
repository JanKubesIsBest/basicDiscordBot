const token = "OTE2Njk2OTM5NTE5NjgwNTcz.Yat6jQ.LNltHajub_G0WhRiGAcdFuO7NA0"
const guild_id = require("./settings/config.json").guild_id
let prefix = require("./settings/config.json").prefix
let runned = require("./settings/config.json").runned
let fs = require("fs")

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
const first_db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
})

let db = 0;

//setup
if (runned == 0) {

    console.log("Connected!");
    first_db.query("CREATE DATABASE lolserverdiscordusers", function (err, result) {
        if (err) throw err;
        console.log("Database created");
        db = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: "lolserverdiscordusers"
        })
        
        var sql = "CREATE TABLE users (username VARCHAR(255), user_id int, level int, id int AUTO_INCREMENT, number_of_messages int, PRIMARY KEY (id))";
        db.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
            
            fs.readFile("./settings/config.json", 'utf8', function(err, data) {
                if (err) throw err;
                fs.writeFile("./settings/config.json", '{"TOKEN": "OTE2Njk2OTM5NTE5NjgwNTcz.Yat6jQ.LNltHajub_G1WhRiGAcdFuO7NA0","prefix": "?","guild_id": 808649794276294666,"runned": 1}', function (err) { if (err) throw err; })
            })
        });
    });
}


client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)


    //new server
    let guild = client.guilds.cache.get(guild_id)
    // Fetch and get the list named 'members'
    guild.members.fetch().then(members => {
        // Loop through every members
        members.forEach(member => {
            add_user(db, member.user)
        });
    });
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