const axios = require ( 'axios' );

export async function getExpenses() {
    const response = await fetch('/api/accounting/expenses');
    return await response.json();
}

export async function getExpensesByEmployeeId(employeeId) {
    console.log('getting employee transactions by employee Id: ', employeeId);
    const response = await fetch('/api/accounting/expensesByEmployee/'+employeeId);
    return await response.json();
}

export async function getExpenseById(expenseId) {
    const response = await fetch('/api/accounting/expenses/'+expenseId);
    return await response.json();
}

export async function createExpense(data) {
    const response = await fetch(`/api/accounting/expenses/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({expense: data})
    })
    return await response.json();
}

export async function deleteExpense(expenseId) {
    const response = await fetch(`/api/accounting/expenses/${expenseId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateExpense(expenseId, data) {
    const response = await fetch(`/api/accounting/expenses/${expenseId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({expense: data})
    })
    return await response.json();
}