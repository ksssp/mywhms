const bankAccountTransactionService  = require('../services/bankAccountTransaction.service');
const logger = require('../logger/api.logger');

class BankAccountTransactionController {

    async getBankAccountTransactions() {
        logger.info('Controller: getBankAccountTransactions')
        return await bankAccountTransactionService.getBankAccountTransactions();
    }

    async getBankAccountTransactionById(bankAccountTransactionId) {
        logger.info('Controller: getBankAccountTransactionById', bankAccountTransactionId);
        return await bankAccountTransactionService.getBankAccountTransactionById(bankAccountTransactionId);
    }

    async createBankAccountTransaction(bankAccountTransaction) {
        logger.info('Controller: createBankAccountTransaction', bankAccountTransaction);
        return await bankAccountTransactionService.createBankAccountTransaction(bankAccountTransaction);
    }

    async updateBankAccountTransaction(bankAccountTransactionId, bankAccountTransaction) {
        logger.info('Controller: updateBankAccountTransaction', bankAccountTransaction);
        return await bankAccountTransactionService.updateBankAccountTransaction(bankAccountTransactionId, bankAccountTransaction);
    }

    async deleteBankAccountTransaction(bankAccountTransactionId) {
        logger.info('Controller: deleteBankAccountTransaction', bankAccountTransactionId);
        return await bankAccountTransactionService.deleteBankAccountTransaction(bankAccountTransactionId);
    }
}
module.exports = new BankAccountTransactionController();