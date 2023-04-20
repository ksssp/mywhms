const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
        productCategory: String,
        productVariety: String,
        productCategoryPrefix: String,
        yearlyRentPerQuintal: Number,
        oneSideHamaliPerQuintal: String,
        creationDate: Date, 
        lastModifiedDate: Date,
        activeFrom: Date,
        activeUntil: Date
    }, { collection: 'productCategories' });

const ProductCategory = mongoose.model('productCategory', productCategorySchema);

module.exports = {
    ProductCategory
}