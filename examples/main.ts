import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import YqUI from '../packages'
import axios from 'axios'
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('yq-access_token')
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Avue, { axios })
Vue.use(YqUI)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
