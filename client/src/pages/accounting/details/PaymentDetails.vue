<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                {{ pageTitle }}
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">{{ moduleTitle }}</a></li>
                    <li class="breadcrumb-item"><a :href="entityListingUrl">{{ entityNamePlural }}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{{ pageTitle }}</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body d-sm-flex justify-content-between" v-if="loadedEntity==null">
                    <h4 class="card-title">{{ entityDoesNotExistMessage }}</h4>
                    <a :href="entityListingUrl">
                        <b-button class="btn btn-gradient-primary btn-icon-text">
                            <i class="mdi mdi-arrow-left-bold-circle btn-icon-prepend"></i>
                            Go back
                        </b-button>
                    </a>
                </div>
                <div class="card-body" v-else>
                    <div class="d-sm-flex pb-2 mb-2 justify-content-between">
                        <h4 class="card-title" v-if="loadedEntity!=null">{{ entityTitle }}</h4>
                        <div>
                            <b-button class="btn btn-gradient-danger btn-icon-text">
                                <i class="mdi mdi-printer btn-icon-prepend"></i>
                                Print Receipt
                            </b-button>
                        </div>
                    </div>
                    <br />
                    <b-tabs class="tickets-tab-switch">
                        <b-tab title="Overview" active>
                            <div v-if="!editMode" class="mx-2 d-md-flex justify-content-end">
                                <b-button v-on:click="editLoadedEntity" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-pencil btn-icon-prepend"></i>
                                    Edit
                                </b-button>
                            </div>
                            <div class="mx-4">
                                <PaymentForm v-if="editMode" :form-data="loadedEntity" :submit-mode="submitMode" 
                                    @saved="saved" @cancelForm="editCancelled"></PaymentForm>
                                <div class="row" v-else>
                                    <b-table-lite responsive borderless show-empty :fields="entityDetailsTable.fields"
                                        :items="entityDetailsTable.items">
                                    </b-table-lite>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDate, formatNumber } from '@/services/commons.service';
import { getPaymentById } from "@/services/payment.service";
import PaymentForm from '@/pages/accounting/forms/PaymentForm.vue';

export default {
    name: "PaymentDetails",
    components: {
        PaymentForm
    },
    data: function () {
        return {
            entityName: "Payments",
            entityNamePlural: "Payments",
            moduleTitle: "Accounting",
            pageTitle: "Payment Details",
            entityListingUrl: "/accounting/payments/",
            entityTitle: "",
            loadedEntity: {},
            loadedEntityId: null,
            loadedEntityIsActive: false,
            entityDoesNotExistMessage: "The transaction you are looking for does not exist.",
            editMode: false,
            submitMode: "update",
            entityDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "Transaction Details", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Employee Transaction
                    { infoLabel: "Transaction Date", infoValue: "" },
                    { infoLabel: "Employee Name", infoValue: "" },
                    { infoLabel: "Transaction Type", infoValue: "" },
                    { infoLabel: "Transaction Mode", infoValue: "" },
                    { infoLabel: "Amount", infoValue: "" },
                    { infoLabel: "Transaction Details", infoValue: "" }
                ]
            }
        };
    },
    created() {
        this.loadedEntityId = this.$route.params._id;
        this.loadEntityData(this.loadedEntityId);
    },
    methods: {
        loadEntityData(entityId) {
            // load entity data from backend: entity - Employee
            getPaymentById(entityId).then(response => {
                this.loadedEntity = JSON.parse(JSON.stringify(response));
                if(this.loadedEntity != null) {
                    this.entityTitle = this.loadedEntity.paymentType.paymentType;
                    if(this.loadedEntity.employee != null)
                    this.entityTitle += ' ( ' + this.loadedEntity.employee.employeeFullName + ' )';
                    this.entityDetailsTable.items = [
                        { infoLabel: "Transaction Date", infoValue: formatDate(this.loadedEntity.transactionDate) },
                        { infoLabel: "Employee Name", infoValue: this.loadedEntity.employee == null ? 'None' : this.loadedEntity.employee.employeeFullName },
                        { infoLabel: "Transaction Type", infoValue: this.loadedEntity.paymentType.paymentType },
                        { infoLabel: "Transaction Mode", infoValue: this.loadedEntity.transactionMode },
                        { infoLabel: "Amount", infoValue: formatNumber(this.loadedEntity.amount) },
                        { infoLabel: "Transaction Details", infoValue: this.loadedEntity.transactionDetails }
                    ];
                }
            });
        },
        editLoadedEntity() {
            this.editMode=true;
        },
        editCancelled() {
            this.editMode=false;
        },
        saved(saveActionStatus) {
            if(saveActionStatus) {
                this.loadEntityData(this.loadedEntityId);
                this.editMode=false;
            }
        }
    }
}
</script>