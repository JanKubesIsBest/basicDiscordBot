function new_message(db, user, guild){
    const increase_level = require("./increase_level").increase_level

    db.query("SELECT username, number_of_messages, level FROM users WHERE username=" + `"${user.username}"`, function (err, result) {
        db.query("UPDATE users SET number_of_messages=" + (result[0].number_of_messages + 1) + " WHERE username=" + `"${user.username}"`, function (err) {
            if(err) throw err;
            //increase_level(db, user, result[0].level, result[0].number_of_messages, guild)
        })
    })
}

module.exports = {new_message}