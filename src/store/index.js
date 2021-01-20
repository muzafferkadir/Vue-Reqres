import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    totalUser:0,
  },
  mutations: {
    SET_TOTAL_USER(state,value){
      state.totalUser = value
    },
    INCREASE_TOTAL_USER(state){
      state.totalUser += 1
    },
    DECREASE_TOTAL_USER(state){
      state.totalUser -= 1
    }
  },
  actions: {
  },
  modules: {
  }
})
