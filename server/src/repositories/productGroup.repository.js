
const { connect, disconnect } = require('../config/db.config');
const { ProductGroup } = require('../models/productGroup.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class ProductGroupRepository {

    constructor() {
        connect();
    }

    async getProductGroups() {
        let data = {};
        try {
            data = await ProductGroup.find({});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async getProductGroupById(productGroupId) {
        let data = {};
        try {
            logger.info("productGroup repository findById: ", new mongoose.Types.ObjectId(productGroupId));
            data = await ProductGroup.findById(new mongoose.Types.ObjectId(productGroupId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createProductGroup(productGroup) {
        let data = {};
        try {
            data = await ProductGroup.create(productGroup);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateProductGroup(productGroupId, productGroup) {
        let data = {};
        try {
            data = await ProductGroup.updateOne({_id : productGroupId}, productGroup);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteProductGroup(productGroupId) {
        let data = {};
        try {
            data = await ProductGroup.deleteOne({_id : productGroupId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new ProductGroupRepository();