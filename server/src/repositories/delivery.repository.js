
const { connect, disconnect } = require('../config/db.config');
const { Delivery } = require('../models/delivery.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class DeliveryRepository {

    constructor() {
        connect();
    }

    async getDeliveries() {
        const deliveries = await Delivery.find({});
        return deliveries;
    }

    async getDeliveryById(deliveryId) {
        let data = {};
        try {
            logger.info("delivery repository findById: ", new mongoose.Types.ObjectId(deliveryId));
            data = await Delivery.findById(new mongoose.Types.ObjectId(deliveryId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async getDeliveriesByFilter(filter) {
        const deliveries = await Delivery.find(filter).exec();
        return deliveries;
    }

    async createDelivery(delivery) {
        let data = {};
        try {
            data = await Delivery.create(delivery);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateDelivery(delivery) {
        let data = {};
        try {
            data = await Delivery.updateOne(delivery);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteDelivery(deliveryId) {
        let data = {};
        try {
            data = await Delivery.deleteOne({_id : deliveryId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

module.exports = new DeliveryRepository();