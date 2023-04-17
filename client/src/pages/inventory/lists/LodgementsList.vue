<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                Lodgements
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Inventory</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Lodgements</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-6">
                            <h4 class="card-title">Lodgements ( {{ totalRows }} )</h4>
                        </div>
                        <div class="col-md-6" align="right">
                            <a href="/inventory/lodgements/create/">
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
                        :field-defs="fieldDefs" :table-data="items" :is-main-table="isMainTable"></AppDataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { getLodgements } from "@/services/LodgementService";

import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "LodgementsList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 0,
            footerBgVariant: "light",
            downloadFileName: "lodgementsList",
            fields: [
                { data: "_id", title: "Lodgement Id", visible: false },
                { data: "lodgementDate", title: "Lodgement Date", render : function(lodgementDate) { return (new Date(lodgementDate)).toLocaleDateString();} },
                { data: "lotNumber", title: "Lot Number" },
                { data: "trademark.trademarkName", title: "Trademark" },
                { data: "trademark.customerName", title: "Customer Name" },
                { data: "product.productName", title: "Product Name" },
                { data: "numBagsLodged", title: "Lodged Bags", class: "text-center" },
                { data: "locationCodes", title: "Locations" },
                { data: "chargesPaid.hamaliCharges.$numberDecimal", title: "Hamali Paid", class: "text-right" },
                { data: "chargesPaid.kataCoolieCharges.$numberDecimal", title: "Kata Coolie Paid", visible: false, class: "text-right" },
                { data: "chargesPaid.platformCoolieCharges.$numberDecimal", title: "Platform Coolie Paid", visible: false, class: "text-right" },
                { data: "chargesPaid.mamulluCharges.$numberDecimal", title: "Mamullu Paid", visible: false, class: "text-right" },
                { data: "chargesPaid.transportCharges.$numberDecimal", title: "Transport Charges Paid", class: "text-right" },
                { data: "chargesPaid.totalChargesPaid.$numberDecimal", title: "Total Charges Paid", class: "text-right"  },
                { data: "chargesReceivable.hamaliCharges.$numberDecimal", title: "Hamali Charges Receivable", class: "text-right" },
                { data: "chargesReceivable.insuranceCharges.$numberDecimal", title: "Insurance Charges Receivable", class: "text-right" },
                { data: "chargesReceivable.totalChargesReceivable.$numberDecimal", title: "Total Charges Receivable", class: "text-right" },
                { data: "rents.rentalMode", title: "Rental Mode", class: "text-center"  },
                { data: "rents.rentalYear", title: "Rental Year", class: "text-center" },
                { data: "rents.indicativeRent.$numberDecimal", title: "Rental rate", class: "text-left" },
                { data: "numBagsBalance", title: "Balance Bags", class: "text-center", visible: false }
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true
        };
    },
    async created() {
        getLodgements().then(response => {
            this.items = response;
            console.log(this.items);
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>