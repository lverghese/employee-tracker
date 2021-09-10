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
      console.log('Showing all departments.')
    }

    if (choices === 'View all roles') {
      console.log('Showing all roles.')
    }
    if (choices === 'View all employees') {
      console.log('Showing all employees.')
    }
    if (choices === 'Add a role') {
      console.log('Please type a role to add.')
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
}
//View all roles function

//View all employees function

//Add a role function

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