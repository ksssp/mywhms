<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                Product Categories
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Reference Data</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Product Categories</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-6">
                            <h4 class="card-title">Product Categories ( {{ totalRows }} )</h4>
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

import { getProductCategories } from "@/services/productCategory.service";

import AppDataTable from "@/components/tables/AppDataTable.vue";
import moment from "moment";

export default {
    name: "ProductCategoriesList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 0,
            footerBgVariant: "light",
            entityCreateUrl: "/administration/productCategories/create",
            downloadFileName: "productCategoriesList",
            fields: [
                { data: "productCategory", title: "Product Category" },
                { data: "productVariety", title: "Product Variety" },
                { data: "productCategoryPrefix", title: "Product Category Prefix" },
                { data: "oneSideHamaliPerQuintal", title: "One Side Hamali per quintal", visible: false, class: 'text-center' },
                { data: "yearlyRentPerQuintal", title: "Yearly rent per quintal", class: 'text-center' },
                { data: "creationDate", title: "Creation Date", render : function(creationDate) { return moment(creationDate).format('DD-MM-YYYY'); } },
                { data: "activeFrom", title: "Effective Date", render : function(activeFrom) { return moment(activeFrom).format('DD-MM-YYYY'); } },
                { data: "activeUntil", title: "Effective Until", visible: false, render : function(activeUntil) { return moment(activeUntil).format('DD-MM-YYYY'); } },
                { data: "lastModifiedDate", title: "Last Modified Date", visible: false, render : function(lastModifiedDate) { return moment(lastModifiedDate).format('DD-MM-YYYY'); } }
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true
        };
    },
    async created() {
        getProductCategories().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>