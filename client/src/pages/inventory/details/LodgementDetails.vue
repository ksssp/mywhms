<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                {{ pageTitle }}
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Inventory</a></li>
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
                            <div class="mx-2 px-4">
                                <h6>Deliveries ( {{ this.loadedEntity.stockRelease.numDeliveries }})</h6>
                                <b-table responsive foot-clone :fields="loadedLodgementDeliveries.fields"
                                    :items="loadedLodgementDeliveries.items">
                                    <template #cell(deliveryDate)="data">
                                        {{ formatDate(data.value) }}

                                    </template>
                                    <template #cell(lodgementDate)="data">
                                        {{ formatDate(data.value) }}
                                    </template>
                                    <template #foot(deliveryDate)="data">Summary</template>
                                    <template #foot(numBagsDelivered)="data">{{ getTotalNumBagsDelivered }} Bags</template>
                                    <template #foot(numBagsBalance)="data">{{ getTotalNumBagsBalance }} Bags</template>
                                    <template #foot(numMonthsLodged)="data">{{ getAverageNumMonthsLodged }}</template>
                                    <template #foot(chargesPaid.totalChargesPaid)="data">Rs. {{ getDeliveriesTotalChargesPaid }}</template>
                                    <template #foot(chargesReceivable.nonHamaliChargesPaid)="data">Rs. {{ getDeliveriesTotalChargesReceivable }}</template>
                                    <template #foot(rentals.rentReceivableOnDeliveredBags)="data">Rs. {{ getDeliveriesTotalRentReceivable }}</template>
                                </b-table>
                            </div>
                        </b-tab>
                        <b-tab title="Basic Details">
                            <div v-if="!editDetailsMode" class="mx-2 d-md-flex justify-content-end">
                                <b-button v-on:click="editLoadedEntityDetails" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-pencil btn-icon-prepend"></i>
                                    Edit Lodgement Details
                                </b-button>
                            </div>
                            <div>
                                <LodgementDetailsForm v-if="editDetailsMode" :form-data="loadedEntity" :submit-mode="submitMode" 
                                    @saved="saved" @cancelForm="editCancelled"></LodgementDetailsForm>
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
                            <div v-if="!editChargesMode" class="mx-2 d-md-flex justify-content-end">
                                <b-button v-on:click="editLoadedEntityCharges" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-pencil btn-icon-prepend"></i>
                                    Edit Charges Paid
                                </b-button>
                            </div>
                            <div>
                                <ChargesForm v-if="editChargesMode" :form-data="loadedEntity" :entity-name="entityName" 
                                    @saved="saved" @cancelForm="editCancelled"></ChargesForm>
                                <div v-else class="row mx-2">
                                    <div class="col-md-12">
                                        <b-table-lite responsive borderless :fields="entityChargesTable.fields"
                                            :items="entityChargesTable.items">
                                        </b-table-lite>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Deliveries">
                            <div v-if="!addDeliveryMode" class="mx-2 d-md-flex justify-content-end">
                                <b-button v-on:click="addDelivery" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-truck-delivery btn-icon-prepend"></i>
                                    Add a Delivery
                                </b-button>
                            </div>
                            <div>
                                <DeliveryDeatilsForm v-if="addDeliveryMode" :form-data="loadedEntity" :submit-mode="deliverySubmitMode" 
                                    @saved="saved" @cancelForm="editCancelled"></DeliveryDeatilsForm>
                                <div v-else class="mx-2">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <b-table-lite responsive borderless :fields="entityDeliveryDetailsTable.fields"
                                                :items="entityDeliveryDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                            </b-table-lite>
                                        </div>
                                        <div class="col-md-6">
                                            <b-table-lite responsive borderless :fields="entityRentalsDetailsTable.fields"
                                                :items="entityRentalsDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                            </b-table-lite>
                                        </div>
                                    </div>
                                    <br />
                                    <div class="px-4">
                                        <h6>Deliveries ( {{ this.loadedEntity.stockRelease.numDeliveries }})</h6>
                                        <b-table responsive foot-clone :fields="loadedLodgementDeliveries.fields"
                                            :items="loadedLodgementDeliveries.items"> 
                                            <template #cell(deliveryDate)="data">
                                                {{ formatDate(data.value) }}
                                                <b-link :href="getDeliveryUrl(data.item)" target="_blank">
                                                    <span class="ml-1 mdi mdi-open-in-new btn-icon-prepend"/>
                                                </b-link>
                                            </template>
                                            <template #cell(lodgementDate)="data">
                                                {{ formatDate(data.value) }}
                                            </template>
                                            <template #foot(deliveryDate)="data">Summary</template>
                                            <template #foot(numBagsDelivered)="data">{{ getTotalNumBagsDelivered }} Bags</template>
                                            <template #foot(numBagsBalance)="data">{{ getTotalNumBagsBalance }} Bags</template>
                                            <template #foot(numMonthsLodged)="data">{{ getAverageNumMonthsLodged }}</template>
                                            <template #foot(chargesPaid.totalChargesPaid)="data">Rs. {{ getDeliveriesTotalChargesPaid }}</template>
                                            <template #foot(chargesReceivable.nonHamaliChargesPaid)="data">Rs. {{ getDeliveriesTotalChargesReceivable }}</template>
                                            <template #foot(rentals.rentReceivableOnDeliveredBags)="data">Rs. {{ getDeliveriesTotalRentReceivable }}</template>
                                        </b-table>
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
import { DateTime } from "luxon";
import { getLodgementById } from "@/services/lodgement.service";
import { getDeliveriesByLodgementId } from "@/services/delivery.service";

