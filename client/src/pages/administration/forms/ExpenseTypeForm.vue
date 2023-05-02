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
import ExpenseTypeFormSchema from './schemas/ExpenseTypeFormSchema';
import { createExpenseType, updateExpenseType } from '@/services/expenseType.service';

export default {
    name: 'ExpenseTypeForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/administration/expenseTypes/",
            formSchema: ExpenseTypeFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {
                expenseType: "",
                expenseCategory: "",
                creationDate: '',
                lastModifiedDate: '',
                activeFrom: '',
                activeUntil: ''
            }
        }
    },
    created() {
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;
    },
    methods: {
        submitForm() {
            // submit form data to the backend - entity - ExpenseType
            let currentDate = DateTime.now();
            let expenseType = {
                expenseType: this.formModel.expenseType,
                expenseCategory: this.formModel.expenseCategory,
                creationDate: this.formModel.creationDate,
                activeFrom: this.formModel.activeFrom,
                activeUntil: this.formModel.activeUntil,
                lastModifiedDate: currentDate
            };

            if(this.submitMode=="update") {
                expenseType._id = this.loadedEntityId;
                updateExpenseType(this.loadedEntityId, expenseType).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                expenseType.creationDate = currentDate;
                expenseType.activeFrom = currentDate;
                expenseType.activeUntil = DateTime.fromFormat('2100-01-01', 'yyyy-MM-dd');
                createExpenseType(expenseType).then(response => {
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
