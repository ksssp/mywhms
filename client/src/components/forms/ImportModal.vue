<template>
    <div>
        <b-modal centered id="importModal" :footer-bg-variant="footerBgVariant"
            size="md" @ok="handleOk">
            <template #modal-title>{{ importModalTitle }}</template>
            <section class="validation">
                <div class="grid-margin stretch-card col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-description">
                                Only csv imports allowed, with the standard format.
                            </p>
                            <b-form @submit.stop.prevent="onSubmit">
                                <b-form-group label="Upload file" label-for="importFile">
                                    <b-form-file id="importFile" v-model="file" :state="Boolean(file)" placeholder="Choose a csv file...">
                                    </b-form-file>
                                </b-form-group>
                            </b-form>
                        </div>
                    </div>
                </div>
            </section>
        </b-modal>
    </div>
</template>

<script>
export default {
    name:'ImportModal',
    props: [
        "modalTitle",
        "importDataUrl"
    ],
    data: function () {
        return {
            importModalTitle: "Import",
            file: null,
            footerBgVariant: "light",
        }
    },
    created() {
        this.importModalTitle = this.modalTitle;
    },
    methods: {
        handleOk(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault();

            // Trigger submit handler
            this.handleSubmit();
        },
        handleSubmit() {
            // Import multiple entries imported from file
            this.importFromFile();

            // Hide the modal manually
            this.$nextTick(() => {
                this.$bvModal.hide('importModal')
            });
        },
        importFromFile() {
            console.log("filename : ", this.file);
            // axios.post(this.importDataUrl, fileContentInJson).then((res) => {
            //     // show success notification
            //     this.showSnotify("success");

            //     // reload table and update table header
            // }).catch(error => {
            //     // show failure notification
            //     this.showSnotify("error");
            //     console.log(error);
            // });
        }
    }
}

</script>