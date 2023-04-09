const deliveryService  = require('../services/delivery.service');
const logger = require('../logger/api.logger');

class DeliveryController {

    async getDeliveries() {
        logger.info('Controller: getDeliveries')
        return await deliveryService.getDeliveries();
    }

    async getDeliveryById(deliveryId) {
        logger.info('Controller: getDeliveryById', deliveryId);
        return await deliveryService.getDeliveryById(deliveryId);
    }

    async getDeliveriesByFilter(filter) {
        logger.info('Controller: getDeliveriesByFilter - ', filter)
        return await deliveryService.getDeliveriesByFilter(filter);
    }

    async createDelivery(delivery) {
        logger.info('Controller: createDelivery', delivery);
        return await deliveryService.createDelivery(delivery);
    }

    async updateDelivery(delivery) {
        logger.info('Controller: updateDelivery', delivery);
        return await deliveryService.updateDelivery(delivery);
    }

    async deleteDelivery(deliveryId) {
        logger.info('Controller: deleteDelivery', deliveryId);
        return await deliveryService.deleteDelivery(deliveryId);
    }
}
module.exports = new DeliveryController();