const paymentRepository  = require('../repositories/payment.repository');

class PaymentService {

    constructor() {}

    async getPayments() {
        return await paymentRepository.getPayments();
    }

    async getPaymentsByEmployeeId(employeeId) {
        return await paymentRepository.getPaymentsByEmployeeId(employeeId);
    }

    async getPaymentById(paymentId) {
        return await paymentRepository.getPaymentById(paymentId);
    }

    async createPayment(payment) {
        return await paymentRepository.createPayment(payment);
    }

    async updatePayment(paymentId, payment) {
        return await paymentRepository.updatePayment(paymentId, payment);
    }

    async deletePayment(paymentId) {
        return await paymentRepository.deletePayment(paymentId);
    }

}

module.exports = new PaymentService();