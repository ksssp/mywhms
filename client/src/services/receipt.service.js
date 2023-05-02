const axios = require ( 'axios' );

export async function getReceipts() {
    const response = await fetch('/api/accounting/receipts');
    return await response.json();
}

export async function getReceiptsByCustomerId(customerId) {
    console.log('getting customer transactions by customer Id: ', customerId);
    const response = await fetch('/api/accounting/receiptsByCustomer/'+customerId);
    return await response.json();
}

export async function getReceiptById(receiptId) {
    const response = await fetch('/api/accounting/receipts/'+receiptId);
    return await response.json();
}

export async function createReceipt(data) {
    const response = await fetch(`/api/accounting/receipts/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({receipt: data})
    })
    return await response.json();
}

export async function deleteReceipt(receiptId) {
    const response = await fetch(`/api/accounting/receipts/${receiptId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateReceipt(receiptId, data) {
    const response = await fetch(`/api/accounting/receipts/${receiptId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({receipt: data})
    })
    return await response.json();
}