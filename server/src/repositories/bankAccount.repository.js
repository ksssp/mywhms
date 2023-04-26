
const { connect, disconnect } = require('../config/db.config');
const { BankAccount } = require('../models/bankAccount.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class BankAccountRepository {

    constructor() {
        connect();
    }

    async getBankAccounts() {
        logger.info("bankAccount repository find() ");
        const bankAccounts = await BankAccount.find({});
        return bankAccounts;
    }

    async getBankAccountById(bankAccountId) {
        let data = {};
        try {
            logger.info("bankAccount repository findById: ", new mongoose.Types.ObjectId(bankAccountId));
            data = await BankAccount.findById(new mongoose.Types.ObjectId(bankAccountId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createBankAccount(bankAccount) {
        let data = {};
        try {
            data = await BankAccount.create(bankAccount);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateBankAccount(bankAccountId, bankAccount) {
        let data = {};
        try {
            data = await BankAccount.updateOne({_id : bankAccountId}, bankAccount);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteBankAccount(bankAccountId) {
        let data = {};
        try {
            data = await BankAccount.deleteOne({_id : bankAccountId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new BankAccountRepository();