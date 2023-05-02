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
                        <ExpenseTypeForm :form-data="loadedEntity" :submit-mode="submitMode" 
                            @saved="saved" @cancelForm="createCancelled"></ExpenseTypeForm>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ExpenseTypeForm from "../forms/ExpenseTypeForm.vue";

export default {
    name: "ExpenseTypeCreate",
    components: {
        ExpenseTypeForm
    },
    data: function () {
        return {
            moduleTitle: 'Administration',
            pageTitle: "Create new Expense Type",
            entityNamePlural: "ExpenseTypes",
            entityListingUrl: "/administration/expenseTypes/",
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