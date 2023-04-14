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
                    <b-tabs class="tickets-tab-switch">
                        <b-tab title="Stock Statement" active>
                            <div class="mx-2 d-md-flex justify-content-end">
                                <b-button class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-printer btn-icon-prepend"></i>
                                    Stock Statement
                                </b-button>
                            </div>
                            <div class="row mx-2">
                                <div class="col-md-6">
                                    <b-table-lite responsive borderless :fields="stockStatmentLeftTable.fields"
                                        :items="stockStatmentLeftTable.items"> <!-- thead-class="hidden_header" -->
                                        <template v-slot:cell(infoLabel)="data">
                                            <span v-html="data.value"></span>
                                        </template>
                                        <template v-slot:cell(infoValue)="data">
                                            <span v-html="data.value"></span>
                                        </template>
                                    </b-table-lite>
                                </div>
                                <div class="col-md-6">
                                    <b-table-lite responsive borderless :fields="stockStatmentRightTable.fields"
                                        :items="stockStatmentRightTable.items"> <!-- thead-class="hidden_header" -->
                                        <template v-slot:cell(infoLabel)="data">
                                            <span v-html="data.value"></span>
                                        </template>
                                        <template v-slot:cell(infoValue)="data">
                                            <span v-html="data.value"></span>
                                        </template>
                                    </b-table-lite>
                                </div>
                            </div>
                            <br />
                            <div class="row mx-2 px-4">
                                <div col="col-md-12">
                                    <h6>Deliveries ( {{ this.loadedEntity.stockRelease.numDeliveries }})</h6>
                                    <b-table-lite responsive :fields="loadedLodgementDeliveries.fields"
                                        :items="loadedLodgementDeliveries.items"> <!-- thead-class="hidden_header" -->
                                        <!-- <template v-slot:cell(deliveryDate)="data">
                                            {{ (new Date(data.value)).toLocaleDateString() }}
                                        </template> -->
                                    </b-table-lite>
                                    <!-- <AppDataTable :download-file-name="loadedLodgementDeliveries.downloadFileName" 
                                        :fields="loadedLodgementDeliveries.fields" :fieldDefs="loadedLodgementDeliveries.fieldDefs" 
                                        :table-data="loadedLodgementDeliveries.items" :is-main-table="loadedLodgementDeliveries.isMainTable"></AppDataTable> -->
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Details">
                            <div v-if="!editMode" class="mx-2 d-md-flex justify-content-end">
                                <b-button v-on:click="editLoadedEntity" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-pencil btn-icon-prepend"></i>
                                    Edit
                                </b-button>
                            </div>
                            <div>
                                <LodgementForm v-if="editMode" :form-data="loadedEntity" :submit-mode="submitMode" 
                                    @saved="saved" @cancelForm="editCancelled"></LodgementForm>
                                <div v-else>
                                    <div class="row mx-2">
                                        <div class="col-md-6">
                                            <b-table-lite responsive borderless :fields="entityDetailsTable.fields"
                                                :items="entityDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                                <template v-slot:cell(infoValue)="data">
                                                    <span v-html="data.value"></span>
                                                </template>
                                            </b-table-lite>
                                        </div>
                                        <div class="col-md-6">
                                            <b-table-lite responsive borderless :fields="entityTransportDetailsTable.fields"
                                                :items="entityTransportDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                            </b-table-lite>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Charges Paid & Receivable">
                            <div class="row mx-2">
                                <div class="col-md-4">
                                    <b-table-lite responsive borderless :fields="entityIndicativeChargesTable.fields"
                                        :items="entityIndicativeChargesTable.items"> <!-- thead-class="hidden_header" -->
                                    </b-table-lite>
                                </div>
                                <div class="col-md-4">
                                    <b-table-lite responsive borderless :fields="entityChargesPaidTable.fields"
                                        :items="entityChargesPaidTable.items"> <!-- thead-class="hidden_header" -->
                                    </b-table-lite>
                                </div>
                                <div class="col-md-4">
                                    <b-table-lite responsive borderless :fields="entityChargesReceivableTable.fields"
                                        :items="entityChargesReceivableTable.items"> <!-- thead-class="hidden_header" -->
                                    </b-table-lite>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Deliveries">
                            <div class="row mx-2">
                                <div class="col-sm-6">
                                    <b-table-lite responsive borderless :fields="entityDeliveryDetailsTable.fields"
                                        :items="entityDeliveryDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                    </b-table-lite>
                                </div>
                                <div class="col-sm-6">
                                    <b-table-lite responsive borderless :fields="entityRentalsDetailsTable.fields"
                                        :items="entityRentalsDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                    </b-table-lite>
                                </div>
                            </div>
                            <br />
                            <div class="row mx-2 px-4">
                                <div col="col-md-12">
                                    <h6>Deliveries ( {{ this.loadedEntity.stockRelease.numDeliveries }})</h6>
                                    <b-table-lite responsive :fields="loadedLodgementDeliveries.fields"
                                        :items="loadedLodgementDeliveries.items"> <!-- thead-class="hidden_header" -->
                                    </b-table-lite>
                                    <!-- <AppDataTable :download-file-name="loadedLodgementDeliveries.downloadFileName" 
                                        :fields="loadedLodgementDeliveries.fields" :fieldDefs="loadedLodgementDeliveries.fieldDefs" 
                                        :table-data="loadedLodgementDeliveries.items" :is-main-table="loadedLodgementDeliveries.isMainTable"></AppDataTable> -->
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
import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "LodgementDetails",
    components: {
        LodgementForm,
        AppDataTable
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
            stockStatmentLeftTable: {
                fields: [
                    { key: "infoLabel", label: "", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: `<b>Lot Number</b>`, infoValue: "" },
                    { infoLabel: `<b>Trademark (Customer Name)</b>`, infoValue: "" },
                    { infoLabel: `<b>Lodgement Date</b>`, infoValue: ""}
                ]
            },
            stockStatmentRightTable: {
                fields: [
                    { key: "infoLabel", label: "", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: `<b>Product Name</b>`, infoValue: ""},
                    { infoLabel: `<b>Stock Balance as of today</b>`, infoValue: ""},
                    { infoLabel: `<b>Lodgement Notes</b>`, infoValue: ""}
                ]
            },
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
                    { infoLabel: "Driver Name", infoValue: "" }
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
                    { infoLabel: "Total Charges paid on Deliveries", infoValue: "" },
                    { infoLabel: "Total Rent Receivable on Delivered Bags", infoValue: "" },
                ]
            },
            entityIndicativeChargesTable: {
                fields: [
                    { key: "infoLabel", label: "Indicative Charges", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Hamali Charges", infoValue: "" },
                    { infoLabel: "Kata Coolie Charges", infoValue: "" },
                    { infoLabel: "Platform Coolie Charges", infoValue: "" },
                    { infoLabel: "Mamullu Charges", infoValue: "" },
                    { infoLabel: "Insurance Charges Paid", infoValue: "" },
                ]
            },
            entityChargesPaidTable: {
                fields: [
                    { key: "infoLabel", label: "Charges Paid", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Hamali Paid", infoValue: "" },
                    { infoLabel: "Kata Coolie Paid", infoValue: "" },
                    { infoLabel: "Platform Coolie Paid", infoValue: "" },
                    { infoLabel: "Mamullu Paid", infoValue: "" },
                    { infoLabel: "Transport Charges Paid", infoValue: "" },
                    { infoLabel: "Total Charges Paid", infoValue: "" },
                ]
            },
            entityChargesReceivableTable: {
                fields: [
                    { key: "infoLabel", label: "Charges Receivable", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Two-way Hamali Charges", infoValue: "" },
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
            loadedLodgementDeliveries : {
                fields: [
                    { key: "deliveryDate", label: "Delivery Date" },
                    { key: "numBagsDelivered", label: "Delivered Bags", class: 'text-center'  },
                    { key: "numBagsBalance", label: "Balance Bags in store", class: 'text-center' },
                    { key: "numMonthsLodged", label: "Months Lodged in Store" },
                    { key: "rentReceivableOnDeliveredBags.$numberDecimal", label: "Rent on Delivered Bags" },
                    { key: "totalChargesPaid.$numberDecimal", label: "Total Charges Paid" }
                ],
                fieldDefs: [],
                items: [],
                downloadFileName: "deliveriesForLodgement",
                isMainTable: false
            }
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
                if(this.loadedEntity != null) {
                    this.entityTitle = "Lot Number: " + this.loadedEntity.lotNumber + " ( " + this.loadedEntity.numBagsLodged + " Bags)";
                    
                    this.stockStatmentLeftTable.items[0].infoValue = this.loadedEntity.lotNumber;
                    this.stockStatmentLeftTable.items[1].infoValue = `${this.loadedEntity.trademark.trademarkName} ( ${this.loadedEntity.trademark.customerName} )
                        <a href="/trademarks/${this.loadedEntity.trademark.trademarkId}" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend"/></a>`;
                    this.stockStatmentLeftTable.items[2].infoValue = this.loadedEntity.lodgementDate;

                    this.stockStatmentRightTable.items[0].infoValue = `${this.loadedEntity.product.productName}
                        <a href="/products/${this.loadedEntity.product.productId}" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend" /></a>`;
                    this.stockStatmentRightTable.items[1].infoValue = this.loadedEntity.numBagsBalance + " Bags / " + this.loadedEntity.numBagsLodged + " Bags (Lodged)";
                    this.stockStatmentRightTable.items[2].infoValue = this.loadedEntity.lodgementNotes;
                    
                    this.entityDetailsTable.items[0].infoValue = this.loadedEntity.lotNumber;
                    this.entityDetailsTable.items[1].infoValue = `${this.loadedEntity.trademark.trademarkName} ( ${this.loadedEntity.trademark.customerName} )
                        <a href="/trademarks/${this.loadedEntity.trademark.trademarkId}" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend"/></a>`;
                    this.entityDetailsTable.items[2].infoValue = `${this.loadedEntity.product.productName}
                        <a href="/products/${this.loadedEntity.product.productId}" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend" /></a>`;
                    this.entityDetailsTable.items[3].infoValue = this.loadedEntity.numBagsLodged + " Bags";
                    this.entityDetailsTable.items[4].infoValue = (new Date(this.loadedEntity.lodgementDate)).toLocaleDateString();
                    this.entityDetailsTable.items[5].infoValue = this.loadedEntity.locationCodes;
                    this.entityDetailsTable.items[6].infoValue = this.loadedEntity.lodgementNotes;

                    this.entityTransportDetailsTable.items[0].infoValue = this.loadedEntity.transport.vehicleNumber;
                    this.entityTransportDetailsTable.items[1].infoValue = this.loadedEntity.transport.driverName;
                    
                    this.entityIndicativeChargesTable.items[0].infoValue = "Rs. " + this.loadedEntity.indicativeCharges.hamaliCharges.$numberDecimal + "/-";
                    this.entityIndicativeChargesTable.items[1].infoValue = "Rs. " + this.loadedEntity.indicativeCharges.kataCoolieCharges.$numberDecimal + "/-";
                    this.entityIndicativeChargesTable.items[2].infoValue = "Rs. " + this.loadedEntity.indicativeCharges.platformCoolieCharges.$numberDecimal + "/-";
                    this.entityIndicativeChargesTable.items[3].infoValue = "Rs. " + this.loadedEntity.indicativeCharges.mamulluCharges.$numberDecimal + "/-";
                    this.entityIndicativeChargesTable.items[4].infoValue = "Rs. " + this.loadedEntity.indicativeCharges.insuranceCharges.$numberDecimal + "/-";

                    this.entityChargesPaidTable.items[0].infoValue = "Rs. " + this.loadedEntity.chargesPaid.hamaliCharges.$numberDecimal + "/-";
                    this.entityChargesPaidTable.items[1].infoValue = "Rs. " + this.loadedEntity.chargesPaid.kataCoolieCharges.$numberDecimal + "/-";
                    this.entityChargesPaidTable.items[2].infoValue = "Rs. " + this.loadedEntity.chargesPaid.platformCoolieCharges.$numberDecimal + "/-";
                    this.entityChargesPaidTable.items[3].infoValue = "Rs. " + this.loadedEntity.chargesPaid.mamulluCharges.$numberDecimal + "/-";
                    this.entityChargesPaidTable.items[4].infoValue = "Rs. " + this.loadedEntity.chargesPaid.transportCharges.$numberDecimal + "/-";
                    this.entityChargesPaidTable.items[5].infoValue = "Rs. " + this.loadedEntity.chargesPaid.totalChargesPaid.$numberDecimal + "/-";
                 
                    this.entityChargesReceivableTable.items[0].infoValue = "Rs. " + this.loadedEntity.chargesReceivable.hamaliCharges.$numberDecimal + "/-";
                    this.entityChargesReceivableTable.items[1].infoValue = "Rs. " + this.loadedEntity.chargesReceivable.insuranceCharges.$numberDecimal + "/-";
                    this.entityChargesReceivableTable.items[2].infoValue = "Rs. " + this.loadedEntity.chargesReceivable.totalChargesReceivable.$numberDecimal + "/-";
                    
                    this.entityRentalsDetailsTable.items[0].infoValue = this.loadedEntity.rents.rentalMode;
                    this.entityRentalsDetailsTable.items[1].infoValue = this.loadedEntity.rents.rentalYear;
                    this.entityRentalsDetailsTable.items[2].infoValue = "Rs. " + this.loadedEntity.stockRelease.totalRentReceivable.$numberDecimal + "/-";

                    this.entityDeliveryDetailsTable.items[0].infoValue = this.loadedEntity.stockRelease.numDeliveries;
                    this.entityDeliveryDetailsTable.items[1].infoValue = (new Date(this.loadedEntity.stockRelease.lastDeliveryDate)).toLocaleDateString();
                    this.entityDeliveryDetailsTable.items[2].infoValue = (this.loadedEntity.numBagsLodged - this.loadedEntity.numBagsBalance) + " Bags";
                    this.entityDeliveryDetailsTable.items[3].infoValue = this.loadedEntity.numBagsBalance + " Bags";
                    this.entityDeliveryDetailsTable.items[4].infoValue = "Rs. " + this.loadedEntity.stockRelease.totalChargesPaid.$numberDecimal + "/-";
                    this.entityDeliveryDetailsTable.items[5].infoValue = "Rs. " + this.loadedEntity.stockRelease.totalRentReceivable.$numberDecimal + "/-";

                    this.loadedLodgementDeliveries.items = this.loadedEntity.stockRelease.deliveries;
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