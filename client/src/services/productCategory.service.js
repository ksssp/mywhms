const axios = require ( 'axios' );

export async function getProductCategories() {

    const response = await fetch('/api/referenceData/productCategories');
    return await response.json();
}

export async function getProductCategoryById(productCategoryId) {
    const response = await fetch('/api/referenceData/productCategories/'+productCategoryId);
    return await response.json();
}

export async function createProductCategory(data) {
    const response = await fetch(`/api/referenceData/productCategories/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({productCategory: data})
    })
    return await response.json();
}

export async function deleteProductCategory(productCategoryId) {
    const response = await fetch(`/api/referenceData/productCategories/${productCategoryId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateProductCategory(productCategoryId, data) {
    const response = await fetch(`/api/referenceData/productCategories/${productCategoryId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({productCategory: data})
    })
    return await response.json();
}