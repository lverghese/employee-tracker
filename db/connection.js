const mysql = require('mysql2');
//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //SQL username,
        user: 'root',
        //SQL Password,
        password: '',
        database: 'election'
    },
    console.log('Connected to the business database')
);

module.exports = db;