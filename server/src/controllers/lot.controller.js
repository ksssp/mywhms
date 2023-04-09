const lotService  = require('../services/lot.service');
const logger = require('../logger/api.logger');

class LotController {

    async getLots() {
        logger.info('Controller: getLots')
        return await lotService.getLots();
    }

    async getLotsByFilter(filter) {
        logger.info('Controller: getLotsByFilter', filter);
        return await lotService.getLotsByFilter(filter);
    }

    async getLotById(lotId) {
        logger.info('Controller: getLotById', lotId);
        return await lotService.getLotById(lotId);
    }

    async createLot(lot) {
        logger.info('Controller: createLot', lot);
        return await lotService.createLot(lot);
    }

    async updateLot(lot) {
        logger.info('Controller: updateLot', lot);
        return await lotService.updateLot(lot);
    }

    async deleteLot(lotId) {
        logger.info('Controller: deleteLot', lotId);
        return await lotService.deleteLot(lotId);
    }
}
module.exports = new LotController();