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
import EmployeeTransactionFormSchema from './schemas/EmployeeTransactionFormSchema';
import { getEmployees } from '@/services/employee.service';
import { getEmployeeTransactionTypes } from '@/services/employeeTransactionType.service';
import { createEmployeeTransaction, updateEmployeeTransaction } from '@/services/employeeTransaction.service';

export default {
    name: 'EmployeeTransactionForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/accounting/employeeTransactions/",
            formSchema: EmployeeTransactionFormSchema,
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
                employeeTransactionType: {
                    employeeTransactionTypeId: '',
                    employeeTransactionType: ''
                },
                amount: 0,
                transactionMode: '',
                transactionDetails: ''
            },
            employeeField: null,
            employeeMap: new Map(),
            employeeOptions: [],
            selectedEmployee: {},
            employeeTransactionTypeField: null,
            employeeTransactionTypeMap: new Map(),
            employeeTransactionTypeOptions: [],
            selectedEmployeeTransactionType: {},
        }
    },
    created() {
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;

        this.employeeField = this.formSchema.groups[0].fields.find(fields => fields.model==='employee');
        this.employeeField.values = this.getEmployeeOptions();

        this.employeeTransactionTypeField = this.formSchema.groups[0].fields.find(fields => fields.model==='employeeTransactionType');
        this.employeeTransactionTypeField.values = this.getEmployeeTransactionTypeOptions();
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
        getEmployeeTransactionTypeOptions() {
            getEmployeeTransactionTypes().then(response => {
                let employeeTransactionTypes = response;
                employeeTransactionTypes.forEach(this.addToEmployeeTransactionTypeOptions);
            });
            return this.employeeTransactionTypeOptions;
        },
        addToEmployeeTransactionTypeOptions(employeeTransactionType) {
            this.employeeTransactionTypeOptions.push({
                "employeeTransactionTypeId": employeeTransactionType._id,
                "employeeTransactionType": employeeTransactionType.employeeTransactionType
            });
            
            this.employeeTransactionTypeMap.set(employeeTransactionType._id, employeeTransactionType);
        },
        submitForm() {
            // submit form data to the backend - entity - Employee
            let transaction = {
                employee: {
                    employeeId: this.formModel.employee.employeeId,
                    employeeFullName: this.formModel.employee.employeeFullName
                },
                employeeTransactionType: {
                    employeeTransactionTypeId: this.formModel.employeeTransactionType.employeeTransactionTypeId,
                    employeeTransactionType: this.formModel.employeeTransactionType.employeeTransactionType
                },
                amount: this.formModel.amount,
                transactionMode: this.formModel.transactionMode,
                transactionDate: this.formModel.transactionDate,
                transactionDetails: this.formModel.transactionDetails
            };

            if(this.submitMode=="update") {
                transaction._id = this.loadedEntityId;
                updateEmployeeTransaction(this.loadedEntityId, transaction).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                createEmployeeTransaction(transaction).then(response => {
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
