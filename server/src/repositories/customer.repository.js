
const { connect, disconnect } = require('../config/db.config');
const { Customer } = require('../models/customer.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class CustomerRepository {

    constructor() {
        connect();
    }

    async getCustomers() {
        const customers = await Customer.find({});
        return customers;
    }

    async getCustomerById(customerId) {
        let data = {};
        try {
            logger.info("customer repository findById: ", new mongoose.Types.ObjectId(customerId));
            data = await Customer.findById(new mongoose.Types.ObjectId(customerId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createCustomer(customer) {
        let data = {};
        try {
            data = await Customer.create(customer);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateCustomer(customerId, customer) {
        let data = {};
        try {
            data = await Customer.updateOne({_id : customerId}, customer);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteCustomer(customerId) {
        let data = {};
        try {
            data = await Customer.deleteOne({_id : customerId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new CustomerRepository();