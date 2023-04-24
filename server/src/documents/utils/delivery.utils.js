
const deliveryRepository = require('../../repositories/delivery.repository');
const lodgementRepository = require('../../repositories/lodgement.repository');

const { DateTime } = require('luxon');

class DeliveryUtils {

    constructor() {
    }

    prepareDeliveriesForImport(deliveries) {

        let lotNumberMap = new Map();
        let runningLotNumber = deliveries[0].lotNumber;
        let runningLodgementDate = DateTime.fromFormat(deliveries[0].lodgementDate, 'M/d/yyyy').toLocal();
        let runningNumBagsBalance =  deliveries[0].numBagsLodged;
        let runningNumBagsLodged = deliveries[0].numBagsLodged;
        for (let index = 0; index < deliveries.length; index++) {
            const element = deliveries[index];

            if(!lotNumberMap.has(element.lotNumber)) {  // new lot being processed
                lotNumberMap.set(element.lotNumber, {
                    'lodgementDate': DateTime.fromFormat(deliveries[0].lodgementDate, 'M/d/yyyy').toLocal(),
                    'numBagsLodged': element.numBagsLodged,
                    'numBagsBalance': element.numBagsLodged,
                    'deliveries': [],
                    'isCarryForwardLot': false,
                    'originalLotNumber': '',
                    'hasCarryForwardLot': false,
                    'carryForwardLotNumber': '',
                    'numBagsCarryForward': 0
                });

                // reset running fields to the new lotnumber details
                runningLotNumber = element.lotNumber;
                runningLodgementDate = DateTime.fromFormat(element.lodgementDate, 'M/d/yyyy').toLocal();
                runningNumBagsBalance =  element.numBagsLodged;
                runningNumBagsLodged = element.numBagsLodged;
            }

            // create carryForwardLot if year changes and move rest of deliveries to carryForwardLot
            let deliveryDate = DateTime.fromFormat(element.deliveryDate, 'M/d/yyyy').toLocal(); 
            if (deliveryDate.year > runningLodgementDate.year) {
                let carryForwardLotNumber = runningLotNumber + '/CF' + deliveryDate.year;
                lotNumberMap.get(runningLotNumber).hasCarryForwardLot = true;
                lotNumberMap.get(runningLotNumber).carryForwardLotNumber = carryForwardLotNumber;
                lotNumberMap.get(runningLotNumber).numBagsCarryForward = runningNumBagsBalance;
                lotNumberMap.set(carryForwardLotNumber, {
                    'lodgementDate': deliveryDate.startOf('year'),
                    'numBagsLodged': runningNumBagsBalance,
                    'numBagsBalance': runningNumBagsBalance,
                    'deliveries': [],
                    'isCarryForwardLot': true,
                    'originalLotNumber': element.lotNumber,
                    'carryForwardLotNumber': '',
                    'numBagsCarryForward': 0
                });
                runningLodgementDate = deliveryDate.startOf('year');
                runningLotNumber = carryForwardLotNumber;
                runningNumBagsLodged = runningNumBagsBalance;
                
            }

            let dateDiff = deliveryDate.endOf('month').diff(runningLodgementDate.startOf('month'), ['months', 'days']).toObject();
            let monthsLodgedForDelivery = dateDiff.months + 1;
            
            var formattedDelivery = {
                "lotNumber": runningLotNumber,
                "lodgementDate": runningLodgementDate.toLocal().toISO(),
                "deliveryDate": deliveryDate,
                "numBagsLodged": runningNumBagsLodged,
                "numBagsDelivered": element.numBagsDelivered,
                "numBagsBalance": runningNumBagsBalance - element.numBagsDelivered,
                "numBagsKataCoolie": element.numBagsKataCoolie,
                "numMonthsLodged": monthsLodgedForDelivery,
                "locationCodes": element.locationCodes,
                "deliveryNotes": element.deliveryNotes,
                "transport": {
                    "vehicleNumber": element.transport_vehicleNumber,
                    "driverName": element.transport_driverName,
                },
                "chargesPaid": {
                    "hamaliCharges": element.chargesPaid_hamaliCharges,
                    "kataCoolieCharges": element.chargesPaid_kataCoolieCharges,
                    "platformCoolieCharges": element.chargesPaid_platformCoolieCharges,
                    "mamulluCharges": element.chargesPaid_mamulluCharges,
                    "transportCharges": element.chargesPaid_transportCharges,
                    "totalChargesPaid": element.chargesPaid_totalChargesPaid,
                },
                "chargesReceivable": {
                    "nonHamaliChargesPaid": element.chargesReceivable_nonHamaliChargesPaid
                }
            }

            lotNumberMap.get(runningLotNumber).deliveries.push(formattedDelivery);
            runningNumBagsBalance -= element.numBagsDelivered;
            lotNumberMap.get(runningLotNumber).numBagsBalance = runningNumBagsBalance;
        }
        return lotNumberMap;
    }

