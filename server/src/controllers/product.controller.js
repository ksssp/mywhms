const productService  = require('../services/product.service');
const logger = require('../logger/api.logger');

class ProductController {

    async getProducts() {
        logger.info('Controller: getProducts')
        return await productService.getProducts();
    }

    async getProductById(productId) {
        logger.info('Controller: getProductById', productId);
        return await productService.getProductById(productId);
    }

    async createProduct(product) {
        logger.info('Controller: createProduct', product);
        return await productService.createProduct(product);
    }

    async updateProduct(productId, product) {
        logger.info('Controller: updateProduct', product);
        return await productService.updateProduct(productId, product);
    }

    async deleteProduct(productId) {
        logger.info('Controller: deleteProduct', productId);
        return await productService.deleteProduct(productId);
    }
}
module.exports = new ProductController();