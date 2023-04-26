// this file is to prepare jsons for upload
const bankAccountTransactions = require('../fullData/bankAccountTransactions.json');
var fs = require('fs');
var { DateTime } = require ('luxon');

var outputJson = {};
var formattedBankAccountTransactions = [];

bankAccountTransactions.forEach(element => {
    var formattedBankAccountTransaction = {
        "transactionDate": DateTime.fromFormat(element.transactionDate, 'm/d/yyyy'),
        "bankAccount": {
            "bankAccountId": element.bankAccount_bankAccountId,    
            "bankAccountName": element.bankAccount_bankAccountName
        },
        "amount": element.amount,
        "transactionMode": element.transactionMode,
        "transactionDetails": element.transactionDetails
    }
    formattedBankAccountTransactions.push(formattedBankAccountTransaction);
});

fs.writeFile('../fullData/bankAccountTransactionsMasterListReady.json', JSON.stringify(formattedBankAccountTransactions), 'utf8', function(err) {
    if (err) throw err;
    console.log('file write complete with object count: ', formattedBankAccountTransactions.length);
});