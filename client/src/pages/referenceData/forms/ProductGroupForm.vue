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

import ProductGroupFormSchema from './schemas/ProductGroupFormSchema';
import { createProductGroup, updateProductGroup } from '@/services/ProductGroupService';

export default {
    name: 'ProductGroupForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/referenceData/productGroups/",
            formSchema: ProductGroupFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {
                productGroup: "",
                productSubGroup: "",
                productSubGroupPrefix: "",
                onesideHamaliPerQuintal: 0,
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
            // submit form data to the backend - entity - ProductGroup
            let productGroup = {
                productGroup: this.formModel.productGroup,
                productSubGroup: this.formModel.productSubGroup,
                productSubGroupPrefix: this.formModel.productSubGroupPrefix,
                onesideHamaliPerQuintal: this.formModel.onesideHamaliPerQuintal,
                yearlyRentPerQuintal: this.formModel.yearlyRentPerQuintal
            };

            if(this.submitMode=="update") {
                productGroup._id = this.loadedEntityId;
                updateProductGroup(this.loadedEntityId, productGroup).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                productGroup.creationDate = Date.now();
                createProductGroup(productGroup).then(response => {
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