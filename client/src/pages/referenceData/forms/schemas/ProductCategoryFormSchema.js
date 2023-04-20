import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Product Category Details",
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Product Category',
                    model: 'productCategory',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Product Variety',
                    model: 'productVariety',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'One side Hamali per Quintal',
                    model: 'oneSideHamaliPerQuintal',
                    validator: ['number']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Yearly Rent per Quintal',
                    model: 'yearlyRentPerQuintal',
                    validator: ['number']
                }
            ]
        }
    ]
}