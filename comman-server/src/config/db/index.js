
const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "mysql",
  password: "pass123",
  database: "comdb",
  charset: "utf8mb4",
  multipleStatements: true,
});

module.exports = db;
