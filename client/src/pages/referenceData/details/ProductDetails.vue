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
                <div class="card-body d-sm-flex justify-content-between" v-if="loadedEntity == null">
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
                        <h4 class="card-title" v-if="loadedEntity != null">{{ entityTitle }}</h4>
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
                            <div class="mx-4 mx-4 py-2">
                                <ProductForm v-if="editMode" :form-data="loadedEntity" :submit-mode="submitMode"
                                    @saved="saved" @cancelForm="editCancelled"></ProductForm>
                                <div class="row" v-else>
                                    <div class="col-sm-6">
                                        <b-table-lite responsive borderless :fields="entityDetailsTable.fields"
                                            :items="entityDetailsTable.items"> <!-- thead-class="hidden_header" -->
                                            <template v-slot:cell(infoValue)="data">
                                                <span v-html="data.value"></span>
                                            </template>
                                            </b-table-lite>
                                        </b-table-lite>
                                    </div>
                                    <div class="col-sm-6">
                                        <b-table-lite responsive borderless :fields="entityRatesTable.fields"
                                            :items="entityRatesTable.items"> <!-- thead-class="hidden_header" -->
                                        </b-table-lite>
                                    </div>
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

import { getProductById, deleteProduct } from "@/services/product.service";
import ProductForm from "../forms/ProductForm.vue";

export default {
    name: "ProductDetails",
    components: {
        ProductForm
    },
    data: function () {
        return {
            entityName: "Product",
            entityNamePlural: "Products",
            pageTitle: "Product Details",
            entityListingUrl: "/referenceData/products/",
            entityTitle: "",
            loadedEntity: null,
            loadedEntityId: null,
            loadedEntityIsActive: false,
            entityDoesNotExistMessage: "The product you are looking for does not exist.",
            editMode: false,
            submitMode: "update",
            entityDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "Product Details", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Product
                    { infoLabel: "Product Name", infoValue: "" },
                    { infoLabel: "Product Group", infoValue: "" },
                    { infoLabel: "Storage Unit & Weight", infoValue: "" },
                    { infoLabel: "Computed Product Name", infoValue: "" },
                    { infoLabel: "Creation Date", infoValue: "" },
                    { infoLabel: "Last Modified Date", infoValue: "" },
                    { infoLabel: "Effective From", infoValue: "" },
                    { infoLabel: "Active Status", infoValue: "" },
                ]
            },
            entityRatesTable: {
                fields: [
                    { key: "infoLabel", label: "Charges & Rentals", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Product
                    { infoLabel: "Hamali per Bag", infoValue: "" },
                    { infoLabel: "Kata Coolie per Bag", infoValue: "" },
                    { infoLabel: "Mamullu per Bag", infoValue: "" },
                    { infoLabel: "Insurance per Bag", infoValue: "" },
                    { infoLabel: "Monthly Rent per Bag", infoValue: "" },
                    { infoLabel: "Yearly Rent per Kg", infoValue: "" },
                    { infoLabel: "Computed Yearly Rent per Kg", infoValue: "" },
                    { infoLabel: "Yearly Rent per Bag", infoValue: "" }

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
            // load entity data from backend: entity - Product
            getProductById(entityId).then(response => {
                this.loadedEntity = JSON.parse(JSON.stringify(response));
                console.log(this.loadedEntity);
                if (this.loadedEntity != null) {
                    this.entityTitle = this.loadedEntity.productName;
                    this.loadedEntityIsActive = !moment().isAfter(this.loadedEntity.activeUntil);
                    this.entityDetailsTable.items[0].infoValue = this.loadedEntity.productName;
                    this.entityDetailsTable.items[1].infoValue = `${this.loadedEntity.productCategory.productCategoryPrefix} 
                        <a href="/referenceData/productCategories/${this.loadedEntity.productCategory.productCategoryId}/" target="blank"><span class="ml-1 mdi mdi-open-in-new btn-icon-prepend"/></a>`;
                    this.entityDetailsTable.items[2].infoValue = this.loadedEntity.bagSize + " Kgs " + this.loadedEntity.unitName;
                    this.entityDetailsTable.items[3].infoValue = this.loadedEntity.computedProductName;
                    this.entityDetailsTable.items[4].infoValue = moment(this.loadedEntity.creationDate).format('DD-MM-YYYY');
                    this.entityDetailsTable.items[5].infoValue = moment(this.loadedEntity.lastModified).format('DD-MM-YYYY');
                    this.entityDetailsTable.items[6].infoValue = moment(this.loadedEntity.activeFrom).format('DD-MM-YYYY');
                    this.entityDetailsTable.items[7].infoValue = this.loadedEntityIsActive ? 'Active' : 'Inactive';
                    

                    this.entityRatesTable.items[0].infoValue = 'Rs. ' + this.loadedEntity.hamaliPerBag + '/-';
                    this.entityRatesTable.items[1].infoValue = 'Rs. ' + this.loadedEntity.kataCooliePerBag + '/-';
                    this.entityRatesTable.items[2].infoValue = 'Rs. ' + this.loadedEntity.mamulluPerBag + '/-';
                    this.entityRatesTable.items[3].infoValue = 'Rs. ' + this.loadedEntity.insurancePerBag + '/-';
                    this.entityRatesTable.items[4].infoValue = 'Rs. ' + this.loadedEntity.monthlyRentPerBag + '/-';
                    this.entityRatesTable.items[5].infoValue = 'Rs. ' + this.loadedEntity.yearlyRentPerKg + '/-';
                    this.entityRatesTable.items[6].infoValue = 'Rs. ' + this.loadedEntity.computedYearlyRentPerBag + '/-';
                    this.entityRatesTable.items[7].infoValue = 'Rs. ' + this.loadedEntity.yearlyRentPerBag + '/-';
                }
            });
        },
        editLoadedEntity() {
            this.editMode = true;
        },
        editCancelled() {
            this.editMode = false;
        },
        saved(saveActionStatus) {
            if (saveActionStatus) {
                this.loadEntityData(this.loadedEntityId);
                this.editMode = false;
            }
        },
        deleteLoadedEntity() {
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
                if (value == true) {
                    // delete entity data at the backend: entity - Product
                    this.loadedEntity.activeUntil = Date.now();
                    updateProduct(this.loadedEntityId, this.loadedEntity).then(response => {
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