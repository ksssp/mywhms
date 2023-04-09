const employeeService  = require('../services/employee.service');
const logger = require('../logger/api.logger');

class EmployeeController {

    async getEmployees() {
        logger.info('Controller: getEmployees')
        return await employeeService.getEmployees();
    }

    async getEmployeeById(employeeId) {
        logger.info('Controller: getEmployeeById', employeeId);
        return await employeeService.getEmployeeById(employeeId);
    }

    async createEmployee(employee) {
        logger.info('Controller: createEmployee', employee);
        return await employeeService.createEmployee(employee);
    }

    async updateEmployee(employeeId, employee) {
        logger.info('Controller: updateEmployee', employeeId, " employeeObj", employee);
        return await employeeService.updateEmployee(employeeId, employee);
    }

    async deleteEmployee(employeeId) {
        logger.info('Controller: deleteEmployee', employeeId);
        return await employeeService.deleteEmployee(employeeId);
    }
}
module.exports = new EmployeeController();