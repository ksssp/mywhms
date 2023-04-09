const employeeRepository  = require('../repositories/employee.repository');

class EmployeeService {

    constructor() {}

    async getEmployees() {
        return await employeeRepository.getEmployees();
    }

    async getEmployeeById(employeeId) {
        return await employeeRepository.getEmployeeById(employeeId);
    }

    async createEmployee(employee) {
        return await employeeRepository.createEmployee(employee);
    }

    async updateEmployee(employeeId, employee) {
        return await employeeRepository.updateEmployee(employeeId, employee);
    }

    async deleteEmployee(employeeId) {
        return await employeeRepository.deleteEmployee(employeeId);
    }

}

module.exports = new EmployeeService();