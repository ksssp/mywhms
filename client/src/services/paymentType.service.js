const axios = require ( 'axios' );

export async function getPaymentTypes() {
    const response = await fetch('/api/administration/paymentTypes');
    return await response.json();
}

export async function getPaymentTypeById(paymentTypeId) {
    const response = await fetch('/api/administration/paymentTypes/'+paymentTypeId);
    return await response.json();
}

export async function createPaymentType(data) {
    const response = await fetch(`/api/administration/paymentTypes/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({paymentType: data})
    })
    return await response.json();
}

export async function deletePaymentType(paymentTypeId) {
    const response = await fetch(`/api/administration/paymentTypes/${paymentTypeId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updatePaymentType(paymentTypeId, data) {
    const response = await fetch(`/api/administration/paymentTypes/${paymentTypeId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({paymentType: data})
    })
    return await response.json();
}