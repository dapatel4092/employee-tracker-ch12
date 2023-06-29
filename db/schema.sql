drop Database if exists employeedb;
create Database employeedb;
USE employeedb;
create table Departments(
    id int Primary key auto_increment,
    Name Varchar(30)

);
Create table role(
    id INT Primary key auto_increment,
    title Varchar(30),
    salary Decimal,
    department_id INT references Departments(id)

);
create table employee(
id INT Primary  key auto_increment, 
first_name Varchar(30),
last_name Varchar(30),
role_id INT references  role(id),
manager_id INT references employee(id) on delete set null


);