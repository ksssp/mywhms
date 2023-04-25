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
                    </div>
                    <br />
                    <b-tabs class="tickets-tab-switch">
                        <b-tab title="Details" active>
                            <div class="mx-4 mx-4 py-2">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <b-table-lite responsive borderless :fields="entityDetailsTable.fields"
                                            :items="entityDetailsTable.items">
                                            <template v-slot:cell(infoValue)="data">
                                                <span v-html="data.value"></span>
                                            </template>
                                        </b-table-lite>
                                    </div>
                                    <div class="col-sm-6">
                                        <b-table-lite responsive borderless :fields="entityRatesTable.fields"
                                            :items="entityRatesTable.items">
                                        </b-table-lite>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab :title="getLotsCountForProduct">
                            <!-- <b-form-group label="Search" label-for="filter-input" label-cols-sm="3"
                                label-align-sm="right" label-size="sm" class="mb-0" >
                                <b-input-group size="sm">
                                    <b-form-input id="filter-input" v-model="lodgementsTable.filter" type="search" placeholder="Type to Search">
                                    </b-form-input>

                                    <b-input-group-append>
                                        <b-button :disabled="!lodgementsTable.filter" @click="lodgementsTable.filter = ''">Clear</b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </b-form-group>
                            <b-form-group label="Per page" label-for="per-page-select" label-cols-sm="6" label-cols-md="4"
                                label-cols-lg="3" label-align-sm="right" label-size="sm" class="mb-0">
                                <b-form-select id="per-page-select" v-model="lodgementsTable.perPage" :options="lodgementsTable.pageOptions" size="sm">
                                </b-form-select>
                            </b-form-group> -->
                            <b-table responsive hover id="table-lodgements-list" :fields="lodgementsTable.fields"
                                :items="lodgementsTable.items" :per-page="lodgementsTable.perPage" :current-page="lodgementsTable.currentPage"
                                :sort-by.sync="lodgementsTable.sortBy" :sort-desc.sync="lodgementsTable.sortDesc">
                                <template #cell(lodgementDate)="data">{{ formatDate(data.value) }}</template>
                                <template #cell(lotNumber)="data">
                                    {{ data.value }}
                                    <b-link :href="getLodgementUrl(data.item)" target="_blank">
                                        <span class="ml-1 mdi mdi-open-in-new btn-icon-prepend"/>
                                    </b-link>
                                </template>
                                <template #cell(stockRelease.lastDeliveryDate)="data">{{ formatDate(data.value) }}</template>
                                <template #cell(isPlatformLot)="data">
                                    <span v-html="getPlatformLotBadge(data.value)"></span>
                                </template>
                            </b-table>
                            <!-- <b-pagination v-model="lodgementsTable.currentPage" :total-rows="lodgementsTable.rows" 
                                :per-page="lodgementsTable.perPage" aria-controls="table-lodgements-list" align="right">
                            </b-pagination> -->
                        </b-tab>
                        <b-tab title="Customers">
                        </b-tab>
                        <b-tab title="Charges & Rents">
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DateTime } from 'luxon';

import { getProductById } from "@/services/product.service";
import { getLodgementsSummaryByProductId } from '@/services/lodgement.service'; 

