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

    async getDeliveriesByLodgementId(lodgementId) {
        logger.info('Controller: getDeliveriesByLodgementId', lodgementId);
        return await deliveryService.getDeliveriesByLodgementId(lodgementId);
    }

    async getDeliveriesByFilter(filter) {
        logger.info('Controller: getDeliveriesByFilter - ', filter)
        return await deliveryService.getDeliveriesByFilter(filter);
    }

    async createDelivery(delivery) {
        logger.info('Controller: createDelivery', delivery);
        return await deliveryService.createDelivery(delivery);
    }

    async updateDelivery(deliveryId, delivery) {
        logger.info('Controller: updateDelivery', deliveryId);
        return await deliveryService.updateDelivery(deliveryId, delivery);
    }

    async deleteDelivery(deliveryId) {
        logger.info('Controller: deleteDelivery', deliveryId);
        return await deliveryService.deleteDelivery(deliveryId);
    }
}
module.exports = new DeliveryController();