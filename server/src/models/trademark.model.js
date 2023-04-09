const mongoose = require('mongoose');

const trademarkSchema = new mongoose.Schema({
        trademarkName: String,
        customerName: String,
        mobileNumber: String,
        town: String,
        creationDate: Date, 
    });

const Trademark = mongoose.model('trademark', trademarkSchema);

module.exports = {
    Trademark
}