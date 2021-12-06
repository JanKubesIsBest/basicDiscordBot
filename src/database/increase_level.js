
function increase_level(db, increased_user, user_level, user_number_of_messages, guild) {
    const levels = require("C:/Users/janku/Documents/code/javascript/discord_manager/settings/levels.js").levels


    if (user_number_of_messages >= levels[user_level - 1][1]) {
        db.query("UPDATE users SET level=" + (user_level + 1) + " WHERE username=" + `"${increased_user.username}"`, function (err) {
            if (err) throw err;
            console.log(guild)
            const past_role = guild.roles.cache.find('name', levels[user_level][0])
            const new_role = guild.roles.cache.find('name', levels[user_level + 1][0])
            
            increased_user.removeRole(past_role)
            increased_user.addRole(new_role)
        })
    }
}

module.exports = {increase_level}