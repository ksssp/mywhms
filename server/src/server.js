
const express = require('express');
const cors = require ( 'cors' );
const bodyParser = require('body-parser');
const logger = require( "./logger/api.logger" );
require('dotenv').config();

const port = 5200;
const app = express();

const locationController = require ( './controllers/location.controller');
const customerController = require ( "./controllers/customer.controller" );
const productCategoryController = require ( "./controllers/productCategory.controller" );
const productController = require ( "./controllers/product.controller" );
const employeeController = require ( "./controllers/employee.controller" );
const incomeTypeController = require ( "./controllers/incomeType.controller" );
const expenseTypeController = require ( "./controllers/expenseType.controller" );
const employeeTransactionTypeController = require ( "./controllers/employeeTransactionType.controller" );
const expenseController = require ( "./controllers/expense.controller" );
const bankAccountController = require ( "./controllers/bankAccount.controller" );
const bankAccountTransactionController = require ( "./controllers/bankAccountTransaction.controller" );
const customerTransactionController = require ( "./controllers/customerTransaction.controller" );
const employeeTransactionController = require ( "./controllers/employeeTransaction.controller" );
const lodgementController = require ( './controllers/lodgement.controller' );
const deliveryController = require ( './controllers/delivery.controller' );


// const path = require('path');
// app.use(express.static(path.join(__dirname, './client/public')));
// app.use(cors);

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// Basic default route - for verification
app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});

// Routes for locations
app.get('/api/administration/locations', (req, res) => {
    locationController.getLocations().then(data => res.json(data));
});

// Routes for administration/customers
app.get('/api/administration/customers', (req, res) => {
    customerController.getCustomers().then(data => res.json(data));
});

app.get('/api/administration/customers/:id', (req, res) => {
    customerController.getCustomerById(req.params.id).then(data => res.json(data));
});

app.post('/api/administration/customers/', (req, res) => {
    customerController.createCustomer(req.body.customer).then(data => res.json(data));
});

app.put('/api/administration/customers/:id', (req, res) => {
    customerController.updateCustomer(req.params.id, req.body.customer).then(data => res.json(data));
});

app.delete('/api/administration/customers/:id', (req, res) => {
    customerController.deleteCustomer(req.params.id).then(data => res.json(data));
});

// Routes for administration/products
app.get('/api/administration/products', (req, res) => {
    productController.getProducts().then(data => res.json(data));
});

app.get('/api/administration/products/:id', (req, res) => {
    productController.getProductById(req.params.id).then(data => res.json(data));
});

app.post('/api/administration/products', (req, res) => {
    productController.createProduct(req.body.product).then(data => res.json(data));
});

app.put('/api/administration/products/:id', (req, res) => {
    productController.updateProduct(req.params.id, req.body.product).then(data => res.json(data));
});

app.delete('/api/administration/products/:id', (req, res) => {
    productController.deleteProduct(req.params.id).then(data => res.json(data));
});


// Routes for administration/productCategories
app.get('/api/administration/productCategories', (req, res) => {
    productCategoryController.getProductCategories().then(data => res.json(data));
});

app.get('/api/administration/productCategories/:id', (req, res) => {
    productCategoryController.getProductCategoryById(req.params.id).then(data => res.json(data));
});

app.post('/api/administration/productCategories/', (req, res) => {
    productCategoryController.createProductCategory(req.body.productCategory).then(data => res.json(data));
});

app.put('/api/administration/productCategories/:id', (req, res) => {
    productCategoryController.updateProductCategory(req.params.id, req.body.productCategory).then(data => res.json(data));
});

app.delete('/api/administration/productCategories/:id', (req, res) => {
    productCategoryController.deleteProductCategoru(req.params.id).then(data => res.json(data));
});


// Routes for administration/employees
app.get('/api/administration/employees', (req, res) => {
    employeeController.getEmployees().then(data => res.json(data));
});

app.get('/api/administration/employees/:id', (req, res) => {
    employeeController.getEmployeeById(req.params.id).then(data => res.json(data));
});

app.post('/api/administration/employees', (req, res) => {
    employeeController.createEmployee(req.body.employee).then(data => res.json(data));
});

app.put('/api/administration/employees/:id', (req, res) => {
    employeeController.updateEmployee(req.params.id, req.body.employee).then(data => res.json(data));
});

app.delete('/api/administration/employees/:id', (req, res) => {
    employeeController.deleteEmployee(req.params.id).then(data => res.json(data));
});


// Routes for administration/incomeTypes
app.get('/api/administration/incomeTypes', (req, res) => {
    incomeTypeController.getIncomeTypes().then(data => res.json(data));
});

app.get('/api/administration/incomeTypes/:id', (req, res) => {
    incomeTypeController.getIncomeTypeById(req.params.id).then(data => res.json(data));
});

app.post('/api/administration/incomeTypes', (req, res) => {
    incomeTypeController.createIncomeType(req.body.incomeType).then(data => res.json(data));
});

