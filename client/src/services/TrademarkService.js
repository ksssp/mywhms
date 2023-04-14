const axios = require ( 'axios' );

export async function getTrademarks() {
    const response = await fetch('/api/referenceData/trademarks');
    return await response.json();
}

export async function getTrademarkById(trademarkId) {
    const response = await fetch('/api/referenceData/trademarks/'+trademarkId);
    return await response.json();
}

export async function createTrademark(data) {
    const response = await fetch(`/api/referenceData/trademarks/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({trademark: data})
    })
    return await response.json();
}

export async function deleteTrademark(trademarkId) {
    const response = await fetch(`/api/referenceData/trademarks/${trademarkId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateTrademark(trademarkId, data) {
    const response = await fetch(`/api/referenceData/trademarks/${trademarkId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({trademark: data})
    })
    return await response.json();
}