// this file is to prepare jsons for upload
const productCategories = require('../fullData/productCategoriesMasterList.json');
var fs = require('fs');

var outputJson = {};
var formattedProductCategories = [];

productCategories.forEach(element => {
    var formattedProductCategory = {
        "productCategory": element.productCategory,
        "productVariety": element.productVariety,
        "productCategoryPrefix": element.productCategoryPrefix,
        "yearlyRentPerQuintal": element.yearlyRentPerQuintal,
        "oneSideHamaliPerQuintal": element.oneSideHamaliPerQuintal,
        "creationDate": new Date(element.creationDate),
        "lastModifiedDate": new Date(element.creationDate),
        "activeFrom": new Date(element.activeFrom),
        "activeUntil": new Date(element.activeUntil)
    }
    formattedProductCategories.push(formattedProductCategory);
});

fs.writeFile('../fullData/productCategoriesMasterListReady.json', JSON.stringify(formattedProductCategories), 'utf8', function(err) {
    if (err) throw err;
    console.log('file write complete with object count: ', formattedProductCategories.length);
});