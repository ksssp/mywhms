
const { connect, disconnect } = require('../config/db.config');
const { EmployeeTransactionType } = require('../models/employeeTransactionType.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class EmployeeTransactionTypeRepository {

    constructor() {
        connect();
    }

    async getEmployeeTransactionTypes() {
        const employeeTransactionTypes = await EmployeeTransactionType.find({});
        return employeeTransactionTypes;
    }

    async getEmployeeTransactionTypeById(employeeTransactionTypeId) {
        let data = {};
        try {
            logger.info("employeeTransactionType repository findById: ", new mongoose.Types.ObjectId(employeeTransactionTypeId));
            data = await EmployeeTransactionType.findById(new mongoose.Types.ObjectId(employeeTransactionTypeId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createEmployeeTransactionType(employeeTransactionType) {
        let data = {};
        try {
            data = await EmployeeTransactionType.create(employeeTransactionType);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateEmployeeTransactionType(employeeTransactionTypeId, employeeTransactionType) {
        let data = {};
        try {
            data = await EmployeeTransactionType.updateOne({_id : employeeTransactionTypeId}, employeeTransactionType);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteEmployeeTransactionType(employeeTransactionTypeId) {
        let data = {};
        try {
            data = await EmployeeTransactionType.deleteOne({_id : employeeTransactionTypeId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new EmployeeTransactionTypeRepository();