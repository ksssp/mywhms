
// this file is the set of schemas for different entities in the coldsoft database.

import * as mongodb from "mongodb";

// Reference Data tables

// https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-mevn-stack-10b6e8ff7f7c

const schemaTrademark = {
    $jsonSchema: {
        bsonType: "object",
        fields: ["trademarkId", "trademarkName", "customerName", "town", "mobileNumber", "creationDate"],
        required: ["trademarkId", "trademarkName", "customerName", "town", "creationDate"],
        additionalProperties: ["mobileNumber"],
        properties: {
            _id: {},
            trademarkId: {      // needs to be setup
                bsonType: "binData",
                description: "'Trademark Id' is a standard UUID(v4) identifier for every document in the collection",
            },
            trademarkName: {
                bsonType: "string",
                description: "'Trademark Name' is the code for the trader in the format ABC/DEF",
                minLength: 7,
            },
            customerName: {
                bsonType: "string",
                description: "'Customer Name' is the name of the trader",
                minLength: 5
            },
            town: {
                bsonType: "string",
                description: "'Town' is the home location for the trader",
                minLength: 3
            },
            creationDate: {
                bsonType: "date",
                description: "'Creation Date' is the date when this entity was created in the system"
            },
        }
    }
};

const schemaProductGroup = {
    $jsonSchema: {
        bsonType: "object",
        required: ["productGroupId", "productGroup", "productSubGroup", "creationDate"],
        additionalProperties: ["yearlyRentPerQuintal", "oneSideHamaliPerQuintal"],
        properties: {
            _id: {},
            productGroupId: {       // needs to be setup
                bsonType: "binData",
                description: "'Product Group Id' is a standard UUID(v4) identifier for every document in the collection",
            },
            productGroup: {
                bsonType: "string",
                description: "'Product Group' is the high level type of product stored in the cold storage",
            },
            producSubGroup: {
                bsonType: "string",
                description: "'Product Sub Group' is a sub-variety of the product group stored in the cold storage",
                minLength: 5
            },
            yearlyRentPerQuintal: {     // confirm if this can be removed. should be moved to product level
                bsonType: "number",
                description: "'Yearly Rent per Quintal' is the rental rate per 100kg of the product sub-group type"
            },
            oneSideHamaliPerQuintal: {  // confirm if this can be removed. Should be moved to product level
                bsonType: "number",
                description: "'One side Hamali per Quintal' is the movement charges per 100kg of the product sub-group type"
            },
            productSubGroupPrefix: {
                bsonType: "string",
                description: "Product Subgroup Prefix is auto-computed <Product Group> + ' (' + Prodcut Sub Group + ')'"
            },
            creationDate: {
                bsonType: "date",
                description: "'Creation Date' is the date when this entity was created in the system"
            },
        },
    }
}

const schemaProduct = {
    $jsonSchema: {
        bsonType: "object",
        required: ["productId", "productName", "productSubGroupPrefix", "computedProductName",
            "hamaliPerBag", "platformCooliePerBag", "kataCooliePerBag", "mamulluPerBag",
            "monthlyRentPerBag", "yearlyRentPerBag", "insurancePerBag", "yearlyRentPerKg",
            "bagSize", "computedYearlyRentPerBag"],
        properties: {
            _id: {},
            productId: {       // needs to be setup
                bsonType: "binData",
                description: "'Product Group Id' is a standard UUID(v4) identifier for every document in the collection",
            },
            productName: {
                bsonType: "string",
                description: "'Product Name' is the name of the product as input by the user (needs to be replaced by computedProductName",
            },
            productSubGroupPrefix: {
                bsonType: "string",
                description: "'Product Sub Group Prefix' is from the ProductGroup collection. Needs to be replaced by productGroupId or productGroupObject"
            },
            computedProductName: {
                bsonType: "string",
                description: "'Computed Product Name' is auto-computed based on productSubGroupPrefix + <bagSize> + ' Kg bags'"
            },
            hamaliPerBag: {
                bsonType: "double",
                description: "'Hamali per bag' is the charge/bag to carry the bag for inward/outward movement in the store"
            },
            platformCooliePerBag: {
                bsonType: "double",
                description: "'Platform Coolie per bag' is the charge/bag to carry the bag onto the platform from/to the vehicle"
            },
            kataCooliePerBag: {
                bsonType: "double",
                description: "'Kata Coole per bag' is the charge/bag to weigh the bag"
            },
            mamulluPerBag: {
                bsonType: "double",
                description: "'Mamullu per bag' is the charge/bag paid in goodwill to the coolies"
            },
            monthlyRentPerBag: {
                bsonType: "doubule",
                description: "'Monthly Rent per bag' is the monthly charge/bag for this product to store in the facility"
            },
            yearlyRentPerBag: {
                bsonType: "double",
                description: "'Yearly Rent per bag' is the yearly charge/bag for this product to store in the facility"
            },
            insurancePerBag: {
                bsonType: "double",
                description: "'Insurance per bag' is the charge/bag to cover for insurance"
            },
            yearlyRentPerKg: {
                bsonType: "double",
                description: "'Yearly Rent per kg' is the yearly charge/kg for this product to store in the facility"
            },
            bagSize: {
                bsonType: "number",
                description: "'Bag Size' is the weight/bag for this variant of the product"
            },
            computedYearlyRentPerBag: {
                bsonType: "number",
                description: "'Computed Yearly Rent Per Bag' is a computed value of yearlyRentPerKg * bagSize"
            },
            creationDate: {
                bsonType: "date",
                description: "'Creation Date' is the date when this entity was created in the system"
            },
        },
    }
}

