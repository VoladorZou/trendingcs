import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import AxiosPlugin from './libs/AxiosPlugin'
import Vuex from './store'

Vue.config.productionTip = false
Vue.use(AxiosPlugin)
Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
