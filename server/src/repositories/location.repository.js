
const { connect, disconnect } = require('../config/db.config');
const { Location } = require('../models/location.model');
const logger = require('../logger/api.logger');
const mongoose = require ("mongoose");

class LocationRepository {

    constructor() {
        connect();
    }

    async getLocations() {
        const locations = await Location.find({
            isActive: { $eq : true }
        });
        return locations;
    }

    async getLocationById(locationId) {
        let data = {};
        try {
            logger.info("location repository findById: ", new mongoose.Types.ObjectId(locationId));
            data = await Location.findById(new mongoose.Types.ObjectId(locationId));
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async createLocation(location) {
        let data = {};
        try {
            data = await Location.create(location);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async updateLocation(locationId, location) {
        let data = {};
        try {
            data = await Location.updateOne({_id : locationId}, location);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.modifiedCount > 0) };
    }

    async deleteLocation(locationId) {
        let data = {};
        try {
            data = await Location.deleteOne({_id : locationId});
        } catch(err) {
            logger.error('Error::' + err);
        }
        return { status: (data.deletedCount > 0) };
    }

}

module.exports = new LocationRepository();