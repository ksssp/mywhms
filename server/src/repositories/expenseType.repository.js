
const { connect, disconnect } = require('../config/db.config');
const { ExpenseType } = require('../models/expenseType.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class ExpenseTypeRepository {

    constructor() {
        connect();
    }

    async getExpenseTypes() {
        const expenseTypes = await ExpenseType.find({});
        return expenseTypes;
    }

    async getExpenseTypeById(expenseTypeId) {
        let data = {};
        try {
            logger.info("expenseType repository findById: ", new mongoose.Types.ObjectId(expenseTypeId));
            data = await ExpenseType.findById(new mongoose.Types.ObjectId(expenseTypeId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createExpenseType(expenseType) {
        let data = {};
        try {
            data = await ExpenseType.create(expenseType);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateExpenseType(expenseTypeId, expenseType) {
        let data = {};
        try {
            data = await ExpenseType.updateOne({_id : expenseTypeId}, expenseType);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteExpenseType(expenseTypeId) {
        let data = {};
        try {
            data = await ExpenseType.deleteOne({_id : expenseTypeId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new ExpenseTypeRepository();