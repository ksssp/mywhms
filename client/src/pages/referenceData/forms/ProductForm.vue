<template>
    <div class="tables col-md-12 app-crud-form py-4 my-2">
        <form action="" @submit.prevent="submitForm">
            <vue-form-generator tag="div" :schema="formSchema" :options="formOptions" :model="formModel"/>
            <div class="d-flex justify-content-end mt-3 pr-4">
                <button v-on:click="cancelForm" type="button" class="btn btn-secondary btn-md">
                        Cancel
                </button>
                <button type="submit" class="btn btn-primary btn-md">
                    {{ isSaving ? 'Saving...' : 'Save' }}
                </button>
            </div>
        </form>
    </div>
</template>

<script scoped lang="js">

import ProductFormSchema from './schemas/ProductFormSchema';
import { createProduct, updateProduct } from '@/services/product.service';
import { getProductCategories } from '@/services/productCategory.service';

import Multiselect from 'vue-multiselect';

export default {
    name: 'ProductForm',
    components: {
        Multiselect
    },
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/referenceData/products/",
            formSchema: ProductFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {
                productName: "",
                productCategory: { productCategoryId:"", productCategoryPrefix: "" },
                bagSize: 0,
                unitName: "Bags",
                computedProductName: "",
                hamaliPerBag: 0,
                platformCooliePerBag: 0,
                kataCooliePerBag: 0,
                mamulluPerBag: 0,
                insurancePerBag: 0,
                monthlyRentPerBag: 0,
                yearlyRentPerBag: 0,
                yearlyRentPerKg: 0,
                bagSizeForRent: 0
            },
            productCategoryOptions: [],
            productCategoryMap: new Map(),
        }
    },
    created() {
        // load data for dropdown fields
        let productCategoryField = this.formSchema.groups[0].fields.find(fields => fields.model==='productCategory');
        productCategoryField.values = this.getProductCategoryOptions();

        // setup the form with data if this is for editing any entity
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;
    },
    methods: {
        getProductCategoryOptions() {
            getProductCategories().then(response => {
                let productCategories = response;
                productCategories.forEach(this.addToProductCategoryOptions);
            });
            return this.productCategoryOptions;
        },
        addToProductCategoryOptions(productCategory) {
            this.productCategoryOptions.push({
                "productCategoryId": productCategory._id,
                "productCategoryPrefix": productCategory.productCategoryPrefix
            });
            
            this.productCategoryMap.set(productCategory._id, {
                productCategoryId: productCategory._id,
                productCategoryPrefix: productCategory.productCategoryPrefix
            });
        },
        submitForm() {
            // submit form data to the backend - entity - Product
            let currentDate = Date.now();
            let product = {
                productName: this.formModel.productName,
                productCategory: {
                    productCategoryId: this.formModel.productCategory.productCategoryId,
                    productCategoryPrefix: this.formModel.productCategory.productCategoryPrefix,
                },
                bagSize: this.formModel.bagSize,
                unitName: this.formModel.unitName,
                computedProductName: this.formModel.productCategory.productCategoryPrefix + 
                                        ' ' + this.formModel.bagSize + ' Kg ' + this.formModel.unitName,
                hamaliPerBag: this.formModel.hamaliPerBag,
                platformCooliePerBag: this.formModel.platformCooliePerBag,
                kataCooliePerBag: this.formModel.kataCooliePerBag,
                mamulluPerBag: this.formModel.mamulluPerBag,
                insurancePerBag: this.formModel.insurancePerBag,
                monthlyRentPerBag: this.formModel.monthlyRentPerBag,
                yearlyRentPerKg: this.formModel.yearlyRentPerKg,
                bagSizeForRent: this.formModel.bagSizeForRent,
                computedYearlyRentPerBag: this.formModel.yearlyRentPerKg * this.formModel.bagSizeForRent,
                yearlyRentPerBag: this.formModel.yearlyRentPerBag,
                lastModifiedDate: currentDate
            };
            
            if(this.submitMode=="update") {
                product._id = this.loadedEntityId;
                updateProduct(this.loadedEntityId, product).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                product.creationDate = currentDate;
                product.activeFrom = currentDate,
                product.activeUntil = new Date('2100-01-01')
                createProduct(product).then(response => {
                    var savedObject = response;
                    this.$emit('saved', savedObject);
                });
            }
        },
        cancelForm() {
            this.submitMode == 'update' ? this.$emit('cancelForm') : this.$router.push(this.entityListingUrl);
        }
    }
}
</script>