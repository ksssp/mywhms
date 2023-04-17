const axios = require ( 'axios' );

export async function getLots() {
    const response = await fetch('/api/inventory/lots');
    return await response.json();
}

export async function getLotById(lotId) {
    const response = await fetch('/api/inventory/lots/'+lotId);
    return await response.json();
}

export async function createLodgement(data) {
    const response = await fetch(`/api/inventory/lodgement`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({lodgement: data})
    })
    return await response.json();
}

export async function deleteLodgement(lodgementId) {
    const response = await fetch(`/api/inventory/lodgement/${lodgementId}`, {method: 'DELETE'})
    return await response.json();
}

export async function editLodgement(data) {
    const response = await fetch(`/api/inventory/lodgement`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({lodgement: data})
    })
    return await response.json();
}