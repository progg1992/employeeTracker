const inquirer = require("inquirer");
const logo = require("asciiart-logo");
require('./controllers');
require("console.table");

start()

function start() {
    const logoImage = logo({ name: "Employee Tracker"}).render();
    console.log(logoImage);
    promptUser();
};

function promptUser() {
    inquirer.prompt(answers).then(function(answers) {        
        switch(answers.usersChoice) {
            case 1:
                showEmployees()
                break;
            case 2:
                addEmployee()
                break;
            case 3:
                updateEmployeeJob()
                break;
            case 4: 
                showRoles()
                break;
            case 5:
                addRole()
                break;
            case 6:
                showDepartments()
                break;
            case 7:
                addDepartment()
                break;
            case 8:
                endApplication()
                default:
                    break;
        }
    }).catch(function(err) {
        console.log(err)
    })
};