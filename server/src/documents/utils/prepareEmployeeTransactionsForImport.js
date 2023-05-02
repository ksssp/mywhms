// this file is to prepare jsons for upload
const employeeTransactions = require('../fullData/employeeTransactions.json');
var fs = require('fs');
var { DateTime } = require ('luxon');
var employeeRepository = require ('../../repositories/employee.repository');
var employeeTransactionTypeRepository = require ('../../repositories/employeeTransactionType.repository');
var outputJson = {};
var formattedEmployeeTransactions = [];

employeeRepository.getEmployees().then(response => {
    let employees = JSON.parse(JSON.stringify(response));
    let employeeMap = new Map();

    employees.forEach(employee => {
        employeeMap.set(employee.employeeCode, employee);
    });

    employeeTransactionTypeRepository.getEmployeeTransactionTypes().then(response => {
        let employeeTransactionTypes = JSON.parse(JSON.stringify(response));
        let transactionTypeMap = new Map();

        employeeTransactionTypes.forEach(transactionType => {
            transactionTypeMap.set(transactionType.employeeTransactionType, transactionType);
        });
        
        employeeTransactions.forEach(element => {
            console.log('employeeCode: ', element.employee_employeeCode);
            let employee = employeeMap.get(element.employee_employeeCode);
            let transactionType = transactionTypeMap.get(element.employeeTransactionType);
            var formattedEmployeeTransaction = {
                "transactionDate": DateTime.fromFormat(element.transactionDate, 'm/d/yyyy'),
                "employee" : {
                    "employeeId": employee._id,
                    "employeeFullName": employee.employeeFullName
                },
                "employeeTransactionType": {
                    "employeeTransactionTypeId": transactionType._id,
                    "employeeTransactionType": transactionType.employeeTransactionType
                },
                "transactionDetails": element.transactionNotes,
                "transactionMode": element.transactionMode,
                "amount": element.amount
            }
            formattedEmployeeTransactions.push(formattedEmployeeTransaction);
        });

        fs.writeFile('../fullData/employeeTransactionsMasterListReady.json', JSON.stringify(formattedEmployeeTransactions), 'utf8', function(err) {
            if (err) throw err;
            console.log('file write complete with object count: ', formattedEmployeeTransactions.length);
        });
    });
});