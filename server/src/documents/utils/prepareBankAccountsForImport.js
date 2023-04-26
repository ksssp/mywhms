// this file is to prepare jsons for upload
const bankAccounts = require('../fullData/bankAccounts.json');
var fs = require('fs');
var { DateTime } = require ('luxon');

var outputJson = {};
var formattedBankAccounts = [];

bankAccounts.forEach(element => {
    var formattedBankAccount = {
        "bankAccountName": element.bankAccountName,
        "bankName": element.bankName,
        "bankAccountNumber": element.bankAccountNumber,
        "bankBranch": element.bankBranch,
        "creationDate": DateTime.fromFormat(element.creationDate, 'm/d/yyyy'),
        "lastModifiedDate": DateTime.fromFormat(element.creationDate, 'm/d/yyyy'),
        "activeFrom": DateTime.fromFormat(element.activeFrom, 'm/d/yyyy'),
        "activeUntil": DateTime.fromFormat(element.activeUntil, 'm/d/yyyy')
    }
    formattedBankAccounts.push(formattedBankAccount);
});

fs.writeFile('../fullData/bankAccountsMasterListReady.json', JSON.stringify(formattedBankAccounts), 'utf8', function(err) {
    if (err) throw err;
    console.log('file write complete with object count: ', formattedBankAccounts.length);
});