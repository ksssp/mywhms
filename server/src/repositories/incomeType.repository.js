
const { connect, disconnect } = require('../config/db.config');
const { IncomeType } = require('../models/incomeType.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class IncomeTypeRepository {

    constructor() {
        connect();
    }

    async getIncomeTypes() {
        const incomeTypes = await IncomeType.find({});
        return incomeTypes;
    }

    async getIncomeTypeById(incomeTypeId) {
        let data = {};
        try {
            logger.info("incomeType repository findById: ", new mongoose.Types.ObjectId(incomeTypeId));
            data = await IncomeType.findById(new mongoose.Types.ObjectId(incomeTypeId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createIncomeType(incomeType) {
        let data = {};
        try {
            data = await IncomeType.create(incomeType);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateIncomeType(incomeTypeId, incomeType) {
        let data = {};
        try {
            data = await IncomeType.updateOne({_id : incomeTypeId}, incomeType);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteIncomeType(incomeTypeId) {
        let data = {};
        try {
            data = await IncomeType.deleteOne({_id : incomeTypeId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new IncomeTypeRepository();