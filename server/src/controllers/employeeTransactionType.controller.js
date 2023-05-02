const employeeTransactionTypeService  = require('../services/employeeTransactionType.service');
const logger = require('../logger/api.logger');

class EmployeeTransactionTypeController {

    async getEmployeeTransactionTypes() {
        logger.info('Controller: getEmployeeTransactionTypes')
        return await employeeTransactionTypeService.getEmployeeTransactionTypes();
    }

    async getEmployeeTransactionTypeById(employeeTransactionTypeId) {
        logger.info('Controller: getEmployeeTransactionTypeById', employeeTransactionTypeId);
        return await employeeTransactionTypeService.getEmployeeTransactionTypeById(employeeTransactionTypeId);
    }

    async createEmployeeTransactionType(employeeTransactionType) {
        logger.info('Controller: createEmployeeTransactionType', employeeTransactionType);
        return await employeeTransactionTypeService.createEmployeeTransactionType(employeeTransactionType);
    }

    async updateEmployeeTransactionType(employeeTransactionTypeId, employeeTransactionType) {
        logger.info('Controller: updateEmployeeTransactionType', employeeTransactionType);
        return await employeeTransactionTypeService.updateEmployeeTransactionType(employeeTransactionTypeId, employeeTransactionType);
    }

    async deleteEmployeeTransactionType(employeeTransactionTypeId) {
        logger.info('Controller: deleteEmployeeTransactionType', employeeTransactionTypeId);
        return await employeeTransactionTypeService.deleteEmployeeTransactionType(employeeTransactionTypeId);
    }
}
module.exports = new EmployeeTransactionTypeController();