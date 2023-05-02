const mongoose = require('mongoose');

const paymentTypeSchema = new mongoose.Schema({
        paymentType: String,
        paymentCategory: String,
        creationDate: Date, 
        lastModifiedDate: Date, 
        activeFrom: Date,
        activeUntil: Date
    }, { collection: 'paymentTypes' });

const PaymentType = mongoose.model('paymentType', paymentTypeSchema);

module.exports = {
    PaymentType
}