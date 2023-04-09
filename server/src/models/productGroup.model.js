const mongoose = require('mongoose');

const productGroupSchema = new mongoose.Schema({
        productGroup: String,
        productSubGroup: String,
        productSubGroupPrefix: String,
        yearlyRentPerQuintal: Number,
        onesideHamaliPerQuintal: String,
        creationDate: Date, 
    }, { collection: 'productGroups' });

const ProductGroup = mongoose.model('productGroup', productGroupSchema);

module.exports = {
    ProductGroup
}