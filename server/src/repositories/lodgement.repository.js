
const { connect, disconnect } = require('../config/db.config');
const { Lodgement } = require('../models/lodgement.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class LodgementRepository {

    constructor() {
        connect();
    }

    async getLodgements() {
        const lodgements = await Lodgement.find({});
        return lodgements;
    }

    async getLodgementById(lodgementId) {
        let data = {};
        try {
            logger.info("lodgement repository findById: ", new mongoose.Types.ObjectId(lodgementId));
            data = await Lodgement.findById(new mongoose.Types.ObjectId(lodgementId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createLodgement(lodgement) {
        let data = {};
        try {
            data = await Lodgement.create(lodgement);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateLodgement(lodgement) {
        let data = {};
        try {
            data = await Lodgement.updateOne(lodgement);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async deleteLodgement(lodgementId) {
        let data = {};
        try {
            data = await Lodgement.deleteOne({_id : lodgementId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return {status: `${data.deletedCount > 0 ? true : false}`};
    }

}

module.exports = new LodgementRepository();