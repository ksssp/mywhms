
const { connect, disconnect } = require('../config/db.config');
const { Payment } = require('../models/payment.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class PaymentRepository {

    constructor() {
        connect();
    }

    async getPayments() {
        logger.info("payment repository find() ");
        const payments = await Payment.find({
            'paymentType.paymentType' : { $ne: 'Salaries paid to Staff' }
        });
        return payments;
    }
    
    async getPaymentsByEmployeeId(employeeId) {
        let data = {};
        try {
            logger.info("payment repository getPaymentsByEmployeeId: ", employeeId);
            data = await Payment.find({
                'employee.employeeId': { $eq: employeeId } 
            }).
            sort({ transactionDate: -1 });
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async getPaymentById(paymentId) {
        let data = {};
        try {
            logger.info("payment repository findById: ", new mongoose.Types.ObjectId(paymentId));
            data = await Payment.findById(new mongoose.Types.ObjectId(paymentId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createPayment(payment) {
        let data = {};
        try {
            data = await Payment.create(payment);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updatePayment(paymentId, payment) {
        let data = {};
        try {
            data = await Payment.updateOne({_id : paymentId}, payment);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deletePayment(paymentId) {
        let data = {};
        try {
            data = await Payment.deleteOne({_id : paymentId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new PaymentRepository();