const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
        customerCode: String,
        customerName: String,
        customerDisplayName: String,
        mobileNumber: String,
        town: String,
        creationDate: Date, 
        lastModifiedDate: Date, 
        activeFrom: Date,
        activeUntil: Date
    });

const Customer = mongoose.model('customer', customerSchema);

module.exports = {
    Customer
}