import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Product Group Details",
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Product Group',
                    model: 'productGroup',
                    required: true,
                    validator: ['string', 'required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        if(newVal == undefined || model.productGroup == undefined) {
                            model.productSubGroupPrefix = ""
                        } else if(newVal == model.productSubGroup) {
                            model.productSubGroupPrefix = newVal;
                        } else {
                            model.productSubGroupPrefix = (newVal + " (" + model.productSubGroup + ")");
                        }
                    },
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Product Sub Group',
                    model: 'productSubGroup',
                    required: true,
                    validator: ['string', 'required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        if(newVal == undefined || model.productGroup == undefined) {
                            model.productSubGroupPrefix = ""
                        } else if(newVal == model.productGroup) {
                            model.productSubGroupPrefix = newVal;
                        } else {
                            model.productSubGroupPrefix = (model.productGroup + " (" + newVal + ")");
                        }
                    },
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Product Group Prefix',
                    model: 'productSubGroupPrefix',
                    readonly: true,
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'One side Hamali per Quintal',
                    model: 'onesideHamaliPerQuintal',
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