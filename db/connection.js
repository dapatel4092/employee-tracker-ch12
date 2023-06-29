const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  
  user: "root",
  // Your password
  password: "JackandJillwentupthehill!",
  database: "employeedb"
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;