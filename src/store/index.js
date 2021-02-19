import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginState: false,
    loginInfo: null
  },
  mutations: {
    setLoginState(state){
      state.loginState = true;
    }
  },
  actions: {
  },
  modules: {
  }
})
