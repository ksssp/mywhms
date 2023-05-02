<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                {{ pageTitle }}
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">{{ moduleTitle }}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{{ pageTitle }} </li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-6">
                            <h4 class="card-title">{{ pageTitle }} ( {{ totalRows }} )</h4>
                        </div>
                        <div class="col-md-6" align="right">
                            <a :href="entityCreateUrl">
                                <button type="button" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-account-plus btn-icon-prepend"></i>
                                    Add a Transaction
                                </button>
                            </a>
                        </div>
                    </div>

                    <br />
                    <AppDataTable v-if="items" :download-file-name="downloadFileName" :fields="fields"
                        :fieldDefs="fieldDefs" :table-data="items" :is-main-table="isMainTable"
                        :has-click-through="hasClickThrough"></AppDataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDate, formatNumber } from '@/services/commons.service';
import { getCustomerTransactions } from "@/services/customerTransaction.service";

import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "CustomerTransactionsList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 0,
            entityCreateUrl: "/accounting/customerTransactions/create/",
            footerBgVariant: "light",
            downloadFileName: "customerTransactionsList",
            moduleTitle: 'Payments & Receipts',
            pageTitle: 'Customer Transactions',
            fields: [
                { data: "transactionDate", title: "Transaction Date", render: function(transactionDate) { return formatDate(transactionDate); } },
                { data: "customer", title: "Customer Name", render: function(customer) { return customer.customerDisplayName; } },
                { data: "rentalMode", title: "Rental Mode" },
                { data: "rentalYear", title: "Rental Year" },
                { data: "rentReceived", title: "Rent Received", render: function(rentReceived) { return formatNumber(rentReceived); } },
                { data: "rentDiscount", title: "Rent Discount", render: function(rentDiscount) { return formatNumber(rentDiscount); } },
                { data: "chargesReceived", title: "Charges Received", render: function(chargesReceived) { return formatNumber(chargesReceived); } },
                { data: "totalAmountReceived", title: "Total Amount Received", render: function(totalAmountReceived) { return formatNumber(totalAmountReceived); } },
                { data: "transactionDetails", title: "Transaction Details" }
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true,
            hasClickThrough: true
        };
    },
    async created() {
        getCustomerTransactions().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>