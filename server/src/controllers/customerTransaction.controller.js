const customerTransactionService  = require('../services/customerTransaction.service');
const logger = require('../logger/api.logger');

class CustomerTransactionController {

    async getCustomerTransactions() {
        logger.info('Controller: getCustomerTransactions')
        return await customerTransactionService.getCustomerTransactions();
    }

    async getCustomerTransactionsByCustomerId(customerId) {
        logger.info('Controller: getCustomerTransactionsByCustomerId', customerId);
        return await customerTransactionService.getCustomerTransactionsByCustomerId(customerId);
    }
    
    async getCustomerTransactionById(customerTransactionId) {
        logger.info('Controller: getCustomerTransactionById', customerTransactionId);
        return await customerTransactionService.getCustomerTransactionById(customerTransactionId);
    }

    async createCustomerTransaction(customerTransaction) {
        logger.info('Controller: createCustomerTransaction', customerTransaction);
        return await customerTransactionService.createCustomerTransaction(customerTransaction);
    }

    async updateCustomerTransaction(customerTransactionId, customerTransaction) {
        logger.info('Controller: updateCustomerTransaction', customerTransaction);
        return await customerTransactionService.updateCustomerTransaction(customerTransactionId, customerTransaction);
    }

    async deleteCustomerTransaction(customerTransactionId) {
        logger.info('Controller: deleteCustomerTransaction', customerTransactionId);
        return await customerTransactionService.deleteCustomerTransaction(customerTransactionId);
    }
}
module.exports = new CustomerTransactionController();