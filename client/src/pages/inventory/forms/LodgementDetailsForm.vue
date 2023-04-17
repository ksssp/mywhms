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

import LodgementDetailsFormSchema from './schemas/LodgementDetailsFormSchema';
import { createLodgement, updateLodgement } from '@/services/LodgementService';
import { getProducts } from '@/services/ProductService';
import { getTrademarks } from '@/services/TrademarkService';
import { getLocations } from '@/services/LocationService';
import Multiselect from 'vue-multiselect';

export default {
    name: 'LodgementDetailsForm',
    components: {
        Multiselect
    },
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/inventory/lodgements/",
            formSchema: LodgementDetailsFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {},
            //     lotNumber: "",
            //     trademark: {
            //         trademarkId: "",
            //         trademarkName: ""
            //     },
            //     product: {
            //         productId: "",
            //         productName: ""
            //     },
            //     numBagsLodged: 0,
            //     numBagsKataCoolie: 0,
            //     locationCodes: "",
            //     lodgementNotes: "",
            //     transport: {
            //         vehicleNumber: "",
            //         driverName: ""
            //     },
            //     indicativeCharges: {
            //         kataCoolieCharges: 0,
            //         hamaliCharges: 0,
            //         platformCoolieCharges: 0,
            //         mamulluCharges: 0,
            //         insuranceCharges: 0
            //     },
            // },
            productMap: new Map(),
            selectedProduct: null,
            productOptions: [],
            trademarkMap: new Map(),
            selectedTrademark: null,
            trademarkOptions: [],
            locationOptions: [],
            locationMap: new Map()
        }
    },
    created() {        
        this.loadedEntityId = this.formData._id;
        let productField = this.formSchema.groups[0].fields.find(fields => fields.model==='product');
        productField.values = this.getProductOptions();
        let trademarkField = this.formSchema.groups[0].fields.find(fields => fields.model==='trademark');
        trademarkField.values = this.getTrademarkOptions();
        let locationField = this.formSchema.groups[0].fields.find(fields => fields.model==='locationCodes');
        locationField.values = this.getLocationOptions();

        if(this.submitMode == 'update') {
            this.formModel = JSON.parse(JSON.stringify(this.formData));
            let lodgementLocations = this.formModel.locationCodes.split(', ');
            this.formModel.locationCodes = [];
            lodgementLocations.forEach(this.parseLocationCode);
            console.log(this.formModel.locationCodes);
        }
    },
    methods: {
        parseLocationCode(locationCode) {
            // let location = this.locationMap.get(locationCode);
            this.formModel.locationCodes.push({
                'locationId': locationCode,
                'locationCode': locationCode
            });
        },
        getProductOptions() {
            getProducts().then(response => {
                let products = response;
                products.forEach(this.addToProductOptions);
            });
            return this.productOptions;
        },
        addToProductOptions(product) {
            this.productOptions.push({
                "productId": product._id,
                "productName": product.productName
            });
            this.productMap.set(product._id, product);
        },
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
        getLocationOptions() {
            getLocations().then(response => {
                let locations = response;
                locations.forEach(this.addToLocationOptions);
            });
            return this.locationOptions;
        },
        addToLocationOptions(location) {
            this.locationOptions.push({
                "locationId": location.locationCode,
                "locationCode": location.locationCode
            });
            this.locationMap.set(location.locationCode, location);
        },
        submitForm() {
            // submit form data to the backend - entity - Lodgement
            let lodgement = {
                
            };

            if(this.submitMode=="update") {
                lodgement._id = this.loadedEntityId;
                updateLodgement(this.loadedEntityId, lodgement).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                lodgement.creationDate = Date.now();
                lodgement.lastModifiedDate = lodgement.creationDate;
                createLodgement(lodgement).then(response => {
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
