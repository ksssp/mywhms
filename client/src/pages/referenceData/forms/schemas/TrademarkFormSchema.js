import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Trademark Details",
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Trademark Name',
                    model: 'trademarkName',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Customer Name',
                    model: 'customerName',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Mobile Number',
                    model: 'mobileNumber',
                    required: true,
                    min: 10,
                    maxlength: 10,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Town / Village',
                    model: 'town',
                    required: true,
                    validator: ['string', 'required']
                }
            ]
        }
    ]
}