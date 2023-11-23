const mysql = require('mysql2');
const conn_apenda = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "",
 database: "apenda",
});

conn_apenda.connect();

module.exports = conn_apenda;