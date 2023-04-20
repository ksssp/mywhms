const axios = require ( 'axios' );

export async function getCustomers() {
    const response = await fetch('/api/referenceData/customers');
    return await response.json();
}

export async function getCustomerById(customerId) {
    const response = await fetch('/api/referenceData/customers/'+customerId);
    return await response.json();
}

export async function createCustomer(data) {
    const response = await fetch(`/api/referenceData/customers/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({customer: data})
    })
    return await response.json();
}

export async function deleteCustomer(customerId) {
    const response = await fetch(`/api/referenceData/customers/${customerId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateCustomer(customerId, data) {
    const response = await fetch(`/api/referenceData/customers/${customerId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({customer: data})
    })
    return await response.json();
}