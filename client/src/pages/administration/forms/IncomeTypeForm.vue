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
import IncomeTypeFormSchema from './schemas/IncomeTypeFormSchema';
import { createIncomeType, updateIncomeType } from '@/services/incomeType.service';

export default {
    name: 'IncomeTypeForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/administration/incomeTypes/",
            formSchema: IncomeTypeFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {
                incomeType: "",
                incomeCategory: "",
                incomeSource: "",
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
            // submit form data to the backend - entity - IncomeType
            let currentDate = DateTime.now();
            let incomeType = {
                incomeType: this.formModel.incomeType,
                incomeCategory: this.formModel.incomeCategory,
                incomeSource: this.formModel.incomeSource,
                creationDate: this.formModel.creationDate,
                activeFrom: this.formModel.activeFrom,
                activeUntil: this.formModel.activeUntil,
                lastModifiedDate: currentDate
            };

            if(this.submitMode=="update") {
                incomeType._id = this.loadedEntityId;
                updateIncomeType(this.loadedEntityId, incomeType).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                incomeType.creationDate = currentDate;
                incomeType.activeFrom = currentDate;
                incomeType.activeUntil = DateTime.fromFormat('2100-01-01', 'yyyy-MM-dd');
                createIncomeType(incomeType).then(response => {
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
