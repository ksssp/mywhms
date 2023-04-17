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

                                            <b-table-lite responsive borderless :fields="entityRentalsDetailsTable.fields"
                                                :items="entityRentalsDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                            </b-table-lite>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Charges Paid & Rentals">
                            <div v-if="!editChargesMode" class="mx-2 d-md-flex justify-content-end">
                                <b-button v-on:click="editLoadedEntityCharges" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-pencil btn-icon-prepend"></i>
                                    Edit Charges Paid
                                </b-button>
                            </div>
                            <div>
                                <ChargesForm v-if="editChargesMode" :form-data="chargesPaidFormData" :submit-mode="submitMode" 
                                    @saved="saved" @cancelForm="editCancelled"></ChargesForm>
                                <div v-else class="row mx-2">
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
import DeliveryCreateForm from "../forms/DeliveryCreateForm.vue";
import ChargesForm from "../forms/ChargesForm.vue";

export default {
    name: "DeliveryDetails",
    components: {
        DeliveryCreateForm,
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
            editMode: false,
            editChargesMode: false,
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
            chargesPaidFormData: {
                entityType: "delivery",
                entityId: null,
                hamaliCharges: 0,
                kataCoolieCharges: 0,
                platformCoolieCharges: 0,
                mamulluCharges: 0,
                transportCharges: 0,
                totalChargesPaid: 0
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
                    this.entityDetailsTable.items[1].infoValue = `${this.loadedEntity.trademark.trademarkName} ( ${this.loadedEntity.trademark.customerName} )
                        <a href="/trademarks/" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend"/></a>`;
                    this.entityDetailsTable.items[2].infoValue = `${this.loadedEntity.product.productName}
                        <a href="/products/" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend" /></a>`;
                    this.entityDetailsTable.items[3].infoValue = this.loadedEntity.numBagsDelivered + " Bags";
                    this.entityDetailsTable.items[4].infoValue = (new Date(this.loadedEntity.deliveryDate)).toLocaleDateString();
                    this.entityDetailsTable.items[5].infoValue = this.loadedEntity.numMonthsLodged + " months";
                    this.entityDetailsTable.items[6].infoValue = this.loadedEntity.locationCodes;
                    this.entityDetailsTable.items[7].infoValue = this.loadedEntity.deliveryNotes;

                    this.entityLodgementDetailsTable.items[0].infoValue = (new Date(this.loadedEntity.lodgementDate)).toLocaleDateString();
                    this.entityLodgementDetailsTable.items[1].infoValue = this.loadedEntity.numBagsLodged + " Bags";
                    this.entityLodgementDetailsTable.items[2].infoValue = this.loadedEntity.numBagsBalance + " Bags";
                    
                    this.entityTransportDetailsTable.items[0].infoValue = this.loadedEntity.transport.vehicleNumber;
                    this.entityTransportDetailsTable.items[1].infoValue = this.loadedEntity.transport.driverName;
                    
                    this.entityIndicativeChargesTable.items[0].infoValue = "Rs. " + this.loadedEntity.indicativeCharges.hamaliCharges.$numberDecimal + "/-";
                    this.entityIndicativeChargesTable.items[1].infoValue = "Rs. " + this.loadedEntity.indicativeCharges.kataCoolieCharges.$numberDecimal + "/-";
                    this.entityIndicativeChargesTable.items[2].infoValue = "Rs. " + this.loadedEntity.indicativeCharges.platformCoolieCharges.$numberDecimal + "/-";
                    this.entityIndicativeChargesTable.items[3].infoValue = "Rs. " + this.loadedEntity.indicativeCharges.mamulluCharges.$numberDecimal + "/-";

                    this.entityChargesPaidTable.items[0].infoValue = "Rs. " + this.loadedEntity.chargesPaid.hamaliCharges.$numberDecimal + "/-";
                    this.entityChargesPaidTable.items[1].infoValue = "Rs. " + this.loadedEntity.chargesPaid.kataCoolieCharges.$numberDecimal + "/-";
                    this.entityChargesPaidTable.items[2].infoValue = "Rs. " + this.loadedEntity.chargesPaid.platformCoolieCharges.$numberDecimal + "/-";
                    this.entityChargesPaidTable.items[3].infoValue = "Rs. " + this.loadedEntity.chargesPaid.mamulluCharges.$numberDecimal + "/-";
                    this.entityChargesPaidTable.items[4].infoValue = "Rs. " + this.loadedEntity.chargesPaid.transportCharges.$numberDecimal + "/-";
                    this.entityChargesPaidTable.items[5].infoValue = "Rs. " + this.loadedEntity.chargesPaid.totalChargesPaid.$numberDecimal + "/-";

                    this.entityRentalsDetailsTable.items[0].infoValue = this.loadedEntity.rents.rentalMode;
                    this.entityRentalsDetailsTable.items[1].infoValue = this.loadedEntity.rents.rentalYear;
                    this.entityRentalsDetailsTable.items[2].infoValue = "Rs. " + this.loadedEntity.rents.rentReceivableOnDeliveredBags.$numberDecimal + "/-";
                }
            });
        },
        editLoadedEntity() {
            this.editMode=true;
        },
        editLoadedEntityCharges() {
            this.editChargesMode = true;
        },
        editCancelled() {
            this.editMode=false;
            this.editChargesMode = true;
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