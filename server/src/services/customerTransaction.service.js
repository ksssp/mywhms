const customerTransactionRepository  = require('../repositories/customerTransaction.repository');

class CustomerTransactionService {

    constructor() {}

    async getCustomerTransactions() {
        return await customerTransactionRepository.getCustomerTransactions();
    }

    async getCustomerTransactionsByCustomerId(customerId) {
        return await customerTransactionRepository.getCustomerTransactionsByCustomerId(customerId);
    }

    async getCustomerTransactionById(customerTransactionId) {
        return await customerTransactionRepository.getCustomerTransactionById(customerTransactionId);
    }

    async createCustomerTransaction(customerTransaction) {
        return await customerTransactionRepository.createCustomerTransaction(customerTransaction);
    }

    async updateCustomerTransaction(customerTransactionId, customerTransaction) {
        return await customerTransactionRepository.updateCustomerTransaction(customerTransactionId, customerTransaction);
    }

    async deleteCustomerTransaction(customerTransactionId) {
        return await customerTransactionRepository.deleteCustomerTransaction(customerTransactionId);
    }

}

module.exports = new CustomerTransactionService();