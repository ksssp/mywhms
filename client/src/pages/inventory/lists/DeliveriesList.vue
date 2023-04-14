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
                            <a href="/inventory/deliveries/create/">
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

<script>
import { getDeliveries } from "@/services/DeliveryService";

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
            downloadFileName: "deliveriesList",
            fields: [
                { data: "_id", title: "deliveryId", visible: false },
                { data: "lodgementId", title: "lodgementId", visible: false },
                { data: "deliveryDate", title: "Delivery Date", render : function(deliveryDate) { return (new Date(deliveryDate)).toLocaleDateString();}  },
                { data: "lotNumber", title: "Lot Number" },
                { data: "trademark.trademarkName", title: "Trademark Name" },
                { data: "trademark.customerName", title: "Customer Name" },
                { data: "product.productName", title: "Product Name" },
                { data: "numBagsDelivered", title: "Delivered Bags", class: "text-center" },
                { data: "numBagsLodged", title: "Lodged Bags", class: "text-center" },
                { data: "numBagsBalance", title: "Balance Bags", class: "text-center" },
                { data: "locationCodes", title: "Locations", visible: false },
                { data: "lodgementDate", title: "Lodgement Date", render : function(lodgementDate) { return (new Date(lodgementDate)).toLocaleDateString();}  },
                { data: "numMonthsLodged", title: "Months Lodged", render: function(numMonthsLodged) { return ( numMonthsLodged + " Months"); } },
                { data: "chargesPaid.hamaliCharges.$numberDecimal", title: "Hamali Paid", class: "text-right" },
                { data: "chargesPaid.kataCoolieCharges.$numberDecimal", title: "Kata Coolie Paid", visible: false, class: "text-right" },
                { data: "chargesPaid.platformCoolieCharges.$numberDecimal", title: "Platform Coolie Paid", visible: false, class: "text-right" },
                { data: "chargesPaid.mamulluCharges.$numberDecimal", title: "Mamullu Paid", visible: false, class: "text-right" },
                { data: "chargesPaid.transportCharges.$numberDecimal", title: "Transport Charges Paid", class: "text-right" },
                { data: "chargesPaid.totalChargesPaid.$numberDecimal", title: "Total Charges Paid", class: "text-right"  },
                { data: "rents.rentalYear", title: "Rental Year", class: "text-center"  },
                { data: "rents.rentalMode", title: "Rental Mode", class: "text-center"  },
                { data: "rents.rentReceivableOnDeliveredBags.$numberDecimal", title: "Rent Receivable on Delivered Bags", class: "text-right"  }
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true
        };
    },
    async created() {
        getDeliveries().then(response => {
            this.items = response;
            console.log(this.items[0]);
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>