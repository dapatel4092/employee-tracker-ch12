USE employeedb;
Insert into Departments(Name) value("sales"),("marketing"),("IT"),("Managment");

Insert into role(title,salary,department_id) value("Sales associate ",12999,1),("Sales lead",74239,1),("Sales manager",129312,1),("marketing associate ",12999,2),("marketing lead",74239,2),("marketing manager",129312,2),("IT associate", 12999,3),("IT lead",74239,3),("IT manager",129312,3),("Managment associate", 12999,4),("Managment lead",74239,4),("Managment manager",129312,4);

Insert into employee(first_name,last_name,role_id,manager_id) values
('Dhruv','Patel',3,NULL),
('Rob', 'Smith', 1,1 ),
('Jake', 'Rogan',2,1),
('Billy','Bob',1,1);
('jenifer','gray',4,4)

