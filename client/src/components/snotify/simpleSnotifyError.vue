<template>
  <div class="simple-snotify">
    <button class="btn btn-outline-success mx-auto" v-on:click="showSnotify">Click here!</button>
    <vue-snotify></vue-snotify>
  </div>
</template>

<script scoped lang="js">
  import Vue from 'vue'
  import Snotify, { SnotifyPosition} from 'vue-snotify'
  const options = {
    toast: {
      position: SnotifyPosition.rightTop,
    }
  }
  Vue.use(Snotify,options)
  export default {
    name: 'simple-snotify',
    props: [
      "errorMessage"
    ],
    methods: {
      showSnotify () {
        this.$snotify.error(this.errorMessage, {
          timeout: 2000,
          showProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
        });
        
      }
    }
  }
</script>

<style scoped lang="scss">
.simple-snotify {
  display: flex;
  justify-content: center;
}
</style>
