// this file is to prepare jsons for upload
const deliveries = require('../sampleData/sampleDeliveries.json');
const lodgementRepository = require('../../repositories/lodgement.repository');
const deliveryRepository = require('../../repositories/delivery.repository');
var moment = require('moment');
const { DateTime } = require ( 'luxon' );

var fs = require('fs');

var formattedDeliveries = [];
var lodgementToDeliveriesMap = new Map();

// prepare map out of deliveries
deliveries.forEach(element => {
    var formattedDelivery = {
        "lotNumber": element.lotNumber,
        "deliveryDate": DateTime.fromFormat(element.deliveryDate, 'M/d/yyyy').toLocal(),
        "numBagsDelivered": element.numBagsDelivered,
        "numBagsKataCoolie": element.numBagsKataCoolie,
        "locationCodes": element.locationCodes,
        "deliveryNotes": element.deliveryNotes,
        "transport": {
            "vehicleNumber": element.transport_vehicleNumber,
            "driverName": element.transport_driverName,
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
            "nonHamaliChargesPaid": element.chargesReceivable_nonHamaliChargesPaid
        }
    };
    formattedDeliveries.push(formattedDelivery);
    var deliveriesList = [];
    if(lodgementToDeliveriesMap.has(element.lotNumber)) {
        deliveriesList = lodgementToDeliveriesMap.get(element.lotNumber);
    }
    deliveriesList.push(formattedDelivery);
    lodgementToDeliveriesMap.set(element.lotNumber, deliveriesList);
});


