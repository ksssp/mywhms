const axios = require ( 'axios' );

export async function getBankAccounts() {
    const response = await fetch('/api/administration/bankAccounts');
    return await response.json();
}

export async function getBankAccountById(bankAccountId) {
    const response = await fetch('/api/administration/bankAccounts/'+bankAccountId);
    return await response.json();
}

export async function createBankAccount(data) {
    const response = await fetch(`/api/administration/bankAccounts/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({bankAccount: data})
    })
    return await response.json();
}

export async function deleteBankAccount(bankAccountId) {
    const response = await fetch(`/api/administration/bankAccounts/${bankAccountId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateBankAccount(bankAccountId, data) {
    const response = await fetch(`/api/administration/bankAccounts/${bankAccountId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({bankAccount: data})
    })
    return await response.json();
}