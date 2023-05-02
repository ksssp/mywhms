// this file is to prepare jsons for upload
const paymentTypes = require('../fullData/paymentTypes.json');
var fs = require('fs');
var { DateTime } = require ('luxon');

var outputJson = {};
var formattedPaymentTypes = [];

paymentTypes.forEach(element => {
    var formattedPaymentType = {
        "paymentType": element.paymentType,
        "paymentCategory": element.paymentCategory,
        "creationDate": DateTime.fromFormat(element.creationDate, 'yyyy-mm-dd'),
        "lastModifiedDate": DateTime.fromFormat(element.creationDate, 'yyyy-mm-dd'),
        "activeFrom": DateTime.fromFormat(element.activeFrom, 'yyyy-mm-dd'),
        "activeUntil": DateTime.fromFormat(element.activeUntil, 'yyyy-mm-dd')
    }
    formattedPaymentTypes.push(formattedPaymentType);
});

fs.writeFile('../fullData/paymentTypesMasterListReady.json', JSON.stringify(formattedPaymentTypes), 'utf8', function(err) {
    if (err) throw err;
    console.log('file write complete with object count: ', formattedPaymentTypes.length);
});