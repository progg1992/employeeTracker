const db_connection = require('./connection');

class Database {
    
    constructor(db_connection) {
    this.db_connection = db_connection;
    }

    findEveryEmployee() {
        return this.db_connection.query(
            "SELECT employee.id, employee.first_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager FROM  employee LEFT JOIN role on employee.role_id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        )
    }

    insertEmployee(worker) {
        return this.db_connection.query("INSERT INTO employee SET ?", worker);
    }

    updateEmployeeJob(jobId, workerId) {
        return this.db_connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [jobId, workerId]
        );
    }

    findAllRoles() {
        return this.db_connection.query(
            "SELECT role.title, department.name FROM role LEFT JOIN department ON role.department_id = department.id"
        );
    }

    createRole(role) {
        return this.db_connection.query("INSERT INTO role SET ?", role);
    }

    findEveryDepartment() {
        return this.db_connection.query(
            "SELECT department.id, department.name FROM employees LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
    }

    insertDepartment(department) {
        return this.db_connection.query("INSERT INTO department SET ?", department);
    }
}

module.exports = new Database(db_connection);