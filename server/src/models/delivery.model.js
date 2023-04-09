const mongoose = require('mongoose');

var SchemaTypes = mongoose.Schema.Types;
const deliverySchema = new mongoose.Schema({
        lotNumber: String,
        trademark: {
            trademark: String,
            customerName: String
        },
        productName: String,
        numBagsDelivered: Number,
        numBagsLodged: Number,
        numBagsBalance: Number,
        locationCodes: String,
        deliveryDate: Date,
        lodgementDate: Date,
        numMonthsLodged: Number,
        transportChargesPaid: SchemaTypes.Decimal128,
        deliveryChargesReceivable: SchemaTypes.Decimal128,
        deliveryChargesReceived: SchemaTypes.Decimal128,
        rents: {
            rentalYear: Number,
            rentalMode: String,
            totalRentReceivable: SchemaTypes.Decimal128,
            totalRentReceived: SchemaTypes.Decimal128
        },
        vehicleNumber: String,
        driverName: String,
        deliveryNotes: String
    }, { collection: 'deliveries' });

const Delivery = mongoose.model('delivery', deliverySchema);

module.exports = {
    Delivery
}