const mongoose = require('mongoose');

const incomeTypeSchema = new mongoose.Schema({
        incomeType: String,
        incomeCategory: String,
        incomeSource: String,
        creationDate: Date, 
        lastModifiedDate: Date, 
        activeFrom: Date,
        activeUntil: Date
    }, { collection: 'incomeTypes' });

const IncomeType = mongoose.model('incomeType', incomeTypeSchema);

module.exports = {
    IncomeType
}