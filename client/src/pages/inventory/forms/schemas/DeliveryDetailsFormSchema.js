import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Delivery Details",
            fields: [
                {
                    type: 'vueMultiSelect',
                    label: 'Customer',
                    model: 'customer',
                    required: true,
                    disabled: true,
                    selectOptions: {
                        noneSelectedText: 'Select a Customer',
                        multiple: false,
                        searchable: true,
                        clearOnSelect: true,
                        hideSelected: true,
                        showPointer: true,
                        key: "customerId",
                        label: "customerDisplayName",
                    },
                    values: [],
                    validator: ['required']
                },
                {
                    type: 'vueMultiSelect',
                    label: 'Lot Number',
                    model: 'deliveryLot',
                    required: true,
                    disabled: true,
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
                    validator: ['required']
                },
                {
                    type: 'vueMultiSelect',
                    label: 'Product Name',
                    model: 'product',
                    required: true,
                    disabled: true,
                    selectOptions: {
                        noneSelectedText: 'Select a Product',
                        multiple: false,
                        searchable: true,
                        clearOnSelect: true,
                        hideSelected: true,
                        showPointer: true,
                        key: "productId",
                        label: "productName",
                    },
                    values: [],
                    validator: ['required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Number of bags Delivered',
                    hint: function(model) { 'Maximum allowed bags is ' + model.numBagsBalance; },
                    model: 'numBagsDelivered',
                    required: true,
                    max: function(model) { return model.numBagsBalance; },
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
                },
                {
                    type: 'vueMultiSelect',
                    label: 'Location(s) in Store',
                    model: 'locationCodes',
                    required: true,
                    multiSelect: true,
                    selectOptions: {
                        noneSelectedText: 'Select Locations',
                        searchable: true,
                        multiple: true,
                        clearOnSelect: true,
                        hideSelected: true,
                        taggable: true,
                        tagPlaceholder: "tagPlaceholder",
                        onNewTag(newTag, id, options, value) {
                            options.push(newTag);
                            value.push(newTag);
                        },
                    },
                    values: [],
                    validator: ['required']
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
                    model: 'transport.driverName',
                    validator: ['string']
                },
                {
                    type: "textArea",
                    label: "Delivery Notes",
                    model: "deliveryNotes",
                    hint: "Max 100 characters",
                    max: 100,
                    rows: 2,
                    validator: ['string']
                }
            ]
        }
    ]
}