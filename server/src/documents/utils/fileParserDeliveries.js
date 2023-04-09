// this file is to prepare jsons for upload
const deliveries = require('./sampleDeliveries.json');
var fs = require('fs');

var outputJson = {};
var formattedDeliveries = [];

deliveries.forEach(element => {
    var formattedDelivery = {
        "lotId": element.lotId,
        "lotNumber": element.lotNumber,
        "trademark": {
            "trademark": element.trademarkTrademark,
            "customerName": element.trademarkCustomerName
        },
        "productName": element.productName,
        "numBagsDelivered": element.numBagsDelivered,
        "numBagsLodged": element.numBagsLodged,
        "numBagsBalance": element.numBagsBalance,
        "locationCodes": element.locationCodes,
        "deliveryDate": element.deliveryDate,
        "lodgementDate": element.lodgementDate,
        "numMonthsLodged": element.numMonthsLodged,
        "transportChargesPaid": element.transportChargesPaid,
        "deliveryChargesReceivable": element.deliveryChargesReceivable,
        "deliveryChargesReceived": element.deliveryChargesReceived,
        "rents": {
            "rentalYear": element.rentsRentalYear,
            "rentalMode": element.rentsRentalMode,
            "totalRentReceivable": element.rentsTotalRentReceivable,
            "totalRentReceived": element.rentsTotalRentReceived
        },
        "vehicleNumber": element.vehicleNumber,
        "driverName": element.driverName,
        "deliveryNotes": element.deliveryNotes
    }
    formattedDeliveries.push(formattedDelivery);
});

fs.writeFile('./fileParserOutput.json', JSON.stringify(formattedDeliveries), 'utf8', function(err) {
    if (err) throw err;
    console.log('file write complete');
});