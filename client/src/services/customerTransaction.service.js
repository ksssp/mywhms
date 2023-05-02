const axios = require ( 'axios' );

export async function getCustomerTransactions() {
    const response = await fetch('/api/accounting/customerTransactions');
    return await response.json();
}

export async function getCustomerTransactionsByCustomerId(customerId) {
    console.log('getting customer transactions by customer Id: ', customerId);
    const response = await fetch('/api/accounting/customerTransactionsByCustomer/'+customerId);
    return await response.json();
}

export async function getCustomerTransactionById(customerTransactionId) {
    const response = await fetch('/api/accounting/customerTransactions/'+customerTransactionId);
    return await response.json();
}

export async function createCustomerTransaction(data) {
    const response = await fetch(`/api/accounting/customerTransactions/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({customerTransaction: data})
    })
    return await response.json();
}

export async function deleteCustomerTransaction(customerTransactionId) {
    const response = await fetch(`/api/accounting/customerTransactions/${customerTransactionId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateCustomerTransaction(customerTransactionId, data) {
    const response = await fetch(`/api/accounting/customerTransactions/${customerTransactionId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({customerTransaction: data})
    })
    return await response.json();
}