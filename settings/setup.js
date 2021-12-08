const fs = require('fs')
const mysql = require('mysql')


function setup(){
    const db = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
    })

    db.query("CREATE DATABASE discord_manager", function (err){
        if (err) throw err;
        console.log("I set up database...")
        const discord_manager_db = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'discord_manager'
        })
        discord_manager_db.query("CREATE TABLE users (name VARCHAR(255), id VARCHAR(255), number_of_messages int, level int)", function (err) {
            if (err) throw err;

            fs.writeFile("./settings/ran.json", '{"ran": 1}', function(err) {
                if (err) throw err;
                console.log("Setup ran perfectly.")
            })
        })
    })
}

module.exports = { setup }