// this file is to prepare jsons for upload
const deliveries = require('../sampleData/sampleDeliveries.json');
const deliveryUtils = require('./delivery.utils');
const lodgementUtils = require ('./lodgement.utils');
const lodgementRepository = require ('../../repositories/lodgement.repository');
var fs = require('fs');
const deliveryRepository = require('../../repositories/delivery.repository');

let lotNumberMap = deliveryUtils.prepareDeliveriesForImport(deliveries);

fs.writeFile('../sampleData/lotNumberToDeliveriesMap.json', JSON.stringify([...lotNumberMap]), 'utf8', function(err) {
    if (err) throw err;
    console.log('file write complete with object count: ', lotNumberMap.size);
});

lodgementRepository.getLodgements().then(response => {
    let lotNumberToLodgementsMap = new Map();
    let lodgements = JSON.parse(JSON.stringify(response));

    // create a lotNumberToLodgementMap for easy access
    lodgements.forEach(lodgement => {
        lotNumberToLodgementsMap.set(lodgement.lotNumber, lodgement);
    });

    // 1. (only once) - create carryForwardLots based on processed deliveries
    // let carryForwardLodgementsToBeCreated = [];
    // for( [key, value] of lotNumberMap) {
    //     let lotNumber = key;
    //     let lotNumberData = value;
    //     if(lotNumberData.isCarryForwardLot) {
    //         let originalLot = lotNumberToLodgementsMap.get(lotNumberData.originalLotNumber);
    //         let carryForwardLot = lodgementUtils.getCarryForwardLotForLodgement(originalLot, lotNumberData.lodgementDate, 
    //             lotNumberData.numBagsLodged, lotNumber);

    //         console.log('prepare carryForward with lotNumber: ', carryForwardLot.lotNumber, carryForwardLot);
    //         carryForwardLodgementsToBeCreated.push(carryForwardLot);
    //     }
    // }
    // fs.writeFile('../sampleData/sampleCarryForwardLotsReady.json', JSON.stringify(carryForwardLodgementsToBeCreated), 'utf8', function(err) {
    //     if (err) throw err;
    //     console.log('file write complete with object count: ', carryForwardLodgementsToBeCreated.length);
    // });


    // 2. insert all deliveries with updated values in to deliveries collection
    // let formattedDeliveries = [];
    // for([key, value] of lotNumberMap) {
    //     let lotNumber = key;
    //     let lodgement = lotNumberToLodgementsMap.get(lotNumber);
    //     // console.log(lotNumber, lodgement);
    //     let deliveries = lotNumberMap.get(lotNumber).deliveries;
        
    //     deliveries.forEach(delivery => {
    //         let newDelivery = deliveryUtils.getNewDeliveryForLodgement(delivery, lodgement);
    //         formattedDeliveries.push(newDelivery);
    //     });
    // }

    // fs.writeFile('../sampleData/sampleDeliveriesReady.json', JSON.stringify(formattedDeliveries), 'utf8', function(err) {
    //     if (err) throw err;
    //     console.log('file write complete with object count: ', formattedDeliveries.length);
    // });


    // 3. update lodgement Objects with updated summaries & deliveries lists
    deliveryRepository.getDeliveries().then(response => {
        let deliveries = JSON.parse(JSON.stringify(response));

        var lodgementToDeliveriesMap = new Map();
        deliveries.forEach(element => {
            if(!lodgementToDeliveriesMap.has(element.lotNumber)) {
                lodgementToDeliveriesMap.set(element.lotNumber, {
                    numDeliveries: 0,
                    totalChargesPaid: 0,
                    totalRentReceivable: 0,
                    totalChargesReceivable: 0,
                    numBagsDelivered: 0,
                    lastDeliveryDate: null,
                    deliveries: []
                });
            }

            var formattedDelivery = {
                deliveryId: element.deliveryId,
                deliveryDate: element.deliveryDate,
                numBagsDelivered: element.numBagsDelivered,
                numBagsBalance: element.numBagsBalance,
                numMonthsLodged: element.numMonthsLodged,
                rentalMode: element.rentals.rentalMode,
                rentalYear: element.rentals.rentalYear,
                monthlyRentPerBag: element.rentals.monthlyRentPerBag,
                yearlyRentPerBag: element.rentals.yearlyRentPerBag,
                rentReceivableOnDeliveredBags: element.rentals.rentReceivableOnDeliveredBags,
                totalChargesPaid: element.chargesPaid.totalChargesPaid,
                nonHamaliChargesPaid: element.chargesReceivable.nonHamaliChargesPaid
            }

            lodgementToDeliveriesMap.get(element.lotNumber).numDeliveries++;
            lodgementToDeliveriesMap.get(element.lotNumber).numBagsDelivered += formattedDelivery.numBagsDelivered;
            lodgementToDeliveriesMap.get(element.lotNumber).lastDeliveryDate = formattedDelivery.deliveryDate;
            lodgementToDeliveriesMap.get(element.lotNumber).totalChargesPaid += formattedDelivery.totalChargesPaid;
            lodgementToDeliveriesMap.get(element.lotNumber).totalChargesReceivable += formattedDelivery.nonHamaliChargesPaid;
            lodgementToDeliveriesMap.get(element.lotNumber).totalRentReceivable += formattedDelivery.rentReceivableOnDeliveredBags;
            lodgementToDeliveriesMap.get(element.lotNumber).deliveries.push(formattedDelivery);
        });

        lodgementToDeliveriesMap.forEach(function(value, key) {
            let lotNumber = key;
            let stockRelease = value;
            let lodgement = lotNumberToLodgementsMap.get(lotNumber);
            lodgement.stockRelease = JSON.parse(JSON.stringify(stockRelease));
            lodgement.numBagsBalance = lodgement.numBagsLodged - lodgement.stockRelease.numBagsDelivered;
            
            lodgementRepository.updateLodgement(lodgement._id, lodgement).then(response => {
                console.log("lodgement update: for ", lodgement.lotNumber, response);

                fs.appendFile('../sampleData/parsedDeliveriesForLodgements.json', JSON.stringify(lodgement) + ', ', 'utf8', function(err) {
                    if (err) throw err;
                });
            });
            return;
        });

    });
});
