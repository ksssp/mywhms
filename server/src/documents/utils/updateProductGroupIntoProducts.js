// this file is to prepare jsons for upload
const productRepository = require('../../repositories/product.repository');
const productGroupRepository = require('../../repositories/productGroup.repository');

var fs = require('fs');
var productGroupToSuffix = new Map();

productGroupRepository.getProductGroups().then(response => {
    let productGroups = JSON.parse(JSON.stringify(response));
    productGroups.forEach(productGroup => {
        let simplifiedProductObject = {
            productGroupId: productGroup._id,
            productGroup: productGroup.productGroup,
            productSubGroup: productGroup.productSubGroup,
            productSubGroupPrefix: productGroup.productSubGroupPrefix
        }
        productGroupToSuffix.set(productGroup.productSubGroupPrefix, simplifiedProductObject);
    });

    productRepository.getProducts().then(response => {
        let products = JSON.parse(JSON.stringify(response));
        products.forEach(product => {
            let mappedProductGroup = productGroupToSuffix.get(product.productSubGroupPrefix);
            product.productGroup = mappedProductGroup;
            console.log(product);
            productRepository.updateProduct(product._id, product).then(response => {
                console.log(product._id, response);       
            });

            fs.appendFile('../sampleData/updatedProductGroupIntoProducts.json', JSON.stringify(product) + ', ', 'utf8', function(err) {
                if (err) throw err;
            });
        });
    }); 
});