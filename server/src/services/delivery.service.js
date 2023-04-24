const deliveryRepository  = require('../repositories/delivery.repository');
const lodgementRepository = require('../repositories/lodgement.repository');

class DeliveryService {

    constructor() {}

    async getDeliveries() {
        return await deliveryRepository.getDeliveries();
    }

    async getDeliveryById(deliveryId) {
        return await deliveryRepository.getDeliveryById(deliveryId);
    }

    async getDeliveriesByLodgementId(lodgementId) {
        return await deliveryRepository.getDeliveriesByLodgementId(lodgementId);
    }

    async getDeliveriesByFilter(filter) {
        return await deliveryRepository.getDeliveriesByFilter(filter);
    }

    async createDelivery(delivery) {
        let newDelivery = await deliveryRepository.createDelivery(delivery);

        let lodgement = await lodgementRepository.getLodgementById(newDelivery.lodgementId);
        lodgement.numBagsBalance -= newDelivery.numBagsDelivered;
        lodgement.stockRelease.numDeliveries++;
        lodgement.stockRelease.numBagsDelivered += newDelivery.numBagsDelivered;
        lodgement.stockRelease.lastDeliveryDate = newDelivery.deliveryDate;
        lodgement.stockRelease.totalChargesPaid += newDelivery.chargesPaid.totalChargesPaid;
        lodgement.stockRelease.totalChargesReceivable += newDelivery.chargesReceivable.nonHamaliChargesPaid;
        lodgement.stockRelease.totalRentReceivable += newDelivery.rentals.rentReceivableOnDeliveredBags;
        lodgement.stockRelease.deliveries.push({
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
        });

        let lodgementUpdateStatus = await lodgementRepository.updateLodgement(lodgement._id, lodgement);

        return newDelivery;
    }

    async updateDelivery(deliveryId, delivery) {
        let updateStatus = await deliveryRepository.updateDelivery(deliveryId, delivery);

        let deliveriesForLodgement = await deliveryRepository.getDeliveriesByLodgementId(delivery.lodgementId);
        
        let numDeliveries = 0;
        let numBagsDelivered = 0;
        let totalChargesPaid = 0;
        let totalChargesReceivable = 0;
        let totalRentReceivable = 0;
        let lastDeliveryDate = '';
        deliveriesForLodgement.forEach(delivery => {
            numDeliveries += 1;
            numBagsDelivered += delivery.numBagsDelivered;
            lastDeliveryDate = delivery.deliveryDate > lastDeliveryDate ? delivery.deliveryDate : lastDeliveryDate;
            totalChargesPaid += delivery.chargesPaid.totalChargesPaid;
            totalChargesReceivable += delivery.chargesReceivable.nonHamaliChargesPaid;
            totalRentReceivable += delivery.rentals.rentReceivableOnDeliveredBags;
        });

        let lodgement = await lodgementRepository.getLodgementById(delivery.lodgementId);
        lodgement.numBagsBalance = lodgement.numBagsLodged - lodgement.numBagsDelivered;
        lodgement.stockRelease.numDeliveries = numDeliveries;
        lodgement.stockRelease.numBagsDelivered += delivery.numBagsDelivered;
        lodgement.stockRelease.lastDeliveryDate = lastDeliveryDate;
        lodgement.stockRelease.totalChargesPaid += delivery.chargesPaid.totalChargesPaid;
        lodgement.stockRelease.totalChargesReceivable += delivery.chargesReceivable.nonHamaliChargesPaid;
        lodgement.stockRelease.totalRentReceivable += delivery.rentals.rentReceivableOnDeliveredBags;

        let lodgementUpdateStatus = await lodgementRepository.updateLodgement(lodgement._id, lodgement);

        return { status: updateStatus.status && lodgementUpdateStatus.status };
    }

    async deleteDelivery(deliveryId) {
        return await deliveryRepository.deleteDelivery(deliveryId);
    }

}

module.exports = new DeliveryService();