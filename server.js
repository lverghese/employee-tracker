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
      addEmployee();
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

    //need to get depts from the table
    const deptGet = `SELECT label, id FROM department`;
    console.log(deptGet);
    db.query(deptGet, (err, data) => {
      if (err) throw err;

      //displays depts to choose from for user
      const depts = data.map(({ label, id }) => ({ name: label, value: id }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'dept',
          message: 'What department is this role in?',
          choices: depts
        }
      ])

      .then(userChoice => {
        const dept = userChoice.dept;
        console.log(dept);
        params.push(dept);

        //prepared statements for values
        const sql = `INSERT INTO roles (title, salary, department_id)
                     VALUES (?, ?, ?)`;

        db.query(sql, params, (err, result) => {
          if (err) throw err;
          console.log('You added ' + answer.typeRole + ' to roles.');

          allRoles();
        })


      })
    })
  })
}




//Add an employee function
addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'fName',
      message: 'Please type the first name of the employee.'

    },
    {
      type: 'input',
      name: 'lName',
      message: 'Please type the last name of the employee'
    }
  ])
  .then(answer => {
    const picks = [answer.fName, answer.lName]
    console.log(picks);

    //need to get roles from role table
    const rolesGet = `SELECT title, id FROM roles`;
    console.log(rolesGet);
    db.query(rolesGet, (err, data) => {
      if (err) throw err;

      //holds roles to display for user
      const roles = data.map(({ title, id }) => ({ name: title, value: id }));

      //prompt user to choose which role
      inquirer.prompt([
        {
          type: 'list',
          name: 'role',
          message: "Please choose what the employee's role is.",
          choices: roles
        }
      ])
      .then(userChoice => {
        const role = userChoice.role;
        picks.push(role);

        const manSql = 'SELECT * FROM employee';

        db.query(manSql, (err, data) => {
          if (err) throw err;

          //to get list of employees that are a manager
          const mgmt = data.map(({ id, first_name, last_name}) => ({ name: first_name + " " + last_name, value: id }));
          
          inquirer.prompt([

            {
              type: 'list',
              name: 'manager',
              message: "Who is the employee's manager?",
              choices: mgmt

            }
          ])
          .then(mgrChoice => {
            const manager = mgrChoice.manager;
            picks.push(manager);

            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                         VALUES (?, ?, ?, ?)`;

            db.query(sql, picks, (err, result) => {
              if (err) throw err;
              console.log('You added ' + answer.fName + ' ' + answer.lName + ' as an employee.')

              allEmployees();
            })

          })
        })
        
      }) 
    })



  })
}




//Update an employee role
updateEmployee = () => {

  const empGet = `SELECT * FROM employee`;

  //gets list of employees for users to see
  db.query(empGet, (err, data) => {
    if (err) throw err;

    const emps = data.map(({ first_name, last_name, id }) => ({ name: first_name + " " + last_name, value: id }));

    inquirer.prompt([
      
      {
        type: 'list',
        name: 'employees',
        message: 'Which employee would you like to update?',
        choices: emps

      }
      .then(empPick => {
        //saving user pick
        const emp = empPick.employees;
        console.log(emp)
        
        //create empty array for params
        const params = [];
      })
    ])
  })
}







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