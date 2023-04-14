const lodgementService  = require('../services/lodgement.service');
const logger = require('../logger/api.logger');

class LodgementController {

    async getLodgements() {
        logger.info('Controller: getLodgements')
        return await lodgementService.getLodgements();
    }

    async getLodgementsForLotsView() {
        logger.info('Controller: getLodgementsForLotsView')
        return await lodgementService.getLodgementsForLotsView();
    }

    async getLodgementById(lodgementId) {
        logger.info('Controller: getLodgementById', lodgementId);
        return await lodgementService.getLodgementById(lodgementId);
    }

    async getLodgementsByTrademarkId(trademarkId) {
        logger.info('Controller: getLodgementsByTrademarkId', trademarkId);
        return await lodgementService.getLodgementsByTrademarkId(trademarkId);
    }

    async createLodgement(lodgement) {
        logger.info('Controller: createLodgement', lodgement);
        return await lodgementService.createLodgement(lodgement);
    }

    async updateLodgement(lodgement) {
        logger.info('Controller: updateLodgement', lodgement);
        return await lodgementService.updateLodgement(lodgement);
    }

    async deleteLodgement(lodgementId) {
        logger.info('Controller: deleteLodgement', lodgementId);
        return await lodgementService.deleteLodgement(lodgementId);
    }
}
module.exports = new LodgementController();