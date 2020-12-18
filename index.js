const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
require("console.table");

const answers = [
    {
        message: "What would you like to Do?",
        name: 'usersChoice',
        type: 'list',
        choices: [{
                name: "View All Employees",
                value: 1
            },{
                name: "Add Employee",
                value: 2
            },{
                name: "Update Employee Role",
                value: 3
            },{
                name: "Show All Roles",
                value: 4
            },{
                name: "Add Role",
                value: 5
            },{
                name: "Show All Departments",
                value: 6
            },{
                name: "Add Deparment",
                value: 7
            },{
                name: "End Application",
                value: 8
            },
        ]
    }
];

start()

function start() {
    const logoImage = logo({ name: "Employee Tracker"}).render();
    console.log(logoImage);
    promptUser();
};

function promptUser() {
    console.log("propmpt")
    inquirer.prompt(answers).then(function(answers) {
        console.log('Test', answers)
        
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
            })
            .catch(function(err) {
                console.log(err)
            })
}
        
async function showEmployees() {
    let workers;
    try {
        workers = await db.findEveryEmployee();
    } catch(err) {
        console.log(err);
    }
    console.log("\n");
    console.table(workers);
    promptUser();
}
        
async function addEmployee() {
    let jobs;
    try {
    jobs = await db.findAllRoles();
    } catch(err) {
        console.log(err)
    }
    const jobOptions = jobs.map(({ id, title}) => ({
        name: title,
        value: id
    }
    ));    

    let worker;
    try {
        worker = await inquirer.prompt([
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
            choices: jobOptions
        }
    ])} catch(err) {
        console.log(err)
    }

    let newWorker;
    try {
        newWorker = await db.insertEmployee(worker);
    } catch(err) {
        console.log("Couldn't Add Employee");
    }
    console.log("Successfully Added Employee to the Database");
    
    promptUser();
}

async function updateEmployeeJob() {
    let workers;
    try {
        workers = await db.findEveryEmployee();
    } catch(err) {
        console.log('Could not find Employees');
    }

    const empolyeeOptions = workers.map(({ id, first_name, last_name }) => ({
        name:  `${first_name} ${last_name}`,
        value: id
    }))

    let workerId;
    try {
        workerId = await inquirer.prompt([
        {
            type: "list",
            message: "Which Employee do you want to Delete",
            name: "employeeId",
            choices: empolyeeOptions
        }
    ])} catch(err) {
        console.log('Could not update Job')
    }

    let jobs;
    try {
        jobs = await db.findAllRoles();
    } catch(err) {
        console.log(err);
    }

    const jobOptions = jobs.map(({ id, title}) => ({
        name: title,
        value: id
    }
    ));

    let jobId;
    try {
        jobId = await inquirer.prompt([
        {
            type: "List",
            name: "roleId",
            message: "Which Role do you want to give this employee?",
            choices: jobOptions
        }
    ])} catch(err) {
        console.log(err);
    }

    let updatedJob;
    try {
        updatedJob = await db.updateEmployeeJob(jobId, workerId);

    } catch(err) {
        console.log("Couldn't Update Job")
    }

    console.log("Updated Job");
    

    promptUser();
}
async function showRoles() {
    let jobs;
    try {
        jobs = await db.findAllRoles();
    } catch (err) {
        console.log(err)
    }
    
    console.log('\n');
    console.table(jobs);
    promptUser()
}

async function addRole() {
    let departments;
    try {
    departments = await db.findEveryDepartment();
    } catch(err) {
        console.log(err)
    }
    const departmentOptions = departments.map(({ id, title}) => ({
        name: title,
        value: id
    }
    ));

    let job;
    try {
        job = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the role you want to add?',
                name: 'role'
            },{
                type: 'list',
                message: 'Please choose which department this job is in.',
                name: 'department',
                choices: departmentOptions
            }])
    } catch (err) {
        console.log(err);
    }
    
    let newJob;
    try {
        console.log(job)
        newJob = await db.createRole(job)
    } catch(err) {
        console.log('Could not add Role')
    }

    promptUser();
}

async function showDepartments() {
    let departments;
    try {
        departments = await db.findEveryDepartment();
    } catch(err) {
        console.log(err);
    }
    console.log('\n');
    console.table(departments);
    promptUser();
}



async function addDepartment() {
    let jobs;
    try {
        jobs = await db.findAllRoles();
    } catch(err) {
        console.log('Could not get Jobs')
    }

    const jobOptions = roles.map(({ id, title}) => ({
        name: title,
        value: id
    }
    ))

    let department;
    try {
        department = await inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the department you want to add.',
                name: "department"
            },{
                type: 'list',
                message: 'Please choose a what role you want to assign to the department?.',
                name: 'roleId',
                choices: jobOptions
            }
        ])
    } catch (err) {
        console.log(err);
    }
}