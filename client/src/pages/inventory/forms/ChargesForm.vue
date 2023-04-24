<template>
    <div class="tables app-crud-form py-4 my-2">
        <div class="mx-2">
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
import { updateDelivery } from '@/services/delivery.service';

export default {
    name: 'ChargesForm',
    props: [
        "formData",
        "entityName"
    ],
    data: function () {
        return {
            entityType: '',
            formSchema: ChargesFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {}
        }
    },
    created() {
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;
    },
    methods: {
        submitForm() {
            // submit form data to the backend - entity - Lodgement Charges
            let loadedEntity = this.formModel;
            console.log(loadedEntity);

            loadedEntity._id = this.loadedEntityId;
            let newNonHamaliChargesPaid = loadedEntity.chargesPaid.kataCoolieCharges + loadedEntity.chargesPaid.platformCoolieCharges + 
                loadedEntity.chargesPaid.mamulluCharges + loadedEntity.chargesPaid.transportCharges;
            loadedEntity.chargesPaid.totalChargesPaid = newNonHamaliChargesPaid + loadedEntity.chargesPaid.hamaliCharges;
            loadedEntity.chargesReceivable.nonHamaliChargesPaid = newNonHamaliChargesPaid;
            if(this.entityName == 'Lodgement') {
                loadedEntity.chargesReceivable.totalChargesReceivable = loadedEntity.chargesReceivable.hamaliCharges + loadedEntity.chargesReceivable.nonHamaliChargesPaid;
            }                

            if(this.entityName == 'Lodgement') {
                updateLodgement(this.loadedEntityId, loadedEntity).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });    
            } else if(this.entityName == 'Delivery') {
                updateDelivery(this.loadedEntityId, loadedEntity).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });    
            }
        },
        cancelForm() {
            this.$emit('cancelForm');
        }
    }
}
</script>
