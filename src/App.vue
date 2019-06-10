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
import wx from 'm-commonjs-jweixin'

export default {
  name: 'App',
  beforeMount () {
    /* 后门清除localstorage */
    let clear = this.utils.getQueryString('clear') == 'true';
    if (window.localStorage) {
      clear && localStorage.clear()
      let user = JSON.parse(localStorage.getItem('user'))
      this.$store.commit('initUser', user)
      if (user) {
        Api.history().then(res => {
          this.$store.commit('initHistory', res)
        })
      }
    }
    /* 从小程序打开 */
    wx.miniProgram.getEnv((res) => {
      if (res.miniprogram) {
        Api.authLogin({
          mobile: this.utils.getQueryString('mobile'),
          authKey: this.utils.getQueryString('authKey')
        }).then(res => {
          this.$store.commit('initUser', res)
        }, err => {
          console.log(err)
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
        jsApiList: ['scanQRCode', 'updateAppMessageShareData', 'updateTimelineShareData'] // 必填，需要使用的JS接口列表
      });
    })

    wx.ready(() => {
      /* 自定义“分享给朋友”及“分享到QQ”按钮的分享内容 */
      wx.checkJsApi({
        jsApiList: ['updateAppMessageShareData'],
        success: function (res) {
          if (res.checkResult.updateAppMessageShareData) {
            wx.updateAppMessageShareData({
              title: '国情教育', // 分享标题
              desc: '老年大学国情教育知识答题活动，争做时代“三有”老人', // 分享描述
              link: 'https://gqjy.jinlingkeji.cn', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'https://gqjy.jinlingkeji.cn/img/gqjys.png', // 分享图标
              success: function () {
                // 设置成功
                console.log('updateAppMessageShareData success')
              }
            })
          }
        }
      })
      /* 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容 */
      wx.checkJsApi({
        jsApiList: ['updateTimelineShareData'],
        success: function (res) {
          if (res.checkResult.updateTimelineShareData) {
            wx.updateTimelineShareData({
              title: '国情教育', // 分享标题
              link: 'https://gqjy.jinlingkeji.cn', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: 'https://gqjy.jinlingkeji.cn/img/gqjys.png', // 分享图标
              success: function () {
                // 设置成功
                console.log('updateTimelineShareData successs')
              }
            })
          }
        }
      })
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
