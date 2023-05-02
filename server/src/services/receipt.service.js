const receiptRepository  = require('../repositories/receipt.repository');

class ReceiptService {

    constructor() {}

    async getReceipts() {
        return await receiptRepository.getReceipts();
    }

    async getReceiptsByCustomerId(customerId) {
        return await receiptRepository.getReceiptsByCustomerId(customerId);
    }

    async getReceiptById(receiptId) {
        return await receiptRepository.getReceiptById(receiptId);
    }

    async createReceipt(receipt) {
        return await receiptRepository.createReceipt(receipt);
    }

    async updateReceipt(receiptId, receipt) {
        return await receiptRepository.updateReceipt(receiptId, receipt);
    }

    async deleteReceipt(receiptId) {
        return await receiptRepository.deleteReceipt(receiptId);
    }

}

module.exports = new ReceiptService();