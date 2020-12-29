import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false;
Vue.prototype.$http1 = axios.create({
  baseURL: "http://localhost:8899",
})
Vue.prototype.$http2 = axios.create({
  baseURL: "http://localhost:8889",
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
