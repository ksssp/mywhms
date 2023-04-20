const customerService  = require('../services/customer.service');
const logger = require('../logger/api.logger');

class CustomerController {

    async getCustomers() {
        logger.info('Controller: getCustomers')
        return await customerService.getCustomers();
    }

    async getCustomerById(customerId) {
        logger.info('Controller: getCustomerById', customerId);
        return await customerService.getCustomerById(customerId);
    }

    async createCustomer(customer) {
        logger.info('Controller: createCustomer', customer);
        return await customerService.createCustomer(customer);
    }

    async updateCustomer(customerId, customer) {
        logger.info('Controller: updateCustomer', customer);
        return await customerService.updateCustomer(customerId, customer);
    }

    async deleteCustomer(customerId) {
        logger.info('Controller: deleteCustomer', customerId);
        return await customerService.deleteCustomer(customerId);
    }
}
module.exports = new CustomerController();