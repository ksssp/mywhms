import { VueFormGenerator } from "vue-form-generator";
import { VueMultiselect } from 'vue-multiselect';

export default {
    groups: [
        {
            legend: "Product Details",
            fields: [
                {
                    type: 'vueMultiSelect',
                    label: 'Product Group',
                    model: 'productSubGroupPrefix',
                    required: true,
                    selectOptions: {
                        noneSelectedText: 'Select a Product Group',
                        multiple: false,
                        searchable: true,
                        clearOnSelect: true,
                        hideSelected: true,
                        showPointer: true,
                        key: "_id",
                        label: "name",
                    },
                    values: [],
                    validator: ['required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        model.computedProductName = (model.bagSize == undefined || newVal == undefined) ? "" :
                            (newVal.name + " " + model.bagSize + "Kg Bags");
                    },
                },
                {
                    type: 'input',
                    inputType: 'number',
                    label: 'Bag Size (in kgs)',
                    model: 'bagSize',
                    default: 0,
                    required: true,
                    validator: ['double', 'required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        model.computedProductName = (model.productSubGroupPrefix == undefined || newVal == undefined) ? "" :
                            (model.productSubGroupPrefix.name + " " + newVal + "Kg Bags");
                        model.computedYearlyRentPerBag = (newVal == undefined || model.yearlyRentPerKg == undefined) ? 0 :
                            (newVal * model.yearlyRentPerKg);
                    },
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Computed Product Name',
                    model: 'computedProductName',
                    readonly: true,
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Display Product Name',
                    model: 'productName',
                    required: true,
                    validator: ['string', 'required']
                }
            ]
        },
        {
            legend: "Charges and rents",
            fields: [
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Hamali per bag',
                    model: 'hamaliPerBag',
                    required: true,
                    default: 0,
                    validator: ['double', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Platform Coolie per bag',
                    model: 'platformCooliePerBag',
                    required: true,
                    default: 0,
                    validator: ['double', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Kata Coolie per bag',
                    model: 'kataCooliePerBag',
                    required: true,
                    default: 0,
                    validator: ['double', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Mamullu per bag',
                    model: 'mamulluPerBag',
                    required: true,
                    default: 0,
                    validator: ['double', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Insurance per bag',
                    model: 'insurancePerBag',
                    default: 0,
                    required: true,
                    validator: ['double', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Monthly Rent per bag',
                    model: 'monthlyRentPerBag',
                    required: true,
                    default: 0,
                    validator: ['double', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Yearly rent per kg',
                    model: 'yearlyRentPerKg',
                    required: true,
                    default: 0,
                    validator: ['double', 'required'],
                    onChanged: function(model, newVal, oldVal, field) {
                        model.computedYearlyRentPerBag = (model.bagSize == undefined || newVal == undefined) ? 0 :
                            (model.bagSize * newVal);
                    },
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Computed Yearly Rent per bag',
                    model: 'computedYearlyRentPerBag',
                    required: true,
                    readonly: true,
                    default: 0,
                    validator: ['double', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '0.01',
                    label: 'Yearly Rent per bag',
                    model: 'yearlyRentPerBag',
                    default: 0,
                    required: true,
                    validator: ['double', 'required']
                }
            ]
        }
    ]
}

/*
https://jsfiddle.net/2y9cLsnz/2/

    data: {
        model: {
            id: 1,
            name: "John Doe",
            password: "J0hnD03!x4",
            skills: ["Javascript", "VueJS"],
            email: "john.doe@gmail.com",
            status: true
        },
        schema: {
            fields: [{
                type: "text",
                label: "ID",
                model: "id",
                readonly: true,
                featured: false,
                disabled: true,
                styleClasses:'width-50'
            }, {
                type: "text",
                label: "Name",
                model: "name",
                readonly: false,
                featured: true,
                required: true,
                disabled: true,
                placeholder: "User's name",
                validator: VueFormGenerator.validators.string,
                styleClasses:'width-50'
            }, {
                type: "password",
                label: "Password",
                model: "password",
                min: 6,
                required: true,
                hint: "Minimum 6 characters",
                validator: VueFormGenerator.validators.string
            }, {
                type: "email",
                label: "E-mail",
                model: "email",
                placeholder: "User's e-mail address",
                validator: VueFormGenerator.validators.email
            }, {
							type: "vueMultiSelect",
							label: "Skills (vue-multiSelect field)",
							model: "skills",
							required: true,
							multiSelect: true,
							selectOptions: {
								searchable: true,
								clearOnSelect: true,
								hideSelected: true,
								taggable: true,
								tagPlaceholder: "tagPlaceholder",
								onNewTag(newTag, id, options, value) {
									console.log("onNewTag", newTag, id, options, value);
									options.push(newTag);
									value.push(newTag);
								},
								// showPointer: true,
								onSearch(searchQuery, id, options) {
									console.log("onSearch", searchQuery, id, options);
								}
							},
							values: [
								"HTML5",
								"Javascript",
								"CSS3",
								"CoffeeScript",
								"AngularJS",
								"ReactJS",
								"VueJS"
							]
						}, {
               type: "switch",
                label: "Status",
                model: "status",
                multi: true,
                readonly: false,
                featured: false,
                disabled: false,
                default: true,
								textOn: "Active",
								textOff: "Inactive"
            }]
        },

        formOptions: {
            validateAfterLoad: false,
            validateAfterChanged: false
        }
    }
*/