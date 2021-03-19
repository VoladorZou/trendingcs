import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import AxiosPlugin from './libs/AxiosPlugin'
import Vuex from './store'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 导入全局样式表
import './assets/css/global.css'
import moment from 'moment'

Vue.filter('dateFormat', function (dateStr,pattern = "YYYY-MM-DD HH:mm") {
  return moment(dateStr).format(pattern);
})

Vue.config.productionTip = false
Vue.use(AxiosPlugin)
Vue.use(Vuex)
Vue.use(mavonEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
