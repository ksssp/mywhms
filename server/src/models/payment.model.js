const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
        transactionDate: Date,
        employee: {
            employeeId: String,
            employeeFullName: String
        },
        paymentType: {
            paymentTypeId: String,
            paymentType: String
        },
        amount: Number,
        transactionMode: String,
        transactionDetails: String
    }, { collection: 'payments' });

const Payment = mongoose.model('payment', paymentSchema);

module.exports = {
    Payment
}