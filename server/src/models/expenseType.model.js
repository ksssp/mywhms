const mongoose = require('mongoose');

const expenseTypeSchema = new mongoose.Schema({
        expenseType: String,
        expenseCategory: String,
        creationDate: Date, 
        lastModifiedDate: Date, 
        activeFrom: Date,
        activeUntil: Date
    }, { collection: 'expenseTypes' });

const ExpenseType = mongoose.model('expenseType', expenseTypeSchema);

module.exports = {
    ExpenseType
}