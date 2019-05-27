<template>
  <div class="page-topic" v-if="issues.length>0">
    <aside>{{(activeIndex+1)+'/25'}}</aside>
    <p class="question">{{(activeIndex+1)+'.'+currentIssue.title}}</p>
    <v-content>
      <scroller class="wrap">
        <v-list>
          <template v-for="(item,i) in currentIssue.options">
            <v-list-tile :key="i" ripple @click="select(item,currentIssue.options)" :class="[item.check?'active':'']">
              <v-list-tile-action class="icon">
                <span v-show="!item.check"> {{item.key}}</span>
                <v-img v-show="item.check" :src="require('../assets/active.png')"> </v-img>
              </v-list-tile-action>
              <v-list-tile-content>{{item.value}}</v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </scroller>
    </v-content>
    <footer>
      <v-btn block icon @click="next" :ripple="false">
        <v-img :src="require('../assets/answer-btn.png')" contain></v-img>
      </v-btn>
    </footer>
    <v-dialog v-model="options.switch" content-class='dialog-card' persistent no-click-animation>
      <div>
        <template v-if='options.tipType==1'>
          <v-img :src="require('../assets/wrong.png')" contain>
            <scroll-bar class="hint" :watchValue='rightAnswers' :class="[ currentIssue.type==2 ?'multis':'' ]" :scrollTrackYStyle='scrollTrackYStyle' :scrollBarYStyle='scrollBarYStyle'>
              <div>
                <v-img :src="require('../assets/error.png')" contain height=80></v-img>
                <p>正确答案: {{currentIssue.answer.join('')}} </p>
                <div v-for="(item,key) in rightAnswers" :key="key">
                  {{ currentIssue.type==2? item.key+'.':'' }} {{item.value}}1111111111111111111111111111
                </div>
              </div>
            </scroll-bar>
          </v-img>
          <v-btn block icon @click="done(1)" :ripple="false">
            <v-img v-if='activeIndex+1 < issues.length' :src="require('../assets/next-btn.png')" contain></v-img>
            <v-img v-else :src="require('../assets/finish-btn.png')" contain> </v-img>
          </v-btn>
        </template>
        <template v-else>
          <v-img :src="require('../assets/right.png')"></v-img>
          <v-btn block icon @click="done(2)" :ripple="false">
            <v-img v-if='activeIndex+1 < issues.length' :src="require('../assets/next-btn.png')" contain></v-img>
            <v-img v-else :src="require('../assets/finish-btn.png')" contain> </v-img>
          </v-btn>
        </template>
      </div>
    </v-dialog>
  </div>
</template>

