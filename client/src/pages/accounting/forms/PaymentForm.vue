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
import { DateTime } from 'luxon';
import PaymentFormSchema from './schemas/PaymentFormSchema';
import { getEmployees } from '@/services/employee.service';
import { getPaymentTypes } from '@/services/paymentType.service';
import { createPayment, updatePayment } from '@/services/payment.service';

export default {
    name: 'PaymentForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/accounting/payments/",
            formSchema: PaymentFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {
                transactionDate: '',
                employee: {
                    employeeId: '',
                    employeeFullName: ''
                },
                paymentType: {
                    paymentTypeId: '',
                    paymentType: ''
                },
                amount: 0,
                transactionMode: '',
                transactionDetails: ''
            },
            employeeField: null,
            employeeMap: new Map(),
            employeeOptions: [],
            selectedEmployee: {},
            paymentTypeField: null,
            paymentTypeMap: new Map(),
            paymentTypeOptions: [],
            selectedPaymentType: {},
        }
    },
    created() {
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;

        this.employeeField = this.formSchema.groups[0].fields.find(fields => fields.model==='employee');
        this.employeeField.values = this.getEmployeeOptions();

        this.paymentTypeField = this.formSchema.groups[0].fields.find(fields => fields.model==='paymentType');
        this.paymentTypeField.values = this.getPaymentTypeOptions();
    },
    methods: {
        getEmployeeOptions() {
            getEmployees().then(response => {
                let employees = response;
                employees.forEach(this.addToEmployeeOptions);
            });
            return this.employeeOptions;
        },
        addToEmployeeOptions(employee) {
            this.employeeOptions.push({
                "employeeId": employee._id,
                "employeeFullName": employee.employeeFullName
            });
            
            this.employeeMap.set(employee._id, employee);
        },
        getPaymentTypeOptions() {
            getPaymentTypes().then(response => {
                let paymentTypes = response;
                paymentTypes.forEach(this.addToPaymentTypeOptions);
            });
            return this.paymentTypeOptions;
        },
        addToPaymentTypeOptions(paymentType) {
            this.paymentTypeOptions.push({
                "paymentTypeId": paymentType._id,
                "paymentType": paymentType.paymentType
            });
            
            this.paymentTypeMap.set(paymentType._id, paymentType);
        },
        submitForm() {
            // submit form data to the backend - entity - Employee
            let transaction = {
                employee: null,
                paymentType: {
                    paymentTypeId: this.formModel.paymentType.paymentTypeId,
                    paymentType: this.formModel.paymentType.paymentType
                },
                amount: this.formModel.amount,
                transactionMode: 'Payment',
                transactionDate: this.formModel.transactionDate,
                transactionDetails: this.formModel.transactionDetails
            };

            if(this.formModel.paymentType.paymentType == 'Salaries paid to Staff') {
                transaction.employee = {
                    employeeId: this.formModel.employee.employeeId,
                    employeeFullName: this.formModel.employee.employeeFullName
                };
            }
            if(this.submitMode=="update") {
                transaction._id = this.loadedEntityId;
                updatePayment(this.loadedEntityId, transaction).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                createPayment(transaction).then(response => {
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
