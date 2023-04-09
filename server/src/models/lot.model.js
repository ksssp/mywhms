const mongoose = require('mongoose');

var SchemaTypes = mongoose.Schema.Types;
const lotSchema = new mongoose.Schema({
        lodgementDate: String,
        lotNumber: String,
        numBagsLodged: Number,
        numBagsBalance: Number,
        locationCodes: String,
        numBagsKataCoolie: Number,
        numDeliveries: Number,
        lastTransactionDate: Date,
        trademark: {
            trademarkId: String,
            trademark: String,
            customerName: String
        },
        product: {
            productId: String,
            productName: String
        },
        charges: {
            hamaliCharges: SchemaTypes.Decimal128,
            platformCoolieCharges: SchemaTypes.Decimal128,
            kataCoolieCharges: SchemaTypes.Decimal128,
            mamulluCharges: SchemaTypes.Decimal128,
            insuranceCharges: SchemaTypes.Decimal128,
            totalLodgementChargesReceivable: SchemaTypes.Decimal128,
            totalLodgementChargesReceived: SchemaTypes.Decimal128,
            totalDeliveryChargesReceivable: SchemaTypes.Decimal128,
            totalDeliveryChargesReceived: SchemaTypes.Decimal128
        },
        vehicleNumber: String,
        driverName: String,
        transportChargesPaid: SchemaTypes.Decimal128,
        rents: {
            rentalYear: Number,
            rentalMode: String,
            totalRentReceivable: SchemaTypes.Decimal128,
            totalRentReceived: SchemaTypes.Decimal128
        },
        deliveries: [{
            deliveryId: String,
            deliveryDate: Date,
            numBagsDelivered: Number,
            numBagsBalance: Number,
            numMonthsLodged: Number,
            deliveryChargesReceivable: SchemaTypes.Decimal128,
            deliveryChargesReceived: SchemaTypes.Decimal128,
            rentReceivableOnDeliveredBags: SchemaTypes.Decimal128,
            transportChargesPaid: SchemaTypes.Decimal128
        }]
    });

const Lot = mongoose.model('lot', lotSchema);

module.exports = {
    Lot
}