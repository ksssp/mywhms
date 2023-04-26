const axios = require ( 'axios' );

export async function getBankAccountTransactions() {
    const response = await fetch('/api/accounting/bankAccountTransactions');
    return await response.json();
}

export async function getBankAccountTransactionById(bankAccountTransactionId) {
    const response = await fetch('/api/accounting/bankAccountTransactions/'+bankAccountTransactionId);
    return await response.json();
}

export async function createBankAccountTransaction(data) {
    const response = await fetch(`/api/accounting/bankAccountTransactions/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({bankAccountTransaction: data})
    })
    return await response.json();
}

export async function deleteBankAccountTransaction(bankAccountTransactionId) {
    const response = await fetch(`/api/accounting/bankAccountTransactions/${bankAccountTransactionId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateBankAccountTransaction(bankAccountTransactionId, data) {
    const response = await fetch(`/api/accounting/bankAccountTransactions/${bankAccountTransactionId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({bankAccountTransaction: data})
    })
    return await response.json();
}