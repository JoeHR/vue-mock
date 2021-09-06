import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  },
  state: {
    count: 1
  },
  mutations: {
    INCREASE (state) {
      state.count++
    },
    DECREASE (state) {
      state.count--
    }
  },
  actions: {
    increase ({ commit }) {
      commit('INCREASE')
    },
    decrease ({ commit }) {
      commit('DECREASE')
    }
  }
})
