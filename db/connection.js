const util = require('util');
const mysql = require('mysql');
const { createConnection } = require('net');

const db_connection = mysql.createConnection({
    // Host for Development
    host: "localhost",
    // Database user name
    user: process.env.USER_NAME,
    // Database password
    password: process.env.PASSWORD,
    // Database Name
    database: process.env.DATABASE
});

db_connection.connect();

// Adding the ability to use promises instead of callbacks
db_connection.query = util.promisify(db_connection.query);

// Exporting the Database Connection
module.exports = db_connection;