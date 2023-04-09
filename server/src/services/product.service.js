const productRepository  = require('../repositories/product.repository');

class ProductService {

    constructor() {}

    async getProducts() {
        return await productRepository.getProducts();
    }

    async getProductById(productId) {
        return await productRepository.getProductById(productId);
    }

    async createProduct(product) {
        return await productRepository.createProduct(product);
    }

    async updateProduct(productId, product) {
        return await productRepository.updateProduct(productId, product);
    }

    async deleteProduct(productId) {
        return await productRepository.deleteProduct(productId);
    }

}

module.exports = new ProductService();