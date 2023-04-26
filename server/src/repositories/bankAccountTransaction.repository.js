
const { connect, disconnect } = require('../config/db.config');
const { BankAccountTransaction } = require('../models/bankAccountTransaction.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class BankAccountTransactionRepository {

    constructor() {
        connect();
    }

    async getBankAccountTransactions() {
        logger.info("bankAccountTransaction repository find() ");
        const bankAccountTransactions = await BankAccountTransaction.find({});
        return bankAccountTransactions;
    }

    async getBankAccountTransactionById(bankAccountTransactionId) {
        let data = {};
        try {
            logger.info("bankAccountTransaction repository findById: ", new mongoose.Types.ObjectId(bankAccountTransactionId));
            data = await BankAccountTransaction.findById(new mongoose.Types.ObjectId(bankAccountTransactionId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createBankAccountTransaction(bankAccountTransaction) {
        let data = {};
        try {
            data = await BankAccountTransaction.create(bankAccountTransaction);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateBankAccountTransaction(bankAccountTransactionId, bankAccountTransaction) {
        let data = {};
        try {
            data = await BankAccountTransaction.updateOne({_id : bankAccountTransactionId}, bankAccountTransaction);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteBankAccountTransaction(bankAccountTransactionId) {
        let data = {};
        try {
            data = await BankAccountTransaction.deleteOne({_id : bankAccountTransactionId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new BankAccountTransactionRepository();