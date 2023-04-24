<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                {{ pageTitle }}
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Reference Data</a></li>
                    <li class="breadcrumb-item"><a :href="entityListingUrl">{{ entityNamePlural }}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{{ pageTitle }}</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body d-sm-flex justify-content-between" v-if="loadedEntity==null">
                    <h4 class="card-title">{{ entityDoesNotExistMessage }}</h4>
                    <a :href="entityListingUrl">
                        <b-button class="btn btn-gradient-primary btn-icon-text">
                            <i class="mdi mdi-arrow-left-bold-circle btn-icon-prepend"></i>
                            Go back
                        </b-button>
                    </a>
                </div>
                <div class="card-body" v-else>
                    <div class="d-sm-flex pb-2 mb-2 justify-content-between">
                        <h4 class="card-title" v-if="loadedEntity!=null">{{ entityTitle }}</h4>
                        <div>
                            <b-button class="btn btn-gradient-danger btn-icon-text" @click="deleteLoadedEntity">
                                <i class="mdi mdi-delete btn-icon-prepend"></i>
                                Delete
                            </b-button>
                            <b-button class="btn btn-gradient-primary btn-icon-text">
                                <i class="mdi mdi-printer btn-icon-prepend"></i>
                                Delivery Challan
                            </b-button>
                        </div>
                    </div>
                    <br />
                    <b-tabs class="tickets-tab-switch">
                        <b-tab title="Details" active>
                            <div v-if="!editDetailsMode" class="d-sm-flex mx-4 py-2 justify-content-between">
                                <h4>Basic Details</h4>
                                <b-button v-on:click="editLoadedEntity" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-pencil btn-icon-prepend"></i>
                                    Edit
                                </b-button>
                            </div>
                            <div class="mx-4">
                                <DeliveryDetailsForm v-if="editDetailsMode" :form-data="loadedEntity" :submit-mode="submitMode" 
                                    @saved="saved" @cancelForm="editCancelled"></DeliveryDetailsForm>
                                <div v-else>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <b-table-lite responsive borderless :fields="entityDetailsTable.fields"
                                                :items="entityDetailsTable.items"> 
                                                <template v-slot:cell(infoValue)="data">
                                                    <span v-html="data.value"></span>
                                                </template>
                                            </b-table-lite>
                                        </div>
                                        <div class="col-sm-6">
                                            <b-table-lite responsive borderless :fields="entityLodgementDetailsTable.fields"
                                                :items="entityLodgementDetailsTable.items"> 
                                            </b-table-lite>
                                            <b-table-lite responsive borderless :fields="entityTransportDetailsTable.fields"
                                                :items="entityTransportDetailsTable.items"> 
                                            </b-table-lite>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Charges Paid & Receivable">
                            <div v-if="!editChargesMode" class="mx-2 d-md-flex justify-content-end">
                                <b-button v-on:click="editLoadedEntityCharges" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-pencil btn-icon-prepend"></i>
                                    Edit Charges Paid
                                </b-button>
                            </div>
                            <div>
                                <ChargesForm v-if="editChargesMode" :form-data="loadedEntity" :entity-name="entityName" 
                                    @saved="saved" @cancelForm="editCancelled"></ChargesForm>
                                <div v-else class="mx-2 px-4">
                                    <b-table-lite responsive borderless :fields="entityChargesTable.fields"
                                        :items="entityChargesTable.items"> 
                                    </b-table-lite>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Rentals">
                            <div class="row mx-2">
                                <div class="col-6">
                                    <b-table-lite responsive borderless :fields="entityRentalsDetailsLeftTable.fields"
                                        :items="entityRentalsDetailsLeftTable.items">
                                    </b-table-lite>
                                </div>
                                <div class="col-6">
                                    <b-table-lite responsive borderless :fields="entityRentalsDetailsRightTable.fields"
                                        :items="entityRentalsDetailsRightTable.items">
                                    </b-table-lite>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { getDeliveryById, deleteLDelivery } from "@/services/delivery.service";
import DeliveryDetailsForm from '../forms/DeliveryDetailsForm.vue'
import ChargesForm from '../forms/ChargesForm.vue';
import { DateTime } from 'luxon';

