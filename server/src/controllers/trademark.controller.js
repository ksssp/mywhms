const trademarkService  = require('../services/trademark.service');
const logger = require('../logger/api.logger');

class TrademarkController {

    async getTrademarks() {
        logger.info('Controller: getTrademarks')
        return await trademarkService.getTrademarks();
    }

    async getTrademarkById(trademarkId) {
        logger.info('Controller: getTrademarkById', trademarkId);
        return await trademarkService.getTrademarkById(trademarkId);
    }

    async createTrademark(trademark) {
        logger.info('Controller: createTrademark', trademark);
        return await trademarkService.createTrademark(trademark);
    }

    async updateTrademark(trademarkId, trademark) {
        logger.info('Controller: updateTrademark', trademark);
        return await trademarkService.updateTrademark(trademarkId, trademark);
    }

    async deleteTrademark(trademarkId) {
        logger.info('Controller: deleteTrademark', trademarkId);
        return await trademarkService.deleteTrademark(trademarkId);
    }
}
module.exports = new TrademarkController();