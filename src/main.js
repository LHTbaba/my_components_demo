import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import api from './api/http.js'
import ElementUI from 'element-ui'

Vue.config.productionTip = false
Vue.prototype.$http=api
Vue.prototype.$axios=axios
Vue.use(ElementUI,{ zIndex: 500 })

new Vue({
  render: h => h(App),
  //引入导出的router
  router,
  store
}).$mount('#app')
