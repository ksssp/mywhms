const mongoose = require('mongoose');

var SchemaTypes = mongoose.Schema.Types;
const lodgementSchema = new mongoose.Schema({
        lotId: String,
        lotNumber: String,
        trademark: {
            trademark: String,
            customerName: String
        },
        productName: String,
        numBagsLodged: Number,
        lodgementDate: Date,
        locationCodes: String,
        transportChargesPaid: SchemaTypes.Decimal128,
        totalChargesReceivable: SchemaTypes.Decimal128,
        totalChargesReceived: SchemaTypes.Decimal128,
        rents: {
            rentalYear: Number,
            rentalMode: String,
            totalRentReceivable: SchemaTypes.Decimal128,
            totalRentReceived: SchemaTypes.Decimal128
        },
        numBagsBalance: Number,
        numDeliveries: Number,
        lastTransactionDate: Date
    });

const Lodgement = mongoose.model('lodgement', lodgementSchema);

module.exports = {
    Lodgement
}