
const express = require('express');
const cors = require ( 'cors' );
const bodyParser = require('body-parser');
const logger = require( "./logger/api.logger" );
require('dotenv').config();

const port = 5200;
const app = express();

const trademarkController = require ( "./controllers/trademark.controller" );
const productGroupController = require ( "./controllers/productGroup.controller" );
const productController = require ( "./controllers/product.controller" );
const employeeController = require ( "./controllers/employee.controller" );
const lodgementController = require ( './controllers/lodgement.controller' );
const deliveryController = require ( './controllers/delivery.controller' );

// const path = require('path');
// app.use(express.static(path.join(__dirname, './client/public')));
app.use(bodyParser.json());
// app.use(cors);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// Basic default route - for verification
app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});

// Routes for referenceData/trademarks
app.get('/api/referenceData/trademarks', (req, res) => {
    trademarkController.getTrademarks().then(data => res.json(data));
});

app.get('/api/referenceData/trademarks/:id', (req, res) => {
    trademarkController.getTrademarkById(req.params.id).then(data => res.json(data));
});

app.post('/api/referenceData/trademarks/', (req, res) => {
    trademarkController.createTrademark(req.body.trademark).then(data => res.json(data));
});

app.put('/api/referenceData/trademarks/:id', (req, res) => {
    trademarkController.updateTrademark(req.params.id, req.body.trademark).then(data => res.json(data));
});

app.delete('/api/referenceData/trademarks/:id', (req, res) => {
    trademarkController.deleteTrademark(req.params.id).then(data => res.json(data));
});

// Routes for referenceData/products
app.get('/api/referenceData/products', (req, res) => {
    productController.getProducts().then(data => res.json(data));
});

app.get('/api/referenceData/products/:id', (req, res) => {
    productController.getProductById(req.params.id).then(data => res.json(data));
});

app.post('/api/referenceData/products', (req, res) => {
    productController.createProduct(req.body.product).then(data => res.json(data));
});

app.put('/api/referenceData/products/:id', (req, res) => {
    productController.updateProduct(req.params.id, req.body.product).then(data => res.json(data));
});

app.delete('/api/referenceData/products/:id', (req, res) => {
    productController.deleteProduct(req.params.id).then(data => res.json(data));
});


// Routes for referenceData/productGroups
app.get('/api/referenceData/productGroups', (req, res) => {
    productGroupController.getProductGroups().then(data => res.json(data));
});

app.get('/api/referenceData/productGroups/:id', (req, res) => {
    productGroupController.getProductGroupById(req.params.id).then(data => res.json(data));
});

app.post('/api/referenceData/productGroups/', (req, res) => {
    productGroupController.createProductGroup(req.body.productGroup).then(data => res.json(data));
});

app.put('/api/referenceData/productGroups/:id', (req, res) => {
    productGroupController.updateProductGroup(req.params.id, req.body.productGroup).then(data => res.json(data));
});

app.delete('/api/referenceData/productGroups/:id', (req, res) => {
    productGroupController.deleteProductGroup(req.params.id).then(data => res.json(data));
});


// Routes for referenceData/employees
app.get('/api/referenceData/employees', (req, res) => {
    employeeController.getEmployees().then(data => res.json(data));
});

app.get('/api/referenceData/employees/:id', (req, res) => {
    employeeController.getEmployeeById(req.params.id).then(data => res.json(data));
});

app.post('/api/referenceData/employees', (req, res) => {
    employeeController.createEmployee(req.body.employee).then(data => res.json(data));
});

app.put('/api/referenceData/employees/:id', (req, res) => {
    employeeController.updateEmployee(req.params.id, req.body.employee).then(data => res.json(data));
});

app.delete('/api/referenceData/employees/:id', (req, res) => {
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

app.get('/api/inventory/lodgementsByTrademark/:id', (req, res) => {
    lodgementController.getLodgementsByTrademarkId(req.params.id).then(data => res.json(data));
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

app.get('/api/inventory/deliveriesByFilter/', (req, res) => {
    logger.info("server.js - getDeliveriesBy Filter : " + JSON.stringify(req.body.filter));
    deliveryController.getDeliveriesByFilter(req.body.filter).then(data => res.json(data));
});

app.post('/api/inventory/deliveries/', (req, res) => {
    deliveryController.creatDelivery(req.body.delivery).then(data => res.json(data));
});

app.put('/api/inventory/deliveries/:id', (req, res) => {
    deliveryController.updateDelivery(req.params.id, req.body.delivery).then(data => res.json(data));
});

app.delete('/api/inventory/deliveries/:id', (req, res) => {
    deliveryController.deleteDelivery(req.params.id).then(data => res.json(data));
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})

// const router = express.Router();
// module.exports = router;