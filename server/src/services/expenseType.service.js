const expenseTypeRepository  = require('../repositories/expenseType.repository');

class ExpenseTypeService {

    constructor() {}

    async getExpenseTypes() {
        return await expenseTypeRepository.getExpenseTypes();
    }

    async getExpenseTypeById(expenseTypeId) {
        return await expenseTypeRepository.getExpenseTypeById(expenseTypeId);
    }

    async createExpenseType(expenseType) {
        return await expenseTypeRepository.createExpenseType(expenseType);
    }

    async updateExpenseType(expenseTypeId, expenseType) {
        return await expenseTypeRepository.updateExpenseType(expenseTypeId, expenseType);
    }

    async deleteExpenseType(expenseTypeId) {
        return await expenseTypeRepository.deleteExpenseType(expenseTypeId);
    }

}

module.exports = new ExpenseTypeService();