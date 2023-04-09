const trademarkRepository  = require('../repositories/trademark.repository');

class TrademarkService {

    constructor() {}

    async getTrademarks() {
        return await trademarkRepository.getTrademarks();
    }

    async getTrademarkById(trademarkId) {
        return await trademarkRepository.getTrademarkById(trademarkId);
    }

    async createTrademark(trademark) {
        return await trademarkRepository.createTrademark(trademark);
    }

    async updateTrademark(trademarkId, trademark) {
        return await trademarkRepository.updateTrademark(trademarkId, trademark);
    }

    async deleteTrademark(trademarkId) {
        return await trademarkRepository.deleteTrademark(trademarkId);
    }

}

module.exports = new TrademarkService();