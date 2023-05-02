const incomeTypeService  = require('../services/incomeType.service');
const logger = require('../logger/api.logger');

class IncomeTypeController {

    async getIncomeTypes() {
        logger.info('Controller: getIncomeTypes')
        return await incomeTypeService.getIncomeTypes();
    }

    async getIncomeTypeById(incomeTypeId) {
        logger.info('Controller: getIncomeTypeById', incomeTypeId);
        return await incomeTypeService.getIncomeTypeById(incomeTypeId);
    }

    async createIncomeType(incomeType) {
        logger.info('Controller: createIncomeType', incomeType);
        return await incomeTypeService.createIncomeType(incomeType);
    }

    async updateIncomeType(incomeTypeId, incomeType) {
        logger.info('Controller: updateIncomeType', incomeType);
        return await incomeTypeService.updateIncomeType(incomeTypeId, incomeType);
    }

    async deleteIncomeType(incomeTypeId) {
        logger.info('Controller: deleteIncomeType', incomeTypeId);
        return await incomeTypeService.deleteIncomeType(incomeTypeId);
    }
}
module.exports = new IncomeTypeController();