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
                <div class="card-body">
                    <div class="mx-4">
                        <ReceiptForm :form-data="loadedEntity" :submit-mode="submitMode" 
                            @saved="saved" @cancelForm="createCancelled"></ReceiptForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReceiptForm from "../forms/ReceiptForm.vue";

export default {
    name: "ReceiptCreate",
    components: {
        ReceiptForm
    },
    data: function () {
        return {
            moduleTitle: 'Payments & Receipts',
            pageTitle: "Add a Receipt",
            entityNamePlural: "Receipts",
            entityListingUrl: "/accounting/receipts/",
            loadedEntity: {},
            loadedEntityId: null,
            submitMode: "create"
        };
    },
    methods: {
        createCancelled() {
            this.$router.push(this.entityListingUrl);
        },
        saved(createdObject) {
            console.log("create successful : ", createdObject);
            this.$router.push(this.entityListingUrl + createdObject._id);
        }
    }
}
</script>