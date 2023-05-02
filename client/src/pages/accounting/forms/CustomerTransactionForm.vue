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

<script>

import CustomerTransactionFormSchema from './schemas/CustomerTransactionFormSchema';
import { getCustomers } from '@/services/customer.service';
import { createCustomerTransaction, updateCustomerTransaction } from '@/services/customerTransaction.service';

export default {
    name: 'CustomerTransactionForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/accounting/customerTransactions/",
            formSchema: CustomerTransactionFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {
                customer: {
                    customerId: '',
                    customerDisplayName: ''
                },
                rentalYear: (new Date()).getFullYear(),
                rentalMode: 'Monthly',
                rentReceived: 0,
                rentDiscount: 0, 
                chargesReceived: 0
            },
            customerField: null,
            customerMap: new Map(),
            customerOptions: [],
            selectedCustomer: {},
        }
    },
    created() {
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;

        this.customerField = this.formSchema.groups[0].fields.find(fields => fields.model==='customer');
        this.customerField.values = this.getCustomerOptions();
    },
    methods: {
        getCustomerOptions() {
            getCustomers().then(response => {
                let customers = response;
                customers.forEach(this.addToCustomerOptions);
            });
            return this.customerOptions;
        },
        addToCustomerOptions(customer) {
            this.customerOptions.push({
                "customerId": customer._id,
                "customerDisplayName": customer.customerDisplayName
            });
            
            this.customerMap.set(customer._id, customer);
        },
        submitForm() {
            // submit form data to the backend - entity - Customer
            let totalAmountReceived = this.formModel.rentReceived + this.formModel.chargesReceived;
            let transaction = {
                customer: {
                    customerId: this.formModel.customer.customerId,
                    customerDisplayName: this.formModel.customer.customerDisplayName
                },
                rentalYear: this.formModel.rentalYear,
                rentalMode: this.formModel.rentalMode,
                rentReceived: this.formModel.rentReceived,
                rentDiscount: this.formModel.rentDiscount, 
                chargesReceived: this.formModel.chargesReceived,
                totalAmountReceived: totalAmountReceived,
                transactionDate: this.formModel.transactionDate,
                transactionDetails: this.formModel.transactionDetails
            };

            if(this.submitMode=="update") {
                transaction._id = this.loadedEntityId;
                updateCustomerTransaction(this.loadedEntityId, transaction).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                createCustomerTransaction(transaction).then(response => {
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
