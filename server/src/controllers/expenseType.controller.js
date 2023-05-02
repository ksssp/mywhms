const expenseTypeService  = require('../services/expenseType.service');
const logger = require('../logger/api.logger');

class ExpenseTypeController {

    async getExpenseTypes() {
        logger.info('Controller: getExpenseTypes')
        return await expenseTypeService.getExpenseTypes();
    }

    async getExpenseTypeById(expenseTypeId) {
        logger.info('Controller: getExpenseTypeById', expenseTypeId);
        return await expenseTypeService.getExpenseTypeById(expenseTypeId);
    }

    async createExpenseType(expenseType) {
        logger.info('Controller: createExpenseType', expenseType);
        return await expenseTypeService.createExpenseType(expenseType);
    }

    async updateExpenseType(expenseTypeId, expenseType) {
        logger.info('Controller: updateExpenseType', expenseType);
        return await expenseTypeService.updateExpenseType(expenseTypeId, expenseType);
    }

    async deleteExpenseType(expenseTypeId) {
        logger.info('Controller: deleteExpenseType', expenseTypeId);
        return await expenseTypeService.deleteExpenseType(expenseTypeId);
    }
}
module.exports = new ExpenseTypeController();