const customerRepository  = require('../repositories/customer.repository');

class CustomerService {

    constructor() {}

    async getCustomers() {
        return await customerRepository.getCustomers();
    }

    async getCustomerById(customerId) {
        return await customerRepository.getCustomerById(customerId);
    }

    async createCustomer(customer) {
        return await customerRepository.createCustomer(customer);
    }

    async updateCustomer(customerId, customer) {
        return await customerRepository.updateCustomer(customerId, customer);
    }

    async deleteCustomer(customerId) {
        return await customerRepository.deleteCustomer(customerId);
    }

}

module.exports = new CustomerService();