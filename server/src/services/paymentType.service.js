const paymentTypeRepository  = require('../repositories/paymentType.repository');

class PaymentTypeService {

    constructor() {}

    async getPaymentTypes() {
        return await paymentTypeRepository.getPaymentTypes();
    }

    async getPaymentTypeById(paymentTypeId) {
        return await paymentTypeRepository.getPaymentTypeById(paymentTypeId);
    }

    async createPaymentType(paymentType) {
        return await paymentTypeRepository.createPaymentType(paymentType);
    }

    async updatePaymentType(paymentTypeId, paymentType) {
        return await paymentTypeRepository.updatePaymentType(paymentTypeId, paymentType);
    }

    async deletePaymentType(paymentTypeId) {
        return await paymentTypeRepository.deletePaymentType(paymentTypeId);
    }

}

module.exports = new PaymentTypeService();