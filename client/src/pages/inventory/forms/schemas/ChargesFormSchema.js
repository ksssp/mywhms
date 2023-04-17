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
                    model: 'kataCoolieCharges',
                    required: true,
                    default: 0,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Hamali Charges Paid',
                    model: 'hamaliCharges',
                    required: true,
                    default: 0,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Platform Coolie Charges Paid',
                    model: 'platformCoolieCharges',
                    required: true,
                    default: 0,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Mamullu Charges Paid',
                    model: 'mamulluCharges',
                    required: true,
                    default: 0,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Transport Charges Paid',
                    model: 'transportCharges',
                    required: true,
                    default: 0,
                    validator: ['number', 'required']
                },
            ]
        },
    ]
}