    getNewDeliveryForLodgement(delivery, lodgement) {

        let rentalRate = (lodgement.rentals.rentalMode == 'Monthly' ? lodgement.rentals.monthlyRentPerBag : lodgement.rentals.yearlyRentPerBag);
        let rentReceivableForDelivery = delivery.numBagsDelivered * rentalRate * (lodgement.rentals.rentalMode == 'Monthly' ? delivery.numMonthsLodged : 1);

        let newDelivery = {
            lodgementId: lodgement._id,
            lotNumber: lodgement.lotNumber,
            customer: {
                customerId: lodgement.customer.customerId,
                customerDisplayName: lodgement.customer.customerDisplayName,
            },
            product: {
                productId: lodgement.product.productId,
                productName: lodgement.product.productName,
            },
            deliveryDate: delivery.deliveryDate,
            numBagsDelivered: delivery.numBagsDelivered,
            numBagsKataCoolie: delivery.numBagsKataCoolie,
            numBagsLodged: delivery.numBagsLodged,
            numBagsBalance: delivery.numBagsBalance,
            locationCodes: delivery.locationCodes,
            lodgementDate: delivery.lodgementDate,
            deliveryNotes: delivery.deliveryNotes,
            numMonthsLodged: delivery.numMonthsLodged,
            transport: {
                vehicleNumber: delivery.transport.vehicleNumber,
                driverName: delivery.transport.driverName
            },
            chargesPerBag: {
                hamaliPerBag: lodgement.chargesPerBag.hamaliPerBag,
                kataCooliePerBag: lodgement.chargesPerBag.kataCooliePerBag,
                platformCooliePerBag: lodgement.chargesPerBag.platformCooliePerBag,
                mamulluPerBag: lodgement.chargesPerBag.mamulluPerBag,
                insurancePerBag: lodgement.chargesPerBag.insurancePerBag
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
                rentalYear: lodgement.rentals.rentalYear,
                rentalMode: lodgement.rentals.rentalMode,
                monthlyRentPerBag: lodgement.rentals.monthlyRentPerBag,
                yearlyRentPerBag: lodgement.rentals.yearlyRentPerBag,
                rentReceivableOnDeliveredBags: rentReceivableForDelivery
            },
            lastModifiedDate: delivery.deliveryDate,
            creationDate: delivery.deliveryDate
        };
        
        return newDelivery;
    }

    async getCarryForwardLotForLodgement(lodgement, carryForwardBags, carryForwardDate) {

        // create a carryForward lodgement with balance details & yearly rentalMode
        let carryForwardLot = {
            lotNumber: lodgement.lotNumber + '/CF' + carryForwardDate.year,
            customer: {
                customerId: lodgement.customer.customerId,
                customerDisplayName: lodgement.customer.customerName
            },
            product: {
                productId: lodgement.product.productId,
                productName: lodgement.product.productName,
            },
            numBagsLodged: carryForwardBags,
            numBagsKataCoolie: 0,
            lodgementDate: carryForwardDate,
            isPlatformLot: lodgement.isPlatformLot,
            locationCodes: lodgement.locationCodes,
            lodgementNotes: 'Carry Forward lot from ' + lotNumber,
            transport: {
                vehicleNumber: "",
                driverName: "",
            },
            chargesPerBag: {
                hamaliPerBag: lodgement.chargesPerBag.hamaliPerBag,
                kataCooliePerBag: lodgement.chargesPerBag.kataCooliePerBag,
                platformCooliePerBag: lodgement.chargesPerBag.platformCooliePerBag,
                mamulluPerBag: lodgement.chargesPerBag.mamulluPerBag,
                insurancePerBag: lodgement.chargesPerBag.insurancePerBag
            },
            chargesPaid: {
                hamaliCharges: 0,
                kataCoolieCharges: 0,
                platformCoolieCharges: 0,
                mamulluCharges: 0,
                transportCharges: 0,
                totalChargesPaid: 0
            },
            chargesReceivable: {
                hamaliCharges: 0,
                insuranceCharges: 0,
                nonHamaliChargesPaid: 0,
                totalChargesReceivable: 0,
            },
            rentals: {
                rentalYear: carryForwardDate.year,
                rentalMode: 'Yearly',
                monthlyRentPerBag: lodgement.rentals.monthlyRentPerBag,
                yearlyRentPerBag: lodgement.rentals.yearlyRentPerBag,
                rentSettled: false
            },
            numBagsBalance: carryForwardBags,
            stockRelease: {
                numDeliveries: 0,
                numBagsDelivered: 0,
                lastDeliveryDate: '',
                totalChargesPaid: 0,
                totalChargesReceivable: 0,
                totalRentReceivable: 0,
                deliveries: []
            },
            lastModifiedDate: carryForwardDate.startOf('year'),
            carryForward: {
                hasCarryForwardLot: false,
                carryForwardLodgementId: '',
                carryForwardLotNumber: '',
                numBagsCarryForward: 0,
                isCarryForwardLot: true,
                originalLodgementId: lodgement._id,
                originalLotNumber: lodgement.lotNumber
            }
        };

        console.log('creating carryforwardLot with lotNumber ', carryForwardLot.lotNumber, carryForwardLot);
        const newLot = await lodgementRepository.createLodgement(carryForwardLot);

        lodgement.carryForward.hasCarryForwardLot = true;
        lodgement.carryForward.carryForwardLodgementId = newLot._id;
        lodgement.carryForward.carryForwardLotNumber = newLot.lotNumber;
        lodgement.carryForward.numBagsCarryForward = totalNumBagsBalance;
        lodgement.numBagsBalance = 0;

        const lodgementUpdateResponse = await lodgementRepository.updateLodgement(lodgement._id, lodgement);

        return lodgementUpdateResponse.status ? newLot : null;
    }


