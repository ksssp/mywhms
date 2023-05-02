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
                        <PaymentForm :form-data="loadedEntity" :submit-mode="submitMode" 
                            @saved="saved" @cancelForm="createCancelled"></PaymentForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PaymentForm from "../forms/PaymentForm.vue";

export default {
    name: "PaymentCreate",
    components: {
        PaymentForm
    },
    data: function () {
        return {
            moduleTitle: 'Payments',
            pageTitle: "Add a Payment",
            entityNamePlural: "Payments",
            entityListingUrl: "/accounting/payments/",
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