// this file is to prepare jsons for upload
const deliveries = require('../sampleData/sampleDeliveriesNew.json');
var fs = require('fs');

var outputJson = {};
var formattedDeliveries = [];

deliveries.forEach(element => {
    var formattedDelivery = {
        "lodgementId": element.lodgementId,
        "lotNumber": element.lotNumber,
        "trademark": {
            "trademarkId": element.trademark_trademarkId,
            "trademarkName": element.trademark_trademarkName,
            "customerName": element.trademark_customerName
        },
        "product": {
            "productId": element.product_productId,
            "productName": element.product_productName
        },
        "deliveryDate": new Date(element.deliveryDate),
        "numBagsDelivered": element.numBagsDelivered,
        "numBagsKataCoolie": element.numBagsKataCoolie,
        "numBagsLodged": element.numBagsLodged,
        "numBagsBalance": element.numBagsBalance,
        "locationCodes": element.locationCodes,
        "lodgementDate": new Date(element.lodgementDate),
        "deliveryNotes": element.deliveryNotes,
        "numMonthsLodged": element.numMonthsLodged,
        "transport": {
            "vehicleNumber": element.transport_vehicleNumber,
            "driverName": element.transport_driverName,
        },
        "indicativeCharges": {
            "hamaliCharges": element.indicativeCharges_hamaliCharges,
            "kataCoolieCharges": element.indicativeCharges_kataCoolieCharges,
            "platformCoolieCharges": element.indicativeCharges_platformCoolieCharges,
            "mamulluCharges": element.indicativeCharges_mamulluCharges
        },
        "chargesPaid": {
            "hamaliCharges": element.chargesPaid_hamaliCharges,
            "kataCoolieCharges":element.chargesPaid_kataCoolieCharges,
            "platformCoolieCharges": element.chargesPaid_platformCoolieCharges,
            "mamulluCharges": element.chargesPaid_mamulluCharges,
            "transportCharges": element.chargesPaid_transportCharges,
            "totalChargesPaid": element.chargesPaid_totalChargesPaid,
        },
        "rents": {
            "rentalYear": element.rents_rentalYear,
            "rentalMode": element.rents_rentalMode,
            "indicativeRent": element.rents_indicativeRent,
            "rentReceivableOnDeliveredBags": element.rents_rentReceivableOnDeliveredBags
        },
        "lastModifiedDate": new Date(element.deliveryDate)
    }
    formattedDeliveries.push(formattedDelivery);
});

fs.writeFile('../sampleData/parsedDeliveries.json', JSON.stringify(formattedDeliveries), 'utf8', function(err) {
    if (err) throw err;
    console.log('file write complete with object count: ', formattedDeliveries.length);
});