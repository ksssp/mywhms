const axios = require ( 'axios' );

export async function getEmployeeTransactionTypes() {
    const response = await fetch('/api/administration/employeeTransactionTypes');
    return await response.json();
}

export async function getEmployeeTransactionTypeById(employeeTransactionTypeId) {
    const response = await fetch('/api/administration/employeeTransactionTypes/'+employeeTransactionTypeId);
    return await response.json();
}

export async function createEmployeeTransactionType(data) {
    const response = await fetch(`/api/administration/employeeTransactionTypes/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({employeeTransactionType: data})
    })
    return await response.json();
}

export async function deleteEmployeeTransactionType(employeeTransactionTypeId) {
    const response = await fetch(`/api/administration/employeeTransactionTypes/${employeeTransactionTypeId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateEmployeeTransactionType(employeeTransactionTypeId, data) {
    const response = await fetch(`/api/administration/employeeTransactionTypes/${employeeTransactionTypeId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({employeeTransactionType: data})
    })
    return await response.json();
}