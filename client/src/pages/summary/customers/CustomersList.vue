<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                Customers
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item active" aria-current="page">Customers</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-6">
                            <h4 class="card-title">Customers ( {{ totalRows }} )</h4>
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
import { DateTime } from 'luxon';
import { getCustomers } from "@/services/customer.service";

import AppDataTable from "@/components/tables/AppDataTable.vue";

export default {
    name: "CustomersList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            totalRows: 0,
            footerBgVariant: "light",
            downloadFileName: "customersList",
            fields: [
                { data: "customerCode", title: "Customer Code" },
                { data: "customerName", title: "Customer Name" },
                { data: "mobileNumber", title: "Mobile Number", visible: false },
                { data: "town", title: "Town/Village" },
                { data: "creationDate", title: "Creation Date", visible: false, render : function(creationDate) { return DateTime.fromISO(creationDate).toLocal().toFormat('dd-MM-yyyy'); } },
                { data: "activeFrom", title: "Effective Date", visible: false, render : function(activeFrom) { return DateTime.fromISO(activeFrom).toLocal().toFormat('dd-MM-yyyy'); } },
                { data: "activeUntil", title: "Effective Until", visible: false, render : function(activeUntil) { return DateTime.fromISO(activeUntil).toLocal().toFormat('dd-MM-yyyy'); } },
                { data: "lastModifiedDate", title: "Last Modified Date", visible: false, render : function(lastModifiedDate) { return DateTime.fromISO(lastModifiedDate).toLocal().toFormat('dd-MM-yyyy'); } },
                { data: "mobileNumber", title: "#Open Lots", class: "text-center", render: function (mobileNumber) { return 0; }  },
                { data: "mobileNumber", title: "#Products", class: "text-center", render: function (mobileNumber) { return 0; }  },
                { data: "mobileNumber", title: "#Bags in store", class: "text-center", render: function (mobileNumber) { return '0 Bags'; }  },
                { data: "mobileNumber", title: "Total Charges Paid", class: "text-center", render: function (mobileNumber) { return 0; } },
                { data: "mobileNumber", title: "Total Charges Receivable", class: "text-center", render: function (mobileNumber) { return 0; }  },
                { data: "mobileNumber", title: "Total Charges Received", class: "text-center", render: function (mobileNumber) { return 0; }  },
                { data: "mobileNumber", title: "Total Rent Receivable", class: "text-center", render: function (mobileNumber) { return 0; }  },
                { data: "mobileNumber", title: "Total Rent Received", class: "text-center", render: function (mobileNumber) { return 0; }  },
                { data: "mobileNumber", title: "Average Lot duration", class: "text-center", render: function (mobileNumber) { return '0 Months'; }  },
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true,
            hasClickThrough: true
        };
    },
    async created() {
        getCustomers().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    }
}
</script>