const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database('./users.db', (err) => {
    if(err) {
        console.log(err);
    }
    else{
        db.run(
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            )`
        )
        console.log('Table created')
    }
});

module.exports = db;