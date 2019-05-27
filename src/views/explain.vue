<template>
  <v-container class="page-explain">
    <v-img class="title" :src="require('../assets/explain-title.png')"></v-img>
    <div class="container">
      <img class="axis-top" src='../assets/axis-top.png' />
      <scroller class="scroll">
        新修订的《老年人权益保护法》第八条规定“国家进行人口老龄化国情教育，增强全社会积极应对人口老龄化意识。”这从国家立法层面对开展人口老龄化国情教育作出了明确规定。本次国情教育线上答题活动共25道题，每题4分，总分100分，由中国老年大学协会和全国老龄委联合举办，现请各会员单位动员全体教职工、各学员积极参与此次答题活动中。
      </scroller>
      <img class="axis-bottom" src='../assets/axis-bottom.png' />
    </div>
    <v-btn class="start" @click="start" icon absolute depressed :ripple="false">
      <v-img :src="require('../assets/activity-start.png')" contain></v-img>
    </v-btn>
  </v-container>
</template>

<style lang="scss" >
.page-explain {
  color: #000;
  background: url("../assets/explain-bg.png");
  background-size: 100% 100%;
  background-position: 0 0;

  .title {
    width: 60%;
    left: 20%;
    top: calc(1.25rem - 12px);
  }

  .container {
    width: calc(100% - 16px);
    margin: 0 8px;
    position: absolute;
    top: 7.5rem;
    left: 0;
    bottom: 7.5rem;
    padding: 1.8rem 2rem 3rem;
    background: url("../assets/explain-content.png") no-repeat;
    background-size: 100% 100%;

    .axis-top {
      position: absolute;
      width: calc(100% + 2px);
      left: -0.125rem;
      top: -0.625rem;
    }

    .scroll {
      position: initial;
      font-size: 1.25rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(0, 0, 0, 1);
      line-height: 1.75rem;
    }

    .axis-bottom {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
    }
  }

  .start {
    width: calc(100% - 1.875rem);
    height: auto;
    bottom: 1.875rem;
    left: 0.9375rem;
  }
}
</style>

<script>

export default {
  name: "explainPage",
  computed: {
    list () {
      let temp = [0]
      temp.push(this.$store.state.explain.conductor)
      temp.push(this.$store.state.explain.content)
      return temp
    },
    user () {
      return this.$store.state.user
    },
  },
  methods: {
    start () {
      if (this.user) {
        this.$router.replace("topic")
      } else {
        this.$router.replace("login")
      }
    }
  }
}
</script>