<style lang="scss" >
.page-topic {
  height: 100%;
  background: url("../assets/topic-content.png") no-repeat,
    url("../assets/topic-bg.png") no-repeat;
  background-size: 100% 100%, 100% 100%;
  padding-top: 1.5625rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  & > aside {
    width: 4.0625rem;
    height: 1.5625rem;
    background: #d2b7a1;
    border-top-right-radius: 1.5625rem;
    border-bottom-right-radius: 1.5625rem;
    text-align: center;
    font-size: 1.125rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .question {
    font-size: 1.3125rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    line-height: 1.875rem;
    margin: 0.625rem 1.875rem 0.9375rem 0.9375rem;
    word-break: break-all;
  }
  .wrap {
    padding: 0.625rem 1.875rem 0 1.875rem !important;
    .v-list {
      background: transparent;
      div[role="listitem"] {
        border-radius: 0.625rem;
        border: 0.0625rem dashed rgba(210, 183, 161, 1);
        margin-bottom: 0.625rem;
        &.active {
          background: #fe9b02;
          .icon {
            background: #ce121f !important;
          }
          .v-list__tile {
            color: white;
          }
        }
        .v-list__tile {
          height: auto;
          padding: 0.375rem 1.25rem 0.375rem 1.5rem;
          font-size: 1.25rem;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 1.75rem;
          word-break: break-all;
          .icon {
            display: block;
            min-width: 1.9375rem;
            width: 1.9375rem;
            height: 1.875rem;
            position: absolute;
            background: #fe9b02;
            border-radius: 0.3125rem;
            padding: 0.125rem;
            left: -1rem;
            text-align: center;
            color: white;
          }
          .v-ripple__container {
            border-radius: 0.625rem;
            background: #cf7e00;
            z-index: -1;
          }
        }
      }
    }
  }
  footer {
    margin: 0.625rem 1.6875rem 3.625rem 0.9375rem;
    .v-btn {
      height: auto;
      .v-image {
        height: 3.75rem;
      }
    }
  }
}

.dialog-card {
  box-shadow: none;
  overflow: visible;
  .v-btn {
    height: auto;
    margin-top: 0.9375rem;
    .v-image {
      height: 3.75rem;
    }
  }
  .hint {
    position: absolute;
    width: 100%;
    margin-top: 5rem;
    padding: 0 3.125rem;
    height: 15rem;
    color: #fae083;
    &.multis {
      margin-top: 2.8125rem;
      .can-scroll {
        display: block !important;
      }
    }
    p {
      text-align: center;
      font-size: 1.5625rem;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      line-height: 2.1875rem;
    }
    div {
      font-size: 1.25rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      line-height: 1.75rem;
      word-break: break-all;
    }
  }
}
</style>


<script>
import Api from '../api.js'
import scrollBar from 'vue-scroll-bar';

export default {
  name: 'topicPage',
  components: { scrollBar },
  data: () => ({
    scrollTrackYStyle: {
      backgroundColor: 'transparent',
      right: '40px',
      display: 'block!important'
    },
    scrollBarYStyle: {
      backgroundColor: '#f8cd90'
    },
    activeIndex: 0,
    issues: [],
    response: [],
    reply_id: '',
    options: {
      switch: false,
      tipType: 2
    }
  }),
  computed: {
    btnName () {
      return this.activeIndex < this.issues.length - 1 ? '下一题' : '查看成绩'
    },
    currentIssue () {
      return this.issues[this.activeIndex]
    },
    correct () {
      return this.currentIssue.answer.join(',')
    },
    rightAnswers () {
      return this.currentIssue.options.filter(item => {
        return item.is_right == 1
      })
    }
  },
  beforeMount () {
    let params = {
      activity_id: this.$store.state.explain.id
    }
    Api.question(params).then(res => {
      this.issues = res.questions
      this.reply_id = res.reply_id
    })
  },
  methods: {
    select (item, arr) {
      if (this.currentIssue.type == 2) {
        /* 多选 */
        if (item.check) {
          item.check = false;
          let i = this.response.indexOf(item.key)
          this.response.splice(i, 1)
        } else {
          item.check = true;
          this.response.push(item.key)
        }
      } else {
        /* 单选 */
        if (item.check) {
          return
        } else {
          arr.forEach(v => {
            v.check = false
          });
          item.check = true
          this.response = [item.key]
        }
      }
    },
    next () {
      if (this.response.length == 0) {
        /* 至少选一项 */
        this.$toast({ message: '至少选一项', duration: 2000 })
      } else {
        let question = this.currentIssue
        if (question.type == 2) {
          /* 多选 */
          question.answer.sort()
          this.response.sort()
          this.options = {
            switch: true,
            tipType: this.response.toString() == question.answer.toString() ? 2 : 1
          }
        } else {
          /* 单选 */
          this.options = {
            switch: true,
            tipType: this.response[0] == question.answer[0] ? 2 : 1
          }
        }

        let arr = question.options.filter((v) => {
          return this.response.indexOf(v.key) >= 0
        }).map(i => {
          return i.id
        })

        let params = {
          reply_id: this.reply_id,
          question_id: question.question_id,
          answer: JSON.stringify(arr)
        }
        Api.reply(params)
      }
    },
    done (i) {
      this.options.switch = false
      this.options.tipType = 2
      this.response = []
      if (i > 0) {
        setTimeout(() => {
          this.activeIndex < this.issues.length - 1 ? this.activeIndex += 1 : this.$router.replace('score')
        }, 350)
      }
    }

  }
}
</script>
