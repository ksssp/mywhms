const axios = require ( 'axios' );

export async function getPayments() {
    const response = await fetch('/api/accounting/payments');
    return await response.json();
}

export async function getPaymentsByEmployeeId(employeeId) {
    console.log('getting employee transactions by employee Id: ', employeeId);
    const response = await fetch('/api/accounting/paymentsByEmployee/'+employeeId);
    return await response.json();
}

export async function getPaymentById(paymentId) {
    const response = await fetch('/api/accounting/payments/'+paymentId);
    return await response.json();
}

export async function createPayment(data) {
    const response = await fetch(`/api/accounting/payments/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payment: data})
    })
    return await response.json();
}

export async function deletePayment(paymentId) {
    const response = await fetch(`/api/accounting/payments/${paymentId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updatePayment(paymentId, data) {
    const response = await fetch(`/api/accounting/payments/${paymentId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({payment: data})
    })
    return await response.json();
}