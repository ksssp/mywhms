// this file is to prepare jsons for upload
const productCategoryRepository = require('../../repositories/productCategory.repository');
const products = require('../fullData/productsMasterList.json');

var fs = require('fs');

productCategoryRepository.getProductCategories().then(response => {
    let productCategories = JSON.parse(JSON.stringify(response));
    let productCategoryPrefixMap = new Map();
    productCategories.forEach(productCategory => {
        let simplifiedProductObject = {
            productCategoryId: productCategory._id,
            productCategoryPrefix: productCategory.productCategoryPrefix
        }
        productCategoryPrefixMap.set(productCategory.productCategoryPrefix, simplifiedProductObject);
    });
    
   
    let formattedProducts = [];
    products.forEach(element => {
        let productCategory = productCategoryPrefixMap.get(element.productCategory_productVarietyPrefix);
        var formattedProduct = 
        {
          "productName": element.productName,
          "productCategory": {
            "productCategoryId": productCategory.productCategoryId,
            "productCategoryPrefix": productCategory.productCategoryPrefix
          },
          "computedProductName": element.computedProductName,
          "hamaliPerBag": element.hamaliPerBag,
          "platformCooliePerBag": element.platformCooliePerBag,
          "kataCooliePerBag": element.kataCooliePerBag,
          "mamulluPerBag": element.mamulluPerBag,
          "monthlyRentPerBag": element.monthlyRentPerBag,
          "yearlyRentPerBag": element.yearlyRentPerBag,
          "insurancePerBag": element.insurancePerBag,
          "yearlyRentPerKg": element.yearlyRentPerBag,
          "unitName": element.unitName,
          "bagSize": element.bagSize,
          "bagSizeForRent": element.bagSizeForRent,
          "computedYearlyRentPerBag": element.computedYearlyRentPerBag,
          "creationDate": new Date(element.creationDate),
          "lastModifiedDate": new Date(element.lastModifiedDate),
          "activeFrom": new Date(element.activeFrom),
          "activeUntil": new Date(element.activeUntil)
        };
        formattedProducts.push(formattedProduct);
    });

    fs.writeFile('../fullData/productsMasterListReady.json', JSON.stringify(formattedProducts), 'utf8', function(err) {
        if (err) throw err;
    });
});