import LodgementDetailsForm from "../forms/LodgementDetailsForm.vue";
import ChargesForm from "../forms/ChargesForm.vue";
import DeliveryDeatilsForm from "../forms/DeliveryDetailsForm.vue";
import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "LodgementDetails",
    components: {
        LodgementDetailsForm,
        ChargesForm,
        AppDataTable,
        DeliveryDeatilsForm
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
            editDetailsMode: false,
            editChargesMode: false,
            addDeliveryMode: false,
            submitMode: "update",
            deliverySubmitMode: 'createFromLot',
            stockStatmentLeftTable: {
                fields: [
                    { key: "infoLabel", label: "", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: `<b>Lot Number</b>`, infoValue: "" },
                    { infoLabel: `<b>Customer Code (Name)</b>`, infoValue: "" },
                    { infoLabel: `<b>Lodgement Date</b>`, infoValue: ""},
                    { infoLabel: `<b>Total Charges Paid on Lodgement</b>`, infoValue: ""},
                    { infoLabel: `<b>Total Charges Paid on Deliveries</b>`, infoValue: ""},
                    { infoLabel: `<b>Total Charges Receivable on Lodgement</b>`, infoValue: ""},
                    { infoLabel: `<b>Total Charges Receivable on Deliveries</b>`, infoValue: ""}
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
                    { infoLabel: `<b>Lodgement Notes</b>`, infoValue: ""},
                    { infoLabel: `<b>Rental Mode</b>`, infoValue: ""},
                    { infoLabel: `<b>Rent Receivable on Delivered Bags</b>`, infoValue: ""},
                    { infoLabel: `<b>Rent Receivable on Balance Bags</b>`, infoValue: ""}
                ]
            },
            entityDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "Lodgement Details", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Lot Number", infoValue: "" },
                    { infoLabel: "Customer Name", infoValue: "" },
                    { infoLabel: "Product Name", infoValue: "" },
                    { infoLabel: "Number of bags Lodged", infoValue: ""},
                    { infoLabel: "Number of bags Kata Coolie", infoValue: ""},
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
                    { chargeType: "Insurance Charges", chargesPerBag: "", chargesTotal: "", chargesPaid: "", chargesReceivable: "" },
                    { chargeType: "Transport Charges", chargesPerBag: "", chargesTotal: "", chargesPaid: "", chargesReceivable: "" },
                    { chargeType: "Total Charges Paid", chargesPerBag: "", chargesTotal: "", chargesPaid: "", chargesReceivable: "" }
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
                    { infoLabel: "Total Charges Paid on Deliveries", infoValue: "" },
                    { infoLabel: "Total Charges Receivable on Deliveries", infoValue: "" },
                    { infoLabel: "Total Rent Receivable on Delivered Bags", infoValue: "" },
                ]
            },
            entityRentalsDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "Rentals Details", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Lodgement
                    { infoLabel: "Rental Year", infoValue: "" },
                    { infoLabel: "Monthly Rent per Bag", infoValue: "" },
                    { infoLabel: "Number of Months in Store", infoValue: "" },
                    { infoLabel: "Monthly Rent Receivable", infoValue: "" },
                    { infoLabel: "Yearly Rent per Bag", infoValue: "" },
                    { infoLabel: "Yearly Rent Receivable", infoValue: "" },
                    { infoLabel: "Rental Mode", infoValue: "" },
                    { infoLabel: "Rent Receivable on Delivered bags", infoValue: "" },
                    { infoLabel: "Rent Receivable on Balance bags", infoValue: "" }
                ]
            },
            loadedLodgementDeliveries : {
                fields: [
                    { key: "deliveryDate", label: "Delivery Date" },
                    { key: "numBagsDelivered", label: "Delivered Bags", class: "text-center" },
                    { key: "numBagsBalance", label: "Balance Bags", class: "text-center" },
                    { key: "numMonthsLodged", label: "Months Lodged", class: "text-center" },
                    { key: "chargesPaid.totalChargesPaid", label: "Total Charges Paid", class: "text-right"  },
                    { key: "chargesReceivable.nonHamaliChargesPaid", label: "Total Charges Receivable", class: "text-right"  },
                    { key: "rentals.rentReceivableOnDeliveredBags", label: "Rent Receivable", class: "text-right"  }
                ],
                items: []
            },
        };
    },
    created() {
        this.loadedEntityId = this.$route.params._id;
        this.loadEntityData(this.loadedEntityId);
        this.loadDeliveriesData(this.loadedEntityId);
    },
    methods: {
        loadEntityData(entityId) {
            // load entity data from backend: entity - Lodgement
            getLodgementById(entityId).then(response => {
                this.loadedEntity = JSON.parse(JSON.stringify(response));
                if(this.loadedEntity != null) {
                    this.entityTitle = "Lot Number: " + this.loadedEntity.lotNumber + " ( " + this.loadedEntity.numBagsLodged + " Bags)";
                    let lodgementDate = DateTime.fromISO(this.loadedEntity.lodgementDate).toLocal();
                    let dateDiff = DateTime.now().endOf('month').diff(lodgementDate.startOf('month'), ['years', 'months', 'days']).toObject();
                    let rentRateOnBalanceBags = this.loadedEntity.numBagsBalance * (this.loadedEntity.rentals.rentalMode == 'Monthly' ?
                                         this.loadedEntity.rentals.monthlyRentPerBag : this.loadedEntity.rentals.yearlyRentPerBag);
                    let rentReceivableOnBalanceBags = rentRateOnBalanceBags * (this.loadedEntity.rentals.rentalMode == 'Monthly' ? dateDiff.months+1 : 1);
                    
                    this.stockStatmentLeftTable.items[0].infoValue = this.loadedEntity.lotNumber;
                    this.stockStatmentLeftTable.items[1].infoValue = `${this.loadedEntity.customer.customerDisplayName}
                        <a href="/customers/${this.loadedEntity.customer.customerkId}" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend"/></a>`;
                    this.stockStatmentLeftTable.items[2].infoValue = DateTime.fromISO(this.loadedEntity.lodgementDate).toLocal().toFormat('dd-MM-yyyy');
                    this.stockStatmentLeftTable.items[3].infoValue = 'Rs. ' + this.loadedEntity.chargesPaid.totalChargesPaid;
                    this.stockStatmentLeftTable.items[4].infoValue = 'Rs. ' + this.loadedEntity.stockRelease.totalChargesPaid;
                    this.stockStatmentLeftTable.items[5].infoValue = 'Rs. ' + this.loadedEntity.chargesReceivable.totalChargesReceivable;
                    this.stockStatmentLeftTable.items[6].infoValue = 'Rs. ' + this.loadedEntity.stockRelease.totalChargesReceivable;

                    this.stockStatmentRightTable.items[0].infoValue = `${this.loadedEntity.product.productName}
                        <a href="/products/${this.loadedEntity.product.productId}" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend" /></a>`;
                    this.stockStatmentRightTable.items[1].infoValue = this.loadedEntity.numBagsBalance + " Bags / " + this.loadedEntity.numBagsLodged + " Bags (Lodged)";
                    this.stockStatmentRightTable.items[2].infoValue = this.loadedEntity.lodgementNotes;
                    this.stockStatmentRightTable.items[3].infoValue = this.loadedEntity.rentals.rentalMode;
                    this.stockStatmentRightTable.items[4].infoValue = 'Rs. ' + this.loadedEntity.stockRelease.totalRentReceivable;
                    this.stockStatmentRightTable.items[5].infoValue = 'Rs. ' + rentReceivableOnBalanceBags;

                    this.entityDetailsTable.items[0].infoValue = this.loadedEntity.lotNumber;
                    this.entityDetailsTable.items[1].infoValue = `${this.loadedEntity.customer.customerDisplayName}
                        <a href="/customers/${this.loadedEntity.customer.customerkId}" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend"/></a>`;
                    this.entityDetailsTable.items[2].infoValue = `${this.loadedEntity.product.productName}
                        <a href="/products/${this.loadedEntity.product.productId}" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend" /></a>`;
                    this.entityDetailsTable.items[3].infoValue = this.loadedEntity.numBagsLodged + " Bags";
                    this.entityDetailsTable.items[4].infoValue = this.loadedEntity.numBagsKataCoolie + " Bags";
                    this.entityDetailsTable.items[5].infoValue = DateTime.fromISO(this.loadedEntity.lodgementDate).toLocal().toFormat('dd-MM-yyyy');
                    this.entityDetailsTable.items[6].infoValue = this.loadedEntity.locationCodes;
                    this.entityDetailsTable.items[7].infoValue = this.loadedEntity.lodgementNotes;

                    this.entityTransportDetailsTable.items[0].infoValue = this.loadedEntity.transport.vehicleNumber;
                    this.entityTransportDetailsTable.items[1].infoValue = this.loadedEntity.transport.driverName;
                    
                    this.entityChargesTable.items = [
                        {
                            chargeType: 'Hamali Charges',
                            chargesPerBag: 'Rs. ' + this.loadedEntity.chargesPerBag.hamaliPerBag + '/-',
                            chargesTotal: 'Rs. ' + Math.round(this.loadedEntity.chargesPerBag.hamaliPerBag * this.loadedEntity.numBagsLodged) + ' /-',
                            chargesPaid: 'Rs. ' + this.loadedEntity.chargesPaid.hamaliCharges + '/-',
                            chargesReceivable: 'Rs. ' + Math.round(2 * this.loadedEntity.chargesPerBag.hamaliPerBag * this.loadedEntity.numBagsLodged) + ' /-',
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
                            chargeType: 'Insurance Charges',
                            chargesPerBag: 'Rs. ' + this.loadedEntity.chargesPerBag.insurancePerBag + '/-',
                            chargesTotal: 'Rs. ' + Math.round(this.loadedEntity.chargesPerBag.insurancePerBag * this.loadedEntity.numBagsLodged) + ' /-',
                            chargesPaid: '',
                            chargesReceivable:'Rs. ' + this.loadedEntity.chargesReceivable.insuranceCharges + ' /-',
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
                            chargesReceivable: 'Rs. ' + this.loadedEntity.chargesReceivable.totalChargesReceivable + '/-'
                        }
                    ];

                    this.entityRentalsDetailsTable.items[0].infoValue = this.loadedEntity.rentals.rentalYear;
                    this.entityRentalsDetailsTable.items[1].infoValue = "Rs. " + this.loadedEntity.rentals.monthlyRentPerBag + '/-';
                    this.entityRentalsDetailsTable.items[2].infoValue = (dateDiff.months+1) + ' months';
                    this.entityRentalsDetailsTable.items[3].infoValue = "TBD ";
                    this.entityRentalsDetailsTable.items[4].infoValue = "Rs. " + this.loadedEntity.rentals.yearlyRentPerBag + '/-';
                    this.entityRentalsDetailsTable.items[5].infoValue = "Rs. " + this.loadedEntity.rentals.yearlyRentPerBag * this.loadedEntity.numBagsLodged + '/-';
                    this.entityRentalsDetailsTable.items[6].infoValue = this.loadedEntity.rentals.rentalMode;
                    this.entityRentalsDetailsTable.items[7].infoValue = "Rs. " + this.loadedEntity.stockRelease.totalRentReceivable + '/-';
                    this.entityRentalsDetailsTable.items[8].infoValue = "Rs. " + rentReceivableOnBalanceBags + '/-';

                    this.entityDeliveryDetailsTable.items[0].infoValue = this.loadedEntity.stockRelease.numDeliveries;
                    this.entityDeliveryDetailsTable.items[1].infoValue = this.formatDate(this.loadedEntity.stockRelease.lastDeliveryDate);
                    this.entityDeliveryDetailsTable.items[2].infoValue = (this.loadedEntity.numBagsLodged - this.loadedEntity.numBagsBalance) + " Bags";
                    this.entityDeliveryDetailsTable.items[3].infoValue = this.loadedEntity.numBagsBalance + " Bags";
                    this.entityDeliveryDetailsTable.items[4].infoValue = "Rs. " + this.loadedEntity.stockRelease.totalChargesPaid + "/-";
                    this.entityDeliveryDetailsTable.items[5].infoValue = "Rs. " + this.loadedEntity.stockRelease.totalChargesReceivable + "/-";
                    this.entityDeliveryDetailsTable.items[6].infoValue = "Rs. " + this.loadedEntity.stockRelease.totalRentReceivable + "/-";

                    // this.loadedLodgementDeliveries.items = this.loadedEntity.stockRelease.deliveries;
                }
            });
        },
        loadDeliveriesData(lodgementId) {
            // load deliveries for loaded lodgement from backend: entity - Lodgement
            getDeliveriesByLodgementId(lodgementId).then(response => {
                this.loadedLodgementDeliveries.items = JSON.parse(JSON.stringify(response));
            });
        },
        formatDate(anyDate) {
            return DateTime.fromISO(anyDate).toLocal().toFormat('dd-MM-yyyy');
        },
        editLoadedEntityDetails() {
            this.editDetailsMode = true;
        },
        editLoadedEntityCharges() {
            this.editChargesMode = true;
        },
        addDelivery() {
            this.addDeliveryMode = true;
        },
        editCancelled() {
            this.editDetailsMode=false;
            this.editChargesMode=false;
            this.addDeliveryMode = false;
        },
        saved(saveActionStatus) {
            if(saveActionStatus) {
                this.loadEntityData(this.loadedEntityId);
                this.loadDeliveriesData(this.loadedEntityId);
                this.editDetailsMode = false;
                this.editChargesMode = false;
                this.addDeliveryMode = false;
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
        },
        getDeliveryUrl(delivery) {
            return "/inventory/deliveries/" + delivery._id + "/";
        }
    },
    computed: {
        getTotalNumBagsDelivered() {
            return this.loadedEntity.stockRelease.numBagsDelivered;
        },
        getTotalNumBagsBalance() {
            return this.loadedEntity.numBagsBalance;
        },
        getAverageNumMonthsLodged() {
            return ' ';
        },
        getDeliveriesTotalChargesPaid() {
            return this.loadedEntity.stockRelease.totalChargesPaid
        },
        getDeliveriesTotalChargesReceivable() {
            return this.loadedEntity.stockRelease.totalChargesReceivable;
        },
        getDeliveriesTotalRentReceivable() {
            return this.loadedEntity.stockRelease.totalRentReceivable;
        }
    }
}
</script>