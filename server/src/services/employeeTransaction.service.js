const employeeTransactionRepository  = require('../repositories/employeeTransaction.repository');

class EmployeeTransactionService {

    constructor() {}

    async getEmployeeTransactions() {
        return await employeeTransactionRepository.getEmployeeTransactions();
    }

    async getEmployeeTransactionsByEmployeeId(employeeId) {
        return await employeeTransactionRepository.getEmployeeTransactionsByEmployeeId(employeeId);
    }

    async getEmployeeTransactionById(employeeTransactionId) {
        return await employeeTransactionRepository.getEmployeeTransactionById(employeeTransactionId);
    }

    async createEmployeeTransaction(employeeTransaction) {
        return await employeeTransactionRepository.createEmployeeTransaction(employeeTransaction);
    }

    async updateEmployeeTransaction(employeeTransactionId, employeeTransaction) {
        return await employeeTransactionRepository.updateEmployeeTransaction(employeeTransactionId, employeeTransaction);
    }

    async deleteEmployeeTransaction(employeeTransactionId) {
        return await employeeTransactionRepository.deleteEmployeeTransaction(employeeTransactionId);
    }

}

module.exports = new EmployeeTransactionService();