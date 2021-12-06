const token = "OTE2Njk2OTM5NTE5NjgwNTcz.Yat6jQ.LNltHajub_G0WhRiGAcdFuO7NA0"
let prefix = require("./settings/config.json").prefix

const DiscordJs = require("discord.js")
const { Intents } = require('discord.js')



const client = new DiscordJs.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS
    ],
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)

})

client.on('guildMemberAdd', function (user) {
    let role = message.guild.roles.cache.find(role => role.name === "Player");

    user.roles.add(role);
})

client.on("messageCreate", msg => {
    const guild = msg.guild;


    if (!msg.author.bot) {

        if (msg.content.startsWith(prefix)) {
            let cmd = msg.content.replace(prefix, "")

            if (cmd === "ping") {
                msg.reply("pong");
            }
        }
    }
})


client.login(token)