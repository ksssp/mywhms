const mongoose = require('mongoose');

const employeeTransasctionSchema = new mongoose.Schema({
        transactionDate: Date,
        employee: {
            employeeId: String,
            employeeFullName: String
        },
        employeeTransactionType: {
            employeeTransactionTypeId: String,
            employeeTransactionType: String
        },
        amount: Number,
        transactionMode: String,
        transactionDetails: String
    }, { collection: 'employeeTransactions' });

const EmployeeTransaction = mongoose.model('employeeTransaction', employeeTransasctionSchema);

module.exports = {
    EmployeeTransaction
}