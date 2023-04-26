const bankAccountRepository  = require('../repositories/bankAccount.repository');

class BankAccountService {

    constructor() {}

    async getBankAccounts() {
        return await bankAccountRepository.getBankAccounts();
    }

    async getBankAccountById(bankAccountId) {
        return await bankAccountRepository.getBankAccountById(bankAccountId);
    }

    async createBankAccount(bankAccount) {
        return await bankAccountRepository.createBankAccount(bankAccount);
    }

    async updateBankAccount(bankAccountId, bankAccount) {
        return await bankAccountRepository.updateBankAccount(bankAccountId, bankAccount);
    }

    async deleteBankAccount(bankAccountId) {
        return await bankAccountRepository.deleteBankAccount(bankAccountId);
    }

}

module.exports = new BankAccountService();