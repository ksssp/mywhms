const mongoose = require('mongoose');

var SchemaTypes = mongoose.Schema.Types;
const lodgementSchema = new mongoose.Schema({
        lotNumber: String,
        customer: {
            customerId: String,
            customerDisplayName: String
        },
        product: {
            productId: String,
            productName: String,
        },
        numBagsLodged: { type: Number, min: 1 },
        numBagsKataCoolie: { type: Number, min: 0 },
        lodgementDate: Date,
        isPlatformLot: Boolean,
        locationCodes: String,
        lodgementNotes: String,
        transport: {
            vehicleNumber: String,
            driverName: String,
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
            hamaliCharges: { type: Number, min: 0 },
            insuranceCharges: { type: Number, min: 0 },
            nonHamaliChargesPaid: { type: Number, min: 0 },
            totalChargesReceivable: { type: Number, min: 0 }
        },
        rentals: {
            rentalYear: Number,
            rentalMode: String, 
            monthlyRentPerBag: { type: Number, min: 0 },
            yearlyRentPerBag: { type: Number, min: 0 },
            rentSettled: Boolean
        },
        numBagsBalance: { type: Number, min: 0 },
        stockRelease: {
            numDeliveries: Number,
            numBagsDelivered: Number,
            lastDeliveryDate: Date,
            totalChargesPaid: { type: Number, min: 0 },
            totalChargesReceivable: { type: Number, min: 0 },
            totalRentReceivable: { type: Number, min: 0 },
            deliveries: [ {
                deliveryId: String,
                deliveryDate: Date,
                numBagsDelivered: { type: Number, min: 1 },
                numBagsBalance: { type: Number, min: 0 },
                numMonthsLodged: Number,
                rentalMode: String,
                rentalYear: Number,
                monthlyRentPerBag: Number,
                yearlyRentPerBag: Number,
                rentReceivableOnDeliveredBags: { type: Number, min: 0 },
                nonHamaliChargesPaid: { type: Number, min: 0 }
            } ]
        },
        lastModifiedDate: Date,
        carryForward: {
            hasCarryForwardLot: Boolean,
            carryForwardLodgementId: String,
            carryForwardLotNumber: String,
            numBagsCarryForward: Number,
            isCarryForwardLot: Boolean,
            originalLodgementId: String,
            originalLotNumber: String
        }
    });

const Lodgement = mongoose.model('lodgement', lodgementSchema);

module.exports = {
    Lodgement
}