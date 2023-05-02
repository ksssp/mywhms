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

<script>
import { DateTime } from 'luxon';
import BankAccountTransactionFormSchema from './schemas/BankAccountTransactionFormSchema';
import { getBankAccounts } from '@/services/bankAccount.service';
import { createBankAccountTransaction, updateBankAccountTransaction } from '@/services/bankAccountTransaction.service';

export default {
    name: 'BankAccountTransactionForm',
    props: [
        "formData",
        "submitMode"
    ],
    data: function () {
        return {
            entityListingUrl: "/accounting/bankAccountTransactions/",
            formSchema: BankAccountTransactionFormSchema,
            formOptions: {
                validateAfterChanged: true
            },
            loadedEntityId: "",
            isSaving: false,
            formModel: {
                transactionDate: '',
                bankAccount: {
                    bankAccountId: '',
                    bankAccountName: ''
                },
                amount: 0,
                transactionMode: '',
                transactionDetails: ''
            },
            bankAccountField: null,
            bankAccountMap: new Map(),
            bankAccountOptions: [],
            selectedBankAccount: {},
        }
    },
    created() {
        this.formModel = JSON.parse(JSON.stringify(this.formData));
        this.loadedEntityId = this.formData._id;

        this.bankAccountField = this.formSchema.groups[0].fields.find(fields => fields.model==='bankAccount');
        this.bankAccountField.values = this.getBankAccountOptions();
    },
    methods: {
        getBankAccountOptions() {
            getBankAccounts().then(response => {
                let bankAccounts = response;
                bankAccounts.forEach(this.addToBankAccountOptions);
            });
            return this.bankAccountOptions;
        },
        addToBankAccountOptions(bankAccount) {
            this.bankAccountOptions.push({
                "bankAccountId": bankAccount._id,
                "bankAccountName": bankAccount.bankAccountName
            });
            
            this.bankAccountMap.set(bankAccount._id, bankAccount);
        },
        submitForm() {
            // submit form data to the backend - entity - BankAccount
            let transaction = {
                bankAccount: {
                    bankAccountId: this.formModel.bankAccount.bankAccountId,
                    bankAccountName: this.formModel.bankAccount.bankAccountName
                },
                amount: this.formModel.amount,
                transactionMode: this.formModel.transactionMode,
                transactionDate: this.formModel.transactionDate,
                transactionDetails: this.formModel.transactionDetails
            };

            if(this.submitMode=="update") {
                transaction._id = this.loadedEntityId;
                updateBankAccountTransaction(this.loadedEntityId, transaction).then(response => {
                    var saveActionStatus = response;
                    this.$emit('saved', saveActionStatus);
                });
            } else if (this.submitMode == "create") {
                createBankAccountTransaction(transaction).then(response => {
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