app.put('/api/administration/incomeTypes/:id', (req, res) => {
    incomeTypeController.updateIncomeType(req.params.id, req.body.incomeType).then(data => res.json(data));
});

app.delete('/api/administration/incomeTypes/:id', (req, res) => {
    incomeTypeController.deleteIncomeType(req.params.id).then(data => res.json(data));
});


// Routes for administration/expenseTypes
app.get('/api/administration/expenseTypes', (req, res) => {
    expenseTypeController.getExpenseTypes().then(data => res.json(data));
});

app.get('/api/administration/expenseTypes/:id', (req, res) => {
    expenseTypeController.getExpenseTypeById(req.params.id).then(data => res.json(data));
});

app.post('/api/administration/expenseTypes', (req, res) => {
    expenseTypeController.createExpenseType(req.body.expenseType).then(data => res.json(data));
});

app.put('/api/administration/expenseTypes/:id', (req, res) => {
    expenseTypeController.updateExpenseType(req.params.id, req.body.expenseType).then(data => res.json(data));
});

app.delete('/api/administration/expenseTypes/:id', (req, res) => {
    expenseTypeController.deleteExpenseType(req.params.id).then(data => res.json(data));
});


// Routes for administration/employeeTransactionTypes
app.get('/api/administration/employeeTransactionTypes', (req, res) => {
    employeeTransactionTypeController.getEmployeeTransactionTypes().then(data => res.json(data));
});

app.get('/api/administration/employeeTransactionTypes/:id', (req, res) => {
    employeeTransactionTypeController.getEmployeeTransactionTypeById(req.params.id).then(data => res.json(data));
});

app.post('/api/administration/employeeTransactionTypes', (req, res) => {
    employeeTransactionTypeController.createEmployeeTransactionType(req.body.employeeTransactionType).then(data => res.json(data));
});

app.put('/api/administration/employeeTransactionTypes/:id', (req, res) => {
    employeeTransactionTypeController.updateEmployeeTransactionType(req.params.id, req.body.employeeTransactionType).then(data => res.json(data));
});

app.delete('/api/administration/employeeTransactionTypes/:id', (req, res) => {
    employeeTransactionTypeController.deleteEmployeeTransactionType(req.params.id).then(data => res.json(data));
});


// Routes for administration/bankAccounts
app.get('/api/administration/bankAccounts', (req, res) => {
    bankAccountController.getBankAccounts().then(data => res.json(data));
});

app.get('/api/administration/bankAccounts/:id', (req, res) => {
    bankAccountController.getBankAccountById(req.params.id).then(data => res.json(data));
});

app.post('/api/administration/bankAccounts', (req, res) => {
    bankAccountController.createBankAccount(req.body.bankAccount).then(data => res.json(data));
});

app.put('/api/administration/bankAccounts/:id', (req, res) => {
    bankAccountController.updateBankAccount(req.params.id, req.body.bankAccount).then(data => res.json(data));
});

app.delete('/api/administration/bankAccounts/:id', (req, res) => {
    bankAccountController.deleteBankAccount(req.params.id).then(data => res.json(data));
});


// Add routes for other models as well
// Routes for inventory/lots
app.get('/api/inventory/lots', (req, res) => {
    lodgementController.getLodgementsForLotsView().then(data => res.json(data));
});

// Routes for inventory/lodgements
app.get('/api/inventory/lodgements', (req, res) => {
    lodgementController.getLodgements().then(data => res.json(data));
});

app.get('/api/inventory/lodgements/:id', (req, res) => {
    lodgementController.getLodgementById(req.params.id).then(data => res.json(data));
});

app.get('/api/inventory/lodgementsByCustomer/:id', (req, res) => {
    lodgementController.getLodgementsByCustomerId(req.params.id).then(data => res.json(data));
});

app.post('/api/inventory/lodgements/', (req, res) => {
    lodgementController.createLodgement(req.body.lodgement).then(data => res.json(data));
});

app.put('/api/inventory/lodgements/:id', (req, res) => {
    lodgementController.updateLodgement(req.params.id, req.body.lodgement).then(data => res.json(data));
});

app.delete('/api/inventory/lodgements/:id', (req, res) => {
    lodgementController.deleteLodgement(req.params.id).then(data => res.json(data));
});


// Routes for inventory/deliveries
app.get('/api/inventory/deliveries', (req, res) => {
    deliveryController.getDeliveries().then(data => res.json(data));
});

app.get('/api/inventory/deliveries/:id', (req, res) => {
    deliveryController.getDeliveryById(req.params.id).then(data => res.json(data));
});

app.get('/api/inventory/deliveriesByLodgement/:id', (req, res) => {
    deliveryController.getDeliveriesByLodgementId(req.params.id).then(data => res.json(data));
});

