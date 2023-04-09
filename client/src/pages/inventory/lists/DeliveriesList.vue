<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                Deliveries
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Inventory</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Deliveries</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-6">
                            <h4 class="card-title">Deliveries ( {{ totalRows }} )</h4>
                        </div>
                        <div class="col-md-6" align="right">
                            <button type="button" v-b-modal.createDeliveryModal 
                                class="btn btn-gradient-primary btn-icon-text">
                                <i class="mdi mdi-account-plus btn-icon-prepend"></i>
                                Create
                            </button>
                        </div>
                    </div>
                    <br />

                    <AppDataTable v-if="items" :download-file-name="downloadFileName" :fields="fields" :fieldDefs="fieldDefs" :table-data="items"></AppDataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllDeliveries } from "@/services/DeliveryService";

import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "DeliveriesList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 0,
            footerBgVariant: "light",
            downloadFileName: "lodgementsList",
            fields: [
                { data: "deliveryDate", title: "Delivery Date", render : function(deliveryDate) { return (new Date(deliveryDate)).toLocaleDateString();}  },
                { data: "lotNumber", title: "Lot Number" },
                { data: "trademark.trademark", title: "Trademark Name" },
                { data: "trademark.customerName", title: "Customer Name" },
                { data: "productName", title: "Product Name" },
                { data: "numBagsDelivered", title: "Delivered Bags", class: "text-center" },
                { data: "numBagsLodged", title: "Lodged Bags", class: "text-center" },
                { data: "numBagsBalance", title: "Balance Bags", class: "text-center" },
                { data: "locationCodes", title: "Locations" },
                { data: "lodgementDate", title: "Lodgement Date", render : function(lodgementDate) { return (new Date(lodgementDate)).toLocaleDateString();}  },
                { data: "numMonthsLodged", title: "Months Lodged", render: function(numMonthsLodged) { return ( numMonthsLodged + " Months"); } },
                { data: "transportChargesPaid.$numberDecimal", title: "Transport Charges Paid", class: "text-right"  },
                // { data: "totalChargesReceivable.$numberDecimal", title: "Total Charges Receivable", class: "text-right"  },
                // { data: "totalChargesReceived.$numberDecimal", title: "Total Charges Received", class: "text-right"  },
                // { data: "rents.rentalMode", title: "Rental Mode" },
                { data: "rents.rentalYear", title: "Rental Year", class: "text-center"  },
                { data: "rents.totalRentReceivable.$numberDecimal", title: "Total Rent Receivable", class: "text-right"  },
                { data: "rents.totalRentReceived.$numberDecimal", title: "Total Rent Received", class: "text-right"  },
                { data: "vehicleNumber", title: "Vehicle Number" },
                { data: "driverName", title: "Driver Name" },
                { data: "deliveryNotes", title: "Delivery Notes" } 
            ],
            fieldDefs: [],
            items: null
        };
    },
    async created() {
        getAllDeliveries().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>