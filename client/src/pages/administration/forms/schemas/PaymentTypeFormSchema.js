import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Payment Type Details",
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Payment Type',
                    model: 'paymentType',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'vueMultiSelect',
                    label: 'Payment Category',
                    model: 'paymentCategory',
                    required: true,
                    multiSelect: false,
                    selectOptions: {
                        noneSelectedText: 'Select Payment Category',
                        searchable: true,
                        multiple: false,
                        clearOnSelect: true,
                        hideSelected: false,
                        taggable: true,
                        tagPlaceholder: "tagPlaceholder",
                    },
                    values: [ 'Customer Payments', 'Employee Payments', 'Miscellaneous Payments', 'Other Payments' ],
                    validator: ['required']
                }
            ]
        }
    ]
}