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
                    </div>
                    <br />
                    <b-tabs class="tickets-tab-switch">
                        <b-tab title="Overview" active>
                            <div class="row mx-4">
                                <b-table-lite responsive borderless :fields="entityDetailsTable.fields"
                                    :items="entityDetailsTable.items">
                                    <template v-slot:cell(infoValue)="data">
                                        <span v-html="data.value"></span>
                                    </template>
                                </b-table-lite>
                            </div>
                        </b-tab>
                        <b-tab :title="getLotsCountForCustomer">
                            <div class="row mx-4">
                                <b-table responsive hover show-empty id="table-lodgements-list" :fields="lodgementsTable.fields"
                                :items="lodgementsTable.items" :per-page="lodgementsTable.perPage" :current-page="lodgementsTable.currentPage"
                                :sort-by.sync="lodgementsTable.sortBy" :sort-desc.sync="lodgementsTable.sortDesc">
                                <template #cell(lodgementDate)="data">{{ prettyPrintDate(data.value) }}</template>
                                <template #cell(lotNumber)="data">
                                    {{ data.value }}
                                    <b-link :href="getLodgementUrl(data.item)" target="_blank">
                                        <span class="ml-1 mdi mdi-open-in-new btn-icon-prepend"/>
                                    </b-link>
                                </template>
                                <template #cell(stockRelease.lastDeliveryDate)="data">{{ prettyPrintDate(data.value) }}</template>
                                <template #cell(isPlatformLot)="data">
                                    <span v-html="getPlatformLotBadge(data.value)"></span>
                                </template>
                            </b-table>
                            </div>
                        </b-tab>
                        <b-tab title="Charges & Rents">
                            <div class="row mx-4">
                            </div>
                        </b-tab>
                        <b-tab :title="getTransactionsCountForCustomer">
                            <div class="row mx-4">
                                <b-table responsive hover show-empty id="table-transactions-list" :fields="customerTransactionsTable.fields"
                                    :items="customerTransactionsTable.items" :per-page="customerTransactionsTable.perPage" :current-page="customerTransactionsTable.currentPage"
                                    :sort-by.sync="customerTransactionsTable.sortBy" :sort-desc.sync="customerTransactionsTable.sortDesc">
                                    <template #cell(transactionDate)="data">{{ prettyPrintDate(data.value) }}</template>
                                </b-table>
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
import { formatDate, formatNumber } from '@/services/commons.service';
import { getCustomerById } from "@/services/customer.service";
import { getCustomerTransactionsByCustomerId } from '@/services/customerTransaction.service';
import { getLodgementsSummaryByCustomerId } from '@/services/lodgement.service';

