
const { connect, disconnect } = require('../config/db.config');
const { Trademark } = require('../models/trademark.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class TrademarkRepository {

    constructor() {
        connect();
    }

    async getTrademarks() {
        const trademarks = await Trademark.find({});
        return trademarks;
    }

    async getTrademarkById(trademarkId) {
        let data = {};
        try {
            logger.info("trademark repository findById: ", new mongoose.Types.ObjectId(trademarkId));
            data = await Trademark.findById(new mongoose.Types.ObjectId(trademarkId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createTrademark(trademark) {
        let data = {};
        try {
            data = await Trademark.create(trademark);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateTrademark(trademarkId, trademark) {
        let data = {};
        try {
            data = await Trademark.updateOne({_id : trademarkId}, trademark);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteTrademark(trademarkId) {
        let data = {};
        try {
            data = await Trademark.deleteOne({_id : trademarkId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new TrademarkRepository();