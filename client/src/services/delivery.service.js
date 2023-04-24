const axios = require ( 'axios' );

export async function getDeliveries() {
    const response = await fetch('/api/inventory/deliveries');
    return await response.json();
}

export async function getDeliveryById(deliveryId) {
    const response = await fetch('/api/inventory/deliveries/'+deliveryId);
    return await response.json();
}

export async function getDeliveriesByLodgementId(lodgementId) {
    const response = await fetch('/api/inventory/deliveriesByLodgement/'+lodgementId);
    return await response.json();
}

export async function getDeliveriesByFilter(filter) {
    const response = await fetch('/api/inventory/deliveriesbyFilter', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        body: JSON.stringify({filter})
    }
    });
    return await response.json();
}

export async function createDelivery(data) {
    const response = await fetch(`/api/inventory/deliveries`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({delivery: data})
    })
    return await response.json();
}

export async function deleteDelivery(deliveryId) {
    const response = await fetch(`/api/inventory/deliveries/${deliveryId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateDelivery(deliveryId, data) {
    const response = await fetch(`/api/inventory/deliveries/${deliveryId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({delivery: data})
    })
    return await response.json();
}