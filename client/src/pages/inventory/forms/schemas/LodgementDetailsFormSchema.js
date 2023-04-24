import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Lodgement Details",
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Lot Number',
                    model: 'lotNumber',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'vueMultiSelect',
                    label: 'Customer',
                    model: 'customer',
                    required: true,
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
                    label: 'Product Name',
                    model: 'product',
                    required: true,
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
                    label: 'Number of bags lodged',
                    model: 'numBagsLodged',
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Number of bags Kata Coolie',
                    model: 'numBagsKataCoolie',
                    required: true,
                    validator: ['number', 'required']
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
                    hint: 'e.g. AP 37 DK 1234',
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
                    label: "Lodgement Notes",
                    model: "lodgementNotes",
                    hint: "Max 100 characters",
                    max: 100,
                    rows: 2,
                    validator: ['string']
                }
            ]
        }
    ]
}