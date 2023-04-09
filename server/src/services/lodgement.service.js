const lodgementRepository  = require('../repositories/lodgement.repository');

class LodgementService {

    constructor() {}

    async getLodgements() {
        return await lodgementRepository.getLodgements();
    }

    async getLodgementById(lodgementId) {
        return await lodgementRepository.getLodgementById(lodgementId);
    }

    async createLodgement(lodgement) {
        return await lodgementRepository.createLodgement(lodgement);
    }

    async updateLodgement(lodgement) {
        return await lodgementRepository.updateLodgement(lodgement);
    }

    async deleteLodgement(lodgementId) {
        return await lodgementRepository.deleteLodgement(lodgementId);
    }

}

module.exports = new LodgementService();