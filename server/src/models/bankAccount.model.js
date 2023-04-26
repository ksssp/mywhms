const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
        bankAccountName: String,
        bankName: String,
        bankAccountNumber: String,
        bankBranch: String,
        creationDate: Date, 
        lastModifiedDate: Date, 
        activeFrom: Date,
        activeUntil: Date
    }, { collection: 'bankAccounts' });

const BankAccount = mongoose.model('bankAccount', bankAccountSchema);

module.exports = {
    BankAccount
}