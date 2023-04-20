const mongoose = require('mongoose');

var SchemaTypes = mongoose.Schema.Types;
const deliverySchema = new mongoose.Schema({
        lodgementId: String,
        lotNumber: String,
        customer: {
            customerId: String,
            customerDisplayName: String,
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
        chargesPerBag: {
            hamaliPerBag: { type: Number, min: 0 },
            kataCooliePerBag: { type: Number, min: 0 },
            platformCooliePerBag: { type: Number, min: 0 },
            mamulluPerBag: { type: Number, min: 0 },
            insurancePerBag: { type: Number, min: 0 }
        },
        chargesPaid: {
            hamaliCharges: { type: Number, min: 0 },
            kataCoolieCharges: { type: Number, min: 0 },
            platformCoolieCharges: { type: Number, min: 0 },
            mamulluCharges: { type: Number, min: 0 },
            transportCharges: { type: Number, min: 0 },
            totalChargesPaid: { type: Number, min: 0 },
        },
        chargesReceivable: {
            nonHamaliChargesPaid: { type: Number, min: 0 }
        },
        rentals: {
            rentalYear: Number,
            rentalMode: String, 
            monthlyRentPerBag: { type: Number, min: 0 },
            yearlyRentPerBag: { type: Number, min: 0 },
            rentReceivableOnDeliveredBags: { type: Number, min: 0 }
        },
        lastModifiedDate: Date
    }, { collection: 'deliveries' });

const Delivery = mongoose.model('delivery', deliverySchema);

module.exports = {
    Delivery
}