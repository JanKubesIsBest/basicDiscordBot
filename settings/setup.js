const fs = require('fs')
const mysql = require('mysql')


function setup(){
    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
    })

    db.query("CREATE DATABASE discord_manager", function (err){
        if (err) return console.log(err);
        console.log("I set up database...")
        const discord_manager_db = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'discord_manager'
        })
        discord_manager_db.query("CREATE TABLE users (name VARCHAR(255), id VARCHAR(255), number_of_messages int, level int)", function (err) {
            if (err) return console.log(err);

            fs.writeFile("./settings/ran.json", '{"ran": 1}', function(err) {
                if (err) throw err;
                console.log("Setup ran perfectly.")
            })
        })
    })
    db.query("CREATE DATABASE messages_counter", function (err){
        const daily_messages_db = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'messages_counter'
        })
        daily_messages_db.query("CREATE TABLE daily (number_of_messages int, id INT AUTO_INCREMENT PRIMARY KEY, date VARCHAR (255))", function (err) {
            if (err) return console.log(err);
            console.log("Setup was sucessful")
        })            
    })
}

module.exports = { setup }