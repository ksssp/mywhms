
const { connect, disconnect } = require('../config/db.config');
const { PaymentType } = require('../models/paymentType.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class PaymentTypeRepository {

    constructor() {
        connect();
    }

    async getPaymentTypes() {
        const paymentTypes = await PaymentType.find({});
        return paymentTypes;
    }

    async getPaymentTypeById(paymentTypeId) {
        let data = {};
        try {
            logger.info("paymentType repository findById: ", new mongoose.Types.ObjectId(paymentTypeId));
            data = await PaymentType.findById(new mongoose.Types.ObjectId(paymentTypeId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createPaymentType(paymentType) {
        let data = {};
        try {
            data = await PaymentType.create(paymentType);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updatePaymentType(paymentTypeId, paymentType) {
        let data = {};
        try {
            data = await PaymentType.updateOne({_id : paymentTypeId}, paymentType);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deletePaymentType(paymentTypeId) {
        let data = {};
        try {
            data = await PaymentType.deleteOne({_id : paymentTypeId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new PaymentTypeRepository();