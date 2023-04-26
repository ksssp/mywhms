<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                Bank Accounts
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Administration</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Bank Accounts</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-6">
                            <h4 class="card-title">Bank Accounts ( {{ totalRows }} )</h4>
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
import { getBankAccounts } from "@/services/bankAccount.service";

import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "BankAccountsList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 0,
            entityCreateUrl: "/administration/bankAccounts/create/",
            footerBgVariant: "light",
            downloadFileName: "bankAccountsList",
            fields: [
                { data: "bankAccountName", title: "Bank Account Name" },
                { data: "bankName", title: "Bank Name" },
                { data: "bankAccountNumber", title: "Account Number" },
                { data: "bankBranch", title: "Branch" },
                { data: "creationDate", title: "Creation Date", render : function(creationDate) { return DateTime.fromISO(creationDate).toLocal().toFormat('dd-MM-yyyy'); } },
                { data: "activeFrom", title: "Effective Date", render : function(activeFrom) { return DateTime.fromISO(activeFrom).toLocal().toFormat('dd-MM-yyyy'); } },
                { data: "activeUntil", title: "Effective Until", visible: false, render : function(activeUntil) { return DateTime.fromISO(activeUntil).toLocal().toFormat('dd-MM-yyyy'); } },
                { data: "lastModifiedDate", title: "Last Modified Date", visible: false, render : function(lastModifiedDate) { return DateTime.fromISO(lastModifiedDate).toLocal().toFormat('dd-MM-yyyy'); } }
                
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true
        };
    },
    async created() {
        getBankAccounts().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>