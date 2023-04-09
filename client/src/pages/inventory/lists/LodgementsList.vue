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
                            <a href="/inventory/lodgements/create">
                                <button type="button"
                                    class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-account-plus btn-icon-prepend"></i>
                                    Create
                                </button>
                            </a>
                            <a href="/inventory/lodgements/createNew">
                                <button type="button"
                                    class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-account-plus btn-icon-prepend"></i>
                                    Create New
                                </button>
                            </a>
                        </div>
                    </div>
                    <br />

                    <AppDataTable v-if="items" :download-file-name="downloadFileName" :fields="fields" 
                        :field-defs="fieldDefs" :table-data="items"></AppDataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { getAllLodgements } from "@/services/LodgementService";

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
                { data: "lodgementDate", title: "Lodgement Date", render : function(lodgementDate) { return (new Date(lodgementDate)).toLocaleDateString();} },
                { data: "lotNumber", title: "Lot Number" },
                { data: "trademark.trademark", title: "Trademark" },
                { data: "trademark.customerName", title: "Customer Name" },
                { data: "productName", title: "Product Name" },
                { data: "numBagsLodged", title: "Lodged Bags", class: "text-center"  },
                { data: "numBagsBalance", title: "Balance Bags", class: "text-center"  },
                { data: "locationCodes", title: "Locations" },
                { data: "numDeliveries", title: "Num Deliveries", class: "text-center"  },
                { data: "lastTransactionDate", title: "Last Transaction Date", render : function(lastTransactionDate) { return (new Date(lastTransactionDate)).toLocaleDateString(); } },
                { data: "transportChargesPaid.$numberDecimal", title: "Transport Charges Paid", class: "text-right" },
                { data: "totalChargesReceivable.$numberDecimal", title: "Total Charges Receivable", class: "text-right"  },
                { data: "totalChargesReceived.$numberDecimal", title: "Total Charges Received", class: "text-right" },
                // { data: "rents.totalRentReceivable.$numberDecimal", title: "Total Rent Receivable", class: "text-right"  },
                // { data: "rents.totalRentReceived.$numberDecimal", title: "Total Rent Received", class: "text-right" }
            ],
            fieldDefs: [],
            items: null
        };
    },
    async created() {
        getAllLodgements().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>