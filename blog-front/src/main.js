// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueAxios from 'vue-axios';
import App from './App';
import router from './router';
import { securedAxiosInstance, plainAxiosInstance } from './api/blogApi';

Vue.config.productionTip = false;
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance,
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
