//const { findAllEmployeesByDepartment } = require("./db");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require ('./db');
const { findEveryEmployee } = require("./db");
require("console.table");

start()

function start() {
    const logoImage = logo({ name: "Employee Tracker"}).render();
    console.log(logoImage);
    promptUser()
}

async function promptUser() {
    const { answers } = await inquirer.prompt([
    {
        message: "What would you like to Do?",
        name: 'usersChoice',
        type: 'list',
        choices: [{
            name: "View All Employees",
            value: 1
        },{
            name: "View all Employees by Manager",
            value: 2
        },{
            name: "View All Employees by Department",
            value: 3
        },{
            name: "Add Employee",
            value: 4
        },{
            name: "Remove Employee",
            role: 5
        },{
            name: "Update Employee Role",
            value: 6
        },{
            name: "Update Employee Manager",
            value: 7
        },{
            name: "View All Roles",
            value: 8
        },{
            name: "Add Role",
            value: 9,
        },{
            name: "Remove Role",
            value: 10 
        },{
            name: "View All Departments",
            value: 11
        },{
            name: "Add Deparment",
            value: 12
        },{
            name: "Remove Department",
            value: 13
        },{
            name: "Exit",
            value: 14
        }
    ]}
]);

console.log(answers.usersChoice)

switch(usersChoice) {
    case 1:
        return showEmployees();
    case 2:
        return showEmployeesByManager();
    case 3:
        return showEmployeesByDepartment();
    case 4: 
        return
    case 5:
        return deleteEmployee();
    case 6:
        return updateEmployeeJob();
}

}

async function showEmployees() {
    const employees = await db.findEveryEmployee();
    console.log("\n");
    console.table(employees);
    promptUser();
}

async function showEmployeesByManager() {
    const managers = await db.findEveryEmployee();

    const managerOptions = manager.map(({ id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const managerId = await inquirer.prompt([
        {
            type: "list",
            name: "managerId",
            message: "Which Employee's Manager do you want to see?",
            choices: managerOptions
        }
    ]);

    const employees = findEveryEmployeeByManager(managerId);
    console.log("\n");
    console.table(employees);

    promptUser();
}

async function showEmployeesByDepartment() {
    const department = await db.findAllEmployeesByDepartment();
    const departmentOptions = departments.map(({ id, name}) =>({
        name: name,
        value: id
    }));

    const { departmentId } = await inquirer.prompt([
        {
            type: "List",
            name: "departmentId",
            message: "Which Departments Employees Do You Want To See",
            choices: departmentOptions
        }
    ]);

    const employees = await db.findAllEmployeesByDepartment(departmentId);

    console.log("\n");
    console.table(employees);

    promptUser();
}

async function deleteEmployee() {
    const employees = await db.findEveryEmployee();

    const empolyeeOptions = employees.map(({ id, first_name, last_name }) => ({
        name:  `${first_name} ${last_name}`,
        value: id
    }))

    const { employeeId } = await inquirer.prompt([
        {
            type: "list",
            message: "Which Employee do you want to Delete",
            name: "employeeId",
            choices: empolyeeOptions
        }
    ]);

    const employees = await db.deleteEmployee(employeeId);

    console.log("Successfully Deleted Employee from the Database");
    

    promptUser();
}

async function updateEmployeeJob() {
    const employees = await db.findEveryEmployee();
    // Code to use in a view or update function
    const empolyeeOptions = employees.map(({ id, first_name, last_name }) => ({
        name:  `${first_name} ${last_name}`,
        value: id
    }))

    const { employeeId } = await inquirer.prompt([
        {
            type: "list",
            message: "Which Employee do you want to Delete",
            name: "employeeId",
            choices: empolyeeOptions
        }
    ]);

    const roles = await db.findAllRoles();

    const roleOptions = role.map(({ id, title}) => ({
        name: title,
        value: id
    }
    ));

    const { roleId } = await inquirer.prompt([
        {
            type: "List",
            name: "roleId",
            message: "Which Role do you want to give this employee?",
            choices: roleOptions
        }
    ])

    console.log("Updated Employee's Job");
    

    promptUser();
}

async function addEmployee() {
    let roles;
    try {
    roles = await db.findAllRoles();
    } catch(err) {
        console.log(err)
    }
    const roleOptions = roles.map(({ id, title}) => ({
        name: title,
        value: id
    }
    ));    

    const { employee } = await inquirer.prompt([
        {
            type: "input",
            message: "Which is the Employee's first name that you want to add?",
            name: "firstName"
        },{
            type: "input",
            message: "Which is the Employee's last name that you want to add?",
            name: "lastName"
        },{
            type: "list",
            message: "What role do you want to give this employee?",
            name: "roleId",
            choices: roleOptions
        }
    ]);

    const newEmployee = await db.insertEmployee(employee);

    console.log("Successfully Added Employee to the Database");
    

    promptUser();
}