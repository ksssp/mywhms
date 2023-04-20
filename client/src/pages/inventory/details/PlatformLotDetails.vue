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
                            <div v-if="!editMode" class="mx-2 d-md-flex justify-content-end">
                                <b-button v-on:click="editLoadedEntity" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-pencil btn-icon-prepend"></i>
                                    Edit
                                </b-button>
                            </div>
                            <div class="mx-2">
                                <LodgementForm v-if="editMode" :form-data="loadedEntity" :submit-mode="submitMode" 
                                    @saved="saved" @cancelForm="editCancelled"></LodgementForm>
                                <div v-else>
                                    <div class="row mx-2">
                                        <div class="col-sm-6">
                                            <b-table-lite responsive borderless :fields="entityDetailsTable.fields"
                                                :items="entityDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                                <template v-slot:cell(infoValue)="data">
                                                    <span v-html="data.value"></span>
                                                </template>
                                            </b-table-lite>
                                        </div>
                                        <div class="col-sm-6">
                                            <b-table-lite responsive borderless :fields="entityTransportDetailsTable.fields"
                                                :items="entityTransportDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                            </b-table-lite>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Charges & Rentals">
                            <div v-if="!editMode" class="mx-2 d-md-flex justify-content-end">
                                <b-button v-on:click="editLoadedEntity" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-cash-multiple btn-icon-prepend"></i>
                                    Edit Charges Paid
                                </b-button>
                            </div>
                            <div class="row mx-2">
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
                        <b-tab title="Deliveries">
                            <div v-if="!editMode" class="mx-2 d-md-flex justify-content-end">
                                <b-button v-on:click="editLoadedEntity" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-truck-delivery btn-icon-prepend"></i>
                                    Add a Delivery
                                </b-button>
                            </div>
                            <div class="row mx-2">
                                <div class="col-sm-6">
                                    <b-table-lite responsive borderless :fields="entityDeliverySummaryTable.fields"
                                        :items="entityDeliverySummaryTable.items"> <!-- thead-class="hidden_header" -->
                                    </b-table-lite>
                                </div>
                                <div class="col-sm-6">
                                    <b-table-lite responsive borderless :fields="entityDeliveryDetailsTable.fields"
                                        :items="entityDeliveryDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                    </b-table-lite>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Stock Statement">
                            <div class="row mx-2">
                                This is teh stock statement placeholder
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { getLotById, deleteLot } from "@/services/lodgement.service";

export default {
    name: "PlatformLotDetails",
    data: function () {
        return {
            entityName: "Platform Lot",
            entityNamePlural: "Platform Lots",
            pageTitle: "Platform Lot Details",
            entityListingUrl: "/inventory/platformLots/",
            entityTitle: "",
            loadedEntity: {},
            loadedEntityId: null,
            entityDoesNotExistMessage: "The Platform Lot you are looking for does not exist.",
            editMode: false,
            submitMode: "update",
            entityDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "Lot Details", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lot
                    { infoLabel: "Lot Number", infoValue: "" },
                    { infoLabel: "Trademark (Customer)", infoValue: "" },
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
                items: [       // update entity specific json data in an array format - Lot
                    { infoLabel: "Vehicle Number", infoValue: "" },
                    { infoLabel: "Driver Name", infoValue: "" },
                    { infoLabel: "Transport Charges paid by Store", infoValue: "" },
                ]
            },
            entityDeliverySummaryTable: {
                fields: [
                    { key: "infoLabel", label: "Deliveries till date", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lot
                    { infoLabel: "Number of Deliveries till date", infoValue: "" },
                    { infoLabel: "Most recent Delivery Date", infoValue: "" },
                ]
            },
            entityDeliveryDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "Bags status", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lot
                
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
            // load entity data from backend: entity - Lot
            getLotById(entityId).then(response => {
                this.loadedEntity = JSON.parse(JSON.stringify(response));
                console.log(this.loadedEntity);
                if(this.loadedEntity != null) {
                    this.entityTitle = "Lot Number: " + this.loadedEntity.lotNumber;
                    this.entityDetailsTable.items[0].infoValue = this.loadedEntity.lotNumber;
                    this.entityDetailsTable.items[1].infoValue = `${this.loadedEntity.trademark.trademark} ( ${this.loadedEntity.trademark.customerName} )
                        <a href="/trademarks/" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend"/></a>`;
                    this.entityDetailsTable.items[2].infoValue = `${this.loadedEntity.product.productName}
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

                    this.entityDeliverySummaryTable.items[0].infoValue = this.loadedEntity.deliveries.length;
                    this.entityDeliverySummaryTable.items[1].infoValue = (new Date(this.loadedEntity.lastTransactionDate)).toLocaleDateString();
                    this.entityDeliveryDetailsTable.items[0].infoValue = (this.loadedEntity.numBagsLodged - this.loadedEntity.numBagsBalance) + " Bags";
                    this.entityDeliveryDetailsTable.items[1].infoValue = this.loadedEntity.numBagsBalance + " Bags";
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
            this.$bvModal.msgBoxConfirm('Are you sure you want to delete this ' + this.entityName + '?', {
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
                    // delete entity data at the backend: entity - Lot
                    // deleteLot(this.loadedEntityId).then(response => {
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