app.get('/api/inventory/deliveriesByFilter/', (req, res) => {
    logger.info("server.js - getDeliveriesBy Filter : " + JSON.stringify(req.body.filter));
    deliveryController.getDeliveriesByFilter(req.body.filter).then(data => res.json(data));
});

app.post('/api/inventory/deliveries/', (req, res) => {
    deliveryController.createDelivery(req.body.delivery).then(data => res.json(data));
});

app.put('/api/inventory/deliveries/:id', (req, res) => {
    deliveryController.updateDelivery(req.params.id, req.body.delivery).then(data => res.json(data));
});

app.delete('/api/inventory/deliveries/:id', (req, res) => {
    deliveryController.deleteDelivery(req.params.id).then(data => res.json(data));
});


// Routes for accounting/bankAccountTransactions
app.get('/api/accounting/bankAccountTransactions/', (req, res) => {
    bankAccountTransactionController.getBankAccountTransactions().then(data => res.json(data));
});

app.get('/api/accounting/bankAccountTransactions/:id', (req, res) => {
    bankAccountTransactionController.getBankAccountTransactionById(req.params.id).then(data => res.json(data));
});

app.get('/api/accounting/bankAccountTransactionsByBankAccount/:id', (req, res) => {
    bankAccountTransactionController.getBankAccountTransactionsByBankAccountId(req.params.id).then(data => res.json(data));
});

app.post('/api/accounting/bankAccountTransactions/', (req, res) => {
    bankAccountTransactionController.createBankAccountTransaction(req.body.bankAccountTransaction).then(data => res.json(data));
});

app.put('/api/accounting/bankAccountTransactions/:id', (req, res) => {
    bankAccountTransactionController.updateBankAccountTransaction(req.params.id, req.body.bankAccountTransaction).then(data => res.json(data));
});


// Routes for accounting/customerTransactions
app.get('/api/accounting/customerTransactions/', (req, res) => {
    customerTransactionController.getCustomerTransactions().then(data => res.json(data));
});

app.get('/api/accounting/customerTransactions/:id', (req, res) => {
    customerTransactionController.getCustomerTransactionById(req.params.id).then(data => res.json(data));
});

app.get('/api/accounting/customerTransactionsByCustomer/:id', (req, res) => {
    customerTransactionController.getCustomerTransactionsByCustomerId(req.params.id).then(data => res.json(data));
});

app.post('/api/accounting/customerTransactions/', (req, res) => {
    customerTransactionController.createCustomerTransaction(req.body.customerTransaction).then(data => res.json(data));
});

app.put('/api/accounting/customerTransactions/:id', (req, res) => {
    customerTransactionController.updateCustomerTransaction(req.params.id, req.body.customerTransaction).then(data => res.json(data));
});


// Routes for accounting/employeeTransactions
app.get('/api/accounting/employeeTransactions/', (req, res) => {
    employeeTransactionController.getEmployeeTransactions().then(data => res.json(data));
});

app.get('/api/accounting/employeeTransactions/:id', (req, res) => {
    employeeTransactionController.getEmployeeTransactionById(req.params.id).then(data => res.json(data));
});

app.get('/api/accounting/employeeTransactionsByEmployee/:id', (req, res) => {
    employeeTransactionController.getEmployeeTransactionsByEmployeeId(req.params.id).then(data => res.json(data));
});

app.post('/api/accounting/employeeTransactions/', (req, res) => {
    employeeTransactionController.createEmployeeTransaction(req.body.employeeTransaction).then(data => res.json(data));
});

app.put('/api/accounting/employeeTransactions/:id', (req, res) => {
    employeeTransactionController.updateEmployeeTransaction(req.params.id, req.body.employeeTransaction).then(data => res.json(data));
});

// Routes for accounting/expenses
app.get('/api/accounting/expenses/', (req, res) => {
    expenseController.getExpenses().then(data => res.json(data));
});

app.get('/api/accounting/expenses/:id', (req, res) => {
    expenseController.getExpenseById(req.params.id).then(data => res.json(data));
});

app.get('/api/accounting/expensesByEmployee/:id', (req, res) => {
    expenseController.getExpensesByEmployeeId(req.params.id).then(data => res.json(data));
});

app.post('/api/accounting/expenses/', (req, res) => {
    expenseController.createExpense(req.body.expense).then(data => res.json(data));
});

app.put('/api/accounting/expenses/:id', (req, res) => {
    expenseController.updateExpense(req.params.id, req.body.expense).then(data => res.json(data));
});

// Routes for summary/products
app.get('/api/summary/products/lodgementsByProduct/:id', (req, res) => {
    lodgementController.getLodgementsSummaryByProductId(req.params.id).then(data => res.json(data));
});

app.get('/api/summary/customers/lodgementsByCustomer/:id', (req, res) => {
    lodgementController.getLodgementsSummaryByCustomerId(req.params.id).then(data => res.json(data));
});


// Start the server
app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})

// const router = express.Router();
// module.exports = router;