export default {
    name: "CustomerSummaryDetails",
    data: function () {
        return {
            entityName: "Customer",
            entityNamePlural: "Customers",
            moduleTitle: "Summary",
            pageTitle: "Customer Details",
            entityListingUrl: "/summary/customers/",
            entityTitle: "",
            loadedEntity: {},
            loadedEntityId: null,
            loadedEntityIsActive: false,
            entityDoesNotExistMessage: "The customer you are looking for does not exist.",
            entityDetailsTable: {
                fields: [
                    { key: "infoLabel", label: "", sortable: false, thStyle: "width: 20%;" },
                    { key: "infoValue", label: "", sortable: false, thStyle: "word-wrap: break-word;" }
                ],
                items: [       // update entity specific json data in an array format - Customer
                    { infoLabel: "Customer Code", infoValue: "" },
                    { infoLabel: "Customer Name", infoValue: "" },
                    { infoLabel: "Mobile Number", infoValue: "" },
                    { infoLabel: "Town / Village", infoValue: "" },
                    { infoLabel: "Creation Date", infoValue: "" },
                    { infoLabel: "Last Modified Date", infoValue: "" },
                    { infoLabel: "Effective From", infoValue: "" },
                    { infoLabel: "Active Status", infoValue: "" },
                ]
            },
            lodgementsTable: {
                fields: [
                    { key: "lotNumber", label: "Lot Number", sortable: true, thStyle: "width: 20%;" },
                    { key: "lodgementDate", label: "Lodgement Date", sortable: true },
                    { key: "product.productName", label: "Product Name", sortable: true },
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
                sortBy: 'lodgementDate',
                perPage: 10,
                currentPage: 1, 
                sortDesc: true,
                pageOptions: [ 5, 10, 25, 50],
                sortByFormatted: true,
                filter: '',
                filterByFormatted: true,
                sortable: true,
            },
            productsTable: {
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
                    { key: "rentals.rentReceivableOnBalanceBags", label: "Rent on Balance Bags", sortable: true }, 
                    { key: "isPlatformLot", label: "Platform Lot", sortable: true }
                ],
                items: []
            },
            customerTransactionsTable: {
                fields: [
                    { key: "transactionDate", label: "Transaction Date", sortable: true },
                    { key: "totalAmountReceived", label: "Total Amount Received", sortable: true }, 
                    { key: "chargesReceived", label: "Charges Received", sortable: true },
                    { key: "rentReceived", label: "Rent Received", sortable: true },
                    { key: "rentDiscount", label: "Rent Discount", sortable: true },
                    { key: "rentalMode", label: "Rental Mode", sortable: true },
                    { key: "rentalYear", label: "Rental Year" },
                    { key: "transactionDetails", label: "TransactionDetails", sortable: true }
                ],
                items: [],
                sortBy: 'transactionDate',
                perPage: 10,
                currentPage: 1, 
                sortDesc: false,
                pageOptions: [ 5, 10, 25, 50],
                sortByFormatted: true,
                filter: '',
                filterByFormatted: true,
                sortable: true,
            }
        };
    },
    created() {
        this.loadedEntityId = this.$route.params._id;
        this.loadEntityData(this.loadedEntityId);
        this.loadLodgementsData(this.loadedEntityId);
        this.loadCustomerTransactions(this.loadedEntityId);
    },
    methods: {
        loadEntityData(entityId) {
            // load entity data from backend: entity - Customer
            getCustomerById(entityId).then(response => {
                this.loadedEntity = JSON.parse(JSON.stringify(response));
                if(this.loadedEntity != null) {
                    this.entityTitle = this.loadedEntity.customerCode + ' (' + this.loadedEntity.customerName + ')';
                    this.loadedEntityIsActive = DateTime.fromISO(this.loadedEntity.activeUntil).toLocal() > DateTime.now() ? 'Active' : 'Inactive';
                    this.entityDetailsTable.items[0].infoValue = this.loadedEntity.customerCode;
                    this.entityDetailsTable.items[1].infoValue = this.loadedEntity.customerName;
                    this.entityDetailsTable.items[2].infoValue = this.loadedEntity.mobileNumber;
                    this.entityDetailsTable.items[3].infoValue = this.loadedEntity.town;
                    this.entityDetailsTable.items[4].infoValue = formatDate(this.loadedEntity.creationDate);
                    this.entityDetailsTable.items[5].infoValue =formatDate(this.loadedEntity.lastModifiedDate);
                    this.entityDetailsTable.items[6].infoValue = formatDate(this.loadedEntity.activeFrom);
                    this.entityDetailsTable.items[7].infoValue = this.loadedEntityIsActive ? 'Active' : 'Inactive';
                }
            });
        },
        loadLodgementsData(customerId) {
            getLodgementsSummaryByCustomerId(customerId).then(response => {
                let lodgements = JSON.parse(JSON.stringify(response));
                this.lodgementsTable.items = lodgements;
                console.log(this.lodgementsTable.items);
            });
        },
        loadCustomerTransactions(customerId) {
            getCustomerTransactionsByCustomerId(customerId).then(response => {
                let customerTransactions = JSON.parse(JSON.stringify(response));
                this.customerTransactionsTable.items = customerTransactions;
            });
        },
        getLodgementUrl(entity) {
            return '/inventory/lodgements/' + entity._id;
        },
        getPlatformLotBadge(isPlatformLot) {
            return isPlatformLot ? `<label class="badge badge-info">Platform Lot</label>` :
                `<label class="badge badge-success">Regular Lot</label>`;
        },
        prettyPrintDate(anyDate) {
            return formatDate(anyDate);
        }
    },
    computed: {
        getLotsCountForCustomer() {
            return 'Lots (' + this.lodgementsTable.items.length + ')';
        },
        getProductsCountForCustomer() {
            return 'Products ( ' + 0 + ' )';
        },
        getTransactionsCountForCustomer() {
            return 'Payments & Receipts ( ' + this.customerTransactionsTable.items.length + ' )';
        }
    }
}
</script>