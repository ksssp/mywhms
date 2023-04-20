<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                Platform Lots
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Inventory</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Platform Lots</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-6">
                            <h4 class="card-title">Platform Lots ( {{ totalRows }} )</h4>
                        </div>
                        <div class="col-md-6" align="right">
                            <a href="/inventory/platformLots/create/">
                                <button type="button"
                                    class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-account-plus btn-icon-prepend"></i>
                                    Create
                                </button>
                            </a>
                        </div>
                    </div>
                    <br />
                    <AppDataTable v-if="items" :download-file-name="downloadFileName" :fields="fields" 
                        :fieldDefs="fieldDefs" :table-data="items" :is-main-table="isMainTable"></AppDataTable>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="js">
import { getPlatformLots } from "@/services/lodgement.service";

import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "PlatformLotsList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 0,
            footerBgVariant: "light",
            downloadFileName: "platformLotsList",
            fields: [

                { data: "lodgementDate", title: "Lodgement Date", render : function(lodgementDate) { return (new Date(lodgementDate)).toLocaleDateString();} },
                { data: "lotNumber", title: "Lot Number" },
                { data: "trademark.trademarkName", title: "Trademark Name"},
                { data: "trademark.customerName", title: "Customer Name" },
                { data: "product.productName", title: "Product Name" },
                { data: "numBagsLodged", title: "Lodged Bags", class: "text-center" },
                { data: "numBagsBalance", title: "Balance Bags", class: "text-center" },
                { data: "stockRelease.numDeliveries", title: "Deliveries till date", class: "text-center" },
                { data: "stockRelease.lastDeliveryDate", title: "Recent Delivery Date", render : function(lastDeliveryDate) { return (new Date(lastDeliveryDate)).toLocaleDateString();} },
                { data: "chargesPaid.kataCoolieCharges.$numberDecimal", title: "Kata Coolie Paid", visible: false, class: "text-right", visible: false },
                { data: "chargesPaid.platformCoolieCharges.$numberDecimal", title: "Platform Coolie Paid", visible: false, class: "text-right", visible: false },
                { data: "chargesPaid.mamulluCharges.$numberDecimal", title: "Mamullu Paid", visible: false, class: "text-right", visible: false },
                { data: "chargesPaid.transportCharges.$numberDecimal", title: "Transport Charges Paid", class: "text-right", visible: false },
                { data: "chargesPaid.totalChargesPaid.$numberDecimal", title: "Total Charges Paid", class: "text-right" },
                { data: "chargesReceivable.totalChargesReceivable.$numberDecimal", title: "Total Charges Receivable", class: "text-right" }
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true
        };
    },
    async created() {
        getPlatformLots().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    },
    methods: {
        rowClicked(item, index, event) {
            console.log("row clicked : ", item);
            // this.$router.push(item._id);
        }
    }
}
</script>