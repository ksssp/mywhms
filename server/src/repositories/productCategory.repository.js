
const { connect, disconnect } = require('../config/db.config');
const { ProductCategory } = require('../models/productCategory.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class ProductCategoryRepository {

    constructor() {
        connect();
    }

    async getProductCategories() {
        let data = {};
        try {
            data = await ProductCategory.find({});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async getProductCategoryById(productCategoryId) {
        let data = {};
        try {
            logger.info("productCategory repository findById: ", new mongoose.Types.ObjectId(productCategoryId));
            data = await ProductCategory.findById(new mongoose.Types.ObjectId(productCategoryId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createProductCategory(productCategory) {
        let data = {};
        try {
            data = await ProductCategory.create(productCategory);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateProductCategory(productCategoryId, productCategory) {
        let data = {};
        try {
            data = await ProductCategory.updateOne({_id : productCategoryId}, productCategory);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteProductCategory(productCategoryId) {
        let data = {};
        try {
            data = await ProductCategory.deleteOne({_id : productCategoryId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new ProductCategoryRepository();