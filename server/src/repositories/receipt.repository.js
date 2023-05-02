
const { connect, disconnect } = require('../config/db.config');
const { Receipt } = require('../models/receipt.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class ReceiptRepository {

    constructor() {
        connect();
    }

    async getReceipts() {
        logger.info("receipt repository find() ");
        const receipts = await Receipt.find({});
        return receipts;
    }
    
    async getReceiptsByCustomerId(customerId) {
        let data = {};
        try {
            logger.info("receipt repository getReceiptsByCustomerId: ", customerId);
            data = await Receipt.find({
                'customer.customerId': { $eq: customerId } 
            }).
            sort({ transactionDate: -1 });
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async getReceiptById(receiptId) {
        let data = {};
        try {
            logger.info("receipt repository findById: ", new mongoose.Types.ObjectId(receiptId));
            data = await Receipt.findById(new mongoose.Types.ObjectId(receiptId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createReceipt(receipt) {
        let data = {};
        try {
            data = await Receipt.create(receipt);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateReceipt(receiptId, receipt) {
        let data = {};
        try {
            data = await Receipt.updateOne({_id : receiptId}, receipt);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteReceipt(receiptId) {
        let data = {};
        try {
            data = await Receipt.deleteOne({_id : receiptId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new ReceiptRepository();