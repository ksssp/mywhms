const axios = require ( 'axios' );

export async function getExpenseTypes() {
    const response = await fetch('/api/administration/expenseTypes');
    return await response.json();
}

export async function getExpenseTypeById(expenseTypeId) {
    const response = await fetch('/api/administration/expenseTypes/'+expenseTypeId);
    return await response.json();
}

export async function createExpenseType(data) {
    const response = await fetch(`/api/administration/expenseTypes/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({expenseType: data})
    })
    return await response.json();
}

export async function deleteExpenseType(expenseTypeId) {
    const response = await fetch(`/api/administration/expenseTypes/${expenseTypeId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateExpenseType(expenseTypeId, data) {
    const response = await fetch(`/api/administration/expenseTypes/${expenseTypeId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({expenseType: data})
    })
    return await response.json();
}