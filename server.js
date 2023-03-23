const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
require("dotenv").config(); //.env mySQL data protection

let departmentTable = [];

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
  function (err, results, fields) {}
);

initialPrompt();

function initialPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "activity",
        message: "Main Menu",
        choices: ["See Departments", "See Roles", "See Employees"],
        validate: function (answer) {
          if (answer.length < 1) {
            return "You must enter at least one character.";
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      console.log(answers);
      if (answers.activity == "See Departments") {
        departmentTable = [];
        connection.query(
          "SELECT * FROM `departments`",
          function (err, results, fields) {
            for (let i = 0; i < results.length; i++) {
              departmentTable.push({
                id: `${results[i].department_id}`,
                name: `${results[i].department_name}`,
              });
            }
            console.log(" ");
            console.table(departmentTable);
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "navmenu",
                  message: "Departments",
                  choices: ["Add New Department", "Go Back to Main Menu"],
                },
              ])
              .then((answers) => {
                if (answers.navmenu == "Go Back to Main Menu") {
                  initialPrompt();
                }
                if (answers.navmenu == "Add New Department") {
                  inquirer
                    .prompt([
                      {
                        type: "input",
                        name: "addDepartment",
                        message:
                          "What is the name of the department you want to create? (CTRL+C to Quit.)",
                        validate: function (answer) {
                          if (answer.length < 1) {
                            return "You must enter at least one character.";
                          }
                          return true;
                        },
                      },
                    ])
                    .then((answers) => {
                      console.log(answers.addDepartment);
                      connection.query(
                        `INSERT INTO departments (department_name) VALUES ("${answers.addDepartment}")`,
                        function (err, results, fields) {
                          if (err) throw err;
                          console.log("Added successfully!");
                          inquirer
                            .prompt([
                              {
                                type: "list",
                                name: "navmenu",
                                message: "Departments",
                                choices: [
                                  "Add New Department",
                                  "Go Back to Main Menu",
                                ],
                              },
                            ])
                            .then((answers) => {
                              if (answers.navmenu == "Go Back to Main Menu") {
                                initialPrompt();
                              }
                            });
                        }
                      );
                    });
                }
              });
          }
        );
      }
    });
}
// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
app.listen(port, () => {});
