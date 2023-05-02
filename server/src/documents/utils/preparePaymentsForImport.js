// this file is to prepare jsons for upload
const payments = require('../fullData/payments.json');
var fs = require('fs');
var { DateTime } = require ('luxon');
var employeeRepository = require ('../../repositories/employee.repository');
var paymentTypeRepository = require ('../../repositories/paymentType.repository');
var formattedPayments = [];

employeeRepository.getEmployees().then(response => {
    let employees = JSON.parse(JSON.stringify(response));
    let employeeMap = new Map();

    employees.forEach(employee => {
        employeeMap.set(employee.employeeCode, employee);
    });

    paymentTypeRepository.getPaymentTypes().then(response => {
        let paymentTypes = JSON.parse(JSON.stringify(response));
        let transactionTypeMap = new Map();

        paymentTypes.forEach(transactionType => {
            transactionTypeMap.set(transactionType.paymentType, transactionType);
        });
        
        payments.forEach(element => {
            console.log('paymentType: ', element.paymentType, ' employeeCode: ', element.employee_employeeCode);
            let transactionType = transactionTypeMap.get(element.paymentType);
            var formattedPayment = {
                "transactionDate": DateTime.fromFormat(element.transactionDate, 'm/d/yyyy'),
                "employee": null,
                "paymentType": {
                    "paymentTypeId": transactionType._id,
                    "paymentType": transactionType.paymentType
                },
                "transactionDetails": element.transactionDetails,
                "transactionMode": 'Payment',
                "amount": element.amount
            };
            if(element.paymentType == 'Salaries paid to Staff') {
                let employee = employeeMap.get(element.employee_employeeCode);
                formattedPayment.employee = {
                    "employeeId": employee._id,
                    "employeeFullName": employee.employeeFullName
                }
            }
           
            formattedPayments.push(formattedPayment);
        });

        fs.writeFile('../fullData/paymentsMasterListReady.json', JSON.stringify(formattedPayments), 'utf8', function(err) {
            if (err) throw err;
            console.log('file write complete with object count: ', formattedPayments.length);
        });
    });
});