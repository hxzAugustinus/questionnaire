<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<style lang="scss" >
html {
  font-size: 16px;
}

@media screen and (max-width: 359px) {
  html {
    font-size: 12px;
  }
}
</style>


<script>
import Api from './api.js'
import wx from 'weixin-js-sdk'
import wxmini from '@caofeilong/weixin_js'

export default {
  name: 'App',
  beforeMount () {
    if (window.localStorage) {
      let user = JSON.parse(localStorage.getItem('user'))
      this.$store.commit('initUser', user)
      if (user) {
        Api.history().then(res => {
          this.$store.commit('initHistory', res)
        })
      }
    }

    /* 从小程序打开 */
    wxmini.miniProgram.getEnv((res) => {
      console.log(res.miniprogram) // true
      if (res.miniprogram) {
        Api.authLogin({
          mobile: this.utils.getQueryString('mobile'),
          authKey: this.utils.getQueryString('authKey')
        }).then(res => {
          console.log(res)
          this.$store.commit('initUser', res)
        }, err => {
          this.$toast.fail({ message: err.msg, duration: 2000 })
        })
      }
    })

    Api.explain().then(res => {
      this.$store.commit('initEplain', res)
    })

    Api.signature({ url: encodeURIComponent(window.location.href.split('#')[0]) }).then(res => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxbd85dc45a5a84cd8', // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.noncestr, // 必填，生成签名的随机串
        signature: res.signature,// 必填，签名
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
      });
    })

    wx.error((res) => {
      console.log('微信Api error:', res)
    })

  },
  methods: {
    /* 调用jssdk范例 */
    scan () {
      wx.ready(() => {
        wx.checkJsApi({
          jsApiList: ['scanQRCode'], // 需要检测的JS接口列表,
          success: function (res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            if (res.checkResult.scanQRCode) {
              wx.scanQRCode({
                needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                /*     success: function (res) {
                      var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                      console.log(result)
                    } */
              });
            }
          }
        });
      })
    }
  },
}
</script>