export default {
    name: "DeliveryDetails",
    components: {
        DeliveryDetailsForm,
        ChargesForm
    },
    data: function () {
        return {
            entityName: "Delivery",
            entityNamePlural: "Deliveries",
            pageTitle: "Delivery Details",
            entityListingUrl: "/inventory/deliveries/",
            entityTitle: "",
            loadedEntity: null,
            loadedEntityId: null,
            entityDoesNotExistMessage: "The Delivery you are looking for does not exist.",
            editDetailsMode: false,
            editChargesMode: false,
            submitMode: "update",
            entityDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "Delivery Details", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Lot Number", infoValue: "" },
                    { infoLabel: "Customer Name", infoValue: "" },
                    { infoLabel: "Product Name", infoValue: "" },
                    { infoLabel: "Number of bags Delivered", infoValue: ""},
                    { infoLabel: "Delivery Date", infoValue: ""},
                    { infoLabel: "Number of Months in store", infoValue: ""},
                    { infoLabel: "Locations", infoValue: ""},
                    { infoLabel: "Delivery Notes", infoValue: "" }
                ]
            },
            entityTransportDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "Transport Details", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Vehicle Number", infoValue: "" },
                    { infoLabel: "Driver Name", infoValue: "" },
                ]
            },
            entityLodgementDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "Lodgement Details", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Lodgement Date", infoValue: ""},
                    { infoLabel: "Number of Bags Lodged", infoValue: "" },
                    { infoLabel: "Number of Bags left in Store", infoValue: "" }
                ]
            },
            entityChargesTable: {
                fields: [
                    { key: "chargeType", label: "Charges Details", sortable: false, thStyle: "width: 20%;" },
                    { key: "chargesPerBag", label: "Per Bag", sortable: false, class: 'text-center', thStyle: "word-wrap: break-word;" },
                    { key: "chargesTotal", label: "Charges on Lodged Bags", sortable: false, class: 'text-center', thStyle: "word-wrap: break-word;" },
                    { key: "chargesPaid", label: "Charges Paid", sortable: false, class: 'text-center', thStyle: "word-wrap: break-word;" },
                    { key: "chargesReceivable", label: "Charges Receivable", sortable: false, class: 'text-center', thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { chargeType: "Hamali Charges", chargesPerBag: "", chargesTotal: "", chargesPaid: "", chargesReceivable: "" },
                    { chargeType: "Kata Coolie Charges", chargesPerBag: "", chargesTotal: "", chargesPaid: "", chargesReceivable: "" },
                    { chargeType: "Platform Coolie Charges", chargesPerBag: "", chargesTotal: "", chargesPaid: "", chargesReceivable: "" },
                    { chargeType: "Mamullu Charges", chargesPerBag: "", chargesTotal: "", chargesPaid: "", chargesReceivable: "" },
                    { chargeType: "Transport Charges", chargesPerBag: "", chargesTotal: "", chargesPaid: "", chargesReceivable: "" },
                    { chargeType: "Total Charges Paid", chargesPerBag: "", chargesTotal: "", chargesPaid: "", chargesReceivable: "" }
                ]
            },
            entityRentalsDetailsLeftTable: {
                fields: [
                    { key: "infoLabel", label: "Rentals Details", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Rental Year", infoValue: "" },
                    { infoLabel: "Rental Mode", infoValue: "" },
                    { infoLabel: "Number of Months in Store", infoValue: "" },
                    { infoLabel: "Rent Receivable on Delivery", infoValue: "" }
                ]
            },
            entityRentalsDetailsRightTable: {
                fields: [
                    { key: "infoLabel", label: "Rents chargeable based on rates", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Monthly Rent per Bag", infoValue: "" },
                    { infoLabel: "Monthly Rent Receivable", infoValue: "" },
                    { infoLabel: "Yearly Rent per Bag", infoValue: "" },
                    { infoLabel: "Yearly Rent Receivable", infoValue: "" }
                ]
            }
        };
    },
    created() {
        this.loadedEntityId = this.$route.params._id;
        this.loadEntityData(this.loadedEntityId);
    },
    methods: {
        loadEntityData(entityId) {
            // load entity data from backend: entity - Delivery
            getDeliveryById(entityId).then(response => {
                this.loadedEntity = JSON.parse(JSON.stringify(response));
                console.log(this.loadedEntity);
                if(this.loadedEntity != null) {
                    this.entityTitle = this.loadedEntity.lotNumber + " ( " + this.loadedEntity.numBagsDelivered + " Bags )";
                    this.entityDetailsTable.items[0].infoValue = `${this.loadedEntity.lotNumber}  
                        <a href="/inventory/lodgements/${this.loadedEntity.lodgementId}" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend md" /></a>`;
                    this.entityDetailsTable.items[1].infoValue = `${this.loadedEntity.customer.customerDisplayName}
                        <a href="/customers/" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend"/></a>`;
                    this.entityDetailsTable.items[2].infoValue = `${this.loadedEntity.product.productName}
                        <a href="/products/" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend" /></a>`;
                    this.entityDetailsTable.items[3].infoValue = this.loadedEntity.numBagsDelivered + " Bags";
                    this.entityDetailsTable.items[4].infoValue = DateTime.fromISO(this.loadedEntity.deliveryDate).toLocal().toFormat('dd-MM-yyyy');
                    this.entityDetailsTable.items[5].infoValue = this.loadedEntity.numMonthsLodged + " months";
                    this.entityDetailsTable.items[6].infoValue = this.loadedEntity.locationCodes;
                    this.entityDetailsTable.items[7].infoValue = this.loadedEntity.deliveryNotes;

                    this.entityLodgementDetailsTable.items[0].infoValue = DateTime.fromISO(this.loadedEntity.lodgementDate).toLocal().toFormat('dd-MM-yyyy');
                    this.entityLodgementDetailsTable.items[1].infoValue = this.loadedEntity.numBagsLodged + " Bags";
                    this.entityLodgementDetailsTable.items[2].infoValue = this.loadedEntity.numBagsBalance + " Bags";
                    
                    this.entityTransportDetailsTable.items[0].infoValue = this.loadedEntity.transport.vehicleNumber;
                    this.entityTransportDetailsTable.items[1].infoValue = this.loadedEntity.transport.driverName;

                    this.entityChargesTable.items = [
                        {
                            chargeType: 'Hamali Charges',
                            chargesPerBag: 'Rs. ' + this.loadedEntity.chargesPerBag.hamaliPerBag + '/-',
                            chargesTotal: 'Rs. ' + Math.round(this.loadedEntity.chargesPerBag.hamaliPerBag * this.loadedEntity.numBagsLodged) + ' /-',
                            chargesPaid: 'Rs. ' + this.loadedEntity.chargesPaid.hamaliCharges + '/-',
                            chargesReceivable: 'Rs. 0/-',
                        },
                        {
                            chargeType: 'Kata Coolie Charges',
                            chargesPerBag: 'Rs. ' + this.loadedEntity.chargesPerBag.kataCooliePerBag + '/-',
                            chargesTotal: 'Rs. ' + Math.round(this.loadedEntity.chargesPerBag.kataCooliePerBag * this.loadedEntity.numBagsKataCoolie) + ' /-',
                            chargesPaid: 'Rs. ' + this.loadedEntity.chargesPaid.kataCoolieCharges + '/-',
                            chargesReceivable: 'Rs. ' + this.loadedEntity.chargesPaid.kataCoolieCharges + '/-',
                        },
                        {
                            chargeType: 'Platform Coolie Charges',
                            chargesPerBag: 'Rs. ' + this.loadedEntity.chargesPerBag.platformCooliePerBag + '/-',
                            chargesTotal: 'Rs. ' + Math.round(this.loadedEntity.chargesPerBag.platformCooliePerBag * this.loadedEntity.numBagsLodged) + ' /-',
                            chargesPaid: 'Rs. ' + this.loadedEntity.chargesPaid.platformCoolieCharges + '/-',
                            chargesReceivable: 'Rs. ' + this.loadedEntity.chargesPaid.platformCoolieCharges + '/-'
                        },
                        {
                            chargeType: 'Mamullu Charges',
                            chargesPerBag: 'Rs. ' + this.loadedEntity.chargesPerBag.mamulluPerBag + '/-',
                            chargesTotal: 'Rs. ' + Math.round(this.loadedEntity.chargesPerBag.mamulluPerBag * this.loadedEntity.numBagsLodged) + ' /-',
                            chargesPaid: 'Rs. ' + this.loadedEntity.chargesPaid.mamulluCharges + '/-',
                            chargesReceivable: 'Rs. ' + this.loadedEntity.chargesPaid.mamulluCharges + '/-'
                        },
                        {
                            chargeType: 'Transport Charges',
                            chargesPerBag: '',
                            chargesTotal: '',
                            chargesPaid: 'Rs. ' + this.loadedEntity.chargesPaid.transportCharges + '/-',
                            chargesReceivable: 'Rs. ' + this.loadedEntity.chargesPaid.transportCharges + '/-'
                        },
                        {
                            chargeType: 'Total Charges',
                            chargesPerBag: '',
                            chargesTotal: '',
                            chargesPaid: 'Rs. ' + this.loadedEntity.chargesPaid.totalChargesPaid + '/-',
                            chargesReceivable: 'Rs. ' + this.loadedEntity.chargesReceivable.nonHamaliChargesPaid + '/-'
                        }
                    ];

                    this.entityRentalsDetailsLeftTable.items[0].infoValue = this.loadedEntity.rentals.rentalYear;
                    this.entityRentalsDetailsLeftTable.items[1].infoValue = this.loadedEntity.rentals.rentalMode;
                    this.entityRentalsDetailsLeftTable.items[2].infoValue = this.loadedEntity.numMonthsLodged + ' Months';
                    this.entityRentalsDetailsLeftTable.items[3].infoValue = "Rs. " + this.loadedEntity.rentals.rentReceivableOnDeliveredBags + '/-';
                    this.entityRentalsDetailsRightTable.items[0].infoValue = "Rs. " + this.loadedEntity.rentals.monthlyRentPerBag + '/-';
                    this.entityRentalsDetailsRightTable.items[1].infoValue = "Rs. " + this.loadedEntity.rentals.monthlyRentPerBag * this.loadedEntity.numBagsDelivered * this.loadedEntity.numMonthsLodged + '/-';
                    this.entityRentalsDetailsRightTable.items[2].infoValue = "Rs. " + this.loadedEntity.rentals.yearlyRentPerBag + '/-';
                    this.entityRentalsDetailsRightTable.items[3].infoValue = "Rs. " + this.loadedEntity.rentals.yearlyRentPerBag * this.loadedEntity.numBagsDelivered + '/-';
                }
            });
        },
        editLoadedEntity() {
            this.editDetailsMode=true;
        },
        editLoadedEntityCharges() {
            this.editChargesMode = true;
        },
        editCancelled() {
            this.editDetailsMode=false;
            this.editChargesMode = false;
        },
        saved(saveActionStatus) {
            if(saveActionStatus) {
                this.loadEntityData(this.loadedEntityId);
                this.editDetailsMode=false;
                this.editChargesMode=false;
            }
        },
        deleteLoadedEntity(){
            this.$bvModal.msgBoxConfirm('Are you sure you want to delete the ' + this.entityName + '?', {
                title: 'Please Confirm',
                size: 'md',
                buttonSize: 'md',
                okVariant: 'danger',
                okTitle: 'Confirm',
                cancelTitle: 'Cancel',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true,
                footerBgVariant: 'light',
                headerBgVariant: 'light'
            }).then(value => {
                if(value==true) {
                    // delete entity data at the backend: entity - Lodgement
                    // deleteLodgement(this.loadedEntityId).then(response => {
                    //     if(response.status==true) {
                    //         this.$router.replace(this.entityListingUrl);
                    //     } else {
                    //         console.log(this.entityName, " deletion failed");
                    //     }
                    // });
                }
            });
        }
    }
}
</script>