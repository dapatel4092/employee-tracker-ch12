const inquirer = require('inquirer');
const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
 user: 'root',
  password: 'JackandJillwentupthehill!',
  database: 'employeedb',
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the employee database.');
  startApp();
});

// Function to start the application
function startApp() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Update an employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Goodbye!');
          connection.end();
          break;
        default:
          console.log('Invalid action.');
          startApp();
      }
    });
}

// Function to view all departments
function viewDepartments() {
  connection.query('SELECT * FROM Departments', (err, res) => {
    if (err) throw err;
    console.table(res);
    startApp();
  });
}

// Function to view all roles
function viewRoles() {
  connection.query(
    'SELECT r.id, r.title, r.salary, d.Name AS department FROM role AS r INNER JOIN Departments AS d ON r.department_id = d.id',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp();
    }
  );
}

// Function to view all employees
function viewEmployees() {
  connection.query(
    'SELECT e.id, e.first_name, e.last_name, r.title AS job_title, d.Name AS department, r.salary, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN Departments AS d ON r.department_id = d.id LEFT JOIN employee AS m ON e.manager_id = m.id',
    (err, res) => {
      if (err) throw err;
      console.table(res);
      startApp();
    }
  );
}

// Function to add a department
function addDepartment() {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:',
    })
    .then((answer) => {
      connection.query(
        'INSERT INTO Departments SET ?',
        { Name: answer.name },
        (err) => {
          if (err) throw err;
          console.log('Department added successfully!');
          startApp();
        }
      );
    });
}

// Function to add a role
function addRole() {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the title of the role:',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary for the role:',
      },
      {
        name: 'department_id',
        type: 'input',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answers) => {
      connection.query(
        'INSERT INTO role SET ?',
        {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.department_id,
        },
        (err) => {
          if (err) throw err;
          console.log('Role added successfully!');
          startApp();
        }
      );
    });
}

// Function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: "Enter the employee's first name:",
      },
      {
        name: 'last_name',
        type: 'input',
        message: "Enter the employee's last name:",
      },
      {
        name: 'role_id',
        type: 'input',
        message: "Enter the employee's role ID:",
      },
      {
        name: 'manager_id',
        type: 'input',
        message: "Enter the employee's manager ID:",
      },
    ])
    .then((answers) => {
      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: answers.role_id,
          manager_id: answers.manager_id,
        },
        (err) => {
          if (err) throw err;
          console.log('Employee added successfully!');
          startApp();
        }
      );
    });
}

// Function to update an employee role
function updateEmployeeRole() {
  connection.query('SELECT * FROM employee', (err, employees) => {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: 'employee_id',
          type: 'list',
          message: 'Select an employee to update their role:',
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
        {
          name: 'role_id',
          type: 'input',
          message: 'Enter the new role ID for the employee:',
        },
      ])
      .then((answers) => {
        connection.query(
          'UPDATE employee SET role_id = ? WHERE id = ?',
          [answers.role_id, answers.employee_id],
          (err) => {
            if (err) throw err;
            console.log('Employee role updated successfully!');
            startApp();
          }
        );
      });
  });
}



