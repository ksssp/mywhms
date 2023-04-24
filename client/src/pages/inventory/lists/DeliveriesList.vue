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
import { getDeliveries } from "@/services/delivery.service";
import { DateTime } from 'luxon';

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
                { data: "deliveryDate", title: "Delivery Date", render : function(deliveryDate) { return DateTime.fromISO(deliveryDate).toLocal().toFormat('dd-MM-yyyy'); }  },
                { data: "lotNumber", title: "Lot Number" },
                { data: "customer.customerDisplayName", title: "Customer Name" },
                { data: "product.productName", title: "Product Name" },
                { data: "numBagsDelivered", title: "Delivered Bags", class: "text-center" },
                { data: "numBagsLodged", title: "Lodged Bags", class: "text-center" },
                { data: "numBagsBalance", title: "Balance Bags", class: "text-center" },
                { data: "locationCodes", title: "Locations", visible: false },
                { data: "lodgementDate", title: "Lodgement Date", render : function(lodgementDate) { return DateTime.fromISO(lodgementDate).toLocal().toFormat('dd-MM-yyyy');}  },
                { data: "numMonthsLodged", title: "Months Lodged", render: function(numMonthsLodged) { return ( numMonthsLodged + " Months"); } },
                { data: "chargesPaid.hamaliCharges", title: "Hamali Paid", visible: false, class: "text-right" },
                { data: "chargesPaid.kataCoolieCharges", title: "Kata Coolie Paid", visible: false, class: "text-right" },
                { data: "chargesPaid.platformCoolieCharges", title: "Platform Coolie Paid", visible: false, class: "text-right" },
                { data: "chargesPaid.mamulluCharges", title: "Mamullu Paid", visible: false, class: "text-right" },
                { data: "chargesPaid.transportCharges", title: "Transport Charges Paid", visible: false, class: "text-right" },
                { data: "chargesPaid.totalChargesPaid", title: "Total Charges Paid", class: "text-right"  },
                { data: "chargesReceivable.nonHamaliChargesPaid", title: "Non Hamali Charges Paid", class: "text-right"  },
                { data: "rentals.rentalYear", title: "Rental Year", class: "text-center"  },
                { data: "rentals.rentalMode", title: "Rental Mode", class: "text-center"  },
                { data: "rentals.rentReceivableOnDeliveredBags", title: "Rent Receivable on Delivered Bags", class: "text-right"  }
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true
        };
    },
    async created() {
        getDeliveries().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>