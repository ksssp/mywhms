// this file is to prepare jsons for upload
const customers = require('../fullData/customersMasterList.json');
var fs = require('fs');

var outputJson = {};
var formattedCustomers = [];

customers.forEach(element => {
    var formattedCustomer = {
        "customerId": element.customerId,
        "customerCode": element.customerCode,
        "customerName": element.customerName,
        "customerDisplayName": element.customerCode + ' ( '+ element.customerName + ' )',
        "mobileNumber": element.mobileNumber,
        "town": element.town,
        "creationDate": new Date(element.creationDate),
        "lastModifiedDate": new Date(element.creationDate),
        "activeFrom": new Date(element.activeFrom),
        "activeUntil": new Date(element.activeUntil)
    }
    formattedCustomers.push(formattedCustomer);
});

fs.writeFile('../fullData/customersMasterListReady.json', JSON.stringify(formattedCustomers), 'utf8', function(err) {
    if (err) throw err;
    console.log('file write complete with object count: ', formattedCustomers.length);
});