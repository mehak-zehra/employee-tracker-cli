// const { query } = require('express');
//const { listenerCount } = require('events');
// const mysql = require('mysql2');
// const { resolve } = require('path');
const dbConnection = require('./connection.js');



function viewAllDepartments() {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM departments"
        const params = [];
        let db = dbConnection();

        db.query(sql, params, function (err, results) {
            if (err) reject(err)
            resolve(results)
        });
        db.end();
    })
}

function viewAllRoles() {
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM roles"
        const params = [];
        let db = dbConnection();

        db.query(sql, params, function (err, results) {
            if (err) reject(err)
            resolve(results);
        });
        db.end();
    })
}

function viewAllEmployees() {
    return new Promise((resolve, reject) => {
        let sql = "Select employee_id, first_name, last_name, employees.role_id, manager_name, roles.salary, roles.job_title, roles.department_id from employees, roles where employees.role_id = roles.role_id;"
        const param = [];
        let db = dbConnection();

        db.query(sql, param, function (err, results) {
            if (err) reject(err)
            resolve(results);
        });
        db.end();
    })
}

function addDepartment(item) {

    let sql = "INSERT INTO departments(department_name) VALUES(?)"
    const params = [item.departmentName];
    let db = dbConnection();


    db.query(sql, params, function (err, results) {
        console.log(results);
    });
    db.end();
}

function getDepartmentId(name) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT department_id FROM departments WHERE department_name = ? LIMIT 1"
        const params = [name];
        let db = dbConnection();


        db.query(sql, params, function (err, results) {
            if (err) reject(err)
            resolve(results);
        });
        db.end();
    })
}

function getRoleId(jobTitle) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT role_id FROM roles WHERE job_title =? LIMIT 1"
        const params = [jobTitle];
        let db = dbConnection();


        db.query(sql, params, function (err, results) {
            if (err) reject(err)
            resolve(results)
        })
        db.end();
    })
}

function getEmployeeId(managerName) {
    return new Promise((resolve, reject) => {
        let sql = "SELECT employee_id FROM employees WHERE manage_name = ? LIMIT 1"
        const params = [managerName]
        let db = dbConnection();


        db.query(sql, params, function (err, results) {
            if (err) rejects(err)
            resolve(results);
        })
        db.end();

    })
}

// change the input to take 3 params, and don't forget to change all the spots where the item.XXXX was used. 
function addRole(item) {
    return new Promise((resolve, reject) => {
        getDepartmentId(item.departmentName).then((row) => {
            console.log(row)
            let departmentId = row[0].department_id;
            console.log(departmentId)

            let sql = "INSERT INTO roles(job_title, department_id, salary) VALUES (?,?,?)"
            const params = [item.jobTitle, departmentId, item.salary];
            let db = dbConnection();


            db.query(sql, params, function (err, results) {
                if (err) reject(err)
                resolve(results)
            });
            db.end();
        }).catch((e) => {
            console.log(e)
        })
    })
}

function addEmployee(item) {
    return new Promise((resolve, reject) => {
        getRoleId(item.jobTitle).then((row) => {
            
            let roleId = row[0].role_id

            let sql = "INSERT INTO employees(first_name, last_name, role_id, manager_name) VALUES (?,?,?,?)"
            const params = [item.firstName, item.lastName, roleId, item.managerName];
            let db = dbConnection();


            db.query(sql, params, function (err, results) {
                if (err) reject(err)
                resolve(results);
            });
            db.end();

        })
    })
}

function updateEmployeeRole(employeeName, newRole) {
    return new Promise((resolve, reject) => {
        let sql = "Update employees, roles Set employees.role_id = roles.role_id Where employees.first_name = ? AND roles.job_title = ?"
        const params = [employeeName, newRole]
        let db = dbConnection();

        db.query(sql, params, function(err, results)  {
            if(err) reject (err)
            resolve(results);
        })
        db.end();
    })
}


module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
}
