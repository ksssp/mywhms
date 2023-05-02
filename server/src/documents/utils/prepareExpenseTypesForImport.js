// this file is to prepare jsons for upload
const expenseTypes = require('../fullData/expenseTypes.json');
var fs = require('fs');
var { DateTime } = require ('luxon');

var outputJson = {};
var formattedExpenseTypes = [];

expenseTypes.forEach(element => {
    var formattedExpenseType = {
        "expenseType": element.expenseType,
        "expenseCategory": element.expenseCategory,
        "creationDate": DateTime.fromFormat(element.creationDate, 'yyyy-mm-dd'),
        "lastModifiedDate": DateTime.fromFormat(element.creationDate, 'yyyy-mm-dd'),
        "activeFrom": DateTime.fromFormat(element.activeFrom, 'yyyy-mm-dd'),
        "activeUntil": DateTime.fromFormat(element.activeUntil, 'yyyy-mm-dd')
    }
    formattedExpenseTypes.push(formattedExpenseType);
});

fs.writeFile('../fullData/expenseTypesMasterListReady.json', JSON.stringify(formattedExpenseTypes), 'utf8', function(err) {
    if (err) throw err;
    console.log('file write complete with object count: ', formattedExpenseTypes.length);
});