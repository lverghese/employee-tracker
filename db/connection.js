const mysql = require('mysql2');
require('dotenv').config();
//Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        //SQL username,
        user: 'root',
        //SQL Password,
        password: process.env.DB_PW,
        database: 'business'
    },
    console.log('Connected to the business database')
);

module.exports = db;