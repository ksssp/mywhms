import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Lodgement Details",
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Lot Number',
                    model: 'lotNumber',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'vueMultiselect',
                    label: 'Trademark',
                    model: 'trademark',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'vueMultiselect',
                    label: 'Product',
                    model: 'product',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Number of bags lodged',
                    model: 'numBagsLodged',
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: 'switch',
                    inputType: 'text',
                    label: 'Platform Lot',
                    model: 'isPlatformLot',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Locations in Store',
                    model: 'locationCodes',
                    required: true,
                    validator: ['string', 'required']
                },
            ]
        },
        {
            legend: "Charges Paid",
            fields: [
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Number of bags Kata Coolie',
                    model: 'numBagsKataCoolie',
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Kata Coolie Charges',
                    model: 'kataCoolieCharges',
                    readonly: true,
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Hamali Charges (2-way)',
                    model: 'hamaliCharges',
                    readonly: true,
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Platform Coolie Charges (2-way)',
                    model: 'platformCoolieCharges',
                    readonly: true,
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Mamullu Charges (indicative)',
                    model: 'mamulluChargesIndicative',
                    readonly: true,
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Insurance Charges (indicative)',
                    model: 'insuranceChargesIndicative',
                    required: true,
                    validator: ['number', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Mamullu Charges Paid',
                    model: 'mamulluChargesPaid',
                    required: true,
                    validator: ['number', 'required']
                },
            ]
        }
    ]
}