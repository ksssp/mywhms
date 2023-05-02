
const { connect, disconnect } = require('../config/db.config');
const { CustomerTransaction } = require('../models/customerTransaction.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class CustomerTransactionRepository {

    constructor() {
        connect();
    }

    async getCustomerTransactions() {
        logger.info("customerTransaction repository find() ");
        const customerTransactions = await CustomerTransaction.find({});
        return customerTransactions;
    }
    
    async getCustomerTransactionsByCustomerId(customerId) {
        let data = {};
        try {
            logger.info("customerTransaction repository getCustomerTransactionsByCustomerId: ", customerId);
            data = await CustomerTransaction.find({
                'customer.customerId': { $eq: customerId } 
            }).
            sort({ transactionDate: -1 });
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async getCustomerTransactionById(customerTransactionId) {
        let data = {};
        try {
            logger.info("customerTransaction repository findById: ", new mongoose.Types.ObjectId(customerTransactionId));
            data = await CustomerTransaction.findById(new mongoose.Types.ObjectId(customerTransactionId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createCustomerTransaction(customerTransaction) {
        let data = {};
        try {
            data = await CustomerTransaction.create(customerTransaction);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateCustomerTransaction(customerTransactionId, customerTransaction) {
        let data = {};
        try {
            data = await CustomerTransaction.updateOne({_id : customerTransactionId}, customerTransaction);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteCustomerTransaction(customerTransactionId) {
        let data = {};
        try {
            data = await CustomerTransaction.deleteOne({_id : customerTransactionId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new CustomerTransactionRepository();