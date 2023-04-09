
const { connect, disconnect } = require('../config/db.config');
const { Lot } = require('../models/lot.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class LotRepository {

    constructor() {
        connect();
    }

    async getLots() {
        const lots = await Lot.find({});
        return lots;
    }

    async getLotsByFilter(filter) {
        const lots = await Lot.find(filter);
        return lots;
    }

    async getLotById(lotId) {
        let data = {};
        try {
            logger.info("lot repository findById: ", new mongoose.Types.ObjectId(lotId));
            data = await Lot.findById(new mongoose.Types.ObjectId(lotId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createLot(lot) {
        let data = {};
        try {
            data = await Lot.create(lot);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateLot(lot) {
        let data = {};
        try {
            data = await Lot.updateOne(lot);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteLot(lotId) {
        let data = {};
        try {
            data = await Lot.deleteOne({_id : lotId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

module.exports = new LotRepository();