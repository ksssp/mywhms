<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                Bank Account Transactions
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Payments & Receipts</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Bank Account Transactions</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-6">
                            <h4 class="card-title">Bank Account Transactions ( {{ totalRows }} )</h4>
                        </div>
                        <div class="col-md-6" align="right">
                            <a :href="entityCreateUrl">
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
import { DateTime } from 'luxon';
import { getBankAccountTransactions } from "@/services/bankAccountTransaction.service";

import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "BankAccountsList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 0,
            entityCreateUrl: "/accounting/bankAccountTransactions/create/",
            footerBgVariant: "light",
            downloadFileName: "bankAccountTransactionsList",
            fields: [
                { data: "transactionDate", title: "Transaction Date", render : function(transactionDate) { return DateTime.fromISO(transactionDate).toLocal().toFormat('dd-MM-yyyy'); } },
                { data: "bankAccount.bankAccountName", title: "Bank Account Name" },
                { data: "amount", title: "Amount" },
                { data: "transactionMode", title: "Credit/Debit", 
                    render : function(transactionMode) { 
                        return transactionMode == 'debit' ? `<label class="badge badge-info">Debit</label>` :
                                `<label class="badge badge-success">Credit</label>`; 
                    }  
                },
                { data: "transactionDetails", title: "Transaction Details" }
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true
        };
    },
    async created() {
        getBankAccountTransactions().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>