const paymentTypeService  = require('../services/paymentType.service');
const logger = require('../logger/api.logger');

class PaymentTypeController {

    async getPaymentTypes() {
        logger.info('Controller: getPaymentTypes')
        return await paymentTypeService.getPaymentTypes();
    }

    async getPaymentTypeById(paymentTypeId) {
        logger.info('Controller: getPaymentTypeById', paymentTypeId);
        return await paymentTypeService.getPaymentTypeById(paymentTypeId);
    }

    async createPaymentType(paymentType) {
        logger.info('Controller: createPaymentType', paymentType);
        return await paymentTypeService.createPaymentType(paymentType);
    }

    async updatePaymentType(paymentTypeId, paymentType) {
        logger.info('Controller: updatePaymentType', paymentType);
        return await paymentTypeService.updatePaymentType(paymentTypeId, paymentType);
    }

    async deletePaymentType(paymentTypeId) {
        logger.info('Controller: deletePaymentType', paymentTypeId);
        return await paymentTypeService.deletePaymentType(paymentTypeId);
    }
}
module.exports = new PaymentTypeController();