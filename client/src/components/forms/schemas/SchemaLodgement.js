export default {
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
            type: 'select',
            label: 'Trademark',
            model: 'trademark',
            required: true,
            values: [],
            selectOptions: {
                noneSelectedText: "Select Trademark",
                value: "_id"
            },
            validator: ['required']

        },
        {
            type: 'select',
            label: 'Product',
            model: 'product',
            required: true,
            values: [],
            selectOptions: {
                noneSelectedText: "Select Product",
                value: "_id"
            },
            validator: ['required']
        },
        {
            type: 'input',
            inputType: 'text',
            label: 'Lodged Bags',
            model: 'numBagsLodged',
            required: true,
            validator: ['number', 'required']
        },
        {
            type: 'input',
            inputType: 'text',
            label: 'Kata Coolie Bags',
            model: 'numBagsKataCoolie',
            required: true,
            validator: ['number', 'required']
        },
        {
            type: 'input',
            inputType: 'text',
            label: 'Locations',
            model: 'locations',
            required: true,
            validator: ['string', 'required']
        }
    ]
}