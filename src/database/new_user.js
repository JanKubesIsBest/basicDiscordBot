function add_user(db, user) {
    db.query(`INSERT INTO users(name, id, level, number_of_messages) VALUES ("${user.username}", "${user.id}", 1, 1)`, function (err) {
        if (err) throw err;
    })
}

module.exports = { add_user };