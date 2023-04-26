const mongoose = require('mongoose');

const bankAccountTransactionSchema = new mongoose.Schema({
        transactionDate: Date,
        bankAccount: {
            bankAccountId: String,
            bankAccountName: String
        },
        amount: Number,
        transactionMode: String,
        transactionDetails: String, 
    });

const BankAccountTransaction = mongoose.model('bankAccountTransaction', bankAccountTransactionSchema);

module.exports = {
    BankAccountTransaction
}