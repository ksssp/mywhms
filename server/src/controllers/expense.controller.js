const expenseService  = require('../services/expense.service');
const logger = require('../logger/api.logger');

class ExpenseController {

    async getExpenses() {
        logger.info('Controller: getExpenses')
        return await expenseService.getExpenses();
    }

    async getExpensesByEmployeeId(employeeId) {
        logger.info('Controller: getExpensesByEmployeeId', employeeId);
        return await expenseService.getExpensesByEmployeeId(employeeId);
    }
    
    async getExpenseById(expenseId) {
        logger.info('Controller: getExpenseById', expenseId);
        return await expenseService.getExpenseById(expenseId);
    }

    async createExpense(expense) {
        logger.info('Controller: createExpense', expense);
        return await expenseService.createExpense(expense);
    }

    async updateExpense(expenseId, expense) {
        logger.info('Controller: updateExpense', expense);
        return await expenseService.updateExpense(expenseId, expense);
    }

    async deleteExpense(expenseId) {
        logger.info('Controller: deleteExpense', expenseId);
        return await expenseService.deleteExpense(expenseId);
    }
}
module.exports = new ExpenseController();