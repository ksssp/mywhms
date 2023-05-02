const axios = require ( 'axios' );

export async function getReceiptTypes() {
    const response = await fetch('/api/administration/receiptTypes');
    return await response.json();
}

export async function getReceiptTypeById(receiptTypeId) {
    const response = await fetch('/api/administration/receiptTypes/'+receiptTypeId);
    return await response.json();
}

export async function createReceiptType(data) {
    const response = await fetch(`/api/administration/receiptTypes/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({receiptType: data})
    })
    return await response.json();
}

export async function deleteReceiptType(receiptTypeId) {
    const response = await fetch(`/api/administration/receiptTypes/${receiptTypeId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateReceiptType(receiptTypeId, data) {
    const response = await fetch(`/api/administration/receiptTypes/${receiptTypeId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({receiptType: data})
    })
    return await response.json();
}