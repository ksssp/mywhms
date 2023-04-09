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
                            <div v-if="!editMode" class="d-sm-flex mx-4 py-2 justify-content-between">
                                <h4>Basic Details</h4>
                                <b-button v-on:click="editLoadedEntity" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-pencil btn-icon-prepend"></i>
                                    Edit
                                </b-button>
                            </div>
                            <div class="mx-4">
                                <DeliveryForm v-if="editMode" :form-data="loadedEntity" :submit-mode="submitMode" 
                                    @saved="saved" @cancelForm="editCancelled"></DeliveryForm>
                                <div v-else>
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <b-table-lite responsive borderless :fields="entityDetailsTable.fields"
                                                :items="entityDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                                <template v-slot:cell(infoValue)="data">
                                                    <span v-html="data.value"></span>
                                                </template>
                                            </b-table-lite>
                                            <b-table-lite responsive borderless :fields="entityTransportDetailsTable.fields"
                                                :items="entityTransportDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                            </b-table-lite>
                                        </div>
                                        <div class="col-sm-6">
                                            <b-table-lite responsive borderless :fields="entityLodgementDetailsTable.fields"
                                                :items="entityLodgementDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                            </b-table-lite>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Charges & Rentals">
                            <div class="row mx-4">
                                <div class="col-sm-6">
                                    <b-table-lite responsive borderless :fields="entityRentalsDetailsTable.fields"
                                        :items="entityRentalsDetailsTable.items"> <!-- thead-class="hidden_header" -->
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

import { getDeliveryById, deleteLDelivery } from "@/services/DeliveryService";
import DeliveryForm from "../forms/DeliveryForm.vue";

export default {
    name: "DeliveryDetails",
    components: {
        DeliveryForm
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
            editMode: false,
            submitMode: "update",
            entityDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "Delivery Details", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Lot Number", infoValue: "" },
                    { infoLabel: "Trademark (Customer Name)", infoValue: "" },
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
                    { infoLabel: "Transport Charges paid by Store", infoValue: "" },
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
            entityRentalsDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "Rentals Details", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Rental Mode", infoValue: "" },
                    { infoLabel: "Rental Year", infoValue: "" },
                    { infoLabel: "Rent Receivable till date", infoValue: "" }
                ]
            },
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
                        <a href="/inventory/lots/${this.loadedEntity.lotId}" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend md" /></a>`;
                    this.entityDetailsTable.items[1].infoValue = `${this.loadedEntity.trademark.trademark} ( ${this.loadedEntity.trademark.customerName} )
                        <a href="/trademarks/" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend"/></a>`;
                    this.entityDetailsTable.items[2].infoValue = `${this.loadedEntity.productName}
                        <a href="/products/" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend" /></a>`;
                    this.entityDetailsTable.items[3].infoValue = this.loadedEntity.numBagsDelivered + " Bags";
                    this.entityDetailsTable.items[4].infoValue = (new Date(this.loadedEntity.deliveryDate)).toLocaleDateString();
                    this.entityDetailsTable.items[5].infoValue = this.loadedEntity.numMonthsLodged + " months";
                    this.entityDetailsTable.items[6].infoValue = this.loadedEntity.locationCodes;
                    this.entityDetailsTable.items[7].infoValue = this.loadedEntity.deliveryNotes;

                    this.entityLodgementDetailsTable.items[0].infoValue = (new Date(this.loadedEntity.lodgementDate)).toLocaleDateString();
                    this.entityLodgementDetailsTable.items[1].infoValue = this.loadedEntity.numBagsLodged + " Bags";
                    this.entityLodgementDetailsTable.items[2].infoValue = this.loadedEntity.numBagsBalance + " Bags";
                    
                    this.entityTransportDetailsTable.items[0].infoValue = this.loadedEntity.vehicleNumber;
                    this.entityTransportDetailsTable.items[1].infoValue = this.loadedEntity.driverName;
                    this.entityTransportDetailsTable.items[2].infoValue = "Rs. " + this.loadedEntity.transportChargesPaid.$numberDecimal + "/-";
                              
                    this.entityRentalsDetailsTable.items[0].infoValue = this.loadedEntity.rents.rentalMode;
                    this.entityRentalsDetailsTable.items[1].infoValue = this.loadedEntity.rents.rentalYear;
                    this.entityRentalsDetailsTable.items[2].infoValue = this.loadedEntity.rents.totalRentReceivable.$numberDecimal;


                }
            });
        },
        editLoadedEntity() {
            this.editMode=true;
        },
        editCancelled() {
            this.editMode=false;
        },
        saved(saveActionStatus) {
            if(saveActionStatus) {
                this.loadEntityData(this.loadedEntityId);
                this.editMode=false;
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