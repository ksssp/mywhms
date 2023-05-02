import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Expense Type Details",
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Expense Type',
                    model: 'expenseType',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'vueMultiSelect',
                    label: 'Expense Category',
                    model: 'expenseCategory',
                    required: true,
                    multiSelect: false,
                    selectOptions: {
                        noneSelectedText: 'Select Expense Category',
                        searchable: true,
                        multiple: false,
                        clearOnSelect: true,
                        hideSelected: false,
                        taggable: true,
                        tagPlaceholder: "tagPlaceholder",
                    },
                    values: [ 'Customer Expenses', 'Employee Expenses', 'Miscellaneous Expenses', 'Other Expenses' ],
                    validator: ['required']
                }
            ]
        }
    ]
}