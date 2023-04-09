
const { connect, disconnect } = require('../config/db.config');
const { Product } = require('../models/product.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class ProductRepository {

    constructor() {
        connect();
    }

    async getProducts() {
        const products = await Product.find({});
        return products;
    }

    async getProductById(productId) {
        let data = {};
        try {
            logger.info("product repository findById: ", new mongoose.Types.ObjectId(productId));
            data = await Product.findById(new mongoose.Types.ObjectId(productId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createProduct(product) {
        let data = {};
        try {
            data = await Product.create(product);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateProduct(productId, product) {
        let data = {};
        try {
            data = await Product.updateOne({_id : productId}, product);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteProduct(productId) {
        let data = {};
        try {
            data = await Product.deleteOne({_id : productId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new ProductRepository();