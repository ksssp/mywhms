// this file is to prepare jsons for upload
const receipts = require('../fullData/receipts.json');
const customerRepository = require('../../repositories/customer.repository');

var fs = require('fs');
var { DateTime } = require ('luxon');

customerRepository.getCustomers().then(response => {
    var customersList = response;
    var customerMap = new Map();
    customersList.forEach(customer => {
        customerMap.set(customer.customerDisplayName, {
            customerId: customer._id,
            customerDisplayName: customer.customerDisplayName
        });
    });

    // fs.writeFile('../fullData/receiptsMasterListReady.json', JSON.stringify([...customerMap]), 'utf8', function(err) {
    //     if (err) throw err;
    //     console.log('file write complete with object count: ', customerMap.size);
    // });
    
    var formattedReceipts = [];
    receipts.forEach(element => {
        let customerDisplayName = element.customer_customerCode + ' ( ' + element.customer_customerName + ' )';
        console.log('customerDisplayName : ', customerDisplayName);
        let elementCustomer = customerMap.get(customerDisplayName);
        var formattedReceipt = {
            "transactionDate": DateTime.fromFormat(element.transactionDate, 'm/d/yyyy'),
            "customer": {
                "customerId": elementCustomer.customerId,    
                "customerDisplayName": elementCustomer.customerDisplayName
            },
            "chargesReceived": element.totalChargesReceived,
            "rentReceived": element.rentReceived,
            "rentDiscount": element.rentDiscount,
            "totalAmountReceived": element.totalAmountReceived,
            "rentalMode": element.rentalMode,
            "rentalYear": element.rentalYear,
            "transactionDetails": element.transactionDetails
        }
        formattedReceipts.push(formattedReceipt);
    });
    
    fs.writeFile('../fullData/receiptsMasterListReady.json', JSON.stringify(formattedReceipts), 'utf8', function(err) {
        if (err) throw err;
        console.log('file write complete with object count: ', formattedReceipts.length);
    });
});

