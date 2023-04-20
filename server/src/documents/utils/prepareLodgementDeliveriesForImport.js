// this file is to prepare jsons for upload
const deliveries = require('../sampleData/sampleDeliveriesForLodgementsNew.json');
var fs = require('fs');
const lodgementRepository = require('../../repositories/lodgement.repository');

var outputJson = {};
var formattedDeliveries = [];
var lodgementToDeliveriesMap = new Map();

deliveries.forEach(element => {
    if(!lodgementToDeliveriesMap.has(element.lodgementId)) {
        lodgementToDeliveriesMap.set(element.lodgementId, []);
    }

    var dateParts = element.deliveryDate.split("/");   
    var formattedDelivery = {
        deliveryId: element.deliveryId,
        deliveryDate: new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]),
        numBagsDelivered: element.numBagsDelivered,
        numBagsBalance: element.numBagsBalance,
        numMonthsLodged: element.numMonthsLodged,
        rentReceivableOnDeliveredBags: element.rentReceivableOnDeliveredBags,
        totalChargesPaid: element.totalChargesPaid
    }
    lodgementToDeliveriesMap.get(element.lodgementId).push(formattedDelivery);
});

lodgementToDeliveriesMap.forEach(function(value, key) {
    lodgementRepository.getLodgementById(key).then(response => {
        let lodgement = JSON.parse(JSON.stringify(response));
        lodgement.stockRelease.numDeliveries = 0;
        lodgement.stockRelease.totalChargesPaid = 0;
        lodgement.stockRelease.totalRentReceivable = 0;
        lodgement.stockRelease.deliveries = [];
        value.forEach(delivery => {
            lodgement.stockRelease.numDeliveries++;
            lodgement.stockRelease.lastDeliveryDate = delivery.deliveryDate;
            lodgement.stockRelease.totalChargesPaid = lodgement.stockRelease.totalChargesPaid + delivery.totalChargesPaid;
            lodgement.stockRelease.totalRentReceivable = lodgement.stockRelease.totalRentReceivable + delivery.rentReceivableOnDeliveredBags;
            lodgement.stockRelease.deliveries.push(delivery);
        });
        // console.log(lodgement);
        lodgementRepository.updateLodgement(key, lodgement).then(response => {
            console.log(response);

            fs.appendFile('../sampleData/parsedDeliveriesForLodgements.json', JSON.stringify(lodgement) + ', ', 'utf8', function(err) {
                if (err) throw err;
            });
        });
    });
    return;
});


