<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                Employees
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Reference Data</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Employees</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="row template-demo">
                        <div class="col-md-6">
                            <h4 class="card-title">Employees ( {{ totalRows }} )</h4>
                        </div>
                        <div class="col-md-6" align="right">
                            <a href="/referenceData/employees/create">
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
import AppDataTable from "@/components/tables/AppDataTable.vue";
import { getEmployees } from "@/services/EmployeeService";

export default {
    name: "EmployeesMasterList",
    components: {
        AppDataTable
    },
    data: function () {
        return {
            createModalProps: {
                detailsModalTitle: "Create an Employee",
                upsertDataUrl: "/api/referenceData/employee/",
                submitAction: "create",
                inputObject: {
                    _id: null,
                    employeeCode: null,
                    employeeFullName: null,
                    designation: null,
                    monthlySalary: null,
                    creationDate: null
                },
            },
            totalRows: 0,
            footerBgVariant: "light",
            downloadFileName: "employeesMasterList",
            fields: [
                { data: "employeeCode", title: "Employee Code" },
                { data: "employeeFullName", title: "Employee Name" },
                { data: "designation", title: "Designation" },
                { data: "monthlySalary", title: "Monthly Salary", class: 'text-center' },
                { data: "creationDate", title: "Creation Date", render : function(creationDate) { return (new Date(creationDate)).toLocaleDateString();} }
            ],
            fieldDefs: [],
            items: null,
            isMainTable: true
        };
    },
    async created() {
        getEmployees().then(response => {
            this.items = response;
            this.totalRows = this.items.length;
        }).catch(error => {
            console.log(error);
        });
    },
}

// editRowModalProps: {
//     modalComponentName: "EmployeeDetailsModal",
//     detailsModalTitle: "Edit Employee Details",
//     upsertDataUrl: "/api/referenceData/employees/",
//     submitAction: "update",
//     inputObject: {
//         _id: null,
//         employeeCode: null,
//         employeeFullName: null,
//         designation: null,
//         monthlySalary: null,
//         creationDate: null
//     }
// }

// importModalProps : {
//     importModalTitle: "Import Employees",
//     importDataUrl: "javascript:void(0);",
// },
</script>