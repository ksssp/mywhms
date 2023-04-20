
const { connect, disconnect } = require('../config/db.config');
const { Lodgement } = require('../models/lodgement.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class LodgementRepository {

    constructor() {
        connect();
    }

    async getLodgements() {
        const lodgements = await Lodgement.find({
                numBagsBalance: { $gt : 0 }
            }).
            select({
                _id: 1,
                lodgementDate: 1,
                lotNumber: 1,
                trademark: 1,
                product: 1,
                numBagsLodged: 1,
                numBagsBalance: 1,
                isPlatformLot: 1,
                locationCodes: 1,
                chargesReceivable: 1,
                chargesPaid: 1,
                rents: 1
            }).
            sort({ lodgementDate: -1 });
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
    
    async getLodgementByLotNumber(lotNumber) {
        let data = {};
        try {
            logger.info("lodgement repository findByLotNumber: ", lotNumber);
            data = await Lodgement.find({
                lotNumber: { $eq : lotNumber }
            });
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async getLodgementsByCustomerId(customerId) {
        let data = {};
        try {
            logger.info("lodgement repository findByTrademarkId: ", new mongoose.Types.ObjectId(trademarkId));
            data = await Lodgement.find({
                numBagsBalance: { $gt : 0 },
                'customer.customerId': { $eq : customerId }
            }).select({
                _id: 1,
                lotNumber: 1,
                customer: 1,
                product: 1,
                numBagsLodged: 1,
                numBagsBalance: 1
            }).sort({ 
                lotNumber: 1 
            });
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

    async updateLodgement(lodgementId, lodgement) {
        let data = {};
        try {
            logger.info("lodgement repository updateOne: ", lodgementId);
            data = await Lodgement.updateOne({_id : lodgementId}, lodgement);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteLodgement(lodgementId) {
        let data = {};
        try {
            data = await Lodgement.deleteOne({_id : lodgementId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new LodgementRepository();