const schemaEmployee = {
    $jsonSchema: {
        bsonType: "object",
        required: ["employeeId", "employeeCode", "employeeFullName", "designation", "monthlySalary"],
        properties: {
            _id: {},
            employeeId: {       // needs to be setup
                bsonType: "binData",
                description: "'EmployeeId Id' is a standard UUID(v4) identifier for every document in the collection"
            },
            employeeCode: {
                bsonType: "string",
                description: "'Employee Code' is the codename for the employee",
                minLength: 3
            },
            employeeFullName: {
                bsonType: "string",
                description: "'Employee Name' is the full name of the employee",
                minLength: 5
            },
            designation: {
                bsonType: "string",
                description: "'Designation' is the role of the employee in the facility",
                minLength: 3
            },
            monthlySalary: {
                bsonType: "double",
                description: "'Monthly Salary' is the monthly salary payment as agreed with the employee"
            },
        }
    }
}

const schemaLocations = {
    $jsonSchema: {
        bsonType: "object",
        required: ["locationId", "locationCode", "chamber", "level", "location"],
        properties: {
            _id: {},
            locationId: {       // needs to be setup
                bsonType: "binData",
                description: "'Location Id' is a standard UUID(v4) identifier for every document in the collection"
            },
            locationCode: {
                bsonType: "string",
                description: "'Location Code' is the codename for the precise location in the facility",
                minLength: 5
            },
            chamber: {
                bsonType: "string",
                description: "'Chamber' is the name of the main chamber in the facility",
                minLength: 1
            },
            level: {
                bsonType: "number",
                description: "'Level' is the floor level in the facility"
            },
            location: {
                bsonType: "string",
                description: "'Location' is the precise location of a spoit in any floor any level in the facility",
                minLength: 1
            }
        }
    }
}

/* Questions
1. What are transport charges paid vs received? Are they paid at loodgement & delivery also?
2. What are totalChargesReceivable & totalChargesPaid?
3. What are deliveryChargesReceivable? Are they covered in totalChargesPaid?
4. Can lodgement & delivery be on different customers - same trademark, different customers? (e.g. 4571/201	SNT/PKL	Vilasarapu Koteswara Rao / Bujji / Sri Naga Sai Chilli Traders)

Types of reports of interest
1. List of Lodgements - one read from lodgements collection
2. List of Deliveries - one read from deliveries collection
3. List of Trademarks - one read from Trademarks, one read from lodgements collection (group by trademark & sum of products, lots, bags, rents)
4. List of Products - one read from Products, one read from Lots collection (group by product & sum of trademraks, lots, bags, rents)
5. Lot number stock statement - one read from Lots collection
6. Trademark statement - one read from Trademarks, one read from lots (group product & sum of lots, bags, rents), one read from lodgements (list of lodgements)
7. Product statement - one read from Products, one read from lots (group by product & sum of lots, bags, rent), one read from lodgements (list of lodgements)
8. Reports Inventory - Any Date Delivery Register; Any Date Hamali Paid; Any Date Lodgement Register; Any Lot Number Stock Statement; 
                        Transport Charges per Trademark; Any Lot Number Monthly Rents;  Any Trademark BroughtForward Stock

                        Latest Balance of all Lot Numbers; Zero lots & non-zero lots; 
9. Reports Payments - Any Date Payments & Receipts; Any Date Cash Balance Book; Any Head Expenditure; Any Bank A/c Statement;
                        All Trademarks Any Year BroughtForward Rents; Any Year Pending Dues Monthly/Yearly; Any Trademark Detailed Dues; 
                        Customer Cash Receipt
10. Reports Others - My Sundry Particulars

Observations & Notes:
1. Always bring both trademark & customerName (same trademark, different customer names)
2. 
*/

