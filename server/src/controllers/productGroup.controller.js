const productGroupService  = require('../services/productGroup.service');
const logger = require('../logger/api.logger');

class ProductGroupController {

    async getProductGroups() {
        logger.info('Controller: getProductGroups')
        return await productGroupService.getProductGroups();
    }

    async getProductGroupById(productGroupId) {
        logger.info('Controller: getProductGroupById', productGroupId);
        return await productGroupService.getProductGroupById(productGroupId);
    }

    async createProductGroup(productGroup) {
        logger.info('Controller: createProductGroup', productGroup);
        return await productGroupService.createProductGroup(productGroup);
    }

    async updateProductGroup(productGroupId, productGroup) {
        logger.info('Controller: updateProductGroup', productGroup);
        return await productGroupService.updateProductGroup(productGroupId, productGroup);
    }

    async deleteProductGroup(productGroupId) {
        logger.info('Controller: deleteProductGroup', productGroupId);
        return await productGroupService.deleteProductGroup(productGroupId);
    }
}
module.exports = new ProductGroupController();