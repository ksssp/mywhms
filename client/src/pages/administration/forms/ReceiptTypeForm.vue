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
import ReceiptTypeFormSchema from './schemas/ReceiptTypeFormSchema';
import { createReceiptType, updateReceiptType } from '@/services/receiptType.service';

export default {
    name: 'ReceiptTypeForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/administration/receiptTypes/",
            formSchema: ReceiptTypeFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {
                receiptType: "",
                receiptCategory: "",
                receiptSource: "",
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
            // submit form data to the backend - entity - ReceiptType
            let currentDate = DateTime.now();
            let receiptType = {
                receiptType: this.formModel.receiptType,
                receiptCategory: this.formModel.receiptCategory,
                receiptSource: this.formModel.receiptSource,
                creationDate: this.formModel.creationDate,
                activeFrom: this.formModel.activeFrom,
                activeUntil: this.formModel.activeUntil,
                lastModifiedDate: currentDate
            };

            if(this.submitMode=="update") {
                receiptType._id = this.loadedEntityId;
                updateReceiptType(this.loadedEntityId, receiptType).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                receiptType.creationDate = currentDate;
                receiptType.activeFrom = currentDate;
                receiptType.activeUntil = DateTime.fromFormat('2100-01-01', 'yyyy-MM-dd');
                createReceiptType(receiptType).then(response => {
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
