<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                Lots
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Inventory</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Lots</li>
                    <li class="breadcrumb-item active" aria-current="page">Lot Details</li>
                </ol>
            </nav>
        </div>
        <div class="row grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-6">
                            <h4 class="card-title">Lot No: {{ loadedLot.lotNumber }}</h4>
                        </div>
                        <div class="col-md-6" align="right">
                            <button type="button" class="btn btn-gradient-success btn-icon-text">
                                <i class="mdi mdi-upload btn-icon-prepend"></i>
                                Share
                            </button>
                            <button type="button" class="btn btn-gradient-success btn-icon-text">
                                <i class="mdi mdi-download btn-icon-prepend"></i>
                                Download
                            </button>
                        </div>
                    </div>
                    <br />

                    <div class="row template-demo">
                        <div class="col-md-12">
                            <b-tabs class="tab-solid tab-solid-primary">
                                <b-tab active>
                                    <template slot="title">
                                        <i class='mdi mdi-home-outline'></i> Basic Details
                                    </template>
                                    <div role="tablist" class="accordion accordion-bordered">
                                        <b-card no-body>
                                            <b-card-header header-tag="header" role="tab">
                                                <h3 class="font-weight-bold"><a href="javascript:void(0);"
                                                        v-b-toggle.accordion4>Trademark Details</a></h3>
                                            </b-card-header>
                                            <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
                                                <b-card-body>
                                                    <b-row>
                                                        <b-col cols="3">Trademark name</b-col>
                                                        <b-col cols="9">{{ loadedLot.trademark.trademark }}</b-col>
                                                    </b-row>
                                                    <b-row>
                                                        <b-col cols="3">Customer name</b-col>
                                                        <b-col cols="9">{{ loadedLot.trademark.customerName }}</b-col>
                                                    </b-row>
                                                </b-card-body>
                                            </b-collapse>
                                        </b-card>
                                        <b-card no-body>
                                            <b-card-header header-tag="header" role="tab">
                                                <h3 class="font-weight-bold"><a href="javascript:void(0);"
                                                        v-b-toggle.accordion4>Product Details</a></h3>
                                            </b-card-header>
                                            <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
                                                <b-card-body>
                                                    <div class="row">
                                                        <div class="col-md-3">Product name</div>
                                                        <div class="col-md-9">{{ loadedLot.productName }}</div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-3">Number of bags lodged</div>
                                                        <div class="col-md-9">{{ loadedLot.numBagsLodged }}</div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-3">Lodgement date</div>
                                                        <div class="col-md-9">{{ loadedLot.numBagsDelivered }}</div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-3">Number of bags delivered till date</div>
                                                        <div class="col-md-9">{{ loadedLot.numBagsDelivered }}</div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-3">Number of balance bags in store</div>
                                                        <div class="col-md-9">{{ loadedLot.numBagsDelivered }}</div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-md-3">Most recent delivery date</div>
                                                        <div class="col-md-9">{{ loadedLot.lastTransactionDate }}</div>
                                                    </div>
                                                </b-card-body>
                                            </b-collapse>
                                        </b-card>
                                        <b-card no-body>
                                            <b-card-header header-tag="header" role="tab">
                                                <h3 class="font-weight-bold"><a href="javascript:void(0);"
                                                        v-b-toggle.accordion4>Transport Details</a></h3>
                                            </b-card-header>
                                            <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
                                                <b-card-body>
                                                    <b-row>
                                                        <b-col cols="3">Vehicle number</b-col>
                                                        <b-col cols="9">{{ loadedLot.vehicleNumber }}</b-col>
                                                    </b-row>
                                                    <b-row>
                                                        <b-col cols="3">Driver name</b-col>
                                                        <b-col cols="9">{{ loadedLot.driverName }}</b-col>
                                                    </b-row>
                                                    <b-row>
                                                        <b-col cols="3">Trasnport charges paid</b-col>
                                                        <b-col cols="9">{{ loadedLot.transportChargesPaid.$numberDecimal }}</b-col>
                                                    </b-row>
                                                </b-card-body>
                                            </b-collapse>
                                        </b-card>
                                    </div>
                                </b-tab>
                                <b-tab>
                                    <template slot="title">
                                        <i class='mdi mdi-account'></i> Rents & Charges
                                    </template>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem vel eveniet
                                    qui, fuga saepe inventore aspernatur, voluptate libero soluta quidem ,fuga saepe
                                    inventore
                                    aspernatur, ad accusantium cumque voluptas, perferendis natus laudantium.
                                </b-tab>
                                <b-tab>
                                    <template slot="title">
                                        <i class='mdi mdi-anchor'></i> Deliveries ( {{ totalRows }} )
                                    </template>
                                    <div class="row">
                                        <div class="col-md-2" align="left">
                                            <label label-for="filter-input">Search</label>
                                        </div>
                                        <div class="col-md-4">
                                            <b-form-group label-for="filter-input" aria-controls="table-list"> 
                                                <b-form-input id="filter-input" v-model="filter" type="search"
                                                    placeholder="Type to Search"></b-form-input>
                                            </b-form-group>
                                        </div>
                                        <div class="col-md-2">
                                            <b-form-group label="Per page" label-for="per-page-select"
                                                aria-controls="table-list">
                                                <b-form-select id="per-page-select" v-model="perPage"
                                                    :options="pageOptions">
                                                </b-form-select>
                                            </b-form-group>
                                        </div>
                                        <div class="col-md-4" align="right">
                                            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                                aria-controls="table-list" align="right">
                                            </b-pagination>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <b-table hover responsive show-empty :items="loadedLotDeliveries"
                                                id="table-list" :per-page="perPage" :current-page="currentPage"
                                                :fields="delieveryTableFields" :sort-by.sync="sortBy"
                                                :sort-desc.sync="sortDesc" :filter="filter" @filtered="onFiltered">
                                            </b-table>
                                        </div>
                                    </div>
                                </b-tab>
                            </b-tabs>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import SortedTablePlugin from "vue-sorted-table";
