const bankAccountTransactionRepository  = require('../repositories/bankAccountTransaction.repository');

class BankAccountTransactionService {

    constructor() {}

    async getBankAccountTransactions() {
        return await bankAccountTransactionRepository.getBankAccountTransactions();
    }

    async getBankAccountTransactionById(bankAccountTransactionId) {
        return await bankAccountTransactionRepository.getBankAccountTransactionById(bankAccountTransactionId);
    }

    async createBankAccountTransaction(bankAccountTransaction) {
        return await bankAccountTransactionRepository.createBankAccountTransaction(bankAccountTransaction);
    }

    async updateBankAccountTransaction(bankAccountTransactionId, bankAccountTransaction) {
        return await bankAccountTransactionRepository.updateBankAccountTransaction(bankAccountTransactionId, bankAccountTransaction);
    }

    async deleteBankAccountTransaction(bankAccountTransactionId) {
        return await bankAccountTransactionRepository.deleteBankAccountTransaction(bankAccountTransactionId);
    }

}

module.exports = new BankAccountTransactionService();