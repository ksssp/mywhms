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
                            <a href="/referenceData/products/create">
                                <button type="button"
                                    class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-account-plus btn-icon-prepend"></i>
                                    Create
                                </button>
                            </a>
                        </div>
                    </div>

                    <br />
                    <AppDataTable v-if="items" :download-file-name="downloadFileName" :fields="fields" :fieldDefs="fieldDefs" :table-data="items"></AppDataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { getAllProducts } from "@/services/ProductService";

import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "ProductsMasterList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 1,
            footerBgVariant: "light",
            downloadFileName: "productsMasterList",
            fields: [
                { data : "productName", title: "Product Name" },
                { data : "productSubGroupPrefix", title: "Product Group Prefix" },
                { data : "computedProductName", title: "Computed Product Name" },
                { data: "hamaliPerBag", title: "Hamali per bag", class: "text-center" },
                { data: "platformCooliePerBag", title: "Platform Coolie per bag", class: "text-center" },
                { data: "kataCooliePerBag", title: "Kata Coolie per bag", class: "text-center" },
                { data: "mamulluPerBag", title: "Mamullu per bag", class: "text-center" },
                { data: "monthlyRentPerBag", title: "Monthly rent per bag", class: "text-center" },
                { data: "yearlyRentPerBag", title: "Yearly rent per bag", class: "text-center" },
                { data: "insurancePerBag", title: "Insurance per bag", class: "text-center" },
                { data: "yearlyRentPerKg", title: " Yearly rent per kg", class: "text-center" },
                { data: "bagSize", title: "Bag size in kgs", render: function(bagSize) { return (bagSize + " kgs"); }, class: "text-center" },
                { data: "computedYearlyRentPerBag", title: "Computed Yearly rent per bag", class: "text-center"  },
                { data: "creationDate", title: "Creation Date", render : function(creationDate) { return (new Date(creationDate)).toLocaleDateString();} }
            ],
            fieldDefs: [],
            items: null
        };
    },
    async created() {
        getAllProducts().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    },
}
</script>