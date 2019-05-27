<template>
  <div class="page-rank">
    <div>
      <v-img :src="require('../assets/rank-header.png')" contain>
        <div class="school">{{own.university_name}}</div>
      </v-img>
    </div>
    <div class="private">
      <img v-if="user.userInfo.avatar" :src="user.userInfo.avatar" />
      <img v-else src="../assets/avatar.png" />
      <div>
        <span>{{own.username || own.nickname}}</span>
        <span>第<i>&nbsp;{{own.rank}}&nbsp;</i>名</span>
      </div>
      <span>{{own.better_score}}分</span>
    </div>
    <scroller class="school-rank" :on-refresh="refresh" :on-infinite="infinite">
      <section class="section">
        <div v-for="(item ,index) in list" :key="index">
          <span v-if="item.rank>3">{{item.rank}}</span>
          <span v-else>
            <v-img :src="rankImg[item.rank-1]" contain></v-img>
          </span>
          <span>{{item.username || item.nickname }}</span>
          <span>{{item.better_score}}分 </span>
        </div>
      </section>
    </scroller>
  </div>
</template>

<style lang="scss" scoped>
.page-rank {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .school {
    position: absolute;
    top: 1.625rem;
    left: 0.9375rem;
    font-size: 1.5625rem;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(249, 249, 249, 1);
    line-height: 2.1875rem;
  }
  .private {
    height: 5.875rem;
    background: rgba(249, 249, 249, 1);
    border-bottom: 0.625rem solid rgba(236, 236, 237, 1);
    padding: 0.9375rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > img {
      width: 3.3125rem;
      border-radius: 50%;
    }
    & > div {
      margin-left: 0.9375rem;
      flex-grow: 1;
      & > span:nth-child(1) {
        display: block;
        font-size: 1.25rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.87);
        line-height: 1.75rem;
      }
      & > span:nth-child(2) {
        font-size: 1rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(124, 124, 124, 1);
        line-height: 1.375rem;
        & > i {
          color: rgba(254, 155, 2, 1);
          font-style: initial;
        }
      }
    }
    & > span {
      font-size: 1.5625rem;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(254, 155, 2, 1);
    }
  }

  .school-rank {
    position: relative;
    flex: 1;
    .section {
      padding: 0 0.9375rem;
      background: rgba(249, 249, 249, 1);
      & > div {
        height: 4.6875rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.0625rem solid rgba(151, 151, 151, 0.5);
        & > span:nth-child(1) {
          text-align: center;
          min-width: 2.5rem;
          font-size: 1.25rem;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.3);
          padding-left: 0.3125rem;
          .v-image {
            width: 1.875rem;
          }
        }
        & > span:nth-child(2) {
          display: block;
          flex-grow: 1;
          font-size: 1.25rem;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          margin-left: 0.3125rem;
        }
        & > span:nth-child(3) {
          font-size: 1.375rem;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(254, 155, 2, 1);
        }
      }
    }
  }
}
</style>


<script>
import Api from '../api';
export default {
  data: () => ({
    rankImg: [require('../assets/No1.png'), require('../assets/No2.png'), require('../assets/No3.png')],
    page: 1,
    search_time: null,
    list: [],
    own: {}
  }),
  computed: {
    activity_id () {
      return this.$store.state.explain.id
    },
    user () {
      return this.$store.state.user
    },
  },
  beforeMount () {
    this.getList(1)
  },
  methods: {
    getList (page) {
      if (page == 1) {
        this.page = 1;
        this.list = [];
        this.search_time = null
      } else {
        this.page += 1
      }

      let params = {
        activity_id: this.activity_id,
        page: this.page,
        pageSize: 10,
        search_time: this.search_time
      }
      return Api.rank(params).then(res => {
        if (this.page == 1) {
          this.own = res.my_rank
          this.search_time = res.search_time
          this.list = res.ranks
        } else {
          this.list = this.list.concat(res.ranks)
        }
        return res.ranks.length !== 10
      })
    },
    refresh (done) {
      this.getList(1).finally(() => {
        done()
      })
    },
    infinite (done) {
      if (this.search_time) {
        this.getList().then(res => {
          done(res)
        })
      } else {
        done()
      }
    }
  },
}
</script>
