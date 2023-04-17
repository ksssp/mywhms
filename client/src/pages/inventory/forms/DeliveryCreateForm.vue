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

import DeliveryCreateFormSchema from './schemas/DeliveryCreateFormSchema';
import { createDelivery, updateDelivery } from '@/services/DeliveryService';
import { getLodgementsByTrademarkId } from '@/services/LodgementService';
import { getProductById } from '@/services/ProductService';
import { getTrademarks } from '@/services/TrademarkService';

export default {
    name: 'DeliveryCreateForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/inventory/deliveries/",
            formSchema: DeliveryCreateFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {},
            trademarkMap: new Map(),
            trademarkOptions: [],
            selectedTrademark: {},
            deliveryLotOptions: [],
            selectedLot: {}
        }
    },
    created() {
        if(this.submitMode == 'update')
            this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;
        let trademarkField = this.formSchema.groups[0].fields.find(fields => fields.model==='trademark');
        trademarkField.values = this.getTrademarkOptions();
    },
    methods: {
        getTrademarkOptions() {
            getTrademarks().then(response => {
                let trademarks = response;
                trademarks.forEach(this.addToTrademarkOptions);
            });
            return this.trademarkOptions;
        },
        addToTrademarkOptions(trademark) {
            this.trademarkOptions.push({
                "trademarkId": trademark._id,
                "trademarkName": trademark.trademarkName + " ( " + trademark.customerName + ")"
            });
            
            this.trademarkMap.set(trademark._id, trademark);
        },
        getDeliveryLotOptions(trademarkId) {
            this.deliveryLotOptions = [];
            getLodgementsByTrademarkId(trademarkId).then(response => {
                let deliveryLots = JSON.parse(JSON.stringify(response));
                console.log(deliveryLots);
                deliveryLots.forEach(this.addToDeliveryLotOptions);
            });
            return this.deliveryLotOptions;
        },
        addToDeliveryLotOptions(lodgement) {
            this.deliveryLotOptions.push({
                "lodgementId": lodgement._id,
                "lodgementName": lodgement.lotNumber + " ( " + lodgement.numBagsBalance + "/" + lodgement.numBagsLodged + " Bags)"
            });
        },
        submitForm() {
            // submit form data to the backend - entity - Employee
            // let employee = {
            //     employeeCode: this.formModel.employeeCode,
            //     employeeFullName: this.formModel.employeeFullName,
            //     designation: this.formModel.designation,
            //     monthlySalary: this.formModel.monthlySalary
            // };

            // if(this.submitMode=="update") {
            //     employee._id = this.loadedEntityId;
            //     updateEmployee(this.loadedEntityId, employee).then(response => {
            //         var saveActionStatus = response;
            //         this.$emit('saved', saveActionStatus);
            //     });
            // } else if (this.submitMode == "create") {
            //     employee.creationDate = Date.now();
            //     createEmployee(employee).then(response => {
            //         var savedObject = response;
            //         this.$emit('saved', savedObject);
            //     });
            // }
        },
        cancelForm() {
            this.submitMode == 'update' ? this.$emit('cancelForm') : this.$router.push(this.entityListingUrl);
        }
    },
    watch: {
        'formModel.trademark'(newValue) {
            if(newValue != undefined && newValue != null) {
                let deliveryLotField = this.formSchema.groups[0].fields.find(fields => fields.model==='deliveryLot');
                deliveryLotField.values = this.getDeliveryLotOptions(newValue.trademarkId);
            }
        }
    }
}
</script>
