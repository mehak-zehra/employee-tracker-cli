-- Department table
Create table departments (
department_id Integer auto_increment Primary Key Not null,
department_name Varchar(30) Not null
);

Create table roles (
role_id Integer auto_increment Primary Key Not null,
job_title Varchar(30) Not null,
department_id Integer Not null,
salary Decimal,
Foreign Key (department_id)
References departments(department_id)
);

Create table employees (
employee_id Integer auto_increment Primary Key Not null,
first_name Varchar(30) Not null,
last_name Varchar(30) Not null,
role_id Integer Not null,
manager_name Varchar(30),
Foreign Key (role_id)
References roles(role_id)
);


