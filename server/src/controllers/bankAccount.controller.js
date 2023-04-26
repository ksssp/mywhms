const bankAccountService  = require('../services/bankAccount.service');
const logger = require('../logger/api.logger');

class BankAccountController {

    async getBankAccounts() {
        logger.info('Controller: getBankAccounts')
        return await bankAccountService.getBankAccounts();
    }

    async getBankAccountById(bankAccountId) {
        logger.info('Controller: getBankAccountById', bankAccountId);
        return await bankAccountService.getBankAccountById(bankAccountId);
    }

    async createBankAccount(bankAccount) {
        logger.info('Controller: createBankAccount', bankAccount);
        return await bankAccountService.createBankAccount(bankAccount);
    }

    async updateBankAccount(bankAccountId, bankAccount) {
        logger.info('Controller: updateBankAccount', bankAccount);
        return await bankAccountService.updateBankAccount(bankAccountId, bankAccount);
    }

    async deleteBankAccount(bankAccountId) {
        logger.info('Controller: deleteBankAccount', bankAccountId);
        return await bankAccountService.deleteBankAccount(bankAccountId);
    }
}
module.exports = new BankAccountController();