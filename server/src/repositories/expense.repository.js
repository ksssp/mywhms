
const { connect, disconnect } = require('../config/db.config');
const { Expense } = require('../models/expense.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class ExpenseRepository {

    constructor() {
        connect();
    }

    async getExpenses() {
        logger.info("expense repository find() ");
        const expenses = await Expense.find({});
        return expenses;
    }
    
    async getExpensesByEmployeeId(employeeId) {
        let data = {};
        try {
            logger.info("expense repository getExpensesByEmployeeId: ", employeeId);
            data = await Expense.find({
                'employee.employeeId': { $eq: employeeId } 
            }).
            sort({ transactionDate: -1 });
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async getExpenseById(expenseId) {
        let data = {};
        try {
            logger.info("expense repository findById: ", new mongoose.Types.ObjectId(expenseId));
            data = await Expense.findById(new mongoose.Types.ObjectId(expenseId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createExpense(expense) {
        let data = {};
        try {
            data = await Expense.create(expense);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateExpense(expenseId, expense) {
        let data = {};
        try {
            data = await Expense.updateOne({_id : expenseId}, expense);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteExpense(expenseId) {
        let data = {};
        try {
            data = await Expense.deleteOne({_id : expenseId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new ExpenseRepository();