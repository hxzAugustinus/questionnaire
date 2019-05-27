import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    IsWxClient: true,
    user: {},
    issues: [],
    explain: {},
    history: {}
  },
  mutations: {
    initIssues(state, val) {
      state.issues = val
    },
    initUser(state, val) {
      state.user = val
      if (window.localStorage) {
        localStorage.setItem("user", JSON.stringify(val))
      }
    },
    initEplain(state, val) {
      state.explain = val
    },
    initHistory(state, val) {
      state.history = val
    }
  },
  actions: {
    clearUser(context) {
      context.commit("initUser", null)
      Vue.router.replace("home")
    }
  }
})
