import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Income Type Details",
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Income Type',
                    model: 'incomeType',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'vueMultiSelect',
                    label: 'Income Category',
                    model: 'incomeCategory',
                    required: true,
                    multiSelect: false,
                    selectOptions: {
                        noneSelectedText: 'Select Income Category',
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
                    label: 'Income Source',
                    model: 'incomeSource',
                    required: true,
                    multiSelect: false,
                    selectOptions: {
                        noneSelectedText: 'Select Income Source',
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