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

import { DateTime } from 'luxon';
import { getLodgements } from "@/services/lodgement.service";

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
                { data: "lodgementDate", title: "Lodgement Date", render : function(lodgementDate) { return DateTime.fromISO(lodgementDate).toFormat('dd-MM-yyyy'); } },
                { data: "lotNumber", title: "Lot Number" },
                { data: "customer.customerDisplayName", title: "Customer Name" },
                { data: "product.productName", title: "Product Name" },
                { data: "numBagsLodged", title: "Lodged Bags", class: "text-center" },
                { data: "numBagsBalance", title: "Balance Bags", class: "text-center" },
                { data: "stockRelease.numBagsDelivered", title: "Delivered Bags", class: "text-center" },
                { data: "stockRelease.numDeliveries", title: "Deliveries till date", class: "text-center" },
                { data: "locationCodes", title: "Locations", visible: false },
                { data: "chargesPaid.hamaliCharges", title: "Hamali Paid", class: "text-right", visible: false,  },
                { data: "chargesPaid.kataCoolieCharges", title: "Kata Coolie Paid", visible: false, class: "text-right" },
                { data: "chargesPaid.platformCoolieCharges", title: "Platform Coolie Paid", visible: false, class: "text-right" },
                { data: "chargesPaid.mamulluCharges", title: "Mamullu Paid", visible: false, class: "text-right" },
                { data: "chargesPaid.transportCharges", title: "Transport Charges Paid", visible: false,  class: "text-right" },
                { data: "chargesPaid.totalChargesPaid", title: "Total Charges Paid", class: "text-right"  },
                { data: "chargesReceivable.hamaliCharges", title: "Hamali Charges Receivable", visible: false, class: "text-right" },
                { data: "chargesReceivable.insuranceCharges", title: "Insurance Charges Receivable", visible: false, class: "text-right" },
                { data: "chargesReceivable.nonHamaliChargesPaid", title: "Non Hamali Charges Paid", visible: false, class: "text-right" },
                { data: "chargesReceivable.totalChargesReceivable", title: "Total Charges Receivable", class: "text-right" },
                { data: "rentals.rentalMode", title: "Rental Mode", class: "text-center"  },
                { data: "rentals.rentalYear", title: "Rental Year", class: "text-center" },
                { data: "stockRelease.totalRentReceivable", title: "Rent Receivable on delivered bags", class: "text-center" },
                { data: "rentals", title: "Rental rate", class: "text-left", visible: false, render: function(rentals) { return rentals.rentalMode == 'Monthly' ? rentals.monthlyRentPerBag : rentals.yearlyRentPerBag; } }
                
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true
        };
    },
    async created() {
        getLodgements().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>