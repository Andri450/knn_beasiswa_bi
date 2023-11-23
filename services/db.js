const mysql = require('mysql2');
const conn = mysql.createConnection({
 host: "localhost",
 user: "root",
 password: "",
 database: "proyek_lamsel",
});

conn.connect();

module.exports = conn;