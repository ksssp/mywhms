const mongoose = require('mongoose');

const employeeTransactionTypeSchema = new mongoose.Schema({
        employeeTransactionType: String,
        debitAllowed: Boolean,
        creditAllowed: Boolean,
        creationDate: Date, 
        lastModifiedDate: Date, 
        activeFrom: Date,
        activeUntil: Date
    }, { collection: 'employeeTransactionTypes' });

const EmployeeTransactionType = mongoose.model('employeeTransactionType', employeeTransactionTypeSchema);

module.exports = {
    EmployeeTransactionType
}