DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(255) NOT NULL,
    role_department INT NOT NULL,
    role_salary INT NOT NULL,
    PRIMARY KEY (role_id),
    FOREIGN KEY (role_department) REFERENCES departments(department_id)
);

CREATE TABLE employees (
    employee_id INT NOT NULL AUTO_INCREMENT,
    employee_first_name VARCHAR(100) NOT NULL,
    employee_last_name VARCHAR(100) NOT NULL,
    employee_job_title VARCHAR(255) NOT NULL,
    employee_department VARCHAR(255) NOT NULL,
    employee_salary VARCHAR(255) NOT NULL,
    employee_manager VARCHAR(255),
    PRIMARY KEY (employee_id)
)