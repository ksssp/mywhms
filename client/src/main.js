import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import BootstrapVue from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import VueFormWizard from 'vue-form-wizard';
import VueFormGenerator from 'vue-form-generator';
import VueMultiselect from 'vue-multiselect';

Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(VueFormWizard);     // https://binarcode.github.io/vue-form-wizard/#/?id=demos
Vue.use(VueFormGenerator);
Vue.component('multiselect', VueMultiselect);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
