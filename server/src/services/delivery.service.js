const deliveryRepository  = require('../repositories/delivery.repository');

class DeliveryService {

    constructor() {}

    async getDeliveries() {
        return await deliveryRepository.getDeliveries();
    }

    async getDeliveryById(deliveryId) {
        return await deliveryRepository.getDeliveryById(deliveryId);
    }

    async getDeliveriesByFilter(filter) {
        return await deliveryRepository.getDeliveriesByFilter(filter);
    }

    async createDelivery(delivery) {
        return await deliveryRepository.createDelivery(delivery);
    }

    async updateDelivery(delivery) {
        return await deliveryRepository.updateDelivery(delivery);
    }

    async deleteDelivery(deliveryId) {
        return await deliveryRepository.deleteDelivery(deliveryId);
    }

}

module.exports = new DeliveryService();