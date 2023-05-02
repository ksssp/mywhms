import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Customer Details",
            fields: [
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
                    type: "input",
                    inputType: "date",
                    label: "Transaction date",
                    model: "transactionDate",
                    required: true,
                    validator: [ 'date', 'required' ],
                    max: new Date(),
                    set: function(model, val) {
                      model.transactionDate = new Date(val).valueOf();
                    }
                }
            ]
        },
        {
            legend: "Charges Received",
            fields: [
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Charges Received',
                    model: 'chargesReceived',
                    required: true,
                    validator: ['number', 'required']
                },
            ]
        },
        {
            legend: "Rents Received",
            fields: [
                {
                    type: 'vueMultiSelect',
                    label: 'Rental Mode',
                    model: 'rentalMode',
                    required: true,
                    multiSelect: false,
                    selectOptions: {
                        noneSelectedText: 'Select Rental Mode',
                        searchable: true,
                        multiple: false,
                        clearOnSelect: true,
                        hideSelected: false,
                        taggable: true,
                        tagPlaceholder: "tagPlaceholder",
                    },
                    values: [ 'Monthly', 'Yearly' ],
                    validator: ['required']
                },
                {
                    type: 'vueMultiSelect',
                    label: 'Rental Year',
                    model: 'rentalYear',
                    required: true,
                    multiSelect: false,
                    selectOptions: {
                        noneSelectedText: 'Select Rental Year',
                        searchable: true,
                        multiple: false,
                        clearOnSelect: true,
                        hideSelected: false,
                        taggable: true,
                        tagPlaceholder: "tagPlaceholder",
                    },
                    values: function() {
                        let currentDateYear = (new Date()).getFullYear();
                        return [ currentDateYear, currentDateYear-1, currentDateYear-2, 
                            currentDateYear-3, currentDateYear-4, currentDateYear-5 ];
                    },
                    validator: ['required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Rent Received',
                    model: 'rentReceived',
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Rent Discount',
                    model: 'rentDiscount',
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: "textArea",
                    label: "Transaction Details",
                    model: "transactionDetails",
                    hint: "Max 100 characters",
                    max: 100,
                    rows: 2,
                    validator: ['string']
                }
            ]
        }
    ]
}