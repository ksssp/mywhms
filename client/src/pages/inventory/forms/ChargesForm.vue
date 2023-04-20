<template>
    <div class="tables app-crud-form py-4 my-2">
        <div class="row mx-2">
            <form action="" @submit.prevent="submitForm">
                <vue-form-generator tag="div" :schema="formSchema" :options="formOptions" :model="formModel" />
                <div class="d-flex justify-content-end mt-3 pr-4">
                    <button v-on:click="cancelForm" type="button" class="btn btn-secondary btn-md">
                        Cancel
                    </button>
                    <button type="submit" class="btn btn-primary btn-md">
                        {{ isSaving ? 'Saving...' : 'Save' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script scoped lang="js">

import ChargesFormSchema from './schemas/ChargesFormSchema';
import { updateLodgement } from '@/services/lodgement.service';

export default {
    name: 'LodgementChargesForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/inventory/lodgements/",
            formSchema: ChargesFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {
                lodgementId: "",
                chargesPaid: {
                    kataCoolieCharges: 0,
                    hamaliCharges: 0,
                    platformCoolieCharges: 0,
                    mamulluCharges: 0,
                    transportCharges: 0,
                    totalChargesPaid: 0
                }
            }
        }
    },
    created() {
        if (this.submitMode == 'update')
            this.formModel = JSON.parse(JSON.stringify(this.formData));
    },
    methods: {
        submitForm() {
            // // submit form data to the backend - entity - Lodgement Charges
            // let lodgement = {
            //     // setup data from form into the object to be saved
            // };

            // if(this.submitMode=="update") {
            //     lodgement._id = this.loadedEntityId;
            //     updateLodgement(this.loadedEntityId, lodgement).then(response => {
            //         var saveActionStatus = response;
            //         this.$emit('saved', saveActionStatus);
            //     });
            // } else if (this.submitMode == "create") {
            //     lodgement.creationDate = Date.now();
            //     lodgement.lastModifiedDate = lodgement.creationDate;
            //     createLodgement(lodgement).then(response => {
            //         var savedObject = response;
            //         this.$emit('saved', savedObject);
            //     });
            // }
        },
        cancelForm() {
            this.submitMode == 'update' ? this.$emit('cancelForm') : this.$router.push(this.entityListingUrl);
        }
    }
}
</script>