    async processDeliveriesForLodgement(deliveries, lotNumber) {
        console.log('processing deliveries for lotNumber: ', lotNumber);
        let lodgementsByLotNumber = await lodgementRepository.getLodgementByLotNumber(lotNumber);
        let lodgementsList = JSON.parse(JSON.stringify(lodgementsByLotNumber));
        let lodgement = lodgementsList[0];
        console.log(lodgementsList, " processing deliveries");

        // setup fields to be updated in lodgement
        let rentalRate = (lodgement.rentals.rentalMode == 'Monthly' ? lodgement.rentals.monthlyRentPerBag : lodgement.rentals.yearlyRentPerBag);
        let lodgementDate = DateTime.fromISO(lodgement.lodgementDate).toLocal();

        const forLoop = async _ => {
            for (let index = 0; index < deliveries.length; index++) {
                const delivery = deliveries[index]
                // 0. if deliveries cross across year-end create carryForwardLot and close current lodgement
                if (delivery.deliveryDate.year > lodgementDate.year) {

                    let carryForwardLot = await getCarryForwardLotForLodgement(lodgement, totalNumBagsBalance,
                        delivery.deliveryDate.startOf('year'));

                    // make the carryForwardLot as the main lot going forward for the rest of the deliveries
                    lodgement = JSON.parse(JSON.stringify(carryForwardLot));
                }

                // add new delivery for the lodgement
                let newDelivery = await saveNewDeliveryForLodgement(delivery, lodgement, totalNumBagsBalance)

                // 1. update summary values for deliveries including this new delivery
                lodgement.stockRelease.numDeliveries += 1;
                lodgement.numBagsBalance -= newDelivery.numBagsDelivered;
                lodgement.stockRelease.numBagsDelivered += newDelivery.numBagsDelivered;
                lodgement.stockRelease.lastDeliveryDate = newDelivery.deliveryDate;
                lodgement.lastModifiedDate = newDelivery.deliveryDate;
                lodgement.stockRelease.totalChargesPaid += newDelivery.chargesPaid.totalChargesPaid;
                lodgement.stockRelease.totalChargesReceivable += newDelivery.chargesReceivable.nonHamaliChargesPaid;
                lodgement.stockRelease.totalRentReceivable += newDelivery.rentReceivableForDelivery;

                let deliveryObjectForLodgement = {
                    deliveryId: newDelivery._id,
                    deliveryDate: newDelivery.deliveryDate,
                    numBagsDelivered: newDelivery.numBagsDelivered,
                    numBagsBalance: newDelivery.numBagsBalance,
                    numMonthsLodged: newDelivery.numMonthsLodged,
                    rentalMode: newDelivery.rentals.rentalMode,
                    rentalYear: newDelivery.rentals.rentalYear,
                    monthlyRentPerBag: newDelivery.rentals.monthlyRentPerBag,
                    yearlyRentPerBag: newDelivery.rentals.yearlyRentPerBag,
                    rentReceivableOnDeliveredBags: newDelivery.rentals.rentReceivableOnDeliveredBags,
                    nonHamaliChargesPaid: newDelivery.chargesReceivable.nonHamaliChargesPaid
                }
                lodgement.stockRelease.deliveries.push(deliveryObjectForLodgement);
            }
        }

        console.log("saving ", lodgement);
        // 4. save lodgement object that has updated list of deliveries
        let updateLodgementResponse = await lodgementRepository.updateLodgement(lodgement.lodgementId, lodgement);
        return updateLodgementResponse;
    }
}

module.exports = new DeliveryUtils();