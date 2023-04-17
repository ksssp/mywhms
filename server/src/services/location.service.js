const locationRepository  = require('../repositories/location.repository');

class LocationService {

    constructor() {}

    async getLocations() {
        return await locationRepository.getLocations();
    }

    async getLocationById(locationId) {
        return await locationRepository.getLocationById(locationId);
    }

    async createLocation(location) {
        return await locationRepository.createLocation(location);
    }

    async updateLocation(locationId, location) {
        return await locationRepository.updateLocation(locationId, location);
    }

    async deleteLocation(locationId) {
        return await locationRepository.deleteLocation(locationId);
    }

}

module.exports = new LocationService();