import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Delivery Details",
            fields: [
                {
                    type: 'vueMultiSelect',
                    label: 'Trademark',
                    model: 'trademark',
                    required: true,
                    selectOptions: {
                        noneSelectedText: 'Select a Trademark',
                        multiple: false,
                        searchable: true,
                        clearOnSelect: true,
                        hideSelected: true,
                        showPointer: true,
                        key: "trademarkId",
                        label: "trademarkName",
                    },
                    values: [],
                    validator: ['required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        console.log("trademark selection changed to : ", newVal.trademarkName, " (with id) - ", newVal.trademarkId);
                    },
                },
                {
                    type: 'vueMultiSelect',
                    label: 'Lot Number',
                    model: 'deliveryLot',
                    required: true,
                    selectOptions: {
                        noneSelectedText: 'Select a Lot',
                        multiple: false,
                        searchable: true,
                        clearOnSelect: true,
                        hideSelected: true,
                        showPointer: true,
                        key: "lodgementId",
                        label: "lodgementName",
                    },
                    values: [],
                    validator: ['required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        console.log("lodgement selection changed to : ", newVal.lodgementName, " (with id) - ", newVal.lodgementId);
                    },
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Number of bags Delivered',
                    model: 'numBagsDelivered',
                    required: true,
                    validator: ['number', 'required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        console.log("numBagsDelivered changed to : ", newVal);
                    },
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Number of bags Kata Coolie',
                    model: 'numBagsKataCoolie',
                    required: true,
                    validator: ['number', 'required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        console.log("numBagsKataCoolie changed to : ", newVal);
                    },
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Locations in Store',
                    model: 'locationCodes',
                    required: true,
                    validator: ['string', 'required']
                }
            ]
        },
        {
            legend: "Charges Paid",
            fields: [
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Kata Coolie Charges for Lodged Bags',
                    model: 'indicativeCharges.kataCoolieCharges',
                    readonly: true,
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Kata Coolie Charges Paid',
                    model: 'chargesPaid.kataCoolieCharges',
                    required: true,
                    default: 0,
                    validator: ['number', 'required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        chargesPaid.totalChargesPaid = newVal + chargesPaid.hamaliCharges + 
                            chargesPaid.platformCoolieCharges + chargesPaid.mamulluCharges + chargesPaid.transportCharges;
                    },
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Hamali Charges for Lodged Bags',
                    model: 'indicativeCharges.hamaliCharges',
                    readonly: true,
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Hamali Charges Paid',
                    model: 'chargesPaid.hamaliCharges',
                    // readonly: function() { return isPlatformLot; },
                    required: true,
                    default: 0,
                    validator: ['number', 'required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        chargesPaid.totalChargesPaid = chargesPaid.kataCoolieCharges + newVal + 
                            chargesPaid.platformCoolieCharges + chargesPaid.mamulluCharges + chargesPaid.transportCharges;
                    },
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Platform Coolie Charges for Lodged Bags',
                    model: 'indicativeCharges.platformCoolieCharges',
                    readonly: true,
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Platform Coolie Charges Paid',
                    model: 'chargesPaid.platformCoolieCharges',
                    // readonly: function() { return !isPlatformLot; },
                    required: true,
                    default: 0,
                    validator: ['number', 'required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        chargesPaid.totalChargesPaid = chargesPaid.kataCoolieCharges + chargesPaid.hamaliCharges + 
                            newVal + chargesPaid.mamulluCharges + chargesPaid.transportCharges;
                    },
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Mamullu Charges for Lodged Bags',
                    model: 'indicativeCharges.mamulluCharges',
                    readonly: true,
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Mamullu Charges Paid',
                    model: 'chargesPaid.mamulluCharges',
                    required: true,
                    default: 0,
                    validator: ['number', 'required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        chargesPaid.totalChargesPaid = chargesPaid.kataCoolieCharges + chargesPaid.hamaliCharges + 
                            chargesPaid.platformCoolieCharges + newVal + chargesPaid.transportCharges;
                    },
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Transport Charges Paid',
                    model: 'chargesPaid.transportCharges',
                    required: true,
                    default: 0,
                    validator: ['number', 'required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        chargesPaid.totalChargesPaid = chargesPaid.kataCoolieCharges + chargesPaid.hamaliCharges + 
                            chargesPaid.platformCoolieCharges + chargesPaid.mamulluCharges + newVal;
                    },
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Total Charges paid',
                    model: 'chargesPaid.totalChargesPaid',
                    readonly: true,
                    required: true,
                    default: 0,
                    validator: ['number', 'required']
                },
            ]
        },
        {
            legend: "Other details",
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Vechile Number',
                    model: 'transport.vehicleNumber',
                    validator: ['string']
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Driver Name',
                    model: 'driverName',
                    validator: ['string']
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Delivery Notes',
                    model: 'deliveryNotes',
                    required: true,
                    validator: ['string']
                },
            ]
        }
    ]
}