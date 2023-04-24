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

import ProductCategoryFormSchema from './schemas/ProductCategoryFormSchema';
import { createProductCategory, updateProductCategory } from '@/services/productCategory.service';

export default {
    name: 'ProductCategoryForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/administration/productCategories/",
            formSchema: ProductCategoryFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {
                productCategory: "",
                productVariety: "",
                oneSideHamaliPerQuintal: 0,
                yearlyRentPerQuintal: 0
            }
        }
    },
    created() {
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;
    },
    methods: {
        submitForm() {
            // submit form data to the backend - entity - ProductCategory
            let currentDate = Date.now();
            let productCategory = {
                productCategory: this.formModel.productCategory,
                productVariety: this.formModel.productVariety,
                productCategoryPrefix: this.getProductCategoryPrefix(this.formModel),
                oneSideHamaliPerQuintal: this.formModel.oneSideHamaliPerQuintal,
                yearlyRentPerQuintal: this.formModel.yearlyRentPerQuintal,
                lastModifiedDate: currentDate
            };

            if(this.submitMode=="update") {
                productCategory._id = this.loadedEntityId;
                updateProductCategory(this.loadedEntityId, productCategory).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                productCategory.creationDate = currentDate;
                productCategory.activeFrom = currentDate;
                productCategory.activeUntil = new Date('2100-01-01');
                createProductCategory(productCategory).then(response => {
                    var savedObject = response;
                    this.$emit('saved', savedObject);
                });
            }
        },
        cancelForm() {
            this.submitMode == 'update' ? this.$emit('cancelForm') : this.$router.push(this.entityListingUrl);
        },
        getProductCategoryPrefix(entity) {
            if(entity.productCategory == entity.productVariety) {
                return entity.productCategory;
            } else {
                return entity.productCategory + ' ( ' +  entity.productVariety + ' )';
            }
        }
    }
}
</script>