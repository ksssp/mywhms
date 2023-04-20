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

import PlatformLotDetailsFormSchema from './schemas/PlatformLotDetailsFormSchema';
import { createLodgement, updateLodgement } from '@/services/lodgement.service';
import { getProducts } from '@/services/product.service';
import { getTrademarks } from '@/services/customer.service';
import Multiselect from 'vue-multiselect';

export default {
    name: 'PlatformLotDetailsForm',
    components: {
        Multiselect
    },
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/inventory/platformLots/",
            formSchema: PlatformLotDetailsFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {
                lotNumber: "",
                trademark: {
                    trademarkId: "",
                    trademarkName: ""
                },
                product: {
                    productId: "",
                    productName: ""
                },
                numBagsLodged: 0,
                numBagsKataCoolie: 0,
                locationCodes: "",
                lodgementNotes: "",
                transport: {
                    vehicleNumber: "",
                    driverName: ""
                },
                indicativeCharges: {
                    kataCoolieCharges: 0,
                    hamaliCharges: 0,
                    platformCoolieCharges: 0,
                    mamulluCharges: 0,
                    insuranceCharges: 0
                },
            },
            productMap: new Map(),
            selectedProduct: null,
            productOptions: [],
            trademarkMap: new Map(),
            selectedTrademark: null,
            trademarkOptions: []
        }
    },
    created() {
        if(this.submitMode == 'update')
            this.formModel = JSON.parse(JSON.stringify(this.formData));
        
        this.loadedEntityId = this.formData._id;
        let productField = this.formSchema.groups[0].fields.find(fields => fields.model==='product');
        productField.values = this.getProductOptions();
        let trademarkField = this.formSchema.groups[0].fields.find(fields => fields.model==='trademark');
        trademarkField.values = this.getTrademarkOptions();
    },
    methods: {
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
        submitForm() {
            // // submit form data to the backend - entity - Lodgement
            // let lodgement = {
            //     // setup data from form into the object to be saved
            // };

            // if(this.submitMode=="update") {
            //     lodgement._id = this.loadedEntityId;
            //     updateLodgement(this.loadedEntityId, lodgement).then(response => {
            //         var saveActionStatus = response;
            //         this.$emit('saved', saveActionStatus);
            //     });
            // } else if (this.submitMode == "create") {
            //     lodgement.creationDate = Date.now();
            //     lodgement.lastModifiedDate = lodgement.creationDate;
            //     createLodgement(lodgement).then(response => {
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
        'formModel.product'(newValue) {
            if(newValue != undefined && newValue != null) {
                this.selectedProduct = this.productMap.get(newValue.productId);
                // console.log(newValue, this.selectedProduct);

                if(this.selectedProduct != undefined) {
                    let numBagsLodged = this.formModel.numBagsLodged == undefined ? 0 : this.formModel.numBagsLodged;
                    let numBagsKataCoolie = this.formModel.numBagsKataCoolie == undefined ? 0 : this.formModel.numBagsKataCoolie;

                    // update all charges based on updated product
                    this.formModel.indicativeCharges.hamaliCharges = this.selectedProduct.hamaliPerBag * numBagsLodged;
                    this.formModel.indicativeCharges.platformCoolieCharges = this.selectedProduct.platformCooliePerBag * numBagsLodged;
                    this.formModel.indicativeCharges.mamulluCharges = this.selectedProduct.mamulluPerBag * numBagsLodged;
                    this.formModel.indicativeCharges.insuranceCharges = this.selectedProduct.insurancePerBag * numBagsLodged;
                    this.formModel.indicativeCharges.kataCoolieCharges = this.selectedProduct.insurancePerBag * numBagsKataCoolie;
                }
            }
        },
        'formModel.numBagsLodged'(newValue) {
             // update all charges based on updated numBagsLodged
            if((newValue != undefined && newValue != null) && this.selectedProduct != null & this.selectedProduct != undefined) {
                this.formModel.indicativeCharges.hamaliCharges = this.selectedProduct.hamaliPerBag * newValue;
                this.formModel.indicativeCharges.platformCoolieCharges = this.selectedProduct.platformCooliePerBag * newValue;
                this.formModel.indicativeCharges.mamulluCharges = this.selectedProduct.mamulluPerBag * newValue;
                this.formModel.indicativeCharges.insuranceCharges = this.selectedProduct.insurancePerBag * newValue;
            } else {
                this.formModel.indicativeCharges.hamaliCharges = 0;
                this.formModel.indicativeCharges.platformCoolieCharges = 0;
                this.formModel.indicativeCharges.mamulluCharges = 0;
                this.formModel.indicativeCharges.insuranceCharges = 0;
            }
        },
        'formModel.numBagsKataCoolie'(newValue) {
            if(newValue != undefined && newValue != null) {
                this.formModel.indicativeCharges.kataCoolieCharges = this.selectedProduct.insurancePerBag * newValue;
            } else {
                this.formModel.indicativeCharges.kataCoolieCharges = 0;
            }
        }
    }
}
</script>
