const employeeTransactionTypeRepository  = require('../repositories/employeeTransactionType.repository');

class EmployeeTransactionTypeService {

    constructor() {}

    async getEmployeeTransactionTypes() {
        return await employeeTransactionTypeRepository.getEmployeeTransactionTypes();
    }

    async getEmployeeTransactionTypeById(employeeTransactionTypeId) {
        return await employeeTransactionTypeRepository.getEmployeeTransactionTypeById(employeeTransactionTypeId);
    }

    async createEmployeeTransactionType(employeeTransactionType) {
        return await employeeTransactionTypeRepository.createEmployeeTransactionType(employeeTransactionType);
    }

    async updateEmployeeTransactionType(employeeTransactionTypeId, employeeTransactionType) {
        return await employeeTransactionTypeRepository.updateEmployeeTransactionType(employeeTransactionTypeId, employeeTransactionType);
    }

    async deleteEmployeeTransactionType(employeeTransactionTypeId) {
        return await employeeTransactionTypeRepository.deleteEmployeeTransactionType(employeeTransactionTypeId);
    }

}

module.exports = new EmployeeTransactionTypeService();