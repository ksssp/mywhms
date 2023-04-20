const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
        productName: String,
        productCategory: {
            productCategoryId: String,
            productCategoryPrefix: String
        },
        computedProductName: String,
        hamaliPerBag: Number,
        platformCooliePerBag: Number,
        kataCooliePerBag: Number,
        mamulluPerBag: Number,
        insurancePerBag: Number,
        monthlyRentPerBag: Number,
        yearlyRentPerBag: Number,
        yearlyRentPerKg: Number,
        unitName: String,
        bagSize: Number,
        bagSizeForRent: Number,
        computedYearlyRentPerBag: Number,
        creationDate: Date, 
        lastModifiedDate: Date,
        activeFrom: Date,
        activeUntil: Date
    });

const Product = mongoose.model('product', productSchema);

module.exports = {
    Product
}