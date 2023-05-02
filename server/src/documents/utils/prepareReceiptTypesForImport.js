// this file is to prepare jsons for upload
const receiptTypes = require('../fullData/receiptTypes.json');
var fs = require('fs');
var { DateTime } = require ('luxon');

var outputJson = {};
var formattedReceiptTypes = [];

receiptTypes.forEach(element => {
    var formattedReceiptType = {
        "receiptType": element.receiptType,
        "receiptCategory": element.receiptCategory,
        "receiptSource": element.receiptSource,
        "creationDate": DateTime.fromFormat(element.creationDate, 'yyyy-mm-dd'),
        "lastModifiedDate": DateTime.fromFormat(element.creationDate, 'yyyy-mm-dd'),
        "activeFrom": DateTime.fromFormat(element.activeFrom, 'yyyy-mm-dd'),
        "activeUntil": DateTime.fromFormat(element.activeUntil, 'yyyy-mm-dd')
    }
    formattedReceiptTypes.push(formattedReceiptType);
});

fs.writeFile('../fullData/receiptTypesMasterListReady.json', JSON.stringify(formattedReceiptTypes), 'utf8', function(err) {
    if (err) throw err;
    console.log('file write complete with object count: ', formattedReceiptTypes.length);
});