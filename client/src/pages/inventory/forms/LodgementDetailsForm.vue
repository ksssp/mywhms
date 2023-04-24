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
import { createLodgement, updateLodgement } from '@/services/lodgement.service';
import { getProducts } from '@/services/product.service';
import { getCustomers } from '@/services/customer.service';
import { getLocations } from '@/services/location.service';
import Multiselect from 'vue-multiselect';
import { DateTime } from 'luxon';

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
            formModel: {
                lotNumber: "",
                customer: {
                    customerId: "",
                    customerDisplayName: "",
                },
                product: {
                    productId: "",
                    productName: ""
                },
                numBagsLodged: 0,
                numBagsKataCoolie: 0,
                lodgementDate: '',
                locationCodes: '',
                lodgementNotes: '',
                transport: {
                    vehicleNumber: '',
                    driverName: ''
                },
            },
            productMap: new Map(),
            selectedProduct: null,
            productOptions: [],
            customerMap: new Map(),
            selectedCustomer: null,
            customerOptions: [],
            locationOptions: [],
            locationMap: new Map()
        }
    },
    created() {        
        let productField = this.formSchema.groups[0].fields.find(fields => fields.model==='product');
        productField.values = this.getProductOptions();
        let customerField = this.formSchema.groups[0].fields.find(fields => fields.model==='customer');
        customerField.values = this.getCustomerOptions();
        let locationField = this.formSchema.groups[0].fields.find(fields => fields.model==='locationCodes');
        locationField.values = this.getLocationOptions();

        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;
        if(this.submitMode == 'update') {
            this.formModel.locationCodes = this.formData.locationCodes.split(', ');
        }
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
        getCustomerOptions() {
            getCustomers().then(response => {
                let customers = response;
                customers.forEach(this.addToCustomerOptions);
            });
            return this.customerOptions;
        },
        addToCustomerOptions(customer) {
            this.customerOptions.push({
                "customerId": customer._id,
                "customerDisplayName": customer.customerDisplayName
            });
            this.customerMap.set(customer._id, customer);
        },
        getLocationOptions() {
            getLocations().then(response => {
                let locations = response;
                locations.forEach(this.addToLocationOptions);
            });
            return this.locationOptions;
        },
        addToLocationOptions(location) {
            this.locationOptions.push(location.locationCode);
            this.locationMap.set(location.locationCode, location);
        },
        submitForm() {
            // submit form data to the backend - entity - Lodgement
            this.selectedCustomer = this.customerMap.get(this.formModel.customer.customerId);
            this.selectedProduct = this.productMap.get(this.formModel.product.productId);
            let currentDate = DateTime.now().toLocal();
            let lodgement = this.formModel;
            lodgement.locationCodes = this.formModel.locationCodes.join(', ');
            lodgement.chargesPerBag = {
                hamaliPerBag: this.selectedProduct.hamaliPerBag,
                kataCooliePerBag: this.selectedProduct.kataCooliePerBag,
                platformCooliePerBag: this.selectedProduct.platformCooliePerBag,
                mamulluPerBag: this.selectedProduct.mamulluPerBag,
                insurancePerBag: this.selectedProduct.insurancePerBag
            };
            lodgement.chargesReceivable = {
                hamaliCharges: Math.round(2 * this.selectedProduct.hamaliPerBag * lodgement.numBagsLodged),
                insuranceCharges: Math.round(this.selectedProduct.insurancePerBag * lodgement.numBagsLodged),
                nonHamaliChargesPaid: 0,
                totalChargesReceivable: Math.round(2 * this.selectedProduct.hamaliPerBag * lodgement.numBagsLodged)
                    + Math.round(this.selectedProduct.insurancePerBag * lodgement.numBagsLodged),
            };
            lodgement.lastModifiedDate = currentDate;

            if(this.submitMode=="update") {
                lodgement._id = this.loadedEntityId;
                console.log(lodgement);
                updateLodgement(this.loadedEntityId, lodgement).then(response => {
                    var saveActionStatus = response;
                    console.log('saveActionStatus : ', saveActionStatus);
                    this.$emit('saved', saveActionStatus.status);
                });
            } else if (this.submitMode == "create") {

                // setup defaults for most fields
                lodgement.creationDate = currentDate
                lodgement.lodgementDate = currentDate;
                lodgement.isPlatformLot = false;
                lodgement.chargesPaid = {
                    hamaliCharges: 0,
                    kataCoolieCharges: 0,
                    platformCoolieCharges: 0,
                    mamulluCharges: 0,
                    transportCharges: 0,
                    totalChargesPaid: 0,
                };
                lodgement.rentals = {
                    rentalYear: lodgement.creationDate.year,
                    rentalMode: lodgement.creationDate.month < 6 ? 'Yearly' : 'Monthly', 
                    monthlyRentPerBag: this.selectedProduct.monthlyRentPerBag,
                    yearlyRentPerBag: this.selectedProduct.yearlyRentPerBag,
                    rentSettled: false
                };
                lodgement.numBagsBalance = lodgement.numBagsLodged;
                lodgement.stockRelease = {
                    numDeliveries: 0,
                    numBagsDelivered: 0,
                    lastDeliveryDate: '',
                    totalChargesPaid: 0,
                    totalChargesReceivable: 0,
                    totalRentReceivable: 0,
                    deliveries: []
                };
                lodgement.carryForward = {
                    hasCarryForwardLot: false,
                    carryForwardLodgementId: '',
                    carryForwardLotNumber: '',
                    numBagsCarryForward: 0,
                    isCarryForwardLot: false,
                    originalLodgementId: '',
                    originalLotNumber: ''
                };

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