/*

Schema guidance
 validator: { 
    "$and": [
      // Validation with query operators - e.g. numBagsBalance < numBagsLodged
      {
        "$expr": {
          "$lt": ["$lineItems.discountedPrice", "$lineItems.price"]
        }
      },
      // Validation with JSON Schema
      {
        "$jsonSchema": {
          "properties": {
            "items": { "bsonType": "array" }
          }
        }
      }
    ]

*/

// Inventory tables
const schemaLodgements = {
    $jsonSchema: {
        bsonType: "object",
        required: ["lotId", "lodgementDate", "lotNumber", "numBagsLodged", "numBagsBalance", "locationCodes",
            "trademark", "customerName", "productName", "numDeliveries", "lastTransactionDate",
            "trasportChargesPaid", "totalChargesReceivable", "totalChargesReceived", "rents" ],
        properties: {
            _id: {},
            // lodgementId: {       // needs to be setup
            //     bsonType: "binData",
            //     description: "'Lodgement Id' is a standard UUID(v4) identifier for every document in the collection"
            // },
            lotId: {
                bsonType: "string",
                description: "'lotId' refers to the lot full details in the lots collection"
            },
            lodgementDate: {
                bsonType: "date",
                description: "'lodgementDate' is the date on which the lodgement happened in the facility, must be date"
            },
            lotNumber: {
                bsonType: "string",
                description: "'lotNumber' is the basic reference identifier for the lodgement"
            },
            numBagsLodged: {
                bsonType: "int",
                description: "'numBagsLodged' is the #bags kept in the facility, should be an integer>0",
                minimum: 1
            },
            numBagsBalance: {
                bsonType: "int",
                description: "'numBagsBalance' is the #bags left in the facility for a lot number, should be an integer>=0",
                minimum: 1
            },
            locationCodes: {
                bsonType: "array",
                items: { bsonType: "string" },
                description: "'locationCode' is the loaction in the facility where the product is stored, must be a string"
            },
            lodgementNotes: {
                bsonType: "string",
                description: "'lodgementNotes' is any optional details for the lodgement, must be a string"
            },
            trademark: {
                bsonType: "string",
                description: "'trademark' is the trader code who executed this delivery"
            },
            customerName: {
                bsonType: "string",
                description: "'customerName' is the name of the customer, must be a string"
            },
            productName: {
                bsonType: "string",
                description: "'productName' is the product being delivered, must be a string"
            },
            numDeliveries: {
                bsonType: "int",
                description: "'numDeliveries' is the number of deliveries till date on the lodgement, must be an integer",
                minimum: 0
            },
            lastTransactionDate: {
                bsonType: "date",
                description: "'lastTransactionDate' is the most recent transaction date on the lodgement, must be a date",
                minimum: 0
            },
            transportChargesPaid: {
                bsonType: "double",
                description: "'trasportChargesPaid' is the transport charges paid for the lodgement, must be a double",
                minimum: 0
            },
            totalChargesReceivable: {
                bsonType: "double",
                description: "'totalChargesReceivable' is the charges on the lodgement, must be a double",
                minimum: 0
            },
            totalChargesReceived: {
                bsonType: "double",
                description: "'totalChargesReceived' is the charges paid on the lodgement, must be a double",
                minimum: 0
            },
            rents: {
                bsonType: "object",
                description: "'rents' is a consolidation of all kinds of rents & their details",
                required: ["rentalMode", "rentalYear", "totalRentReceivable", "totalRentReceived"],
                properties: {
                    "rentalMode": { bsonType: "string", enum: ["monthly", "yearly"] },
                    "rentalYear": { bsonType: "int", minimum: 2000 },
                    "totalRentReceivable": { bsonType: "double", minimum: 0 },
                    "totalRentReceived": { bsonType: "double", minimum: 0 }
                }
            }
        }
    }
}