export default {
    name: "ProductSummaryDetails",
    data: function () {
        return {
            entityName: "Product",
            entityNamePlural: "Products",
            pageTitle: "Product Details",
            entityListingUrl: "/summary/products/",
            entityTitle: "",
            loadedEntity: null,
            loadedEntityId: null,
            loadedEntityIsActive: false,
            entityDoesNotExistMessage: "The product you are looking for does not exist.",
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
            },
            lodgementsTable: {
                fields: [
                    { key: "lotNumber", label: "Lot Number", sortable: true, thStyle: "width: 20%;" },
                    { key: "lodgementDate", label: "Lodgement Date", sortable: true },
                    { key: "customer.customerDisplayName", label: "Customer Name", sortable: true },
                    { key: "numBagsLodged", label: "Lodged Bags", sortable: true },
                    { key: "stockRelease.numBagsDelivered", label: "Delivered Bags", sortable: true },
                    { key: "numBagsBalance", label: "Balance Bags", sortable: true },
                    { key: "stockRelease.numDeliveries", label: "Number of Deliveries", sortable: true }, 
                    { key: "stockRelease.lastDeliveryDate", label: "Most Recent Delivery Date", sortable: true },
                    { key: "chargesPaid.totalChargesPaid", label: "Lodgement Charges Paid" },
                    { key: "chargesReceivable.totalChargesReceivable", label: "Lodgement Charges Receivable" },
                    { key: "stockRelease.totalChargesPaid", label: "Deliveries Charges Paid" },
                    { key: "stockRelease.totalChargesReceivable", label: "Deliveries Charges Receivable" },
                    { key: "chargesReceivable.totalChargesReceivable", label: "Lodgement Charges Receivable" },
                    { key: "rentals.rentalYear", label: "Rental Year" }, 
                    { key: "rentals.rentalMode", label: "Rental Mode" }, 
                    { key: "stockRelease.totalRentReceivable", label: "Rent on Delivered Bags", sortable: true }, 
                    { key: "rentals.rentReceivableOnBalanceBags", label: "Rent on Balance Bags", sortable: true }, 
                    { key: "isPlatformLot", label: "Platform Lot", sortable: true }
                ],
                items: [],
                sortBy: 'name',
                perPage: 10,
                currentPage: 1, 
                sortDesc: false,
                pageOptions: [ 5, 10, 25, 50],
                sortByFormatted: true,
                filter: '',
                filterByFormatted: true,
                sortable: true,
            },
            customersTable: {
                fields: [
                    { key: "lotNumber", label: "Lot Number", sortable: true, thStyle: "width: 20%;" },
                    { key: "lodgementDate", label: "Lodgement Date", sortable: true },
                    { key: "customer.customerDisplayName", label: "Customer Name", sortable: true },
                    { key: "numBagsLodged", label: "Lodged Bags", sortable: true },
                    { key: "stockRelease.numBagsDelivered", label: "Delivered Bags", sortable: true },
                    { key: "numBagsBalance", label: "Balance Bags", sortable: true },
                    { key: "stockRelease.numDeliveries", label: "Number of Deliveries", sortable: true }, 
                    { key: "stockRelease.lastDeliveryDate", label: "Most Recent Delivery Date", sortable: true },
                    { key: "chargesPaid.totalChargesPaid", label: "Lodgement Charges Paid" },
                    { key: "chargesReceivable.totalChargesReceivable", label: "Lodgement Charges Receivable" },
                    { key: "stockRelease.totalChargesPaid", label: "Deliveries Charges Paid" },
                    { key: "stockRelease.totalChargesReceivable", label: "Deliveries Charges Receivable" },
                    { key: "chargesReceivable.totalChargesReceivable", label: "Lodgement Charges Receivable" },
                    { key: "rentals.rentalYear", label: "Rental Year" }, 
                    { key: "rentals.rentalMode", label: "Rental Mode" }, 
                    { key: "rentals.rentReceivableOnDeliveredBags", label: "Rent on Delivered Bags", sortable: true }, 
                    { key: "rentals.rentReceivableOnBalanceBags", label: "Rent on Balance Bags", sortable: true }
                ],
                items: []
            }
        };
    },
    created() {
        this.loadedEntityId = this.$route.params._id;
        this.loadEntityData(this.loadedEntityId);
        this.loadLodgementsData(this.loadedEntityId);
        this.loadCustomersData(this.loadedEntityId);
    },
    methods: {
        loadEntityData(entityId) {
            // load entity data from backend: entity - Product
            getProductById(entityId).then(response => {
                this.loadedEntity = JSON.parse(JSON.stringify(response));
                console.log(this.loadedEntity);
                this.entityTitle = this.loadedEntity.productName;
                this.loadedEntityIsActive = DateTime.fromISO(this.loadedEntity.activeUntil).toLocal() > DateTime.now();
                
                this.entityDetailsTable.items[0].infoValue = this.loadedEntity.productName;
                this.entityDetailsTable.items[1].infoValue = this.loadedEntity.productCategory.productCategoryPrefix;
                this.entityDetailsTable.items[2].infoValue = this.loadedEntity.bagSize + " Kgs " + this.loadedEntity.unitName;
                this.entityDetailsTable.items[3].infoValue = this.loadedEntity.computedProductName;
                this.entityDetailsTable.items[4].infoValue = DateTime.fromISO(this.loadedEntity.creationDate).toLocal().toFormat('dd-MM-yyyy');
                this.entityDetailsTable.items[5].infoValue = DateTime.fromISO(this.loadedEntity.lastModifiedDate).toLocal().toFormat('dd-MM-yyyy');
                this.entityDetailsTable.items[6].infoValue = DateTime.fromISO(this.loadedEntity.activeFrom).toLocal().toFormat('dd-MM-yyyy');
                this.entityDetailsTable.items[7].infoValue = this.loadedEntityIsActive ? 'Active' : 'Inactive';

                this.entityRatesTable.items[0].infoValue = 'Rs. ' + this.loadedEntity.hamaliPerBag + '/-';
                this.entityRatesTable.items[1].infoValue = 'Rs. ' + this.loadedEntity.kataCooliePerBag + '/-';
                this.entityRatesTable.items[2].infoValue = 'Rs. ' + this.loadedEntity.mamulluPerBag + '/-';
                this.entityRatesTable.items[3].infoValue = 'Rs. ' + this.loadedEntity.insurancePerBag + '/-';
                this.entityRatesTable.items[4].infoValue = 'Rs. ' + this.loadedEntity.monthlyRentPerBag + '/-';
                this.entityRatesTable.items[5].infoValue = 'Rs. ' + this.loadedEntity.yearlyRentPerKg + '/-';
                this.entityRatesTable.items[6].infoValue = 'Rs. ' + this.loadedEntity.computedYearlyRentPerBag + '/-';
                this.entityRatesTable.items[7].infoValue = 'Rs. ' + this.loadedEntity.yearlyRentPerBag + '/-';
            });
        },
        loadLodgementsData(productId) {
            getLodgementsSummaryByProductId(productId).then(response => {
                let lodgements = JSON.parse(JSON.stringify(response));
                this.lodgementsTable.items = lodgements;
                console.log(this.lodgementsTable.items);
            });
        },
        loadCustomersData(productId) {
            getLodgementsSummaryByProductId(productId).then(response => {
                let customers = JSON.parse(JSON.stringify(response));
                this.customersTable.items = customers;
            });
        },
        getLodgementUrl(entity) {
            return '/inventory/lodgements/' + entity._id;
        },
        getPlatformLotBadge(isPlatformLot) {
            return isPlatformLot ? `<label class="badge badge-info">Platform Lot</label>` :
                `<label class="badge badge-success">Regular Lot</label>`;
        },
        formatDate(anyDate) {
            return DateTime.fromISO(anyDate).toLocal().toFormat('dd-MM-yyyy');
        }
    },
    computed: {
        getLotsCountForProduct() {
            return 'Lots (' + this.lodgementsTable.items.length + ')';
        }
    }
}
</script>