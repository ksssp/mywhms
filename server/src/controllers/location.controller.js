const locationService  = require('../services/location.service');
const logger = require('../logger/api.logger');

class LocationController {

    async getLocations() {
        logger.info('Controller: getLocations')
        return await locationService.getLocations();
    }

    async getLocationById(locationId) {
        logger.info('Controller: getLocationById', locationId);
        return await locationService.getLocationById(locationId);
    }

    async createLocation(location) {
        logger.info('Controller: createLocation', location);
        return await locationService.createLocation(location);
    }

    async updateLocation(locationId, location) {
        logger.info('Controller: updateLocation', location);
        return await locationService.updateLocation(locationId, location);
    }

    async deleteLocation(locationId) {
        logger.info('Controller: deleteLocation', locationId);
        return await locationService.deleteLocation(locationId);
    }
}
module.exports = new LocationController();