import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login.vue")
    },
    {
      path: "/explain",
      name: "explain",
      component: () => import("./views/explain.vue")
    },
    {
      path: "/topic",
      name: "topic",
      component: () => import("./views/topic.vue")
    },
    {
      path: "/score",
      name: "score",
      component: () => import("./views/score.vue")
    },
    {
      path: "/rank",
      name: "rank",
      component: () => import("./views/rank.vue")
    },
    {
      path: "/client",
      name: "client",
      component: () => import("./views/client.vue")
    }
  ]
})

/**
 * 判断是否是微信环境
 */
function getIsWxClient() {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true
  }
  return true
}

router.beforeEach((to, from, next) => {
  if (getIsWxClient() || to.name === "client") {
    if (to.name !== "home" && to.name !== "client" && !from.name) {
      next({ path: "/" })
    } else {
      next()
    }
  } else {
    next({ path: "/client" })
  }
})

export default router
