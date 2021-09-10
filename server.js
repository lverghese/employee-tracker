const express = require('express');
const db = require('./db/connection');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

// apiRoutes = require('./routes/apiRoutes')

const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//inquirer prompt on startup
const promptUser = () => {
  inquirer.prompt ([
    {
      type: 'list',
      name: 'choices',
      message: 'Please choose an action.',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'No action' ]
    }
  ])
  .then((answer) => {
    const { choices } = answer;

    if (choices === 'View all departments') {
      allDepartments();
    }

    if (choices === 'View all roles') {
      allRoles();
    }
    if (choices === 'View all employees') {
      allEmployees();
    }
    if (choices === 'Add a role') {
      addRole();
    }
    if (choices === 'Add an employee') {
      console.log('What is the last name of the employee?')
    }
    if (choices === 'Update an employee role') {
      console.log('Which employee would you like to update the role for?')
    }
    if (choices === 'No action') {
    }
  })





}



//View all departments function
allDepartments = () => {
  console.log('Showing all departments')
      const sql = `SELECT department.id AS id, department.label AS department FROM department`;

      db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
        promptUser();
      })
}


//View all roles function
allRoles = () => {
  console.log('Showing all roles.')
  const sql = `SELECT roles.id, roles.title, department.label AS department
                FROM roles
                INNER JOIN department ON roles.department_id = department.id`;

                db.query(sql, (err, rows) => {
                  if (err) throw err;
                  console.table(rows);
                  promptUser();
                })
}


//View all employees function
allEmployees = () => {
  console.log('Showing all employees')

  //CONCAT to combine the two strings of first and last name
  const sql = `SELECT employee.id, employee.first_name, employee.last_name,
                roles.title, department.label AS department, roles.salary,
                CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee
                LEFT JOIN roles ON employee.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id
                LEFT JOIN employee manager ON employee.manager_id = manager.id`;

                db.query(sql, (err, rows) => {
                  if (err) throw err;
                  console.table(rows);
                  promptUser();
                })
}


//Add a role function
addRole = () => {

  inquirer.prompt([
    {
      type: 'input',
      name: 'typeRole',
      message: 'Please type the role you would like to add.'

    },
    {
      type: 'input',
      name: 'typeSal',
      message: 'What is the salary of this role?'
    }
   

  ])
  .then(answer => {
    const params = [answer.typeRole, answer.typeSal]
    console.log(params);
    //need to get dept
    const roleSql = `SELECT label, id FROM department`;
    console.log(roleSql);
    db.query(roleSql, (err, data) => {
      if (err) throw err;

      const dept = data.map(({ label}) => ({ label: label }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'dept',
          message: 'What department is this role in?',
          choices: dept
        }
      ])
    })
  })
}
//Add an employee function

//Update an employee role








app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('WELCOME TO THE EMPLOYEE TRACKER');
    promptUser();
    app.listen(PORT, () => {
    });
  });