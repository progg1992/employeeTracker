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

    findEveryManager(employeeId) {
        return this.db_connection.query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?", employeeId
        );
    }

    insertEmployee(employee) {
        return this.db_connection.query("INSERT INTO employee SET ?", employee);
    }

    removeEmployee(employeeId) {
        return this.db_connection.query(
            "DELETE FROM employee WHERE id = ?", employeeId
        )
    }

    updateEmployeeJob(roleId, employeeId) {
        return this.db_connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?", [roleId, employeeId]
        );
    }

    updateEmployeeManager() {
        return this.db_connection.query(
            "UPDATE employee SET manager_id = ? WHERE id =?", [managerId, employeeId]
        );
    }
    // join with departments to display department name
    findAllRoles() {
        return this.db_connection.query(
            "SELECT role.title, department.name FROM role LEFT JOIN department ON role.department_id = department.id"
        );
    }

    createRole(role) {
        return this.db_connection.query("INSERT INTO role SET ?", role);
    }

    removeRole(roleId) {
        return this.db_connection.query("DELETE FROM role WHERE id = ?", roleId);
    }

    findEveryDepartment() {
        return this.db_connection.query(
            "SELECT department.id, department.name, SUM(role.salary) S utilized_budget FROM employees LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
    }

    insertDepartment(department) {
        return this.db_connection.query("INSERT INTO department SET ?", department);
    }

    deleteDepartment(departmentId) {
        return this.db_connection.query("DELETE FROM department WHERE id = ?", departmentId);
    }
    // join with roles to display role titles
    // findAllEmployeesByDepartment(departmentId) {
    //     return this.db_connection.query(
    //         "", departmentId
    //     );
    // }
    // join with departments and roles to display titles and department names
    //  findAllEmployeesByManager(managerId) {
    //      return this.db_connection.query(
    //          "", managerId
    //      );
    // }
}

module.exports = new Database(db_connection);