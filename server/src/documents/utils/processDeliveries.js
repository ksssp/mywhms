// this file is to prepare jsons for upload
const csvFilePath='../sampleData/sampleLots.csv';
const csv=require('csvtojson');


const trademarkController = require ( "../../controllers/trademark.controller" );
const productController = require ( "../../controllers/product.controller" );
trademarks = trademarkController.getTrademarks();

let productsMap = new Map(); 
productController.getProducts().then((products) => {
    products.forEach(item => {
        productsMap.set(item.productName, item._id);;
    });
    console.log(productsMap.get("Tamarind-Pala 15Kg Bags"));
});

// trademarksMap = {};
// trademarks.forEach(item => {
//     let fullName = item.trademarkName + " ( " + item.customerName + " )";
//     trademarksMap.push({
//         fullName: item
//     });
// });
// console.log(trademarksMap);

// productsMap = {};
// products.forEach(item => {
//     let productFullName = item.productName;
//     productsMap.push({
//         productFullName : item
//     });
// });
// console.log(productsMap);


var fs = require('fs');
csv().fromFile(csvFilePath).subscribe((jsonObject, index) => {
    // let trademarkFullName = jsonObject.trademark.trademarkName + " ( " + jsonObject.trademark.customerName + " )";
    // let productName = jsonObject.product.productName;
    // // jsonObject.trademark.trademarkId = trademarksMap[trademarkFullName].trademarkId;
    // jsonObject.product.productId = productsMap[productName].productId;
    // console.log(jsonObject);
    // fs.writeFile('./sampleDeliveries.json', JSON.stringify(jsonObject), 'utf8', function(err) {
    //     if (err) throw err;
    //     console.log('file write complete');
    // });
});



// var outputJson = {};
// var formattedDeliveries = [];

// deliveries.forEach(element => {
//     var formattedDelivery = {
//         "lotId": element.lotId,
//         "lotNumber": element.lotNumber,
//         "trademark": {
//             "trademark": element.trademarkTrademark,
//             "customerName": element.trademarkCustomerName
//         },
//         "productName": element.productName,
//         "numBagsDelivered": element.numBagsDelivered,
//         "numBagsLodged": element.numBagsLodged,
//         "numBagsBalance": element.numBagsBalance,
//         "locationCodes": element.locationCodes,
//         "deliveryDate": element.deliveryDate,
//         "lodgementDate": element.lodgementDate,
//         "numMonthsLodged": element.numMonthsLodged,
//         "transportChargesPaid": element.transportChargesPaid,
//         "deliveryChargesReceivable": element.deliveryChargesReceivable,
//         "deliveryChargesReceived": element.deliveryChargesReceived,
//         "rents": {
//             "rentalYear": element.rentsRentalYear,
//             "rentalMode": element.rentsRentalMode,
//             "totalRentReceivable": element.rentsTotalRentReceivable,
//             "totalRentReceived": element.rentsTotalRentReceived
//         },
//         "vehicleNumber": element.vehicleNumber,
//         "driverName": element.driverName,
//         "deliveryNotes": element.deliveryNotes
//     }
//     formattedDeliveries.push(formattedDelivery);
// });