// this file is to prepare jsons for upload
const lodgements = require('../sampleData/sampleLodgementsNew.json');
var fs = require('fs');

var outputJson = {};
var formattedLodgements = [];

lodgements.forEach(element => {
    var formattedLodgement = {
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
        "numBagsLodged": element.numBagsLodged,
        "numBagsKataCoolie": element.numBagsKataCoolie,
        "lodgementDate": new Date(element.lodgementDate),
        "isPlatformLot": element.isPlatformLot,
        "isCarryForwardLot": element.isCarryForwardLot,
        "locationCodes": element.locationCodes,
        "lodgementNotes": element.lodgementNotes,
        "transport": {
            "vehicleNumber": element.transport_vehicleNumber,
            "driverName": element.transport_driverName,
        },
        "indicativeCharges": {
            "hamaliCharges": element.indicativeCharges_hamaliCharges,
            "kataCoolieCharges": element.indicativeCharges_kataCoolieCharges,
            "platformCoolieCharges": element.indicativeCharges_platformCoolieCharges,
            "mamulluCharges": element.indicativeCharges_mamulluCharges,
            "insuranceCharges": element.indicativeCharges_insuranceCharges
        },
        "chargesPaid": {
            "hamaliCharges": element.chargesPaid_hamaliCharges,
            "kataCoolieCharges":element.chargesPaid_kataCoolieCharges,
            "platformCoolieCharges": element.chargesPaid_platformCoolieCharges,
            "mamulluCharges": element.chargesPaid_mamulluCharges,
            "transportCharges": element.chargesPaid_transportCharges,
            "totalChargesPaid": element.chargesPaid_totalChargesPaid,
        },
        "chargesReceivable": {
            "hamaliCharges": element.chargesReceivable_hamaliCharges,
            "insuranceCharges": element.chargesReceivable_insuranceCharges,
            "totalChargesReceivable": element.chargesReceivable_totalChargesReceivable
        },
        "rents": {
            "rentalYear": element.rents_rentalYear,
            "rentalMode": element.rents_rentalMode,
            "indicativeRent": element.rents_indicativeRent,
            "rentSettled": element.rents_rentSettled
        },
        "numBagsBalance": element.numBagsBalance,
        "stockRelease": {
            "numDeliveries": element.stockRelease_numDeliveries,
            "lastDeliveryDate": new Date(element.stockRelease_lastDeliveryDate),
            "totalTransportChargesPaid": element.stockRelease_totalTransportChargesPaid,
            "totalRentReceivable": element.stockRelease_totalRentReceivable,
            "deliveries": []
        },
        "lastModifiedDate": new Date(element.lastModifiedDate)
    }
    formattedLodgements.push(formattedLodgement);
});

fs.writeFile('../sampleData/parsedLodgements.json', JSON.stringify(formattedLodgements), 'utf8', function(err) {
    if (err) throw err;
    console.log('file write complete with object count: ', formattedLodgements.length);
});