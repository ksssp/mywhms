
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