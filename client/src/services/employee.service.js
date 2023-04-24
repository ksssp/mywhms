const axios = require ( 'axios' );

export async function getEmployees() {
    const response = await fetch('/api/administration/employees');
    return await response.json();
}

export async function getEmployeeById(employeeId) {
    const response = await fetch('/api/administration/employees/'+employeeId);
    return await response.json();
}

export async function createEmployee(data) {
    const response = await fetch(`/api/administration/employees`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({employee: data})
    })
    return await response.json();
}

export async function deleteEmployee(employeeId) {
    const response = await fetch(`/api/administration/employees/${employeeId}`, {method: 'DELETE'})
    return await response.json();
}

export async function updateEmployee(employeeId, data) {
    const response = await fetch(`/api/administration/employees/${employeeId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({employee: data})
    })
    return await response.json();
}