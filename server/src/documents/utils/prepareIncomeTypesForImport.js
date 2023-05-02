// this file is to prepare jsons for upload
const incomeTypes = require('../fullData/incomeTypes.json');
var fs = require('fs');
var { DateTime } = require ('luxon');

var outputJson = {};
var formattedIncomeTypes = [];

incomeTypes.forEach(element => {
    var formattedIncomeType = {
        "incomeType": element.incomeType,
        "incomeCategory": element.incomeCategory,
        "incomeSource": element.incomeSource,
        "creationDate": DateTime.fromFormat(element.creationDate, 'yyyy-mm-dd'),
        "lastModifiedDate": DateTime.fromFormat(element.creationDate, 'yyyy-mm-dd'),
        "activeFrom": DateTime.fromFormat(element.activeFrom, 'yyyy-mm-dd'),
        "activeUntil": DateTime.fromFormat(element.activeUntil, 'yyyy-mm-dd')
    }
    formattedIncomeTypes.push(formattedIncomeType);
});

fs.writeFile('../fullData/incomeTypesMasterListReady.json', JSON.stringify(formattedIncomeTypes), 'utf8', function(err) {
    if (err) throw err;
    console.log('file write complete with object count: ', formattedIncomeTypes.length);
});