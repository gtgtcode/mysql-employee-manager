const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
require("dotenv").config(); //.env mySQL data protection

let departmentTable = [];
let roleName = "";
let roleDepartment = "";
let roleSalary = "";
let employeeFName = "";
let employeeLName = "";
let employeeJobTitle = "";
let employeeDepartment = "";
let employeeSalary = "";
let employeeManager = "";

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
      if (answers.activity == "See Roles") {
        departmentTable = [];
        connection.query(
          "SELECT * FROM `roles`",
          function (err, results, fields) {
            for (let i = 0; i < results.length; i++) {
              departmentTable.push({
                id: `${results[i].role_id}`,
                name: `${results[i].role_name}`,
                role_department: `${results[i].role_department}`,
                role_salary: `${results[i].role_salary}`,
              });
            }
            console.log(" ");
            console.table(departmentTable);
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "navmenu",
                  message: "Roles",
                  choices: ["Add New Role", "Go Back to Main Menu"],
                },
              ])
              .then((answers) => {
                if (answers.navmenu == "Go Back to Main Menu") {
                  initialPrompt();
                }
                if (answers.navmenu == "Add New Role") {
                  inquirer
                    .prompt([
                      {
                        type: "input",
                        name: "addRoleName",
                        message:
                          "What is the name of the role you want to create? (CTRL+C to Quit.)",
                        validate: function (answer) {
                          if (answer.length < 1) {
                            return "You must enter at least one character.";
                          }
                          return true;
                        },
                      },
                    ])
                    .then((answers) => {
                      roleName = answers.addRoleName;
                      inquirer
                        .prompt([
                          {
                            type: "input",
                            name: "addRoleDepartment",
                            message:
                              "What is the id of the department you want to create? (CTRL+C to Quit.)",
                            validate: function (answer) {
                              if (answer.length < 1) {
                                return "You must enter at least one character.";
                              }
                              return true;
                            },
                          },
                        ])
                        .then((answers) => {
                          roleDepartment = answers.addRoleDepartment;
                          inquirer
                            .prompt([
                              {
                                type: "input",
                                name: "addRoleSalary",
                                message:
                                  "What is the amount of the role's salary you want to create? (CTRL+C to Quit.)",
                                validate: function (answer) {
                                  if (answer.length < 1) {
                                    return "You must enter at least one character.";
                                  }
                                  return true;
                                },
                              },
                            ])
                            .then((answers) => {
                              console.log(answers.addRoleSalary);
                              connection.query(
                                `INSERT INTO roles (role_name, role_department, role_salary) VALUES ("${roleName}", "${roleDepartment}", "${answers.addRoleSalary}")`,
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
                                      if (
                                        answers.navmenu ==
                                        "Go Back to Main Menu"
                                      ) {
                                        initialPrompt();
                                      }
                                    });
                                }
                              );
                            });
                        });
                    });
                }
              });
          }
        );
      }
      if (answers.activity == "See Employees") {
        departmentTable = [];
        connection.query(
          "SELECT * FROM `employees`",
          function (err, results, fields) {
            for (let i = 0; i < results.length; i++) {
              departmentTable.push({
                id: `${results[i].employee_id}`,
                first_name: `${results[i].employee_first_name}`,
                last_name: `${results[i].employee_last_name}`,
                job_title: `${results[i].employee_job_title}`,
                employee_department: `${results[i].employee_department}`,
                employee_salary: `${results[i].employee_salary}`,
                employee_manager: `${results[i].employee_manager}`,
              });
            }
            console.log(" ");
            console.table(departmentTable);
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "navmenu",
                  message: "Employees",
                  choices: ["Add New Employee", "Go Back to Main Menu"],
                },
              ])
              .then((answers) => {
                if (answers.navmenu == "Go Back to Main Menu") {
                  initialPrompt();
                }
                if (answers.navmenu == "Add New Employee") {
                  if (answers.navmenu == "Add New Employee") {
                    inquirer
                      .prompt([
                        {
                          type: "input",
                          name: "addEmployeeFName",
                          message:
                            "What is the first name of the employee you want to create? (CTRL+C to Quit.)",
                          validate: function (answer) {
                            if (answer.length < 1) {
                              return "You must enter at least one character.";
                            }
                            return true;
                          },
                        },
                      ])
                      .then((answers) => {
                        employeeFName = answers.addEmployeeFName;
                        inquirer
                          .prompt([
                            {
                              type: "input",
                              name: "addEmployeeLName",
                              message:
                                "What is the the last name of the employee you want to create? (CTRL+C to Quit.)",
                              validate: function (answer) {
                                if (answer.length < 1) {
                                  return "You must enter at least one character.";
                                }
                                return true;
                              },
                            },
                          ])
                          .then((answers) => {
                            employeeLName = answers.addEmployeeLName;
                            inquirer
                              .prompt([
                                {
                                  type: "input",
                                  name: "addEmployeeSalary",
                                  message:
                                    "What is the employee's salary? (CTRL+C to Quit.)",
                                  validate: function (answer) {
                                    if (answer.length < 1) {
                                      return "You must enter at least one character.";
                                    }
                                    return true;
                                  },
                                },
                              ])
                              .then((answers) => {
                                employeeSalary = answers.addEmployeeSalary;
                                inquirer
                                  .prompt([
                                    {
                                      type: "input",
                                      name: "addEmployeeDepartment",
                                      message:
                                        "What is the employee's department? (CTRL+C to Quit.)",
                                      validate: function (answer) {
                                        if (answer.length < 1) {
                                          return "You must enter at least one character.";
                                        }
                                        return true;
                                      },
                                    },
                                  ])
                                  .then((answers) => {
                                    employeeDepartment =
                                      answers.addEmployeeDepartment;
                                    inquirer
                                      .prompt([
                                        {
                                          type: "input",
                                          name: "addEmployeeManager",
                                          message:
                                            "What is the employee's manager? (CTRL+C to Quit.)",
                                          validate: function (answer) {
                                            if (answer.length < 1) {
                                              return "You must enter at least one character.";
                                            }
                                            return true;
                                          },
                                        },
                                      ])
                                      .then((answers) => {
                                        employeeManager =
                                          answers.addEmployeeManager;
                                        inquirer
                                          .prompt([
                                            {
                                              type: "input",
                                              name: "addEmployeeJobTitle",
                                              message:
                                                "What is the employee's job title? (CTRL+C to Quit.)",
                                              validate: function (answer) {
                                                if (answer.length < 1) {
                                                  return "You must enter at least one character.";
                                                }
                                                return true;
                                              },
                                            },
                                          ])
                                          .then((answers) => {
                                            employeeJobTitle =
                                              answers.addEmployeeJobTitle;
                                            connection.query(
                                              `INSERT INTO employees (employee_first_name, employee_last_name, employee_job_title, employee_department, employee_salary, employee_manager) VALUES ("${employeeFName}", "${employeeLName}", "${employeeJobTitle}", "${employeeDepartment}", "${employeeSalary}", "${employeeManager}")`,
                                              function (err, results, fields) {
                                                if (err) throw err;
                                                console.log(
                                                  "Added successfully!"
                                                );
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
                                                    if (
                                                      answers.navmenu ==
                                                      "Go Back to Main Menu"
                                                    ) {
                                                      initialPrompt();
                                                    }
                                                  });
                                              }
                                            );
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  }
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
