
const { connect, disconnect } = require('../config/db.config');
const { EmployeeTransaction } = require('../models/employeeTransaction.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class EmployeeTransactionRepository {

    constructor() {
        connect();
    }

    async getEmployeeTransactions() {
        logger.info("employeeTransaction repository find() ");
        const employeeTransactions = await EmployeeTransaction.find({});
        return employeeTransactions;
    }
    
    async getEmployeeTransactionsByEmployeeId(employeeId) {
        let data = {};
        try {
            logger.info("employeeTransaction repository getEmployeeTransactionsByEmployeeId: ", employeeId);
            data = await EmployeeTransaction.find({
                'employee.employeeId': { $eq: employeeId } 
            }).
            sort({ transactionDate: -1 });
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async getEmployeeTransactionById(employeeTransactionId) {
        let data = {};
        try {
            logger.info("employeeTransaction repository findById: ", new mongoose.Types.ObjectId(employeeTransactionId));
            data = await EmployeeTransaction.findById(new mongoose.Types.ObjectId(employeeTransactionId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createEmployeeTransaction(employeeTransaction) {
        let data = {};
        try {
            data = await EmployeeTransaction.create(employeeTransaction);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateEmployeeTransaction(employeeTransactionId, employeeTransaction) {
        let data = {};
        try {
            data = await EmployeeTransaction.updateOne({_id : employeeTransactionId}, employeeTransaction);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteEmployeeTransaction(employeeTransactionId) {
        let data = {};
        try {
            data = await EmployeeTransaction.deleteOne({_id : employeeTransactionId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new EmployeeTransactionRepository();