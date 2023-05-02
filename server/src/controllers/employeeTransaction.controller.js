const employeeTransactionService  = require('../services/employeeTransaction.service');
const logger = require('../logger/api.logger');

class EmployeeTransactionController {

    async getEmployeeTransactions() {
        logger.info('Controller: getEmployeeTransactions')
        return await employeeTransactionService.getEmployeeTransactions();
    }

    async getEmployeeTransactionsByEmployeeId(employeeId) {
        logger.info('Controller: getEmployeeTransactionsByEmployeeId', employeeId);
        return await employeeTransactionService.getEmployeeTransactionsByEmployeeId(employeeId);
    }
    
    async getEmployeeTransactionById(employeeTransactionId) {
        logger.info('Controller: getEmployeeTransactionById', employeeTransactionId);
        return await employeeTransactionService.getEmployeeTransactionById(employeeTransactionId);
    }

    async createEmployeeTransaction(employeeTransaction) {
        logger.info('Controller: createEmployeeTransaction', employeeTransaction);
        return await employeeTransactionService.createEmployeeTransaction(employeeTransaction);
    }

    async updateEmployeeTransaction(employeeTransactionId, employeeTransaction) {
        logger.info('Controller: updateEmployeeTransaction', employeeTransaction);
        return await employeeTransactionService.updateEmployeeTransaction(employeeTransactionId, employeeTransaction);
    }

    async deleteEmployeeTransaction(employeeTransactionId) {
        logger.info('Controller: deleteEmployeeTransaction', employeeTransactionId);
        return await employeeTransactionService.deleteEmployeeTransaction(employeeTransactionId);
    }
}
module.exports = new EmployeeTransactionController();