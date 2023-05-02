import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Receipt Type Details",
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Receipt Type',
                    model: 'receiptType',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'vueMultiSelect',
                    label: 'Receipt Category',
                    model: 'receiptCategory',
                    required: true,
                    multiSelect: false,
                    selectOptions: {
                        noneSelectedText: 'Select Receipt Category',
                        searchable: true,
                        multiple: false,
                        clearOnSelect: true,
                        hideSelected: false,
                        taggable: true,
                        tagPlaceholder: "tagPlaceholder",
                    },
                    values: [ 'Charges', 'Rents', 'Others' ],
                    validator: ['required']
                },
                {
                    type: 'vueMultiSelect',
                    label: 'Receipt Source',
                    model: 'receiptSource',
                    required: true,
                    multiSelect: false,
                    selectOptions: {
                        noneSelectedText: 'Select Receipt Source',
                        searchable: true,
                        multiple: false,
                        clearOnSelect: true,
                        hideSelected: false,
                        taggable: true,
                        tagPlaceholder: "tagPlaceholder",
                    },
                    values: [ 'Customer Receipts', 'Other Receipts' ],
                    validator: ['required']
                }
            ]
        }
    ]
}