const axios = require ( 'axios' );

export async function getLodgements() {
    const response = await fetch('/api/inventory/lodgements');
    return await response.json();
}

export async function getLodgementById(lodgementId) {
    const response = await fetch('/api/inventory/lodgements/'+lodgementId);
    return await response.json();
}

export async function getLodgementsByCustomerId(customerId) {
    const response = await fetch('/api/inventory/lodgementsByCustomer/'+customerId);
    return await response.json();
}

export async function createLodgement(data) {
    const response = await fetch(`/api/inventory/lodgements`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({lodgement: data})
    })
    return await response.json();
}

export async function deleteLodgement(lodgementId) {
    const response = await fetch(`/api/inventory/lodgements/${lodgementId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateLodgement(lodgementId, data) {
    const response = await fetch(`/api/inventory/lodgements/${lodgementId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({lodgement: data})
    })
    return await response.json();
}