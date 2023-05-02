const receiptTypeService  = require('../services/receiptType.service');
const logger = require('../logger/api.logger');

class ReceiptTypeController {

    async getReceiptTypes() {
        logger.info('Controller: getReceiptTypes')
        return await receiptTypeService.getReceiptTypes();
    }

    async getReceiptTypeById(receiptTypeId) {
        logger.info('Controller: getReceiptTypeById', receiptTypeId);
        return await receiptTypeService.getReceiptTypeById(receiptTypeId);
    }

    async createReceiptType(receiptType) {
        logger.info('Controller: createReceiptType', receiptType);
        return await receiptTypeService.createReceiptType(receiptType);
    }

    async updateReceiptType(receiptTypeId, receiptType) {
        logger.info('Controller: updateReceiptType', receiptType);
        return await receiptTypeService.updateReceiptType(receiptTypeId, receiptType);
    }

    async deleteReceiptType(receiptTypeId) {
        logger.info('Controller: deleteReceiptType', receiptTypeId);
        return await receiptTypeService.deleteReceiptType(receiptTypeId);
    }
}
module.exports = new ReceiptTypeController();