/*
 * @Date: 2019-05-10 20:27:14
 * @LastEditors: hxz
 * @LastEditTime: 2019-05-23 20:22:47
 */
import vue from "vue"
import store from "./store"
import md5 from "md5"

function addVerify() {
  let user = store.state.user
  let time = parseInt(Date.now() / 1000)
  let sign = md5("uid=" + user.uid + "&token=" + user.token + "&timestamp=" + time)

  return {
    headers: {
      uid: user.uid,
      timestamp: time,
      sign: sign
    }
  }
}

export default {
  /**
   * @description: 活动说明
   * @param {type}
   * @return: promise
   */
  explain: function() {
    return vue.axios.post("/activity/index")
  },
  /**
   * @description:获取用户最后一次参加的活动信息
   * @param {type}
   * @return:promise
   */
  history: function() {
    return vue.axios.post("/activity/history", {}, addVerify())
  },
  /**
   * @description: 学校列表
   * @param {type}
   * @return:promise
   */
  pickList: function() {
    return vue.axios.post("/university/index")
  },
  /**
   * @description: 获取验证码
   * @param {mobile}
   * @return: promise
   */
  verify: function(mobile) {
    return vue.axios.post("/sms/send", mobile)
  },

  /**
   * @description: 注册
   * @params {mobile, captcha, username, university_id}
   * @return:promise
   */
  login: function(params) {
    return vue.axios.post("/user/mobilelogin", params)
  },

  /**
   * @description:获取问卷
   * @param {type}
   * @return:promise
   */
  question: function(params) {
    return vue.axios.post("question/index", params, addVerify()).then(
      res => {
        if (Array.isArray(res.questions)) {
          res.questions.forEach(ele => {
            ele.options.forEach(v => {
              v.check = false
            })
          })
        }
        return res
      },
      error => {
        return error
      }
    )
  },
  /**
   * @description: 单题回答
   * @param {reply_id,question_id,answer}
   * @return: promise
   */
  reply: function(params) {
    return vue.axios.post("question/reply", params, addVerify())
  },

  /**
   * @description: 本次答题的分数
   * @param {activity_id}
   * @return: promise
   */
  score: function(params) {
    return vue.axios.post("/activity/score", params, addVerify())
  },
  /**
   * @description:本校排行榜
   * @param {activity_id,page=1,pageSize=10,search_time}
   * @return: promise
   */
  rank: function(params) {
    return vue.axios.post("/activity/rank", params, addVerify())
  },
  /**
   * @description: 带有用户信息的公众号二维码
   * @param {type}
   * @return:
   */
  qrcode: function() {
    return vue.axios.post("/mp/qrcode", {}, addVerify())
  },
  /**
   * @description: 获取微信权限验证
   * @param {url}
   * @return:promise
   */
  signature: function(params) {
    return vue.axios.post("/mp/signature", params)
  },
  /**
   * @description: 从小程序登录
   * @param {mobile,authKey}
   * @return:promise
   */
  authLogin: function(params) {
    return vue.axios.post("/user/authLogin", params)
  }
}
