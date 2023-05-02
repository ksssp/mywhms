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
                            <b-button v-if="loadedEntityIsActive" class="btn btn-gradient-danger btn-icon-text" @click="deleteLoadedEntity">
                                <i class="mdi mdi-eye-off btn-icon-prepend"></i>
                                Mark Inactive
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
                                <PaymentTypeForm v-if="editMode" :form-data="loadedEntity" :submit-mode="submitMode" 
                                    @saved="saved" @cancelForm="editCancelled"></PaymentTypeForm>
                                <div class="row" v-else>
                                    <b-table-lite responsive borderless show-empty :fields="entityDetailsTable.fields"
                                        :items="entityDetailsTable.items"> <!-- thead-class="hidden_header" -->
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
import { DateTime } from 'luxon';
import { getPaymentTypeById, updatePaymentType } from "@/services/paymentType.service";
import PaymentTypeForm from "../forms/PaymentTypeForm.vue";
import { formatDate } from '@/services/commons.service';

export default {
    name: "PaymentTypeDetails",
    components: {
        PaymentTypeForm
    },
    data: function () {
        return {
            entityName: "PaymentType",
            entityNamePlural: "PaymentTypes",
            moduleTitle: "Administration",
            pageTitle: "PaymentType Details",
            entityListingUrl: "/administration/paymentTypes/",
            entityTitle: "",
            loadedEntity: {},
            loadedEntityId: null,
            loadedEntityIsActive: false,
            entityDoesNotExistMessage: "The Payment Type you are looking for does not exist.",
            editMode: false,
            submitMode: "update",
            entityDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - PaymentType
                    { infoLabel: "Payment Type", infoValue: "" },
                    { infoLabel: "Payment Category", infoValue: "" },
                    { infoLabel: "Creation Date", infoValue: "" },
                    { infoLabel: "Last Modified Date", infoValue: "" },
                    { infoLabel: "Effective From", infoValue: "" },
                    { infoLabel: "Active Status", infoValue: "" },
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
            // load entity data from backend: entity - PaymentType
            getPaymentTypeById(entityId).then(response => {
                this.loadedEntity = JSON.parse(JSON.stringify(response));
                if(this.loadedEntity != null) {
                    this.entityTitle = this.loadedEntity.paymentType;
                    this.loadedEntityIsActive = DateTime.fromISO(this.loadedEntity.activeUntil).toLocal() > DateTime.now();
                    this.entityDetailsTable.items = [
                        { infoLabel: "Payment Type", infoValue: this.loadedEntity.paymentType },
                        { infoLabel: "Payment Category", infoValue: this.loadedEntity.paymentCategory },
                        { infoLabel: "Creation Date", infoValue: formatDate(this.loadedEntity.creationDate) },
                        { infoLabel: "Last Modified Date", infoValue: formatDate(this.loadedEntity.lastModifiedDate) },
                        { infoLabel: "Effective From", infoValue: formatDate(this.loadedEntity.activeFrom) },
                        { infoLabel: "Active Status", infoValue: this.loadedEntityIsActive ? 'Active' : 'Inactive' },
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
        },
        deleteLoadedEntity(){
            this.$bvModal.msgBoxConfirm('Are you sure you want to mark the ' + this.entityName + ' as inactive?', {
                title: 'Please Confirm',
                size: 'md',
                buttonSize: 'md',
                okVariant: 'danger',
                okTitle: 'Confirm',
                cancelTitle: 'Cancel',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true,
                footerBgVariant: 'light',
                headerBgVariant: 'light'
            }).then(value => {
                if(value==true) {
                    // mark entity data at the backend as inactive: entity - PaymentType
                    this.loadedEntity.activeUntil = DateTime.now();
                    updatePaymentType(this.loadedEntityId, this.loadedEntity).then(response => {
                        if(response.status==true) {
                            this.$router.replace(this.entityListingUrl);
                        } else {
                            console.log(this.entityName, " de-activation failed");
                        }
                    });
                }
            });
        }
    }
}
</script>