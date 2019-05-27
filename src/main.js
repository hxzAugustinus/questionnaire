import Vue from "vue"
import "./plugins/axios"
import "./plugins/vuetify"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import * as filters from "./filters"
import utils from "./utils"
import Vuelidate from "vuelidate"
import { Popup, Picker, Toast } from "vant"
import VueScroller from "vue-scroller"

/* 加载过滤器 */
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/* 挂载辅助函数 */
Vue.prototype.utils = utils

Vue.use(Vuelidate)
Vue.use(Popup)
Vue.use(Picker)
Vue.use(Toast)
Vue.use(VueScroller)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
