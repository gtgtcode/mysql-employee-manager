const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mysql = require("mysql2");
require("dotenv").config(); //.env mySQL data protection

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

//MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.PASSWORD,
  database: "employee_db",
});

connection.query(
  "SELECT * FROM `departments`",
  function (err, results, fields) {
    console.log(err);
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
