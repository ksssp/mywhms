const productCategoryRepository  = require('../repositories/productCategory.repository');

class ProductCategoryService {

    constructor() {}

    async getProductCategories() {
        return await productCategoryRepository.getProductCategories();
    }

    async getProductCategoryById(productCategoryId) {
        return await productCategoryRepository.getProductCategoryById(productCategoryId);
    }

    async createProductCategory(productCategory) {
        return await productCategoryRepository.createProductCategory(productCategory);
    }

    async updateProductCategory(productCategoryId, productCategory) {
        return await productCategoryRepository.updateProductCategory(productCategoryId, productCategory);
    }

    async deleteProductCategory(productCategoryId) {
        return await productCategoryRepository.deleteProductCategory(productCategoryId);
    }

}

module.exports = new ProductCategoryService();