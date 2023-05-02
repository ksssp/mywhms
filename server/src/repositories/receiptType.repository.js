
const { connect, disconnect } = require('../config/db.config');
const { ReceiptType } = require('../models/receiptType.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class ReceiptTypeRepository {

    constructor() {
        connect();
    }

    async getReceiptTypes() {
        const receiptTypes = await ReceiptType.find({});
        return receiptTypes;
    }

    async getReceiptTypeById(receiptTypeId) {
        let data = {};
        try {
            logger.info("receiptType repository findById: ", new mongoose.Types.ObjectId(receiptTypeId));
            data = await ReceiptType.findById(new mongoose.Types.ObjectId(receiptTypeId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createReceiptType(receiptType) {
        let data = {};
        try {
            data = await ReceiptType.create(receiptType);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateReceiptType(receiptTypeId, receiptType) {
        let data = {};
        try {
            data = await ReceiptType.updateOne({_id : receiptTypeId}, receiptType);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteReceiptType(receiptTypeId) {
        let data = {};
        try {
            data = await ReceiptType.deleteOne({_id : receiptTypeId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new ReceiptTypeRepository();