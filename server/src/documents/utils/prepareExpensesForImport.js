// this file is to prepare jsons for upload
const expenses = require('../fullData/expenses.json');
var fs = require('fs');
var { DateTime } = require ('luxon');
var employeeRepository = require ('../../repositories/employee.repository');
var expenseTypeRepository = require ('../../repositories/expenseType.repository');
var formattedExpenses = [];

employeeRepository.getEmployees().then(response => {
    let employees = JSON.parse(JSON.stringify(response));
    let employeeMap = new Map();

    employees.forEach(employee => {
        employeeMap.set(employee.employeeCode, employee);
    });

    expenseTypeRepository.getExpenseTypes().then(response => {
        let expenseTypes = JSON.parse(JSON.stringify(response));
        let transactionTypeMap = new Map();

        expenseTypes.forEach(transactionType => {
            transactionTypeMap.set(transactionType.expenseType, transactionType);
        });
        
        expenses.forEach(element => {
            console.log('expenseType: ', element.expenseType, ' employeeCode: ', element.employee_employeeCode);
            let transactionType = transactionTypeMap.get(element.expenseType);
            var formattedExpense = {
                "transactionDate": DateTime.fromFormat(element.transactionDate, 'm/d/yyyy'),
                "employee": null,
                "expenseType": {
                    "expenseTypeId": transactionType._id,
                    "expenseType": transactionType.expenseType
                },
                "transactionDetails": element.transactionDetails,
                "transactionMode": 'Payment',
                "amount": element.amount
            };
            if(element.expenseType == 'Salaries paid to Staff') {
                let employee = employeeMap.get(element.employee_employeeCode);
                formattedExpense.employee = {
                    "employeeId": employee._id,
                    "employeeFullName": employee.employeeFullName
                }
            }
           
            formattedExpenses.push(formattedExpense);
        });

        fs.writeFile('../fullData/expensesMasterListReady.json', JSON.stringify(formattedExpenses), 'utf8', function(err) {
            if (err) throw err;
            console.log('file write complete with object count: ', formattedExpenses.length);
        });
    });
});