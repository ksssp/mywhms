const expenseRepository  = require('../repositories/expense.repository');

class ExpenseService {

    constructor() {}

    async getExpenses() {
        return await expenseRepository.getExpenses();
    }

    async getExpensesByEmployeeId(employeeId) {
        return await expenseRepository.getExpensesByEmployeeId(employeeId);
    }

    async getExpenseById(expenseId) {
        return await expenseRepository.getExpenseById(expenseId);
    }

    async createExpense(expense) {
        return await expenseRepository.createExpense(expense);
    }

    async updateExpense(expenseId, expense) {
        return await expenseRepository.updateExpense(expenseId, expense);
    }

    async deleteExpense(expenseId) {
        return await expenseRepository.deleteExpense(expenseId);
    }

}

module.exports = new ExpenseService();