import axios from "axios";

import { getDeliveriesByFilter } from "@/services/DeliveryService";
import { getLotDetails } from "@/services/LotService";

Vue.use(SortedTablePlugin, {
    ascIcon: '<i class="mdi mdi-arrow-down"></i>',
    descIcon: '<i class="mdi mdi-arrow-up"></i>'
});

export default {
    name: "LotDetails",
    data: function () {
        return {
            loadedLot: {
                lodgementDate: null,
                lotNumber: null,
                numBagsLodged: null,
                numBagsBalance: null,
                locationCodes: null,
                lastTransactionDate: null,
                trademark: {
                    trademarkId: null,
                    trademark: null,
                    customerName: null
                },
                product: {
                    productId: null,
                    productName: null
                },
                charges: {
                    hamaliCharges: null,
                    platformCoolieCharges: null,
                    kataCoolieCharges: null,
                    mamulluCharges: null,
                    insuranceCharges: null,
                    totalLodgementChargesReceivable: null,
                    totalLodgementChargesReceived: null,
                    totalDeliveryChargesReceivable: null,
                    totalDeliveryChargesReceived: null
                },
                vehicleNumber: null,
                driverName: null,
                transportChargesPaid: null,
                rents: {
                    rentalYear: null,
                    rentalMode: null,
                    totalRentReceivable: null,
                    totalRentReceived: null
                },
                deliveries: []
            },
            perPage: 10,
            totalRows: 1,
            currentPage: 1,
            pageOptions: [{ value: 0, text: "Per page" }, 5, 10, 25, 50],
            sortBy: "deliveryDate",
            sortDesc: true,
            sortByFormatted: true,
            filter: null,
            filterByFormatted: true,
            sortable: true,
            footerBgVariant: "light",
            delieveryTableFields: [
                { key: "deliveryDate", sortable: true },
                { key: "numBagsDelivered", label: "Delivered Bags", sortable: true },
                { key: "numBagsLodged", label: "Lodged Bags", sortable: true },
                { key: "numBagsBalance", label: "Balance bags", sortable: true },
                { key: "locationCodes", sortable: true },
                { key: "lodgementDate", sortable: true },
                { key: "numMonthsLodged", label: "#Months Lodged", sortable: true },
                { key: "transportChargesPaid.$numberDecimal", label: "Transport Charges Paid", sortable: true },
                { key: "deliveryChargesReceivable.$numberDecimal", label: "Delivery Charges Receivable", sortable: true },
                { key: "deliveryChargesReceived.$numberDecimal", label: "Delivery Charges Received", sortable: true },
                { key: "rents.totalRentReceivable.$numberDecimal", label: "Total Rent Receivable", sortable: true },
                { key: "rents.totalRentReceived.$numberDecimal", label: "Total Rent Received", sortable: true },
                { key: "vehicleNumber" },
                { key: "deliveryNotes" }

            ],
            loadedLotDeliveries: []
        };
    },
    mounted() {
        let loadedlotId = this.$route.params._id;
        getLotDetails(loadedlotId).then(response => {
            this.loadedLot = JSON.parse(JSON.stringify(response));
            let deliveriesFilter = {
                "lotId": this.loadedLot.lotId
            };
            getDeliveriesByFilter(deliveriesFilter).then(response => {
                this.loadedLotDeliveries = response;
                this.totalRows = this.loadedLotDeliveries.length
                console.log(this.loadedLotDeliveries);
            });
        });
    },
    computed: {
        lotDetails() {
            return this.loadedLot;
        }
    }
}
</script>