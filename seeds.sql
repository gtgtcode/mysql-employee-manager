INSERT INTO departments (department_name)
VALUES ("Sales");

SELECT * FROM departments;

INSERT INTO roles (role_name, role_department, role_salary)
VALUES ("Customer Service", 1, 40000);

SELECT * FROM roles;

INSERT INTO employees (employee_first_name, employee_last_name, employee_job_title, employee_department, employee_salary, employee_manager)
VALUES ("John", "Doe", "Customer Service", 1, 40000, "Jack Doe");

SELECT * FROM employees;