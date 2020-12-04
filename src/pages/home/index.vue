<template>
  <div style="height: 100%;width: 100%">
    <view-box ref="viewBox">
      <tabbar style="position: fixed" @on-index-change="changeTabbar">
        <tabbar-item link="/home" :selected="selectedHome">
          <img slot="icon" src="../../assets/home/shouye.svg">
          <img src="../../assets/home/shouye-sel.svg" slot="icon-active">
          <span slot="label">道德银行</span>
        </tabbar-item>

        <tabbar-item link="/message" :selected="selectedMessage">
          <img slot="icon" src="../../assets/home/task.svg">
          <img src="../../assets/home/task-sel.svg" slot="icon-active">
          <span slot="label">任务大厅</span>
        </tabbar-item>
        <tabbar-item link="/mine" :selected="selectedMine">
          <img slot="icon" src="../../assets/home/mine-un.svg">
          <img src="../../assets/home/mine-sel.svg" slot="icon-active">
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>

      <router-view style="height: 100%"></router-view>
    </view-box>
  </div>
</template>

<script>
  import {Tabbar} from 'vux'
  import 'vant/lib/tabbar/style'
  import 'vant/lib/tabbar-item/style'
  import XHeader from "vux/src/components/x-header/index";
  import TabbarItem from "vux/src/components/tabbar/tabbar-item";
  import ViewBox from "vux/src/components/view-box/index";

  export default {
    name: "index",
    components: {ViewBox, TabbarItem, Tabbar, XHeader},
    data() {
      return {
        selectedHome: true,
        selectedService: false,
        selectedMessage: false,
        selectedMine: false,
        selPath: '/home'
      }
    },
    watch: {
      $route(to, from) {
        console.log('to=1111=',to)
        console.log('this=1111==',this.selPath)
        // if (this.selPath !== to.path) {
        //   this.selectedHome = true
        //   this.selectedMessage = false
        //   this.selectedMine = false
        //   this.selectedService = false
        // }
      }
    },
    beforeDestroy() {
      // this.$Uitl.$off('enterMessage')
    },
    mounted() {
      // const that = this
      // this.$Uitl.$on('enterMessage', function () {
      //   that.$router.push('/home/message')
      //   that.changeTabbar()
      // })
    },
    methods: {
      changeTabbar() {
        console.log('this==',this.selPath)
        console.log('route.path==',this.$route.path)
        /*
        this.selPath = this.$route.path
        if (this.$route.path === '/home') {
          this.selectedHome = true
          this.selectedMessage = false
          this.selectedMine = false
          this.selectedService = false
          // this.$router.push('/home')
        }

        if (this.$route.path === '/home/message') {
          this.selectedHome = false
          this.selectedMessage = true
          this.selectedMine = false
          this.selectedService = false
          // this.$router.push('/home/message')
        }
        if (this.$route.path === '/home/mine') {
          this.selectedHome = false
          this.selectedMessage = false
          this.selectedMine = true
          this.selectedService = false
          // this.$router.push('/home/mine')
        }

         */

      }
    }
  }
</script>

<style scoped>
  .router-link {
    color: gray;
  }

  .router-link-active {
    color: orange;
  }
</style>
