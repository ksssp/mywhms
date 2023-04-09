const productGroupRepository  = require('../repositories/productGroup.repository');

class ProductGroupService {

    constructor() {}

    async getProductGroups() {
        return await productGroupRepository.getProductGroups();
    }

    async getProductGroupById(productGroupId) {
        return await productGroupRepository.getProductGroupById(productGroupId);
    }

    async createProductGroup(productGroup) {
        return await productGroupRepository.createProductGroup(productGroup);
    }

    async updateProductGroup(productGroupId, productGroup) {
        return await productGroupRepository.updateProductGroup(productGroupId, productGroup);
    }

    async deleteProductGroup(productGroupId) {
        return await productGroupRepository.deleteProductGroup(productGroupId);
    }

}

module.exports = new ProductGroupService();