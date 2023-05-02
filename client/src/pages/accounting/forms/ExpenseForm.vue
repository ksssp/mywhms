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
import ExpenseFormSchema from './schemas/ExpenseFormSchema';
import { getEmployees } from '@/services/employee.service';
import { getExpenseTypes } from '@/services/expenseType.service';
import { createExpense, updateExpense } from '@/services/expense.service';

export default {
    name: 'ExpenseForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/accounting/expenses/",
            formSchema: ExpenseFormSchema,
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
                expenseType: {
                    expenseTypeId: '',
                    expenseType: ''
                },
                amount: 0,
                transactionMode: '',
                transactionDetails: ''
            },
            employeeField: null,
            employeeMap: new Map(),
            employeeOptions: [],
            selectedEmployee: {},
            expenseTypeField: null,
            expenseTypeMap: new Map(),
            expenseTypeOptions: [],
            selectedExpenseType: {},
        }
    },
    created() {
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;

        this.employeeField = this.formSchema.groups[0].fields.find(fields => fields.model==='employee');
        this.employeeField.values = this.getEmployeeOptions();

        this.expenseTypeField = this.formSchema.groups[0].fields.find(fields => fields.model==='expenseType');
        this.expenseTypeField.values = this.getExpenseTypeOptions();
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
        getExpenseTypeOptions() {
            getExpenseTypes().then(response => {
                let expenseTypes = response;
                expenseTypes.forEach(this.addToExpenseTypeOptions);
            });
            return this.expenseTypeOptions;
        },
        addToExpenseTypeOptions(expenseType) {
            this.expenseTypeOptions.push({
                "expenseTypeId": expenseType._id,
                "expenseType": expenseType.expenseType
            });
            
            this.expenseTypeMap.set(expenseType._id, expenseType);
        },
        submitForm() {
            // submit form data to the backend - entity - Employee
            let transaction = {
                employee: null,
                expenseType: {
                    expenseTypeId: this.formModel.expenseType.expenseTypeId,
                    expenseType: this.formModel.expenseType.expenseType
                },
                amount: this.formModel.amount,
                transactionMode: 'Payment',
                transactionDate: this.formModel.transactionDate,
                transactionDetails: this.formModel.transactionDetails
            };

            if(this.formModel.expenseType.expenseType == 'Salaries paid to Staff') {
                transaction.employee = {
                    employeeId: this.formModel.employee.employeeId,
                    employeeFullName: this.formModel.employee.employeeFullName
                };
            }
            if(this.submitMode=="update") {
                transaction._id = this.loadedEntityId;
                updateExpense(this.loadedEntityId, transaction).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                createExpense(transaction).then(response => {
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
