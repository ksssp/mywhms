import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Employee Transaction Type Details",
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Employee Transaction Type',
                    model: 'employeeTransactionType',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: "switch",
                    label: "Debit Allowed",
                    model: "debitAllowed",
                    textOn: "Yes",
                    textOff: "No",
                    valueOn: true,
                    valueOff: false
                },
                {
                    type: "switch",
                    label: "Credit Allowed",
                    model: "creditAllowed",
                    textOn: "Yes",
                    textOff: "No",
                    valueOn: true,
                    valueOff: false
                },
                // {
                //     type: 'vueMultiSelect',
                //     label: 'Employee Transaction Category',
                //     model: 'employeeTransactionCategory',
                //     required: true,
                //     multiSelect: false,
                //     selectOptions: {
                //         noneSelectedText: 'Select Employee Transaction Category',
                //         searchable: true,
                //         multiple: false,
                //         clearOnSelect: true,
                //         hideSelected: false,
                //         taggable: true,
                //         tagPlaceholder: "tagPlaceholder",
                //     },
                //     values: [ 'Customer Employee Transactions', 'Employee Employee Transactions', 'Miscellaneous Employee Transactions', 'Other Employee Transactions' ],
                //     validator: ['required']
                // }
            ]
        }
    ]
}