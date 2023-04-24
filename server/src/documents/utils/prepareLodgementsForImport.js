// this file is to prepare jsons for upload
const productRepository = require('../../repositories/product.repository');
const customerRepository = require('../../repositories/customer.repository');
const lodgements = require('../sampleData/sampleLodgements.json');
var fs = require('fs');
var products = [];
var productMap = new Map();
var customers = [];
var customerMap = new Map();

productRepository.getProducts().then(response => {
    products = JSON.parse(JSON.stringify(response));
    products.forEach(product => {
        let simplifiedProductObject = {
            productId: product._id,
            productName: product.computedProductName
        }
        productMap.set(product.computedProductName, simplifiedProductObject);
    });
    
    customerRepository.getCustomers().then(response => {
        customers = JSON.parse(JSON.stringify(response));
        customers.forEach(customer => {
            let simplifiedCustomerObject = {
                customerId: customer._id,
                customerDisplayName: customer.customerDisplayName
            }
            customerMap.set(customer.customerDisplayName, simplifiedCustomerObject);
        });
        
        var formattedLodgements = [];
        lodgements.forEach(element => {
            console.log("Product Info: ", element.product_productName, productMap.get(element.product_productName));
            console.log("Customer Info: ", element.customer_customerDisplayName, customerMap.get(element.customer_customerDisplayName));

            var formattedLodgement = {
                "lotNumber": element.lotNumber,
                "customer": {
                    "customerId": customerMap.get(element.customer_customerDisplayName).customerId,
                    "customerDisplayName": element.customer_customerDisplayName
                },
                "product": {
                    "productId": productMap.get(element.product_productName).productId,
                    "productName": element.product_productName
                },
                "numBagsLodged": element.numBagsLodged,
                "numBagsKataCoolie": element.numBagsKataCoolie,
                "lodgementDate": new Date(element.lodgementDate),
                "isPlatformLot": element.isPlatformLot == 'FALSE' ? false : true,
                "locationCodes": element.locationCodes,
                "lodgementNotes": element.lodgementNotes,
                "transport": {
                    "vehicleNumber": element.transport_vehicleNumber,
                    "driverName": element.transport_driverName,
                },
                "chargesPerBag": {
                    "hamaliPerBag": element.chargesPerBag_hamaliPerBag,
                    "kataCooliePerBag": element.chargesPerBag_kataCooliePerBag,
                    "platformCooliePerBag": element.chargesPerBag_platformCooliePerBag,
                    "mamulluPerBag": element.chargesPerBag_mamulluPerBag,
                    "insurancePerBag": element.chargesPerBag_insurancePerBag
                },
                "chargesPaid": {
                    "hamaliCharges": element.chargesPaid_hamaliCharges,
                    "kataCoolieCharges":element.chargesPaid_kataCoolieCharges,
                    "platformCoolieCharges": element.chargesPaid_platformCoolieCharges,
                    "mamulluCharges": element.chargesPaid_mamulluCharges,
                    "transportCharges": element.chargesPaid_transportCharges,
                    "totalChargesPaid": element.chargesPaid_totalChargesPaid,
                },
                "chargesReceivable": {
                    "hamaliCharges": element.chargesReceivable_hamaliCharges,
                    "insuranceCharges": element.chargesReceivable_insuranceCharges,
                    "nonHamaliChargesPaid": element.chargesReceivable_nonHamaliChargesPaid,
                    "totalChargesReceivable": element.chargesReceivable_totalChargesReceivable
                },
                "rentals": {
                    "rentalYear": element.rentals_rentalYear,
                    "rentalMode": element.rentals_rentalMode,
                    "monthlyRentPerBag": element.rentals_monthlyRentPerBag,
                    "yearlyRentPerBag": element.rentals_yearlyRentPerBag,
                    "rentSettled": element.rentals_rentSettled == 'FALSE' ? false : true
                },
                "numBagsBalance": element.numBagsBalance,
                "stockRelease": {
                    "numDeliveries": element.stockRelease_numDeliveries,
                    "numBagsDelivered": element.stockRelease_numBagsDelivered,
                    "lastDeliveryDate": new Date(element.stockRelease_lastDeliveryDate),
                    "totalChargesPaid": element.stockRelease_totalChargesPaid,
                    "totalRentReceivable": element.stockRelease_totalRentReceivable,
                    "deliveries": []
                },
                "lastModifiedDate": new Date(element.lastModifiedDate),
                "carryForward": {
                    "hasCarryForwardLot": element.carryForward_hasCarryForwardLot == 'FALSE' ? false : true,
                    "carryForwardLodgementId": element.carryForward_carryForwardLodgementId,
                    "carryForwardLotNumer": element.carryForward_carryForwardLotNumber,
                    "numBagsCarryForward": 0,
                    "isCarryForwardLot": element.carryForward_isCarryForwardLot == 'FALSE' ? false : true,
                    "originalLodgementId": element.carryForward_originalLodgementId,
                    "originalLotNumber": element.carryForward_originalLotNumber
                }
            }
            formattedLodgements.push(formattedLodgement);
        });
        
        fs.writeFile('../sampleData/sampleLodgementsReady.json', JSON.stringify(formattedLodgements), 'utf8', function(err) {
            if (err) throw err;
            console.log('file write complete with object count: ', formattedLodgements.length);
        });

    });
});