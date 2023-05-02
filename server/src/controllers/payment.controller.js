const paymentService  = require('../services/payment.service');
const logger = require('../logger/api.logger');

class PaymentController {

    async getPayments() {
        logger.info('Controller: getPayments')
        return await paymentService.getPayments();
    }

    async getPaymentsByEmployeeId(employeeId) {
        logger.info('Controller: getPaymentsByEmployeeId', employeeId);
        return await paymentService.getPaymentsByEmployeeId(employeeId);
    }
    
    async getPaymentById(paymentId) {
        logger.info('Controller: getPaymentById', paymentId);
        return await paymentService.getPaymentById(paymentId);
    }

    async createPayment(payment) {
        logger.info('Controller: createPayment', payment);
        return await paymentService.createPayment(payment);
    }

    async updatePayment(paymentId, payment) {
        logger.info('Controller: updatePayment', payment);
        return await paymentService.updatePayment(paymentId, payment);
    }

    async deletePayment(paymentId) {
        logger.info('Controller: deletePayment', paymentId);
        return await paymentService.deletePayment(paymentId);
    }
}
module.exports = new PaymentController();