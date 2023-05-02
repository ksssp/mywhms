<template>
    <div class="tables">
        <div class="page-header">
            <h3 class="page-title">
                {{ pageTitle }}
            </h3>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="javascript:void(0);">{{  moduleTitle }}</a></li>
                    <li class="breadcrumb-item"><a :href="entityListingUrl">{{ entityNamePlural }}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{{ pageTitle }}</li>
                </ol>
            </nav>
        </div>
        <div class="row col-lg-12 grid-margin stretch-card">
            <div class="card">
                <div class="card-body">
                    <div class="mx-4">
                        <ReceiptTypeForm :form-data="loadedEntity" :submit-mode="submitMode" 
                            @saved="saved" @cancelForm="createCancelled"></ReceiptTypeForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ReceiptTypeForm from "../forms/ReceiptTypeForm.vue";

export default {
    name: "ReceiptTypeCreate",
    components: {
        ReceiptTypeForm
    },
    data: function () {
        return {
            moduleTitle: 'Administration',
            pageTitle: "Create new Receipt Type",
            entityNamePlural: "ReceiptTypes",
            entityListingUrl: "/administration/receiptTypes/",
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