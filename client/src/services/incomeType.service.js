const axios = require ( 'axios' );

export async function getIncomeTypes() {
    const response = await fetch('/api/administration/incomeTypes');
    return await response.json();
}

export async function getIncomeTypeById(incomeTypeId) {
    const response = await fetch('/api/administration/incomeTypes/'+incomeTypeId);
    return await response.json();
}

export async function createIncomeType(data) {
    const response = await fetch(`/api/administration/incomeTypes/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({incomeType: data})
    })
    return await response.json();
}

export async function deleteIncomeType(incomeTypeId) {
    const response = await fetch(`/api/administration/incomeTypes/${incomeTypeId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateIncomeType(incomeTypeId, data) {
    const response = await fetch(`/api/administration/incomeTypes/${incomeTypeId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({incomeType: data})
    })
    return await response.json();
}