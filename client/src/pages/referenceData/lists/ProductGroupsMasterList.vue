<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                Product Groups
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Reference Data</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Product Groups</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-6">
                            <h4 class="card-title">Product Groups ( {{ totalRows }} )</h4>
                        </div>
                        <div class="col-md-6" align="right">
                            <a href="/referenceData/productGroups/create/">
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

import { getProductGroups } from "@/services/ProductGroupService";

import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "ProductGroupsMasterList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 0,
            footerBgVariant: "light",
            downloadFileName: "productGroupsMasterList",
            fields: [
                { data: "productGroup", title: "Product Group" },
                { data: "productSubGroup", title: "Product Subgroup" },
                { data: "productSubGroupPrefix", title: "Product Group Prefix" },
                { data: "onesideHamaliPerQuintal", title: "One Side Hamali per quintal", visible: false, class: 'text-center' },
                { data: "yearlyRentPerQuintal", title: "Yearly rent per quintal", class: 'text-center' },
                // { data: "", title: "Number of Product Varieties", class: 'text-center'},
                { data: "creationDate", title: "Creation Date", render : function(creationDate) { return (new Date(creationDate)).toLocaleDateString();} }
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true
        };
    },
    async created() {
        getProductGroups().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>