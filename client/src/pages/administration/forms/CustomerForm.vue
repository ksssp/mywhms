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

import CustomerFormSchema from './schemas/CustomerFormSchema';
import { createCustomer, updateCustomer } from '@/services/customer.service';

export default {
    name: 'CustomerForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/administration/customers/",
            formSchema: CustomerFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {
                customerCode: "",
                customerName: "",
                mobileNumber: "",
                town: "",
                isActive: true
            }
        }
    },
    created() {
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;
    },
    methods: {
        submitForm() {
            // submit form data to the backend - entity - Customer
            let currentDate = Date.now();
            let customer = {
                customerCode: this.formModel.customerCode,
                customerName: this.formModel.customerName,
                mobileNumber: this.formModel.mobileNumber,
                town: this.formModel.town,
                isActive: this.formModel.isActive,
                lastModifiedDate: currentDate
            };

            if(this.submitMode=="update") {
                customer._id = this.loadedEntityId;
                updateCustomer(this.loadedEntityId, customer).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                customer.creationDate = currentDate;
                createCustomer(customer).then(response => {
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
