const axios = require ( 'axios' );

export async function getProducts() {
    const response = await fetch('/api/referenceData/products');
    return await response.json();
}

export async function getProductById(productId) {
    const response = await fetch('/api/referenceData/products/'+productId);
    return await response.json();
}

export async function createProduct(data) {
    const response = await fetch(`/api/referenceData/products`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({product: data})
    })
    return await response.json();
}

export async function deleteProduct(productId) {
    const response = await fetch(`/api/referenceData/products/${productId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateProduct(productId, data) {
    const response = await fetch(`/api/referenceData/products/${productId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({product: data})
    })
    return await response.json();
}