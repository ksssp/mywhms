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
                <div class="card-body">
                    <div class="mx-4">
                        <DeliveryDetailsForm :form-data="loadedEntity" :submit-mode="submitMode" 
                            @saved="saved" @cancelForm="createCancelled"></DeliveryDetailsForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import DeliveryDetailsForm from "../forms/DeliveryDetailsForm.vue";

export default {
    name: "DeliveryCreate",
    components: {
        DeliveryDetailsForm
    },
    data: function () {
        return {
            pageTitle: "Create new Delivery",
            entityNamePlural: "Deliveries",
            entityListingUrl: "/inventory/deliveries/",
            loadedEntity: {},
            loadedEntityId: null,
            submitMode: "createNew"
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