const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema({
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
    }, { collection: 'receipts' });

const Receipt = mongoose.model('receipt', receiptSchema);

module.exports = {
    Receipt
}