const receiptService  = require('../services/receipt.service');
const logger = require('../logger/api.logger');

class ReceiptController {

    async getReceipts() {
        logger.info('Controller: getReceipts')
        return await receiptService.getReceipts();
    }

    async getReceiptsByCustomerId(customerId) {
        logger.info('Controller: getReceiptsByCustomerId', customerId);
        return await receiptService.getReceiptsByCustomerId(customerId);
    }
    
    async getReceiptById(receiptId) {
        logger.info('Controller: getReceiptById', receiptId);
        return await receiptService.getReceiptById(receiptId);
    }

    async createReceipt(receipt) {
        logger.info('Controller: createReceipt', receipt);
        return await receiptService.createReceipt(receipt);
    }

    async updateReceipt(receiptId, receipt) {
        logger.info('Controller: updateReceipt', receipt);
        return await receiptService.updateReceipt(receiptId, receipt);
    }

    async deleteReceipt(receiptId) {
        logger.info('Controller: deleteReceipt', receiptId);
        return await receiptService.deleteReceipt(receiptId);
    }
}
module.exports = new ReceiptController();