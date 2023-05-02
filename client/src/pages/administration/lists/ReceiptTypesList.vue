<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                {{ pageTitle }}
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">{{ moduleTitle }}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{{ pageTitle }}</li>
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
                        :fieldDefs="fieldDefs" :table-data="items" :is-main-table="isMainTable"
                        :has-click-through="hasClickThrough"></AppDataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDate } from '@/services/commons.service';
import { getReceiptTypes } from "@/services/receiptType.service";

import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "ReceiptTypesList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            moduleTitle: 'Administration',
            pageTitle: 'Receipt Types',
            totalRows: 0,
            entityCreateUrl: "/administration/receiptTypes/create/",
            footerBgVariant: "light",
            downloadFileName: "receiptTypesList",
            fields: [
                { data: "receiptType", title: "Receipt Type" },
                { data: "receiptCategory", title: "Receipt Category" },
                { data: "receiptSource", title: "Receipt Source" },
                { data: "creationDate", title: "Creation Date", render : function(creationDate) { return formatDate(creationDate); } },
                { data: "activeFrom", title: "Effective Date", render : function(activeFrom) { return formatDate(activeFrom); } },
                { data: "activeUntil", title: "Effective Until", visible: false, render : function(activeUntil) { return formatDate(activeUntil); } },
                { data: "lastModifiedDate", title: "Last Modified Date", visible: false, render : function(lastModifiedDate) { return formatDate(lastModifiedDate); } }              
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true,
            hasClickThrough: true
        };
    },
    async created() {
        getReceiptTypes().then(response => {
            this.items = response;
            console.log(this.items);
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>