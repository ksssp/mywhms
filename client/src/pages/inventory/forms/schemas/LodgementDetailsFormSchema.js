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
                    type: 'vueMultiSelect',
                    label: 'Trademark',
                    model: 'trademark',
                    required: true,
                    selectOptions: {
                        noneSelectedText: 'Select a Trademark',
                        multiple: false,
                        searchable: true,
                        clearOnSelect: true,
                        hideSelected: true,
                        showPointer: true,
                        key: "trademarkId",
                        label: "trademarkName",
                    },
                    values: [],
                    validator: ['required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        console.log("trademark selection changed to : ", newVal.trademarkName, " (with id) - ", newVal.trademarkId);
                    },
                },
                {
                    type: 'vueMultiSelect',
                    label: 'Product Name',
                    model: 'product',
                    required: true,
                    selectOptions: {
                        noneSelectedText: 'Select a Product',
                        multiple: false,
                        searchable: true,
                        clearOnSelect: true,
                        hideSelected: true,
                        showPointer: true,
                        key: "productId",
                        label: "productName",
                    },
                    values: [],
                    validator: ['required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        console.log("product selection changed to : ", newVal.productName, " (with id) - ", newVal.productId);
                    },
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Number of bags lodged',
                    model: 'numBagsLodged',
                    required: true,
                    validator: ['number', 'required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        console.log("numBagsLodged changed to : ", newVal);
                    },
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Number of bags Kata Coolie',
                    model: 'numBagsKataCoolie',
                    required: true,
                    validator: ['number', 'required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        console.log("numBagsKataCoolie changed to : ", newVal);
                    },
                },
                {
                    type: 'vueMultiSelect',
                    label: 'Location(s) in Store',
                    model: 'locationCodes',
                    required: true,
                    multiSelect: true,
                    selectOptions: {
                        noneSelectedText: 'Select Locations',
                        searchable: true,
                        multiple: true,
                        clearOnSelect: true,
                        hideSelected: true,
                        key: "locationId",
                        label: "locationCode",
                        taggable: true,
                        tagPlaceholder: "tagPlaceholder",
                        onNewTag(newTag, id, options, value) {
                            console.log("onNewTag", newTag, id, options, value);
                            options.push(newTag);
                            value.push(newTag);
                        },
                    },
                    values: [],
                    validator: ['required']
                },
            ]
        },
        {
            legend: "Other details",
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Vechile Number',
                    model: 'transport.vehicleNumber',
                    hint: 'e.g. AP 37 DK 1234',
                    validator: ['string']
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Driver Name',
                    model: 'driverName',
                    validator: ['string']
                },
                {
                    type: "textArea",
                    label: "Lodgement Notes",
                    model: "lodgementNotes",
                    hint: "Max 100 characters",
                    max: 100,
                    rows: 2,
                    validator: ['string']
                }
            ]
        }
    ]
}