const lodgementRepository  = require('../repositories/lodgement.repository');

class LodgementService {

    constructor() {}

    async getLodgements() {
        return await lodgementRepository.getLodgements();
    }
    async getLodgementsForLotsView() {
        return await lodgementRepository.getLodgementsForLotsView();
    }

    async getLodgementById(lodgementId) {
        return await lodgementRepository.getLodgementById(lodgementId);
    }
    
    async getLodgementsByCustomerId(customerId) {
        return await lodgementRepository.getLodgementsByCustomerId(customerId);
    }

    async createLodgement(lodgement) {
        return await lodgementRepository.createLodgement(lodgement);
    }

    async updateLodgement(lodgementId, lodgement) {
        return await lodgementRepository.updateLodgement(lodgementId, lodgement);
    }

    async deleteLodgement(lodgementId) {
        return await lodgementRepository.deleteLodgement(lodgementId);
    }

}

module.exports = new LodgementService();