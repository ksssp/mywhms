<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                Trademarks
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Reference Data</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Trademarks</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-6">
                            <h4 class="card-title">Trademarks ( {{ totalRows }} )</h4>
                        </div>
                        <div class="col-md-6" align="right">
                            <a href="/referenceData/trademarks/create">
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
import { getTrademarks } from "@/services/TrademarkService";

import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "TrademarksMasterList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 0,
            footerBgVariant: "light",
            downloadFileName: "trademarksMasterList",
            fields: [
                { data: "trademarkName", title: "Trademark Name" },
                { data: "customerName", title: "Customer Name" },
                { data: "mobileNumber", title: "Mobile Number" },
                { data: "town", title: "Town/Village" },
                { data: "creationDate", title: "Creation Date", render : function(creationDate) { return (new Date(creationDate)).toLocaleDateString();} }
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true
        };
    },
    async created() {
        getTrademarks().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>