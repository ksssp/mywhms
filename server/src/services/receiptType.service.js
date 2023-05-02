const receiptTypeRepository  = require('../repositories/receiptType.repository');

class ReceiptTypeService {

    constructor() {}

    async getReceiptTypes() {
        return await receiptTypeRepository.getReceiptTypes();
    }

    async getReceiptTypeById(receiptTypeId) {
        return await receiptTypeRepository.getReceiptTypeById(receiptTypeId);
    }

    async createReceiptType(receiptType) {
        return await receiptTypeRepository.createReceiptType(receiptType);
    }

    async updateReceiptType(receiptTypeId, receiptType) {
        return await receiptTypeRepository.updateReceiptType(receiptTypeId, receiptType);
    }

    async deleteReceiptType(receiptTypeId) {
        return await receiptTypeRepository.deleteReceiptType(receiptTypeId);
    }

}

module.exports = new ReceiptTypeService();