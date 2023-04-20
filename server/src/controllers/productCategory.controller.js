const productCategoryService  = require('../services/productCategory.service');
const logger = require('../logger/api.logger');

class ProductCategoryController {

    async getProductCategories() {
        logger.info('Controller: getProductCategories')
        return await productCategoryService.getProductCategories();
    }

    async getProductCategoryById(productCategoryId) {
        logger.info('Controller: getProductCategoryById', productCategoryId);
        return await productCategoryService.getProductCategoryById(productCategoryId);
    }

    async createProductCategory(productCategory) {
        logger.info('Controller: createProductCategory', productCategory);
        return await productCategoryService.createProductCategory(productCategory);
    }

    async updateProductCategory(productCategoryId, productCategory) {
        logger.info('Controller: updateProductCategory', productCategory);
        return await productCategoryService.updateProductCategory(productCategoryId, productCategory);
    }

    async deleteProductCategory(productCategoryId) {
        logger.info('Controller: deleteProductCategory', productCategoryId);
        return await productCategoryService.deleteProductCategory(productCategoryId);
    }
}
module.exports = new ProductCategoryController();