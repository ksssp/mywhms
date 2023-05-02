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
                                    <i class="mdi mdi-cash-plus btn-icon-prepend"></i>
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
import { getEmployeeTransactions } from "@/services/employeeTransaction.service";

import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "EmployeeTransactionsList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 0,
            entityCreateUrl: "/accounting/employeeTransactions/create/",
            footerBgVariant: "light",
            downloadFileName: "employeeTransactionsList",
            moduleTitle: 'Payments & Receipts',
            pageTitle: 'Employee Transactions',
            fields: [
                { data: "transactionDate", title: "Transaction Date", render: function(transactionDate) { return formatDate(transactionDate); } },
                { data: "employee.employeeFullName", title: "Employee Name" },
                { data: "employeeTransactionType.employeeTransactionType", title: "Transaction Type" },
                { data: "transactionMode", title: "Transaction Mode", class: "text-center", 
                    render: function (transactionMode) {
                        return transactionMode == 'Payment' ? `<label class="badge badge-info">Payment</label>` :
                            `<label class="badge badge-success">Receipt</label>`;
                    } },
                { data: "amount", title: "Amount", class: "text-right", render: function(amount) { return formatNumber(amount);} },
                { data: "transactionDetails", title: "Transaction Details" }
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true,
            hasClickThrough: true
        };
    },
    async created() {
        getEmployeeTransactions().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>