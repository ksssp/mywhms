<template>
    <div class="tables">
        <table class="app-table table hover row-border stripe order-column" style="width: 100%"></table>
    </div>
</template>

<script lang="js">
import router from "@/router";

import $ from "jquery";

import jszip from 'jszip';
import 'datatables.net-buttons-bs4';
import 'datatables.net-buttons/js/buttons.colVis.mjs';
import 'datatables.net-buttons/js/buttons.html5.mjs';
import 'datatables.net-colreorder-bs4';

export default {
    name: "AppDataTable",
    props: [
        "downloadFileName",
        "fields",
        "fieldDefs",
        "tableData",
        "isMainTable",
        "hasClickThrough"
    ],
    components: {
    },
    data: function () {
        return {
            totalRows: this.tableData.length,
            exportFileName: this.downloadFileName,
            customDom: this.isMainTable == false ? "" :  "<'row'<'col-md-2'l><'col-md-4'f><'col-md-6'B>>" +
                                                            "<'row'<'col-md-12'tr>>" +
                                                            "<'row'<'col-md-5'i><'col-md-7'p>>",
            buttonsList: this.isMainTable == false ? [] : [ 
                {
                    extend: 'collection',
                    text: 'Export',
                    autoClose: true,
                    buttons: [ 
                        {
                            extend: 'csv',
                            text: "Export as CSV",
                            exportOptions: { columns: ':visible' } 
                        },
                        {
                            extend: 'excelHtml5',
                            text: "Export as Excel",
                            exportOptions: { columns: ':visible' } 
                        }
                    ],
                    collectionLayout: 'dropdown'
                },
                {
                    extend: 'colvis',
                    text: 'Show/Hide Columns',
                    postfixButtons: ['colvisRestore']

                }
            ],
        };
    },
    mounted() {
        this.exportFileName = this.downloadFileName;
        var table = $("table.app-table").DataTable({
            paging: true,
            searching:  true,
            order: [],
            ordering:  true,
            scrollX:  true,
            columns: this.fields,
            columnDefs: this.fieldDefs,
            data: this.tableData,
            colReorder: true,
            dom: this.customDom,
            buttons: this.buttonsList
        });

        if(this.hasClickThrough) {
            $('table.app-table tbody').on('click', 'tr', function () {
                var data = table.row(this).data();
                router.push(data._id);
            });
        }
        
    },
    methods: {
        edit(item, index, button) {
            // this.infoModal.title = `Row index: ${index}`
            // this.infoModal.content = JSON.stringify(item, null, 2)
            // this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        },
        delete(item, index, button) {
            // this.infoModal.title = `Row index: ${index}`
            // this.infoModal.content = JSON.stringify(item, null, 2)
            // this.$root.$emit('bv::show::modal', this.infoModal.id, button)
        }
    }
}
</script>