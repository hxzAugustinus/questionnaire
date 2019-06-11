<template>
  <div class="page-home">
    <v-img class="declaration" :src="require('../assets/declaration.png')" @click="declaration"></v-img>
    <v-img class="title" :src="require('../assets/home-title.png')"></v-img>
    <v-img class="content" :src="require('../assets/home-content.png')"></v-img>
    <v-btn @click="nav" icon absolute depressed :ripple="false">
      <v-img :src="require('../assets/start-btn.png')"></v-img>
    </v-btn>
    <!-- <hello-world></hello-world> -->
  </div>
</template>

<style lang="scss" scoped>
.page-home {
  height: 100%;
  background: url("../assets/home-bg.png") no-repeat;
  background-size: 100% 100%;
  & > .declaration {
    position: absolute;
    height: 3.3125rem;
    width: 8.75rem;
    right: 0;
    top: 1.25rem;
  }

  & > .title {
    width: 18rem;
    height: 11rem;
    position: absolute;
    top: 8rem;
    left: calc((100% - 18rem) / 2);
  }

  & > .content {
    width: 8rem;
    height: 1rem;
    position: absolute;
    top: 23rem;
    left: calc((100% - 8rem) / 2);
  }
  .v-btn {
    width: 17.5rem;
    height: 3.75rem;
    bottom: 29%;
    left: calc((100% - 17.5rem) / 2);
  }
}
</style>

<script>
//import HelloWorld from '../components/HelloWorld'
export default {
  components: {
    // HelloWorld
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    explain () {
      return this.$store.state.explain
    },
    history () {
      return this.$store.state.history
    }
  },
  methods: {
    declaration () {
      this.$router.push("explain")
    },
    nav () {
      /*  if (this.history.last_activity_id == this.explain.id) {
         this.$router.replace("score")
       } else */
      if (this.user) {
        this.$router.replace("topic")
      } else {
        this.$router.replace("login")
      }
    }
  }
}
</script>
