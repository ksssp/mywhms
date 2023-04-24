import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Charges Paid",
            fields: [
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Kata Coolie Charges Paid',
                    model: 'chargesPaid.kataCoolieCharges',
                    required: true,
                    default: 0,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Hamali Charges Paid',
                    model: 'chargesPaid.hamaliCharges',
                    required: true,
                    default: 0,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Platform Coolie Charges Paid',
                    model: 'chargesPaid.platformCoolieCharges',
                    required: true,
                    default: 0,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Mamullu Charges Paid',
                    model: 'chargesPaid.mamulluCharges',
                    required: true,
                    default: 0,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Transport Charges Paid',
                    model: 'chargesPaid.transportCharges',
                    required: true,
                    default: 0,
                    validator: ['number', 'required']
                },
            ]
        },
    ]
}