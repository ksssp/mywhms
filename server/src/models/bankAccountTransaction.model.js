const mongoose = require('mongoose');

const bankAccountTransasctionSchema = new mongoose.Schema({
        transactionDate: Date,
        bankAccount: {
            bankAccountId: String,
            bankAccountName: String
        },
        amount: Number,
        transactionMode: String,
        transactionDetails: String
    }, { collection: 'bankAccountTransactions' });

const BankAccountTransaction = mongoose.model('bankAccountTransaction', bankAccountTransasctionSchema);

module.exports = {
    BankAccountTransaction
}