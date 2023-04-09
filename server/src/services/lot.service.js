const lotRepository  = require('../repositories/lot.repository');

class LotService {

    constructor() {}

    async getLots() {
        return await lotRepository.getLots();
    }

    async getLotById(lotId) {
        return await lotRepository.getLotById(lotId);
    }

    async getLotsByFilter(filter) {
        return await lotRepository.getLotsByFilter(filter);
    }

    async createLot(lot) {
        return await lotRepository.createLot(lot);
    }

    async updateLot(lot) {
        return await lotRepository.updateLot(lot);
    }

    async deleteLot(lotId) {
        return await lotRepository.deleteLot(lotId);
    }

}

module.exports = new LotService();