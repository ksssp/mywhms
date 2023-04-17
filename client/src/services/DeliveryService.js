const axios = require ( 'axios' );

export async function getDeliveries() {
    const response = await fetch('/api/inventory/deliveries');
    return await response.json();
}

export async function getDeliveryById(deliveryId) {
    const response = await fetch('/api/inventory/deliveries/'+deliveryId);
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
    const response = await fetch(`/api/inventory/delivery/${deliveryId}`, {method: 'DELETE'})
    return await response.json();
}

export async function editDelivery(data) {
    const response = await fetch(`/api/inventory/delivery`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({delivery: data})
    })
    return await response.json();
}