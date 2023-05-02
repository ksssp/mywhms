const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
        transactionDate: Date,
        employee: {
            employeeId: String,
            employeeFullName: String
        },
        expenseType: {
            expenseTypeId: String,
            expenseType: String
        },
        amount: Number,
        transactionMode: String,
        transactionDetails: String
    }, { collection: 'expenses' });

const Expense = mongoose.model('expense', expenseSchema);

module.exports = {
    Expense
}