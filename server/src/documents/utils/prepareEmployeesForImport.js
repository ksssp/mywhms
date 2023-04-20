// this file is to prepare jsons for upload
const employees = require('../fullData/employeesMasterList.json');
var fs = require('fs');
var { DateTime } = require ( 'luxon' );

var outputJson = {};
var formattedEmployees = [];

let creationDate = DateTime.now().toISO();

employees.forEach(element => {
    var formattedEmployee = {
        "employeeId": element.employeeId,
        "employeeCode": element.employeeCode,
        "employeeFullName": element.employeeFullName,
        "designation": element.designation,
        "monthlySalary": element.monthlySalary,
        "creationDate": DateTime.fromFormat('2023-04-17', 'yyyy-MM-dd').toISO(),
        "lastModifiedDate": DateTime.fromFormat('2023-04-17', 'yyyy-MM-dd').toISO(),
        "activeFrom": DateTime.fromFormat(element.activeFrom, 'yyyy-MM-dd').toISO(),
        "activeUntil": DateTime.fromFormat(element.activeUntil, 'yyyy-MM-dd').toISO(),
    }
    formattedEmployees.push(formattedEmployee);
});

fs.writeFile('../fullData/employeesMasterListReady.json', JSON.stringify(formattedEmployees), 'utf8', function(err) {
    if (err) throw err;
    console.log('file write complete with object count: ', formattedEmployees.length);
});