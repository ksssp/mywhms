const axios = require ( 'axios' );

export async function getEmployeeTransactions() {
    const response = await fetch('/api/accounting/employeeTransactions');
    return await response.json();
}

export async function getEmployeeTransactionsByEmployeeId(employeeId) {
    console.log('getting employee transactions by employee Id: ', employeeId);
    const response = await fetch('/api/accounting/employeeTransactionsByEmployee/'+employeeId);
    return await response.json();
}

export async function getEmployeeTransactionById(employeeTransactionId) {
    const response = await fetch('/api/accounting/employeeTransactions/'+employeeTransactionId);
    return await response.json();
}

export async function createEmployeeTransaction(data) {
    const response = await fetch(`/api/accounting/employeeTransactions/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({employeeTransaction: data})
    })
    return await response.json();
}

export async function deleteEmployeeTransaction(employeeTransactionId) {
    const response = await fetch(`/api/accounting/employeeTransactions/${employeeTransactionId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateEmployeeTransaction(employeeTransactionId, data) {
    const response = await fetch(`/api/accounting/employeeTransactions/${employeeTransactionId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({employeeTransaction: data})
    })
    return await response.json();
}