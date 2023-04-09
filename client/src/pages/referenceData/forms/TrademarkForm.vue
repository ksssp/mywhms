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

import TrademarkFormSchema from './schemas/TrademarkFormSchema';
import { createTrademark, updateTrademark } from '@/services/TrademarkService';

export default {
    name: 'TrademarkForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/referenceData/trademarks/",
            formSchema: TrademarkFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {
                trademarkName: "",
                customerName: "",
                mobileNumber: "",
                town: "",
            }
        }
    },
    created() {
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;
    },
    methods: {
        submitForm() {
            // submit form data to the backend - entity - Trademark
            let trademark = {
                trademarkName: this.formModel.trademarkName,
                customerName: this.formModel.customerName,
                mobileNumber: this.formModel.mobileNumber,
                town: this.formModel.town
            };

            if(this.submitMode=="update") {
                trademark._id = this.loadedEntityId;
                updateTrademark(this.loadedEntityId, trademark).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                trademark.creationDate = Date.now();
                createTrademark(trademark).then(response => {
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
