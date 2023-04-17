const mongoose = require('mongoose');

var SchemaTypes = mongoose.Schema.Types;
const lodgementSchema = new mongoose.Schema({
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
        numBagsLodged: { type: Number, min: 1 },
        numBagsKataCoolie: { type: Number, min: 0 },
        lodgementDate: Date,
        isPlatformLot: Boolean,
        isCarryForwardLot: Boolean,
        locationCodes: String,
        lodgementNotes: String,
        transport: {
            vehicleNumber: String,
            driverName: String,
        },
        indicativeCharges: {
            hamaliCharges: SchemaTypes.Decimal128,
            kataCoolieCharges: SchemaTypes.Decimal128,
            platformCoolieCharges: SchemaTypes.Decimal128,
            mamulluCharges: SchemaTypes.Decimal128,
            insuranceCharges: SchemaTypes.Decimal128
        },
        chargesPaid: {
            hamaliCharges: SchemaTypes.Decimal128,
            kataCoolieCharges: SchemaTypes.Decimal128,
            platformCoolieCharges: SchemaTypes.Decimal128,
            mamulluCharges: SchemaTypes.Decimal128,
            transportCharges: SchemaTypes.Decimal128,
            totalChargesPaid: SchemaTypes.Decimal128,
        },
        chargesReceivable: {
            hamaliCharges: SchemaTypes.Decimal128,
            insuranceCharges: SchemaTypes.Decimal128,
            totalChargesReceivable: SchemaTypes.Decimal128
        },
        rents: {
            rentalYear: Number,
            rentalMode: String, 
            indicativeRent: SchemaTypes.Decimal128,
            rentSettled: Boolean
        },
        numBagsBalance: { type: Number, min: 0 },
        stockRelease: {
            numDeliveries: Number,
            lastDeliveryDate: Date,
            totalChargesPaid: SchemaTypes.Decimal128,
            totalRentReceivable: SchemaTypes.Decimal128,
            deliveries: [ {
                deliveryId: String,
                deliveryDate: Date,
                numBagsDelivered: { type: Number, min: 1 },
                numBagsBalance: { type: Number, min: 0 },
                numMonthsLodged: Number,
                rentReceivableOnDeliveredBags: SchemaTypes.Decimal128,
                totalChargesPaid: SchemaTypes.Decimal128
            } ]
        },
        lastModifiedDate: Date
    });

const Lodgement = mongoose.model('lodgement', lodgementSchema);

module.exports = {
    Lodgement
}