export default {
  state: {
    user: "", // 登录的用户信息
    loginState: false //默认未登录状态
  },
  getters: {
    getUser (state) {
      return state.user
    },
    getLoginState (state) {
      return state.loginState
    }
  },
  mutations: {
    setUser (state, data) {
      state.user = data;
    },
    setLoginState (state, data) {
      state.loginState = data;
    }
  },
  actions: {
    setUser ({ commit }, data) {
      commit('setUser', data);
    },
    setLoginState ({ commit }, data) {
      commit('setLoginState', data);
    }
  }
}