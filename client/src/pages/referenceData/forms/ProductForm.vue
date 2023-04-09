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
import { createProduct, updateProduct } from '@/services/ProductService';

import { getAllProductGroups } from '@/services/ProductGroupService';
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
                productSubGroupPrefix: { _id:"", name: "" },
                bagSize: 0,
                computedProductName: "",
                hamaliPerBag: 0,
                platformCooliePerBag: 0,
                kataCooliePerBag: 0,
                mamulluPerBag: 0,
                insurancePerBag: 0,
                monthlyRentPerBag: 0,
                yearlyRentPerBag: 0,
                yearlyRentPerKg: 0,
                computedYearlyRentPerBag: 0
            },
            productGroupOptions: []
        }
    },
    created() {
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;
        let productGroupField = this.formSchema.groups[0].fields.find(fields => fields.model==='productSubGroupPrefix');
        productGroupField.values = this.getProductGroupOptions();
    },
    methods: {
        getProductGroupOptions() {
            getAllProductGroups().then(response => {
                let productGroups = response;
                productGroups.forEach(this.addToProductGroupOptions);
            });
            return this.productGroupOptions;
        },
        addToProductGroupOptions(productGroup) {
            this.productGroupOptions.push({
                "_id": productGroup._id,
                "name": productGroup.productSubGroupPrefix
            });
        },
        submitForm() {
            // submit form data to the backend - entity - Product
            let product = {
                productName: this.formModel.productName,
                productGroupId: this.formModel.productSubGroupPrefix._id,
                productSubGroupPrefix: this.formModel.productSubGroupPrefix.name,
                bagSize: this.formModel.bagSize,
                computedProductName: this.formModel.computedProductName,
                hamaliPerBag: this.formModel.hamaliPerBag,
                platformCooliePerBag: this.formModel.platformCooliePerBag,
                kataCooliePerBag: this.formModel.kataCooliePerBag,
                mamulluPerBag: this.formModel.mamulluPerBag,
                insurancePerBag: this.formModel.insurancePerBag,
                monthlyRentPerBag: this.formModel.monthlyRentPerBag,
                yearlyRentPerKg: this.formModel.yearlyRentPerKg,
                computedYearlyRentPerBag: this.formModel.computedYearlyRentPerBag,
                yearlyRentPerBag: this.formModel.yearlyRentPerBag
            };
            
            if(this.submitMode=="update") {
                product._id = this.loadedEntityId;
                updateProduct(this.loadedEntityId, product).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                product.creationDate = Date.now();
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