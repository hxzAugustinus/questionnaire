<template>
  <div class="page-score">
    <div class="score-content">
      <v-img class="title-img" :src="require('../assets/score-title.png')"> </v-img>
      <div class="award">
        <div class="score">
          <span>{{score}}</span>
          <span>分</span>
        </div>
        <div class="congrats">恭喜你获得{{score}}分</div>
      </div>

      <v-btn class="rank" block icon :ripple="false" @click="toRank">
        <v-img :src="require('../assets/rank-btn.png')" contain> </v-img>
      </v-btn>
      <v-btn class="refresh" block icon :ripple="false" @click="showQR">
        <v-img :src="require('../assets/refresh-score.png')" contain> </v-img>
      </v-btn>
    </div>
    <v-dialog v-model="options.onOff" content-class='dialog-content'>
      <v-img :src="require('../assets/dialog-qrcode.png')" contain>
        <img class="qrcode" :src="qrcode" />
        <button class="nav" @click='refresh'>刷新战绩</button>
      </v-img>
      <v-icon @click="close">close</v-icon>
    </v-dialog>
  </div>
</template>

<style lang="scss">
.page-score {
  height: 100%;
  background: url("../assets/score-bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .score-content {
    position: relative;
    padding: 2.8125rem 0 3.125rem;
    background: url("../assets/score-content.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title-img {
      position: inherit;
      width: 40%;
      flex-grow: 0;
    }

    .award {
      margin-top: 0.625rem;
      width: 16.5625rem;
      height: 15.375rem;
      background: url("../assets/score-award.png") no-repeat;
      background-size: 100% 100%;
      .score {
        margin-top: 4.6875rem;
        height: 6.25rem;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(233, 47, 54, 1);
        display: flex;
        justify-content: center;
        align-items: flex-end;
        & > span:nth-child(1) {
          font-size: 4.6875rem;
        }
        & > span:nth-child(2) {
          font-size: 1.875rem;
          line-height: 5.625rem;
          margin-left: 0.625rem;
        }
      }
      .congrats {
        text-align: center;
        font-size: 1.25rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        line-height: 1.75rem;
      }
    }

    .rank {
      margin-top: 1.25rem;
      height: auto;
      flex-grow: 0;
      .v-image {
        height: 3.75rem;
      }
    }
    .refresh {
      margin-top: 0.9375rem;
      height: auto;
      flex-grow: 0;
      .v-image {
        height: 3.75rem;
      }
    }
  }
}

.dialog-content {
  box-shadow: none;
  overflow: visible;
  text-align: center;
  margin-top: 0;
  .qrcode {
    height: 9.0625rem;
    margin-top: 45%;
  }

  .nav {
    position: absolute;
    width: 8.6875rem;
    height: 2.4375rem;
    left: calc((100% - 8.6875rem) / 2);
    bottom: 0;
    margin-bottom: 19.7%;
    background: rgba(198, 0, 7, 1);
    border-radius: 1.1875rem;
    border: 1px solid rgba(252, 221, 163, 1);
    font-size: 1.125rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(252, 221, 163, 1);
    line-height: 1.5625rem;
  }

  .v-icon {
    margin-top: 0.625rem;
    border: 2px solid #fcd79c;
    border-radius: 50%;
    font-size: 1.875rem;
    color: #fcd79c;
    padding: 0.3125rem;
  }
}
</style>


<script>
import Api from '../api.js'

export default {
  name: 'scorePage',
  data: () => ({
    score: 0,
    qrcode: '',
    options: {
      onOff: false,
    }
  }),
  beforeMount () {
    Api.score({ activity_id: this.$store.state.explain.id }).then(res => {
      this.score = res.score
    })

    Api.qrcode().then(res => {
      this.qrcode = res
    })
  },
  methods: {
    toRank () {
      this.$router.push('rank')
    },
    showQR () {
      this.options.onOff = true
    },
    refresh () {
      this.$router.replace('topic')
    },
    close () {
      this.options.onOff = false
    }
  }
}
</script>
