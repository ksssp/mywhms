const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
        employeeCode: String,
        employeeFullName: String,
        designation: String,
        monthlySalary: Number,
        creationDate: Date, 
        lastModifiedDate: Date, 
        activeFrom: Date, 
        activeUntil: Date, 
    });

const Employee = mongoose.model('employee', employeeSchema);

module.exports = {
    Employee
}