const schemaDeliveries = {
    $jsonSchema: {
        bsonType: "object",
        required: ["lotId", "deliveryDate", "lotNumber", "numBagsDelivered", "numBagsBalance", "locationCodes",
            "trademark", "customerName", "productName", "numMonthsLodged",
            "trasportChargesPaid", "deliveryChargesReceivable", "deliveryChargesReceived", "rents"],
        properties: {
            _id: {},
            // deliveryId: {       // needs to be setup
            //     bsonType: "binData",
            //     description: "'Delivery Id' is a standard UUID(v4) identifier for every document in the collection"
            // },
            lotId: {
                bsonType: "binData",
                description: "'lotId' is the reference to the lots collection"
            },
            deliveryDate: {
                bsonType: "date",
                description: "'Delivery Date' is the date on which the delivery happened in the facility"
            },
            lotNumber: {
                bsonType: "string",
                description: "'lotNumber' is the basic reference identifier for the lodgement"
            },
            numBagsDelivered: {
                bsonType: "int",
                description: "'numBagsDelivered' is the #bags kept in the facility, should be an integer>0",
                minimum: 1
            },
            numBagsBalance: {
                bsonType: "int",
                description: "'numBagsBalance' is the #bags left in the facility for a lot number, should be an integer>=0",
                minimum: 1
            },
            locationCodes: {
                bsonType: "array",
                items: { bsonType: "string" },
                description: "'locationCode' is the loaction in the facility where the product is stored, must be a string"
            },
            deliveryNotes: {
                bsonType: "string",
                description: "'deliveryNotes' is any optional details for the lodgement, must be a string"
            },
            trademark: {
                bsonType: "string",
                description: "'trademark' is the trader code who executed this delivery"
            },
            customerName: {
                bsonType: "string",
                description: "'customerName' is the name of the customer, must be a string"
            },
            productName: {
                bsonType: "string",
                description: "'productName' is the product being delivered, must be a string"
            },
            numMonthsLodged: {
                bsonType: "int",
                description: "'numMonthsLodged' is the number of months the product was stored, must be an integer",
                minimum: 1
            },
            transportChargesPaid: {
                bsonType: "double",
                description: "'trasportChargesPaid' is the transport charges paid for the delivery, must be a double",
                minimum: 0
            },
            deliveryChargesReceivable: {
                bsonType: "double",
                description: "'deliveryChargesReceivable' is the charges on the delivery, must be a double",
                minimum: 0
            },
            deliveryChargesReceived: {
                bsonType: "double",
                description: "'deliveryChargesReceived' is the charges paid on the delivery, must be a double",
                minimum: 0
            },
            rents: {
                bsonType: "object",
                description: "'rents' is a consolidation of all kinds of rents & their details",
                required: ["rentalMode", "rentalYear", "monthlyRentReceivable", "yearlyRentReceivable"],
                properties: {
                    "rentalMode": { bsonType: "string", enum: ["monthly", "yearly"] },
                    "rentalYear": { bsonType: "int", minimum: 2000 },
                    "totalRentReceivable": { bsonType: "double", minimum: 0 },
                    "totalRentReceived": { bsonType: "double", minimum: 0 }
                }
            }
        }
    }
}

