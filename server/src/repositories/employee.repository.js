
const { connect, disconnect } = require('../config/db.config');
const { Employee } = require('../models/employee.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class EmployeeRepository {

    constructor() {
        connect();
    }

    async getEmployees() {
        const employees = await Employee.find({});
        return employees;
    }

    async getEmployeeById(employeeId) {
        let data = {};
        try {
            logger.info("employee repository findById: ", new mongoose.Types.ObjectId(employeeId));
            data = await Employee.findById(new mongoose.Types.ObjectId(employeeId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createEmployee(employee) {
        let data = {};
        try {
            data = await Employee.create(employee);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateEmployee(employeeId, employee) {
        let data = {};
        try {
            data = await Employee.updateOne({_id : employeeId}, employee);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteEmployee(employeeId) {
        let data = {};
        try {
            data = await Employee.deleteOne({_id : employeeId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new EmployeeRepository();