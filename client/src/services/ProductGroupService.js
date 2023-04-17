const axios = require ( 'axios' );

export async function getProductGroups() {

    const response = await fetch('/api/referenceData/productGroups');
    return await response.json();
}

export async function getProductGroupById(productGroupId) {
    const response = await fetch('/api/referenceData/productGroups/'+productGroupId);
    return await response.json();
}

export async function createProductGroup(data) {
    const response = await fetch(`/api/referenceData/productGroups/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({productGroup: data})
    })
    return await response.json();
}

export async function deleteProductGroup(productGroupId) {
    const response = await fetch(`/api/referenceData/productGroups/${productGroupId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateProductGroup(productGroupId, data) {
    const response = await fetch(`/api/referenceData/productGroups/${productGroupId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({productGroup: data})
    })
    return await response.json();
}