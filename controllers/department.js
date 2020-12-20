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

    let department = { department };
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