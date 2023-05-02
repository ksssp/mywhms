// this file is to prepare jsons for upload
const employeeTransactionTypes = require('../fullData/employeeTransactionTypes.json');
var fs = require('fs');
var { DateTime } = require ('luxon');

var outputJson = {};
var formattedExpenseTypes = [];

employeeTransactionTypes.forEach(element => {
    var formattedExpenseType = {
        "employeeTransactionType": element.employeeTransactionType,
        "debitAllowed": element.debitAllowed == 'TRUE',
        "creditAllowed": element.creditAllowed == 'TRUE',
        "creationDate": DateTime.fromFormat(element.creationDate, 'yyyy-mm-dd'),
        "lastModifiedDate": DateTime.fromFormat(element.creationDate, 'yyyy-mm-dd'),
        "activeFrom": DateTime.fromFormat(element.activeFrom, 'yyyy-mm-dd'),
        "activeUntil": DateTime.fromFormat(element.activeUntil, 'yyyy-mm-dd')
    }
    formattedExpenseTypes.push(formattedExpenseType);
});

fs.writeFile('../fullData/employeeTransactionTypesMasterListReady.json', JSON.stringify(formattedExpenseTypes), 'utf8', function(err) {
    if (err) throw err;
    console.log('file write complete with object count: ', formattedExpenseTypes.length);
});