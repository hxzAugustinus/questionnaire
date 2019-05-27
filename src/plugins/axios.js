"use strict"

import Vue from "vue"
import axios from "axios"
import qs from "qs"
import store from "../store"

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"

let config = {
  baseURL: process.env.VUE_APP_httpHost,
  timeout: 10000 // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

const _axios = axios.create(config)

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    /* post请求参数序列化 */
    if (config.method === "post") {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data

    if (response.status == 200 && response.data.code == 1) {
      return response.data.data
    } else {
      handerError(response.data.data)
      return Promise.reject(response.data)
    }
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

let handerError = error => {
  if (error.code == 401) {
    /* 用户信息过期 */
    store.dispatch("clearUser")
  }
}

Plugin.install = function(Vue) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      }
    },
    $axios: {
      get() {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