// enrich deliveries data with lodgements
for (let [key, value] of  lodgementToDeliveriesMap.entries()) {
	let lotNumber = key;
    let deliveriesList = value;
    console.log(lotNumber);
    lodgementRepository.getLodgementByLotNumber(lotNumber).then(response => {
        let lodgementsList = JSON.parse(JSON.stringify(response));
        let originalLodgement = lodgementsList[0];

        // setup fields to be updated in lodgement
        let totalNumDeliveries = 0;
        let totalNumBagsBalance = originalLodgement.numBagsLodged;
        let totalNumBagsDelivered = 0;
        let lastDeliveryDate = null;
        let totalChargesPaid = 0;
        let totalChargesReceivable = 0;
        let totalRentReceivable = 0;
        let rentalRate = (originalLodgement.rentals.rentalMode == 'Monthly' ? originalLodgement.rentals.monthlyRentPerBag : originalLodgement.rentals.yearlyRentPerBag);
        let originalLodgementDate = DateTime.fromISO(originalLodgement.lodgementDate).toLocal();


        let hasCarryForwardLot = false;
        let carryForwardLodgementId = null;
        let carryForwardLotNumer = null;
        let isCarryForwardLot = false;
        let originalLodgementId = null;
        let originalLotNumber = lotNumber;

        deliveriesList.forEach(delivery => {    
            
            // update summary values for deliveries including this new delivery
            totalNumDeliveries = totalNumDeliveries + 1;
            totalNumBagsBalance = totalNumBagsBalance - delivery.numBagsDelivered;
            totalNumBagsDelivered = totalNumBagsDelivered + delivery.numBagsDelivered;
            lastDeliveryDate = delivery.deliveryDate;
            totalChargesPaid = totalChargesPaid + delivery.chargesPaid.totalChargesPaid;
            totalChargesReceivable = totalChargesReceivable + delivery.chargesReceivable.nonHamaliChargesPaid;

            let dateDiff = delivery.deliveryDate.endOf('month').diff(originalLodgementDate.startOf('month'), ['months', 'days']).toObject();
            let monthsLodgedForDelivery = dateDiff.months+1;
            console.log("easy logic", originalLodgementDate.toLocal().toFormat('yyyy-MM-dd'), delivery.deliveryDate.toLocal().toFormat('yyyy-MM-dd'), moment.months, dateDiff);

            let rentReceivableForDelivery = delivery.numBagsDelivered * rentalRate * (originalLodgement.rentals.rentalMode == 'Monthly' ? monthsLodgedForDelivery : 1);
            totalRentReceivable = totalRentReceivable + rentReceivableForDelivery;
            
            // 1. enrich delivery object with lodgement info
            let newDelivery = {
                lodgementId: originalLodgement._id,
                lotNumber: originalLodgement.lotNumber,
                customer: {
                    customerId: originalLodgement.customer.customerId,
                    customerDisplayName: originalLodgement.customer.customerDisplayName,
                },
                product: {
                    productId: originalLodgement.product.productId,
                    productName: originalLodgement.product.productName,
                },
                deliveryDate: delivery.deliveryDate,
                numBagsDelivered: delivery.numBagsDelivered,
                numBagsKataCoolie: delivery.numBagsKataCoolie,
                numBagsLodged: originalLodgement.numBagsLodged,
                numBagsBalance: totalNumBagsBalance,
                locationCodes: delivery.locationCodes,
                lodgementDate: originalLodgementDate,
                deliveryNotes: delivery.deliveryNotes,
                numMonthsLodged: monthsLodgedForDelivery,
                transport: {
                    vehicleNumber: delivery.transport.vehicleNumber,
                    driverName: delivery.transport.driverName
                },
                chargesPerBag: {
                    hamaliPerBag: originalLodgement.chargesPerBag.hamaliPerBag,
                    kataCooliePerBag: originalLodgement.chargesPerBag.kataCooliePerBag,
                    platformCooliePerBag: originalLodgement.chargesPerBag.platformCooliePerBag,
                    mamulluPerBag: originalLodgement.chargesPerBag.mamulluPerBag,
                    insurancePerBag: originalLodgement.chargesPerBag.insurancePerBag
                },
                chargesPaid: {
                    hamaliCharges: delivery.chargesPaid.hamaliCharges,
                    kataCoolieCharges: delivery.chargesPaid.kataCoolieCharges,
                    platformCoolieCharges: delivery.chargesPaid.platformCoolieCharges,
                    mamulluCharges: delivery.chargesPaid.mamulluCharges,
                    transportCharges: delivery.chargesPaid.transportCharges,
                    totalChargesPaid: delivery.chargesPaid.totalChargesPaid
                },
                chargesReceivable: {
                    nonHamaliChargesPaid: delivery.chargesReceivable.nonHamaliChargesPaid
                },
                rentals: {
                    rentalYear: originalLodgement.rentals.rentalYear,
                    rentalMode: originalLodgement.rentals.rentalMode, 
                    monthlyRentPerBag: originalLodgement.rentals.monthlyRentPerBag,
                    yearlyRentPerBag: originalLodgement.rentals.yearlyRentPerBag,
                    rentReceivableOnDeliveredBags: rentReceivableForDelivery
                },
                lastModifiedDate: delivery.deliveryDate,
                creationDate: delivery.deliveryDate
            };

            // 2. Save the delivery into deliveries collection
            // deliveryRepository.createDelivery(newDelivery).then(response => {
                let newDeliveryId = "newDelivery"; // response;
                let deliveryObjectForLodgement = {
                    deliveryId: newDeliveryId,
                    deliveryDate: newDelivery.deliveryDate,
                    numBagsDelivered: newDelivery.numBagsDelivered,
                    numBagsBalance: newDelivery.numBagsBalance,
                    numMonthsLodged: newDelivery.numMonthsLodged,
                    rentReceivableOnDeliveredBags: newDelivery.rentals.rentReceivableOnDeliveredBags,
                    nonHamaliChargesPaid: newDelivery.chargesReceivable.nonHamaliChargesPaid
                }
                originalLodgement.stockRelease.deliveries.push(deliveryObjectForLodgement);
            // });
            console.log(newDelivery);
        });

        originalLodgement.numBagsBalance = totalNumBagsBalance;
        originalLodgement.stockRelease.numDeliveries = totalNumDeliveries;
        originalLodgement.stockRelease.numBagsDelivered = totalNumBagsDelivered;
        originalLodgement.stockRelease.lastDeliveryDate = lastDeliveryDate;
        originalLodgement.lastModifiedDate = lastDeliveryDate;
        originalLodgement.stockRelease.totalChargesPaid = totalChargesPaid;
        originalLodgement.stockRelease.totalChargesReceivable = totalChargesReceivable;
        originalLodgement.stockRelease.totalRentReceivable = totalRentReceivable;


        console.log("saving ", originalLodgement);
        // 4. save lodgement object that has updated list of deliveries
        // lodgementRepository.updateLodgement(lodgement.lodgementId, lodgement).then(response => {

        //     // append the updated logement into the ready file for verification
        //     fs.writeFile('../sampleData/sampleDeliveriesReady.json', JSON.stringify(lodgement), 'utf8', function(err) {
        //         if (err) throw err;
        //         console.log('file write complete with object lotNumber: ', lotNumber, ' #deliveries: ', deliveriesForLodgement.length);
        //     });
        // });
    });
}