<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                Products
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Reference Data</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Products</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-6">
                            <h4 class="card-title">Products ( {{ totalRows }} )</h4>
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
import moment from "moment";

import { getProducts } from "@/services/product.service";
import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "ProductsList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 1,
            entityCreateUrl: "/referenceData/products/create/",
            footerBgVariant: "light",
            downloadFileName: "productsList",
            fields: [
                { data: "productName", title: "Product Name" },
                { data: "productCategory.productCategoryPrefix", title: "Product Category Prefix" },
                { data: "bagSize", title: "Bag size in kgs", render: function(bagSize) { return (bagSize + " kgs"); }, class: "text-center" },
                { data: "unitName", title: "Storage unit", class: "text-center"  },
                { data: "computedProductName", title: "Computed Product Name" },
                { data: "hamaliPerBag", title: "Hamali per bag", class: "text-center" },
                { data: "platformCooliePerBag", title: "Platform Coolie per bag", class: "text-center" },
                { data: "kataCooliePerBag", title: "Kata Coolie per bag", class: "text-center" },
                { data: "mamulluPerBag", title: "Mamullu per bag", class: "text-center" },
                { data: "insurancePerBag", title: "Insurance per bag", class: "text-center" },
                { data: "monthlyRentPerBag", title: "Monthly rent per bag", class: "text-center" },
                { data: "yearlyRentPerBag", title: "Yearly rent per bag", class: "text-center" },
                { data: "yearlyRentPerKg", title: " Yearly rent per kg", class: "text-center", visible: false },
                { data: "computedYearlyRentPerBag", title: "Computed Yearly rent per bag", class: "text-center", visible: false  },
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
        getProducts().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    },
}
</script>