import { VueFormGenerator } from "vue-form-generator"

export default {
    groups: [
        {
            legend: "Employee Details",
            fields: [
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Employee Code',
                    model: 'employeeCode',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Full Name',
                    model: 'employeeFullName',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'input',
                    inputType: 'text',
                    label: 'Designation',
                    model: 'designation',
                    required: true,
                    validator: ['string', 'required']
                },
                {
                    type: 'input',
                    inputType: 'number',
                    step: '10',
                    label: 'Monthly Salary',
                    model: 'monthlySalary',
                    required: true,
                    validator: ['number', 'required']
                }
            ]
        }
    ]
}