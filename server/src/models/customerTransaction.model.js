const mongoose = require('mongoose');

const customerTransasctionSchema = new mongoose.Schema({
        transactionDate: Date,
        customer: {
            customerId: String,
            customerDisplayName: String
        },
        chargesReceived: Number,
        rentReceived: Number,
        rentDiscount: Number,
        totalAmountReceived: Number,
        rentalMode: String,
        rentalYear: Number,
        transactionDetails: String
    }, { collection: 'customerTransactions' });

const CustomerTransaction = mongoose.model('customerTransaction', customerTransasctionSchema);

module.exports = {
    CustomerTransaction
}