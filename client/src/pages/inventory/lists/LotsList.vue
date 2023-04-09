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
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <h4 class="card-title">Lots ( {{ totalRows }} )</h4>
                    </div>

                    <br />
                    <AppDataTable v-if="items" :download-file-name="downloadFileName" :fields="fields" 
                        :fieldDefs="fieldDefs" :table-data="items"></AppDataTable>
                </div>
            </div>
        </div>
    </div>
</template>


<script lang="js">
import { getAllLots } from "@/services/LotService";

import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "LotsList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 0,
            footerBgVariant: "light",
            downloadFileName: "lotsList",
            fields: [

                { data: "lotNumber", title: "Lot Number" },
                { data: "trademark.trademark", title: "Trademark Name"},
                { data: "trademark.customerName", title: "Customer Name" },
                { data: "product.productName", title: "Product Name" },
                { data: "numBagsLodged", title: "Lodged Bags", class: "text-center" },
                { data: "locationCodes", title: "Locations" },
                { data: "lodgementDate", title: "Lodgement Date", render : function(lodgementDate) { return (new Date(lodgementDate)).toLocaleDateString();} },
                // { data: "numBagsLodged", title: "Delivered Bags", class: "text-center", render: function(numBagsLodged, numBagsBalance) { return (numBagsLodged-numBagsBalance); } },
                { data: "numBagsBalance", title: "Balance Bags", class: "text-center" },
                { data: "charges.totalLodgementChargesReceivable.$numberDecimal", title: "Total Charges Receivable", class: "text-right" },
                { data: "charges.totalLodgementChargesReceived.$numberDecimal", title: "Total Charges Received", class: "text-right" },
                { data: "rents.totalRentReceivable.$numberDecimal", title: "Total Rent Receivable", class: "text-right" },
                { data: "rents.totalRentReceived.$numberDecimal", title: "Total Rent Received", class: "text-right", visible: false  },
                { data: "deliveries.length", title: "Num Deliveries", class: "text-center" }
            ],
            fieldDefs: [],
            items: null
        };
    },
    async created() {
        getAllLots().then(response => {
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