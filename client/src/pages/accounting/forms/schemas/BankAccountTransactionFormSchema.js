import { VueFormGenerator } from "vue-form-generator";

export default {
    groups: [
        {
            legend: "Bank Account Details",
            fields: [
                {
                    type: 'vueMultiSelect',
                    label: 'Bank Account',
                    model: 'bankAccount',
                    required: true,
                    selectOptions: {
                        noneSelectedText: 'Select a Bank Account',
                        multiple: false,
                        searchable: true,
                        clearOnSelect: true,
                        hideSelected: true,
                        showPointer: true,
                        key: "bankAccountId",
                        label: "bankAccountName",
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
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Amount',
                    model: 'amount',
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: 'vueMultiSelect',
                    label: 'Transaction Mode',
                    model: 'transactionMode',
                    required: true,
                    multiSelect: false,
                    selectOptions: {
                        noneSelectedText: 'Select Transaction Mode',
                        searchable: true,
                        multiple: false,
                        clearOnSelect: true,
                        hideSelected: false,
                        taggable: true,
                        tagPlaceholder: "tagPlaceholder",
                    },
                    values: [ 'Deposit', 'Withdrawal' ],
                    validator: ['required']
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