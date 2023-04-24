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
                            <b-button v-if="loadedEntityIsActive" class="btn btn-gradient-danger btn-icon-text" @click="deleteLoadedEntity">
                                <i class="mdi mdi-eye-off btn-icon-prepend"></i>
                                Mark Inactive
                            </b-button>
                        </div>
                    </div>
                    <br />
                    <b-tabs class="tickets-tab-switch">
                        <b-tab title="Details" active>
                            <div v-if="!editMode" class="mx-2 d-md-flex justify-content-end">
                                <b-button v-on:click="editLoadedEntity" class="btn btn-gradient-primary btn-icon-text">
                                    <i class="mdi mdi-pencil btn-icon-prepend"></i>
                                    Edit
                                </b-button>
                            </div>
                            <div class="mx-4">
                                <ProductCategoryForm v-if="editMode" :form-data="loadedEntity" :submit-mode="submitMode" 
                                    @saved="saved" @cancelForm="editCancelled"></ProductCategoryForm>
                                <div class="row" v-else>
                                    <b-table-lite responsive borderless :fields="entityDetailsTable.fields"
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
import moment from "moment";

import { getProductCategoryById, updateProductCategory } from "@/services/productCategory.service";
import ProductCategoryForm from "../forms/ProductCategoryForm.vue";

export default {
    name: "ProductCategoryDetails",
    components: {
        ProductCategoryForm
    },
    data: function () {
        return {
            entityName: "Product Category",
            entityNamePlural: "Product Categories",
            pageTitle: "Product Category Details",
            entityListingUrl: "/administration/productCategories/",
            entityTitle: "",
            loadedEntity: null,
            loadedEntityId: null,
            loadedEntityIsActive: false,
            entityDoesNotExistMessage: "The Product Category you are looking for does not exist.",
            editMode: false,
            submitMode: "update",
            entityDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Product Category
                    { infoLabel: "Product Category", infoValue: "" },
                    { infoLabel: "Product Variety", infoValue: "" },
                    { infoLabel: "Product Category Prefix", infoValue: "" },
                    { infoLabel: "Yearly Rent per Quintal", infoValue: "" },
                    { infoLabel: "One Side Hamali per Quintal", infoValue: ""},
                    { infoLabel: "Creation Date", infoValue: ""},
                    { infoLabel: "Last Modified Date", infoValue: ""},
                    { infoLabel: "Effective From", infoValue: ""},
                    { infoLabel: "Active Status", infoValue: ""},
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
            // load entity data from backend: entity - Product Category
            getProductCategoryById(entityId).then(response => {
                this.loadedEntity = JSON.parse(JSON.stringify(response));
                console.log(this.loadedEntity);
                if(this.loadedEntity != null) {
                    this.loadedEntityIsActive = !moment().isAfter(this.loadedEntity.activeUntil);
                    this.entityTitle = this.loadedEntity.productCategoryPrefix;
                    this.entityDetailsTable.items[0].infoValue = this.loadedEntity.productCategory;
                    this.entityDetailsTable.items[1].infoValue = this.loadedEntity.productVariety;
                    this.entityDetailsTable.items[2].infoValue = this.loadedEntity.productCategoryPrefix;
                    this.entityDetailsTable.items[3].infoValue = this.loadedEntity.yearlyRentPerQuintal === "" || this.loadedEntity.yearlyRentPerQuintal === null ? "Not defined" :
                         "Rs. " + this.loadedEntity.yearlyRentPerQuintal + "/-";
                    this.entityDetailsTable.items[4].infoValue = this.loadedEntity.oneSideHamaliPerQuintal === "" || this.loadedEntity.oneSideHamaliPerQuintal === null ? "Not defined" :
                         "Rs. " + this.loadedEntity.oneSideHamaliPerQuintal + "/-";
                    this.entityDetailsTable.items[5].infoValue = moment(this.loadedEntity.creationDate).format('DD-MM-YYYY');
                    this.entityDetailsTable.items[6].infoValue = moment(this.loadedEntity.lastModifiedDate).format('DD-MM-YYYY');
                    this.entityDetailsTable.items[7].infoValue = moment(this.loadedEntity.activeFrom).format('DD-MM-YYYY');
                    this.entityDetailsTable.items[8].infoValue = this.loadedEntityIsActive ? 'Active' : 'Inactive';
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
                    // delete entity data at the backend: entity - Product Category
                    this.loadedEntity.activeUntil = Date.now();
                    updateProductCategory(this.loadedEntityId, this.loadedEntity).then(response => {
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