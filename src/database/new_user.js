function add_user(db, user, client) {
    db.query(`INSERT INTO users(username, user_id, level) VALUES ("${user.username}", "${user.id}", ${1})`, function (err) {
        if (err) throw err;
    })
}

module.exports = { add_user };