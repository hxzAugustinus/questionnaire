<template>
  <div class="page-login">
    <v-img class="title-img" :src="require('../assets/login-title.png')"></v-img>
    <form lazy-validation>
      <v-text-field v-model="name" :error-messages="nameErrors" label="姓名" required @blur="blurcheck('name')"></v-text-field>
      <v-text-field v-model="mobile" type='number' :error-messages="mobileErrors" label="电话" required @blur="blurcheck('mobile')"></v-text-field>
      <div class="code">
        <v-text-field v-model="authcode" maxlength=6 type='text' :error-messages="authcodeErrors" label="验证码" required @blur="blurcheck('authcode')"></v-text-field>
        <v-btn absolute dark :disabled="authenable" @click.stop="getCode">{{btnName}}</v-btn>
      </div>
      <v-text-field ref="select" v-model="school.name" readonly :error-messages="schoolErrors" label="学校" required @focus="showPicker"></v-text-field>
      <v-btn class="submit" block icon @click="submit" :ripple="false">
        <v-img :src="require('../assets/login-btn.png')" contain></v-img>
      </v-btn>
    </form>
    <van-popup v-model="pickArea" position="bottom">
      <van-picker class='area-select' show-toolbar title="选择学校" :columns="pickers" @change="onChange" @confirm="ensure(1)" @cancel="ensure(0)" />
    </van-popup>
    <v-dialog v-model="dialog" width="200" hide-overlay>
      <v-card height="170" dark class="dialog-bg">
        <v-img :src="require('../assets/success.png')" width="65" contain></v-img>
        <v-card-text color="white">提交成功~</v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
/* 框架样式修改 */
.page-login {
  .area-select {
    ul,
    ol {
      padding-left: 0;
    }
    .columns2 {
      flex: 2;
    }
    .columns3 {
      flex: 2;
    }
  }
  .v-label {
    font-size: 1.25rem;
  }

  .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: rgba(0, 0, 0, 0.12);
  }
}

.v-menu__content {
  display: none;
}
</style>

<style lang="scss" scoped>
.page-login {
  flex: 1;
  min-height: 100vh;
  background-image: url("../assets/login-bg.png"), url("../assets/home-bg.png");
  background-size: 100% 100%;
  .title-img {
    width: 40%;
    position: absolute;
    top: 7%;
    left: 30%;
  }
  form {
    margin: calc(15% + 4rem) 2.5rem 0;
    & > div {
      .v-label {
        font-size: 1.25rem;
      }
    }
    .code {
      position: relative;
      .v-btn {
        top: 0;
        right: 0;
        background: #ce121f;
        color: white;
        &.v-btn--disabled {
          color: white !important;
          pointer-events: auto !important;
        }
      }
      .theme--dark.v-btn.v-btn--disabled:not(.v-btn--icon):not(.v-btn--flat):not(.v-btn--outline) {
        background-color: #ce121f !important;
      }
    }
    .submit.v-btn {
      height: auto;
      .v-image {
        height: 3.75rem;
      }
    }
  }
}

.dialog-bg {
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .v-image {
    flex-grow: 0;
    flex-basis: 65px;
  }
}
</style>

<script>
import { validationMixin } from "vuelidate"
import { required, maxLength, numeric } from "vuelidate/lib/validators"
import Api from "../api.js"

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    mobile: { required, isPhone: function (tel) { return (/^1[3|4|5|7|8|9]\d{9}$/.test(tel)) } },
    authcode: { required, numeric },
    school: { name: { required } }
  },
  data: () => ({
    name: "",
    mobile: "",
    authcode: "",
    authenable: false,
    btnName: '获取验证码',
    pickArea: false,
    areaList: [],
    colm1: 0,
    colm2: 0,
    colm3: 0,
    school: {},
    dialog: false,
  }),
  computed: {
    schoolErrors () {
      const errors = []
      if (!this.$v.school.name.$dirty) return errors
      !this.$v.school.name.required && errors.push("学校不能为空!")
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push("姓名不能为空!")
      !this.$v.name.maxLength && errors.push("姓名不能超过10个字符!")
      return errors
    },
    mobileErrors () {
      const errors = []
      if (!this.$v.mobile.$dirty) return errors
      !this.$v.mobile.required && errors.push("电话不能为空!")
      !this.$v.mobile.isPhone && errors.push("电话号码格式不对!")
      return errors
    },
    authcodeErrors () {
      const errors = []
      if (!this.$v.authcode.$dirty) return errors
      !this.$v.authcode.required && errors.push("验证码不能为空!")
      !this.$v.authcode.numeric && errors.push("验证码只能是数字!")
      return errors
    },
    pickers () {
      if (this.areaList.length) {
        return [
          { className: 'columns1', values: this.areaList.map(v => { return v.name }) },
          { className: 'columns2', values: this.areaList[this.colm1].child.map(v => { return v.name }) },
          { className: 'columns3', values: this.areaList[this.colm1].child[this.colm2].child.map(v => { return v.name }) }]
      } else {
        return []
      }
    }
  },
  beforeMount () {
    Api.pickList().then(
      res => {
        this.areaList = res;
      },
      err => {
        console.log(err)
      }
    )
  },
  methods: {
    blurcheck (type) {
      window.scroll(0, 0)
      this.$v[type].$touch()
    },
    getCode () {
      this.$v.mobile.$touch()
      if (!this.$v.mobile.$invalid) {
        this.countDown()
        let param = {
          mobile: this.mobile
        }
        Api.verify(param).then(() => {

        }, err => {
          console.log(err)
          this.$toast({ message: err.msg, duration: 2000 })
        })
      }
    },
    /* 验证码计时器 */
    countDown () {
      this.authenable = true
      this.btnName = "60 s"
      let num = 60
      let it = setInterval(() => {
        if (num > 1) {
          num -= 1
          this.btnName = num + " s"
        } else {
          this.btnName = "重新获取"
          this.authenable = false
          clearInterval(it)
        }
      }, 1000)
    },
    showPicker () {
      this.pickArea = true
      this.$refs.select.blur()
      window.scroll(0, 0)
    },
    onChange (picker, values, index) {
      let indexlist = picker.getIndexes()
      switch (index) {
        case 0:
          this.colm1 = indexlist[0]
          this.colm2 = 0
          this.colm3 = 0
          break;
        case 1:
          this.colm2 = indexlist[1]
          this.colm3 = 0
          break;
        default:
          this.colm3 = indexlist[2]
          break;
      }
    },
    ensure (i) {
      this.pickArea = false
      if (i) {
        this.school = this.areaList[this.colm1].child[this.colm2].child[this.colm3];
      }
      this.$v.school.name.$touch()
    },
    submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        var param = {
          mobile: this.mobile,
          captcha: this.authcode,
          username: this.name,
          university_id: this.school.id
        }
        Api.login(param).then(res => {
          this.$store.commit('initUser', res)
          this.dialog = true
          setTimeout(() => {
            this.dialog = false
            this.$router.replace("topic")
          }, 1500)
        }, err => {
          this.$toast.fail({ message: err.msg, duration: 2000 })
        })
      }
    }
  }
}
</script>
