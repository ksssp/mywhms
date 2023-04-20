<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                Lodgement Details
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Inventory</a></li>
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Lodgements</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Lodgement Details</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-6">
                            <h4 class="card-title">Lodgement Details</h4>
                        </div>
                        <div class="col-md-6" align="right">
                            <a href="#">
                                <button type="button"
                                    class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-account-plus btn-icon-prepend"></i>
                                    Print
                                </button>
                            </a>
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

import { getDeliveriesByFilter } from "@/services/delivery.service";
// import { getLotDetails } from "@/services/lodgement.service";

Vue.use(SortedTablePlugin, {
    ascIcon: '<i class="mdi mdi-arrow-down"></i>',
    descIcon: '<i class="mdi mdi-arrow-up"></i>'
});

export default {
    name: "LodgementDetails",
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
        // getLotDetails(loadedlotId).then(response => {
        //     this.loadedLot = JSON.parse(JSON.stringify(response));
        //     let deliveriesFilter = {
        //         "lotId": this.loadedLot.lotId
        //     };
        //     getDeliveriesByFilter(deliveriesFilter).then(response => {
        //         this.loadedLotDeliveries = response;
        //         this.totalRows = this.loadedLotDeliveries.length
        //     });
        // });
    },
    computed: {
        lotDetails() {
            return this.loadedLot;
        }
    }
}
</script>