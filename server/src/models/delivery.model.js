const mongoose = require('mongoose');

var SchemaTypes = mongoose.Schema.Types;
const deliverySchema = new mongoose.Schema({
        lodgementId: String,
        lotNumber: String,
        trademark: {
            trademarkId: String,
            trademarkName: String,
            customerName: String
        },
        product: {
            productId: String,
            productName: String,
        },
        deliveryDate: Date,
        numBagsDelivered: { type: Number, min: 1 },
        numBagsKataCoolie: { type: Number, min: 0 },
        numBagsLodged: { type: Number, min: 1 },
        numBagsBalance: { type: Number, min: 0 },
        locationCodes: String,
        lodgementDate: Date,
        deliveryNotes: String,
        numMonthsLodged: { type: Number, min: 1 },
        transport: {
            vehicleNumber: String,
            driverName: String
        },
        indicativeCharges: {
            hamaliCharges: SchemaTypes.Decimal128,
            kataCoolieCharges: SchemaTypes.Decimal128,
            platformCoolieCharges: SchemaTypes.Decimal128,
            mamulluCharges: SchemaTypes.Decimal128
        },
        chargesPaid: {
            hamaliCharges: SchemaTypes.Decimal128,
            kataCoolieCharges: SchemaTypes.Decimal128,
            platformCoolieCharges: SchemaTypes.Decimal128,
            mamulluCharges: SchemaTypes.Decimal128,
            transportCharges: SchemaTypes.Decimal128,
            totalChargesPaid: SchemaTypes.Decimal128
        },
        rents: {
            rentalYear: Number,
            rentalMode: String, 
            indicativeRent: Number,
            rentReceivableOnDeliveredBags: SchemaTypes.Decimal128
        },
        lastModifiedDate: Date
    }, { collection: 'deliveries' });

const Delivery = mongoose.model('delivery', deliverySchema);

module.exports = {
    Delivery
}