const schemaLots = {
    $jsonSchema: {
        bsonType: "object",
        required: [ "lodgementDate", "lotNumber", "numBagsLodged", "numBagsBalance", "locationCodes", "lastTransactionDate",
            "trademark", "product", "vehicleNumber", "driverName", "trasportChargesPaid", "charges", "rents", "deliveries"],
        properties: {
            _id: {},
            // lodgementId: {       // needs to be setup
            //     bsonType: "binData",
            //     description: "'Lodgement Id' is a standard UUID(v4) identifier for every document in the collection"
            // },
            lodgementDate: {
                bsonType: "date",
                description: "'Lodgement Date' is the date on which the lodgement happened in the facility"
            },
            lotNumber: {
                bsonType: "string",
                description: "'lotNumber' is the basic reference identifier for the lodgement"
            },
            numBagsLodged: {
                bsonType: "int",
                description: "'numBagsLodged' is the #bags kept in the facility, should be an integer>0",
                minimum: 1
            },
            numBagsBalance: {
                bsonType: "int",
                description: "'numBagsBalance' is the #bags left in the facility for a lot number, should be an integer>=0",
                minimum: 1
            },
            locationCodes: {
                bsonType: "array",
                items: { bsonType: "string" },
                description: "'locationCode' is the loaction in the facility where the product is stored, must be a string"
            },
            lastTrasactionDate: {
                bsonType: "date",
                description: "'lastTransactionDate' is the date of most recent transaction (lodgement/delivery)"
            },
            lodgementNotes: {
                bsonType: "string",
                description: "'lodgementNotes' is any optional details for the lodgement, must be a string"
            },
            trademark: {
                bsonType: "object",
                description: "'trademark' is the trader for the lodgement, must be an object",
                required: ["trademarkId", "trademark", "customerName"],
                additionalProperties: false,
                properties: {
                    "trademarkId": { bsonType: "binData" },
                    "trademark": { bsonType: "string" },     // decide if ID is enough, else keep trademark & customerName
                    "customerName": { bsonType: "string" }
                }
            },
            product: {
                bsonType: "object",
                description: "'product' is the product stored in the inventory, must be an object",
                additionalProperties: false,
                properties: {
                    "productId": { bsonType: "binData" },
                    "productName": { bsonType: "string" }
                }
            },
            vechicleNumber: {
                bsonType: ["string", "null"],
                description: "'vehicleNumber' is the vehicle that brought the stock, must be a string or null"
            },
            driverName: {
                bsonType: ["string", "null"],
                description: "'driverName' is the driver that brought the stock, must be a string or null"
            },
            transportChargesPaid: {
                bsonType: ["int", "double"],
                description: "'transportChargesPaid' is the charges paid by store for transport, must be a number",
                minimum: 0
            },
            charges: {
                bsonType: "object",
                description: "'charges' is a consolidation of all kinds of lodgement or delivery charges",
                required: ["hamaliCharges", "platformCoolieCharges", "kataCoolieCharges", "mamulluCharges", "insurnaceCharges",
                    "totalLodgementChargesReceivable", "totalLodgementChargesReceived", "totalDeliveryChargesReceivable", "totalDeliveryChargesReceived"],
                properties: {
                    "hamaliCharges": { bsonType: "double", minimum: 0 },
                    "platformCoolieCharges": { bsonType: "double", minimum: 0 },
                    "kataCoolieCharges": { bsonType: "double", minimum: 0 },
                    "mamulluCharges": { bsonType: "double", minimum: 0 },
                    "insuranceCharges": { bsonType: "double", minimum: 0 },
                    "totalLodgementChargesReceivable": { bsonType: "double", minimum: 0 },
                    "totalLodgementChargesReceived": { bsonType: "double", minimum: 0 },
                    "totalDeliveryChargesReceivable": { bsonType: "double", minimum: 0 },
                    "totalDeliveryChargesReceived": { bsonType: "double", minimum: 0 },
                }
            },
            rents: {
                bsonType: "object",
                description: "'rents' is a consolidation of all kinds of rents & their details",
                required: ["rentalMode", "rentalYear", "totalRentReceivable", "totalRentReceived"],
                properties: {
                    "rentalMode": { bsonType: "string", enum: ["monthly", "yearly"] },
                    "rentalYear": { bsonType: "int", minimum: 2000 },
                    "totalRentReceivable": { bsonType: "double", minimum: 0 },
                    "totalRentReceived": { bsonType: "double", minimum: 0 }
                }
            },
            deliveries: {
                bsonType: "array",
                description: "'deliveries' is a list of all deliveries on this lodgement",
                minItems: 0,
                items: {
                    bsonType: "object",
                    required: ["deliveryId", "deliveryDate", "numBagsDelivered", "deliveryChargesReceivable", "deliveryChargesReceived",
                        "numMonthsForDeliveredBags", "rentReceivableOnDeliveredBags", "transportChargesPaid"],
                    properties: {
                        "deliveryId": { bsonType: "binData" },            // do we need to track mamulluCharges at delivery time?
                        "deliveryDate": { bsonType: "date" },
                        "numBagsDelivered": { bsonType: "int", minimum: 0 },
                        "numBagsBalance": { bsonType: "int", minimum: 0 },
                        "deliveryNotes": { bsonType: "string" },
                        "deliveryChargesReceivable": { bsonType: "double", minimum: 0 },
                        "deliveryChargesPaid": { bsonType: "double", minimum: 0 },
                        "numMonthsforDeliveredBags": { bsonType: "int", minimum: 1 },
                        "rentReceivableOnDeliveredBags": { bsonType: "double", minimum: 0 },
                        "vehicleNumber": { bsonType: ["string", "null"] },
                        "driverName": { bsonType: ["string", "null"] },
                        "transportChargesPaid": { bsonType: "double", minimum: 0 }
                    }
                }
            }
        }
    }
}