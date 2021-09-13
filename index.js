const inquirer = require ('inquirer');
const myDbFunctions = require('./src/dbFunctions')

const startOptions = [ 
    {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?', 
        choices: [
            'view all departments', 
            'view all roles', 
            'view all employees',
            'add a department', 
            'add a role', 
            'add an employee', 
            'update an employee role',
            'close the application'
        ]
    }
];

function startApplication() {

    inquirer.prompt(startOptions).then((selections) => {

        if(selections.action == 'view all departments') {
            myDbFunctions.viewAllDepartments().then((rows) => {
                console.log("------------------------------------------------------");
                console.log("DEPARTMENT ID \t\t DEPARTMENT NAME");
                console.log("------------------------------------------------------");
                        
                for(var i = 0; i < rows.length; i++) {
                    console.log("\t "+ rows[i].department_id + " \t \t " + rows[i].department_name)
                }
            })
        } else if(selections.action == 'view all roles') {
            myDbFunctions.viewAllRoles().then((rows) => {
                console.log("---------------------------------------------------------------------------------------------------");
                console.log(formatting("ROLE ID") + formatting("JOB TITLE") + formatting("DEPARTMENT ID") + formatting("SALARY"));
                console.log("---------------------------------------------------------------------------------------------------");

                for(var i = 0; i < rows.length; i++) {
                    console.log(formatting(rows[i].role_id ) + formatting(rows[i].job_title) + formatting(rows[i].department_id) + formatting(rows[i].salary))
                }
            })
            //employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
        } else if(selections.action == 'view all employees') {
            myDbFunctions.viewAllEmployees().then((rows) => {
                console.log("----------------------------------------------------------------------------------------------------------------------------------------");
                console.log(formatting("EMPLOYEE ID")+formatting("FIRST NAME")+ formatting("LAST NAME")+ formatting("JOB TITLE")+formatting("DEPARTMENT")+formatting("SALARY")+formatting("MANAGER"));
                console.log("----------------------------------------------------------------------------------------------------------------------------------------");

                for (var i = 0; i < rows.length; i++) {
                    let row = rows[i];
                    console.log(formatting(row.employee_id) + formatting(row.first_name)+ formatting(row.last_name) + formatting(row.job_title)+ formatting(row.department_id)+ formatting(row.salary)+ formatting(row.manager_name));
                }
            })
        } else if(selections.action == 'add a department') { 
            inquirer.prompt({
                    type: 'input',
                    name: 'departmentName',
                    message:'What is your new department name?'})
            .then((answer) => {
                myDbFunctions.addDepartment(answer);
            })
        } else if(selections.action == 'add a role') {
            myDbFunctions.viewAllDepartments().then((myArr) => {
                let depNamesArr = [];
                for(var i = 0; i < myArr.length; i++){
                   depNamesArr.push(myArr[i].department_name);
                }
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'jobTitle',
                        message: "What is the new role you want to add?",
                        validate: (input) => {
                            if(input.length > 20) {
                                console.log(" Too many characters for job title")
                                return false
                            } else {
                                return true
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'departmentName',
                        message: 'Enter department for your new role',
                        choices: depNamesArr
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Enter is the salary for your new role?'
                    }
                ])
                .then ((answers) => {
                    myDbFunctions.addRole(answers).then((something) => {
                        console.log(something)
                    }).catch((e) => {
                        console.log(e)
                    })
                })
            })
        } else if(selections.action == 'add an employee') { 
            myDbFunctions.viewAllRoles().then((myArr) => {
                let jobTitleArr = [];
                for(var i = 0; i < myArr.length; i++){
                    jobTitleArr.push(myArr[i].job_title);
                }
                
                myDbFunctions.viewAllEmployees().then((myManagers) => {
                    let myManagersArr = [];
                    for(var i = 0; i < myManagers.length; i++){
                        myManagersArr.push(myManagers[i].first_name);
                    }

                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'firstName',
                            message: "What is your employee's first name?"
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: "What is your employee's last name?"
                        },
                        {
                            type: 'list',
                            name: 'jobTitle',
                            message: 'Enter role for your new employee',
                            choices: jobTitleArr
                        },
                        {
                            type: 'list',
                            name: 'managerName',
                            message: 'What is your manager name?',
                            choices: myManagersArr
                        }
                    ])
                    .then((answers) => {
                        myDbFunctions.addEmployee(answers).then((something) => {
                            console.log(something);
                        }) .catch((e)=> {
                            console.log(e);
                        })
                    })
                })
            })
        } else if(selections.action == 'update an employee role') {
            myDbFunctions.viewAllEmployees().then((myEmployees)=> {
                let employeesArr = myEmployees;
                let employeeNameArr = []
                for (var i = 0; i < myEmployees.length; i++) {
                    employeeNameArr.push(myEmployees[i].first_name)
                }
                inquirer.prompt ({
                    type: 'list',
                    name: 'employeeNames',
                    message: "Which employee's role you want to update?",
                    choices: employeeNameArr
                })
                .then((answers) => {
                    myDbFunctions.viewAllRoles().then((myArr) => {
                        let jobTitleArr = [];
                        for(var i = 0; i < myArr.length; i++){
                            jobTitleArr.push(myArr[i].job_title);
                        }
                    
                    inquirer.prompt({
                            type: "list",
                            name: "newRole",
                            message: "what is this employee's new role?",
                            choices: jobTitleArr
                        }).then((input) => {
                            myDbFunctions.updateEmployeeRole(answers.employeeNames, input.newRole).then((results) => {
                                console.log(results);            
                            })
                        })
                    })
                })              
            })
        } else {

        }
    });
}; 

function formatting(input) {
    let maxLength = 20;

    var a = input + Array(maxLength - input.toString().length).fill('\xa0').join('')
    return a
}

 startApplication();
