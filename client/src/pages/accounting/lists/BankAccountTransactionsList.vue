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
import { getBankAccountTransactions } from "@/services/bankAccountTransaction.service";

import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "BankAccountTransactionsList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 0,
            entityCreateUrl: "/accounting/bankAccountTransactions/create/",
            footerBgVariant: "light",
            downloadFileName: "bankAccountTransactionsList",
            moduleTitle: 'Payments & Receipts',
            pageTitle: 'Bank Account Transactions',
            fields: [
                { data: "transactionDate", title: "Transaction Date", render: function(transactionDate) { return formatDate(transactionDate); } },
                { data: "bankAccount.bankAccountName", title: "Bank Account Name" },
                { data: "amount", title: "Amount", class: "text-right", render: function(amount) { return formatNumber(amount); } },
                {
                    data: "transactionMode", title: "Credit/Debit", class: "text-center",
                    render: function (transactionMode) {
                        return transactionMode == 'debit' ? `<label class="badge badge-info">Withdrawal</label>` :
                            `<label class="badge badge-success">Deposit</label>`;
                    }
                },
                { data: "transactionDetails", title: "Transaction Details" }
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true,
            hasClickThrough: true
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