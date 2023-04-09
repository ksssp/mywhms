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
                                Lot Certificate
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
                                <LodgementForm v-if="editMode" :form-data="loadedEntity" :submit-mode="submitMode" 
                                    @saved="saved" @cancelForm="editCancelled"></LodgementForm>
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
                                            <b-table-lite responsive borderless :fields="entityDeliveryDetailsTable.fields"
                                                :items="entityDeliveryDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                            </b-table-lite>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Charges & Rentals">
                            <div class="row mx-4">
                                <div class="col-sm-6">
                                    <b-table-lite responsive borderless :fields="entityChargesDetailsTable.fields"
                                        :items="entityChargesDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                    </b-table-lite>
                                </div>
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

import { getLodgementById, deleteLodgement } from "@/services/LodgementService";
import LodgementForm from "../forms/LodgementCreateForm.vue";

export default {
    name: "LodgementDetails",
    components: {
        LodgementForm
    },
    data: function () {
        return {
            entityName: "Lodgement",
            entityNamePlural: "Lodgements",
            pageTitle: "Lodgement Details",
            entityListingUrl: "/inventory/lodgements/",
            entityTitle: "",
            loadedEntity: null,
            loadedEntityId: null,
            entityDoesNotExistMessage: "The Lodgement you are looking for does not exist.",
            editMode: false,
            submitMode: "update",
            entityDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "Lodgement Details", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Lot Number", infoValue: "" },
                    { infoLabel: "Trademark (Customer Name)", infoValue: "" },
                    { infoLabel: "Product Name", infoValue: "" },
                    { infoLabel: "Number of bags Lodged", infoValue: ""},
                    { infoLabel: "Lodgement Date", infoValue: ""},
                    { infoLabel: "Locations", infoValue: ""},
                    { infoLabel: "Lodgement Notes", infoValue: ""}
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
            entityDeliveryDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "Deliveries till date", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Number of Deliveries till date", infoValue: "" },
                    { infoLabel: "Most recent Delivery Date", infoValue: "" },
                    { infoLabel: "Number of Bags Delivered", infoValue: "" },
                    { infoLabel: "Number of Bags left in Store", infoValue: "" },
                ]
            },
            entityChargesDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "Charges Details", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Hamali Charges Receivable", infoValue: "" },
                    { infoLabel: "Kata Coolie Charges", infoValue: "" },
                    { infoLabel: "Platform Coolie Charges", infoValue: "" },
                    { infoLabel: "Mamullu Charges", infoValue: "" },
                    { infoLabel: "Insurance Charges", infoValue: "" },
                    { infoLabel: "Total Charges Receivable", infoValue: "" },
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
            // load entity data from backend: entity - Lodgement
            getLodgementById(entityId).then(response => {
                this.loadedEntity = JSON.parse(JSON.stringify(response));
                console.log(this.loadedEntity);
                if(this.loadedEntity != null) {
                    this.entityTitle = "Lot Number: " + this.loadedEntity.lotNumber;
                    this.entityDetailsTable.items[0].infoValue = `${this.loadedEntity.lotNumber}  
                        <a href="/inventory/lots/${this.loadedEntity.lotId}" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend md" /></a>`;
                    this.entityDetailsTable.items[1].infoValue = `${this.loadedEntity.trademark.trademark} ( ${this.loadedEntity.trademark.customerName} )
                        <a href="/trademarks/" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend"/></a>`;
                    this.entityDetailsTable.items[2].infoValue = `${this.loadedEntity.productName}
                        <a href="/products/" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend" /></a>`;
                    this.entityDetailsTable.items[3].infoValue = this.loadedEntity.numBagsLodged + " Bags";
                    this.entityDetailsTable.items[4].infoValue = (new Date(this.loadedEntity.lodgementDate)).toLocaleDateString();
                    this.entityDetailsTable.items[5].infoValue = this.loadedEntity.locationCodes;
                    this.entityDetailsTable.items[6].infoValue = "Lodgement Notes placeholder";

                    this.entityTransportDetailsTable.items[0].infoValue = "Vehicle Number e.g. AP 37 AT 1234";
                    this.entityTransportDetailsTable.items[1].infoValue = "driver name e.g. Sreenu";
                    this.entityTransportDetailsTable.items[2].infoValue = "Rs. 10,000/-";
                    
                    this.entityChargesDetailsTable.items[0].infoValue = "Rs. 0/-";
                    this.entityChargesDetailsTable.items[1].infoValue = "Rs. 0/-";
                    this.entityChargesDetailsTable.items[2].infoValue = "Rs. 0/-";
                    this.entityChargesDetailsTable.items[3].infoValue = "Rs. 0/-";
                    this.entityChargesDetailsTable.items[4].infoValue = "Rs. 0/-";
                    this.entityChargesDetailsTable.items[5].infoValue = "Rs. 0/-";
                    
                    this.entityRentalsDetailsTable.items[0].infoValue = this.loadedEntity.rents.rentalMode;
                    this.entityRentalsDetailsTable.items[1].infoValue = this.loadedEntity.rents.rentalYear;
                    this.entityRentalsDetailsTable.items[2].infoValue = "Rs. " + this.loadedEntity.rents.totalRentReceivable.$numberDecimal + "/-";

                    this.entityDeliveryDetailsTable.items[0].infoValue = this.loadedEntity.numDeliveries;
                    this.entityDeliveryDetailsTable.items[1].infoValue = (new Date(this.loadedEntity.lastTransactionDate)).toLocaleDateString();
                    this.entityDeliveryDetailsTable.items[2].infoValue = (this.loadedEntity.numBagsLodged - this.loadedEntity.numBagsBalance) + " Bags";
                    this.entityDeliveryDetailsTable.items[3].infoValue = this.loadedEntity.numBagsBalance + " Bags";
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