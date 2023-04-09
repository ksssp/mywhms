const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        productName: String,
        productGroupId: String,
        productSubGroupPrefix: String,
        bagSize: Number,
        computedProductName: String,
        hamaliPerBag: Number,
        platformCooliePerBag: Number,
        kataCooliePerBag: Number,
        mamulluPerBag: Number,
        insurancePerBag: Number,
        monthlyRentPerBag: Number,
        yearlyRentPerBag: Number,
        yearlyRentPerKg: Number,
        computedYearlyRentPerBag: Number,
        creationDate: Date, 
    });

const Product = mongoose.model('product', productSchema);

module.exports = {
    Product
}