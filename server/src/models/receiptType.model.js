const mongoose = require('mongoose');

const receiptTypeSchema = new mongoose.Schema({
        receiptType: String,
        receiptCategory: String,
        receiptSource: String,
        creationDate: Date, 
        lastModifiedDate: Date, 
        activeFrom: Date,
        activeUntil: Date
    }, { collection: 'receiptTypes' });

const ReceiptType = mongoose.model('receiptType', receiptTypeSchema);

module.exports = {
    ReceiptType
}