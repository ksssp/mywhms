<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                Products
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page">Products</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-12">
                            <h4 class="card-title">Products ( {{ totalRows }} )</h4>
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

import { getProducts } from "@/services/product.service";
import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "ProductsSummaryList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 1,
            footerBgVariant: "light",
            downloadFileName: "productsList",
            fields: [
                { data: "productName", title: "Product Name" },
                { data: "productCategory.productCategoryPrefix", title: "Product Category Prefix" },
                { data: "bagSize", title: "Bag size in kgs", render: function(bagSize) { return (bagSize + " kgs"); }, class: "text-center" },
                { data: "unitName", title: "Storage unit", class: "text-center" },
                { data: "bagSize", title: "#Open Lots", class: "text-center", render: function (bagSize) { return 0; }  },
                { data: "bagSize", title: "#Bags in store", class: "text-center", render: function (bagSize) { return '0 Bags'; }  },
                { data: "bagSize", title: "#Customers", class: "text-center", render: function (bagSize) { return 0; }  },
                { data: "bagSize", title: "Total Charges Paid", class: "text-center", render: function (bagSize) { return 0; } },
                { data: "bagSize", title: "Total Charges Receivable", class: "text-center", render: function (bagSize) { return 0; }  },
                { data: "bagSize", title: "Total Charges Received", class: "text-center", render: function (bagSize) { return 0; }  },
                { data: "bagSize", title: "Total Rent Receivable", class: "text-center", render: function (bagSize) { return 0; }  },
                { data: "bagSize", title: "Total Rent Received", class: "text-center", render: function (bagSize) { return 0; }  },
                { data: "bagSize", title: "Average #Months in store", class: "text-center", render: function (bagSize) { return '0 Months'; }  },
                { data: "computedProductName", title: "Computed Product Name", visible: false },
                { data: "hamaliPerBag", title: "Hamali per bag", class: "text-center", visible: false },
                { data: "platformCooliePerBag", title: "Platform Coolie per bag", class: "text-center", visible: false },
                { data: "kataCooliePerBag", title: "Kata Coolie per bag", class: "text-center", visible: false },
                { data: "mamulluPerBag", title: "Mamullu per bag", class: "text-center", visible: false },
                { data: "insurancePerBag", title: "Insurance per bag", class: "text-center", visible: false },
                { data: "monthlyRentPerBag", title: "Monthly rent per bag", class: "text-center" },
                { data: "yearlyRentPerBag", title: "Yearly rent per bag", class: "text-center" },
                { data: "yearlyRentPerKg", title: " Yearly rent per kg", class: "text-center", visible: false },
                { data: "computedYearlyRentPerBag", title: "Computed Yearly rent per bag", class: "text-center", visible: false  },
                { data: "activeFrom", title: "Effective Date", render : function(activeFrom) { return DateTime.fromISO(activeFrom).toLocal().toFormat('dd-MM-yyyy'); } },
                { data: "activeUntil", title: "Effective Until", visible: false, render : function(activeUntil) { return DateTime.fromISO(activeUntil).toLocal().toFormat('dd-MM-yyyy'); } }
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