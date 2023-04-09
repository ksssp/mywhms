<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                {{ pageTitle }}
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">Reference Data</a></li>
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
                            <b-button class="btn btn-gradient-danger btn-icon-text" @click="deleteLoadedEntity">
                                <i class="mdi mdi-delete btn-icon-prepend"></i>
                                Delete
                            </b-button>
                            <b-button class="btn btn-gradient-primary btn-icon-text">
                                <i class="mdi mdi-printer btn-icon-prepend"></i>
                                Print
                            </b-button>
                        </div>
                    </div>
                    <br />
                    <b-tabs class="tickets-tab-switch">
                        <b-tab title="Details" active>
                            <div v-if="!editMode" class="d-sm-flex mx-4 py-2 justify-content-between">
                                <h4>Basic Details</h4>
                                <b-button v-on:click="editLoadedEntity" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-pencil btn-icon-prepend"></i>
                                    Edit
                                </b-button>
                            </div>
                            <div class="mx-4">
                                <ProductGroupForm v-if="editMode" :form-data="loadedEntity" :submit-mode="submitMode" 
                                    @saved="saved" @cancelForm="editCancelled"></ProductGroupForm>
                                <div class="row" v-else>
                                    <b-table-lite responsive borderless :fields="entityDetailsTable.fields"
                                        :items="entityDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                    </b-table-lite>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Loans & Payments">
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { getProductGroupById, deleteProductGroup } from "@/services/ProductGroupService";
import ProductGroupForm from "../forms/ProductGroupForm.vue";

export default {
    name: "ProductGroupDetails",
    components: {
        ProductGroupForm
    },
    data: function () {
        return {
            entityName: "Product Group",
            entityNamePlural: "Product Groups",
            pageTitle: "Product Group Details",
            entityListingUrl: "/referenceData/productGroups/",
            entityTitle: "",
            loadedEntity: null,
            loadedEntityId: null,
            entityDoesNotExistMessage: "The Product Group you are looking for does not exist.",
            editMode: false,
            submitMode: "update",
            entityDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Product Group
                    { infoLabel: "Product Group", infoValue: "" },
                    { infoLabel: "Product Sub Group", infoValue: "" },
                    { infoLabel: "Product Sub Group Prefix", infoValue: "" },
                    { infoLabel: "Yearly Rent per Quintal", infoValue: "" },
                    { infoLabel: "One side Hamali per Quintal", infoValue: ""},
                    { infoLabel: "Creation Date", infoValue: ""}
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
            // load entity data from backend: entity - Product Group
            getProductGroupById(entityId).then(response => {
                this.loadedEntity = JSON.parse(JSON.stringify(response));
                console.log(this.loadedEntity);
                if(this.loadedEntity != null) {
                    this.entityTitle = this.loadedEntity.productSubGroupPrefix;
                    this.entityDetailsTable.items[0].infoValue = this.loadedEntity.productGroup;
                    this.entityDetailsTable.items[1].infoValue = this.loadedEntity.productSubGroup;
                    this.entityDetailsTable.items[2].infoValue = this.loadedEntity.productSubGroupPrefix;
                    this.entityDetailsTable.items[3].infoValue = this.loadedEntity.yearlyRentPerQuintal == "" || this.loadedEntity.yearlyRentPerQuintal == null ? "" :
                         "Rs. " + this.loadedEntity.yearlyRentPerQuintal + "/-";
                    this.entityDetailsTable.items[4].infoValue = this.loadedEntity.onesideHamaliPerQuintal == "" || this.loadedEntity.onesideHamaliPerQuintal == null ? "" :
                         "Rs. " + this.loadedEntity.onesideHamaliPerQuintal + "/-";
                    this.entityDetailsTable.items[5].infoValue = (new Date(this.loadedEntity.creationDate)).toLocaleDateString();
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
            this.$bvModal.msgBoxConfirm('Are you sure you want to delete the ' + this.entityName + '?', {
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
                    // delete entity data at the backend: entity - Product Group
                    deleteProductGroup(this.loadedEntityId).then(response => {
                        if(response.status==true) {
                            this.$router.replace(this.entityListingUrl);
                        } else {
                            console.log(this.entityName, " deletion failed");
                        }
                    });
                }
            });
        }
    }
}
</script>