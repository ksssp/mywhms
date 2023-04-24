const axios = require ( 'axios' );

export async function getLocations() {
    const response = await fetch('/api/administration/locations');
    return await response.json();
}

export async function getLocationById(locationId) {
    const response = await fetch('/api/administration/locations/'+locationId);
    return await response.json();
}

export async function createLocation(data) {
    const response = await fetch(`/api/administration/locations/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({location: data})
    })
    return await response.json();
}

export async function deleteLocation(locationId) {
    const response = await fetch(`/api/administration/locations/${locationId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateLocation(locationId, data) {
    const response = await fetch(`/api/administration/locations/${locationId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({location: data})
    })
    return await response.json();
}