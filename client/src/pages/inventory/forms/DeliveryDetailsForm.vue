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
import { DateTime } from 'luxon';
import DeliveryDetailsFormSchema from './schemas/DeliveryDetailsFormSchema';
import { createDelivery, updateDelivery } from '@/services/delivery.service';
import { getLodgementsByCustomerId, getLodgementById } from '@/services/lodgement.service';
import { getProducts, getProductById } from '@/services/product.service';
import { getCustomers } from '@/services/customer.service';
import { getLocations } from '@/services/location.service';

export default {
    name: 'DeliveryDetailsForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/inventory/deliveries/",
            formSchema: DeliveryDetailsFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            originalNumBagsDelivered: 0,
            isSaving: false,
            formModel: {},
            productMap: new Map(),
            selectedProduct: null,
            productOptions: [],
            customerMap: new Map(),
            customerOptions: [],
            selectedCustomer: {},
            deliveryLotOptions: [],
            selectedDeliveryLodgement: {},
            deliveryLotMap: new Map(),
            locationOptions: [],
            locationMap: new Map(),
            productField: null,
            customerField: null,
            locationField: null,
            deliveryLotField: null
        }
    },
    created() {
        // load data from the parent component (submitMode: create brings lodgement data, update brings previous delivery data)
        // loadedEntityId & formModel <= empty (createNew), lodgement (createFromLot), delivery (update)
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;
                
        // get options for fields with select
        this.productField = this.formSchema.groups[0].fields.find(fields => fields.model==='product');
        this.productField.values = this.getProductOptions();
        
        this.customerField = this.formSchema.groups[0].fields.find(fields => fields.model==='customer');
        this.customerField.values = this.getCustomerOptions();
        
        this.locationField = this.formSchema.groups[0].fields.find(fields => fields.model==='locationCodes');
        this.locationField.values = this.getLocationOptions();
        
        this.deliveryLotField = this.formSchema.groups[0].fields.find(fields => fields.model==='deliveryLot');
        if(this.submitMode == 'createNew') {                        // new delivery based on Lodgement selection (any lodgement)
            this.customerField.disabled = false;
            this.deliveryLotField.disabled = false;
        } else if(this.submitMode == 'createFromLot') {             // new delivery exisitng Lodgement
            this.formModel.locationCodes = this.formData.locationCodes.split(', ');
            this.deliveryLotField.values = this.getDeliveryLotOptionsByLodgementId(this.formModel._id);
            this.formModel.deliveryLot = {
                lodgementId: this.formModel._id,
                lodgementName: this.formModel.lotNumber + " ( " + this.formModel.numBagsLodged + " Bags)"
            };
            this.deliveryLotMap.get(this.formModel._id);
            this.selectedProduct = this.formModel.product;
            this.selectedCustomer = this.formModel.customer;
        } else if(this.submitMode == 'update') {                    // update an existing delivery
            this.formSchema.groups[0].fields.find(fields => fields.model==='numBagsDelivered').disabled = true;
            this.formSchema.groups[0].fields.find(fields => fields.model==='numBagsKataCoolie').disabled = true;
            this.formModel.locationCodes = this.formData.locationCodes.split(', ');
            this.deliveryLotField.values = this.getDeliveryLotOptionsByLodgementId(this.formModel.lodgementId);
            this.formModel.deliveryLot = {
                lodgementId: this.formModel.lodgementd,
                lodgementName: this.formModel.lotNumber + " ( " + this.formModel.numBagsLodged + " Bags)"
            };

            this.selectedProduct = this.formModel.product;
            this.selectedCustomer = this.formModel.customer;
        }

        if(this.submitMode == 'createFromLot' || this.submitMode == 'createNew') {
            console.log('submitMode : ', this.submitMode);
            this.formModel.numBagsDelivered = 0;
            this.formModel.numBagsKataCoolie = 0;
            this.formModel.chargesPaid = {
                hamaliCharges: 0,
                kataCoolieCharges: 0,
                platformCoolieCharges: 0,
                mamulluCharges: 0,
                transportCharges: 0,
                totalChargesPaid: 0
            };
            this.formModel.transport = {
                vehicleNumber: '',
                driverName: ''
            };
            this.formModel.deliveryNotes = '';
        }

        this.originalNumBagsDelivered = this.formModel.numBagsDelivered;
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
        getDeliveryLotOptionsByLodgementId(lodgementId) {
            this.deliveryLotOptions = [];
            getLodgementById(lodgementId).then(response => {
                this.selectedDeliveryLodgement = response;
                let deliveryLots = [];
                deliveryLots.push(response);
                deliveryLots.forEach(this.addToDeliveryLotOptions);
            });
            return this.deliveryLotOptions;
        },
        getDeliveryLotOptions(customerId) {
            this.deliveryLotOptions = [];
            getLodgementsByCustomerId(customerId).then(response => {
                let deliveryLots = response;
                deliveryLots.forEach(this.addToDeliveryLotOptions);
            });
            return this.deliveryLotOptions;
        },
        addToDeliveryLotOptions(lodgement) {
            this.deliveryLotOptions.push({
                "lodgementId": lodgement._id,
                "lodgementName": lodgement.lotNumber + " ( " + lodgement.numBagsLodged + " Bags)"
            });
            this.deliveryLotMap.set(lodgement._id, lodgement);
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
            // submit form data to the backend - entity - Delivery
            let currentDate = DateTime.now().toLocal();
            let lodgementDate = DateTime.fromISO(this.selectedDeliveryLodgement.lodgementDate).toLocal();
            let dateDiff = currentDate.endOf('month').diff(lodgementDate.startOf('month'), ['years', 'months', 'days']).toObject();
            let rentRateOnDeliveredBags = this.formModel.numBagsDelivered * (this.selectedDeliveryLodgement.rentals.rentalMode == 'Monthly' ?
                                    this.selectedDeliveryLodgement.monthlyRentPerBag : this.selectedDeliveryLodgement.rentals.yearlyRentPerBag);
            let rentReceivableOnDeliveredBags = rentRateOnDeliveredBags * (this.selectedDeliveryLodgement.rentals.rentalMode == 'Monthly' ? (dateDiff.months + 1) : 1);
            let numBagsBalance = this.formModel.numBagsBalance;
            if(this.submitMode == 'createNew' || this.submitMode == 'createFromLot') {
                numBagsBalance = this.selectedDeliveryLodgement.numBagsBalance - this.formModel.numBagsDelivered;
            }

            let delivery = {
                lodgementId: this.selectedDeliveryLodgement._id,
                lotNumber: this.selectedDeliveryLodgement.lotNumber,
                customer: {
                    customerId: this.selectedCustomer.customerId,
                    customerDisplayName: this.selectedCustomer.customerDisplayName,
                },
                product: {
                    productId: this.selectedProduct.productId,
                    productName: this.selectedProduct.productName,
                },
                numBagsDelivered: this.formModel.numBagsDelivered,
                numBagsKataCoolie: this.formModel.numBagsKataCoolie,
                numBagsLodged: this.selectedDeliveryLodgement.numBagsLodged,
                numBagsBalance: numBagsBalance,
                locationCodes: this.formModel.locationCodes.join(', '),
                lodgementDate: lodgementDate,
                deliveryNotes: this.formModel.deliveryNotes,
                numMonthsLodged: dateDiff.months + 1,
                transport: {
                    vehicleNumber: this.formModel.transport.vehicleNumber,
                    driverName: this.formModel.transport.driverName
                },
                chargesPerBag: {
                    hamaliPerBag: this.selectedDeliveryLodgement.chargesPerBag.hamaliPerBag,
                    kataCooliePerBag: this.selectedDeliveryLodgement.chargesPerBag.kataCooliePerBag,
                    platformCooliePerBag: this.selectedDeliveryLodgement.chargesPerBag.platformCooliePerBag,
                    mamulluPerBag: this.selectedDeliveryLodgement.chargesPerBag.mamulluPerBag,
                    insurancePerBag: this.selectedDeliveryLodgement.chargesPerBag.insurancePerBag
                },
                rentals: {
                    rentalYear: this.selectedDeliveryLodgement.rentals.rentalYear,
                    rentalMode: this.selectedDeliveryLodgement.rentals.rentalMode, 
                    monthlyRentPerBag: this.selectedDeliveryLodgement.rentals.monthlyRentPerBag,
                    yearlyRentPerBag: this.selectedDeliveryLodgement.rentals.yearlyRentPerBag,
                    rentReceivableOnDeliveredBags: rentReceivableOnDeliveredBags
                },
                lastModifiedDate: currentDate
            };
            
            console.log('submitted delivery : ', delivery);
            if(this.submitMode=="update") {
                delivery.chargesPaid = {
                    hamaliCharges: this.formModel.chargesPaid.hamaliCharges,
                    kataCoolieCharges: this.formModel.chargesPaid.kataCoolieCharges,
                    platformCoolieCharges: this.formModel.chargesPaid.platformCoolieCharges,
                    mamulluCharges: this.formModel.chargesPaid.mamulluCharges,
                    transportCharges: this.formModel.chargesPaid.transportCharges,
                    totalChargesPaid: this.formModel.chargesPaid.totalChargesPaid
                };
                delivery.chargesReceivable = {
                    nonHamaliChargesPaid: this.formModel.chargesReceivable.nonHamaliChargesPaid
                };
                delivery._id = this.loadedEntityId;
                updateDelivery(this.loadedEntityId, delivery).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "createFromLot" || this.submitMode == 'createNew') {
                delivery.chargesPaid = {
                    hamaliCharges: 0,
                    kataCoolieCharges: 0,
                    platformCoolieCharges: 0,
                    mamulluCharges: 0,
                    transportCharges: 0,
                    totalChargesPaid: 0
                };
                delivery.chargesReceivable = {
                    nonHamaliChargesPaid: 0
                };
                delivery.deliveryDate = currentDate;
                delivery.creationDate = currentDate;
                createDelivery(delivery).then(response => {
                    var savedObject = response;
                    this.$emit('saved', savedObject);
                });
            }
        },
        cancelForm() {
            this.submitMode == 'createNew' ? this.$router.push(this.entityListingUrl) : this.$emit('cancelForm') ;
        }
    },
    watch: {
        'formModel.customer'(newValue) {
            if(this.submitMode == 'createNew' && newValue != undefined && newValue != null) {
                this.deliveryLotField = this.formSchema.groups[0].fields.find(fields => fields.model==='deliveryLot');
                this.deliveryLotField.values = this.getDeliveryLotOptions(newValue.customerId);
                this.selectedCustomer = this.customerMap.get(newValue.customerId);
            }
        },
        'formModel.deliveryLot'(newValue) {
            if(this.submitMode == 'createNew' && newValue != undefined && newValue != null) {
                this.selectedDeliveryLodgement = this.deliveryLotMap.get(newValue.lodgementId);
                this.selectedProduct = this.productMap.get(this.selectedDeliveryLodgement.product.productId);
                // this.formModel = JSON.parse(JSON.stringify(this.selectedDeliveryLodgement));
                this.formModel.product = {
                    'productId': this.selectedProduct._id,
                    'productName': this.selectedProduct.productName
                };
                this.formModel.locationCodes = this.selectedDeliveryLodgement.locationCodes.split(', ');
            }
        }
    }
}
</script>
