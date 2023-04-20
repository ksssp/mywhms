<template>
    <div class="tables col-md-12 app-crud-form py-4 my-2">
        <form action="" @submit.prevent="submitForm">
            <vue-form-generator tag="div" :schema="formSchema" :options="formOptions" :model="formModel"/>
            <div class="d-flex justify-content-end mt-3 pr-4">
                <button v-on:click="cancelForm" type="button" class="btn btn-secondary btn-md">
                        Cancel
                </button>
                <button type="submit" class="btn btn-primary btn-md">
                    {{ isSaving ? 'Saving...' : 'Save' }}
                </button>
            </div>
        </form>
    </div>
</template>

<script scoped lang="js">

import EmployeeFormSchema from './schemas/EmployeeFormSchema';
import { createEmployee, updateEmployee } from '@/services/employee.service';
import { labeledStatement } from '@babel/types';
import { DateTime } from 'luxon';

export default {
    name: 'EmployeeForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/referenceData/employees/",
            formSchema: EmployeeFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {
                employeeCode: "",
                employeeFullName: "",
                designation: "",
                monthlySalary: ""
            }
        }
    },
    created() {
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;
    },
    methods: {
        submitForm() {
            // submit form data to the backend - entity - Employee
            let currentDate = DateTime.now().toLocal();
            let employee = {
                employeeCode: this.formModel.employeeCode,
                employeeFullName: this.formModel.employeeFullName,
                designation: this.formModel.designation,
                monthlySalary: this.formModel.monthlySalary,
                lastModifiedDate: currentDate
            };

            if(this.submitMode=="update") {
                employee._id = this.loadedEntityId;
                updateEmployee(this.loadedEntityId, employee).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                employee.creationDate = currentDate;
                employee.activeFrom = currentDate;
                employee.activeUntil = DateTime.fromFormat('2100-01-01', 'yyyy-MM-dd');
                createEmployee(employee).then(response => {
                    var savedObject = response;
                    this.$emit('saved', savedObject);
                });
            }
        },
        cancelForm() {
            this.submitMode == 'update' ? this.$emit('cancelForm') : this.$router.push(this.entityListingUrl);
        }
    }
}
</script>
