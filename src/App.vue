<template>
  <div id="app" style="height: 100%;width: 100%;">
    <!--    <transition :name="transitionName">-->
    <!--      <keep-alive>-->
    <!--        <router-view v-if="$route.meta.keepAlive"/>-->
    <!--      </keep-alive>-->
    <!--      <router-view v-if="!$route.meta.keepAlive"/>-->
    <!--    </transition>-->


<!--    <transition :name="transitionName">-->
<!--      <keep-alive >-->
<!--        <router-view v-if="$route.meta.keepAlive"/>-->
<!--      </keep-alive>-->
<!--    </transition>-->

<!--    <transition :name="transitionName">-->
<!--      <router-view v-if="!$route.meta.keepAlive"/>-->
<!--    </transition>-->

    <transition mode="out-in">
      <keep-alive >
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
    </transition>

    <transition mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"/>
    </transition>

    <van-tabbar v-if="$route.meta.showTab" route safe-area-inset-bottom>
      <van-tabbar-item replace to="/" icon="home-o">
        <span>道德银行</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? iconHome.active : iconHome.inactive"
        >
      </van-tabbar-item>
      <van-tabbar-item replace to="/message">
        <span>任务大厅</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? iconTask.active : iconTask.inactive"
        >
      </van-tabbar-item>
      <van-tabbar-item replace to="/mine">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? iconMine.active : iconMine.inactive"
        >
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
  import store from '../src/store/store'
  import {AlertPlugin, LoadingPlugin, Loading, ToastPlugin, Toast} from 'vux'
  import Vue from 'vue'

  Vue.use(AlertPlugin)
  Vue.use(LoadingPlugin)
  Vue.use(ToastPlugin)

  export default {
    name: 'App',
    store,
    components: {
      Loading,
      Toast
    },
    data() {
      return {
        transitionName: '',
        iconHome: {
          active: require('./assets/home/shouye-sel.svg'),
          inactive: require('./assets/home/shouye.svg')
        },
        iconTask:{
          active: require('./assets/home/task-sel.svg'),
          inactive: require('./assets/home/task.svg')
        },
        iconMine:{
          active: require('./assets/home/mine-sel.svg'),
          inactive: require('./assets/home/mine-un.svg')
        }
      }
    },
    watch: {
      $route(to, from) {

        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index > from.meta.index) {
          //设置动画名称
          this.transitionName = 'slide-left';
        }
        if (to.meta.index < from.meta.index) {
          this.transitionName = 'slide-right';
        }
        if (to.meta.index === from.meta.index) {
          this.transitionName = ''
        }

      }
    }
  }
</script>

<style>
  @import "../static/reset.css";
  @import "../src/assets/style/public.css";

  #app {
    font-family: 'SimHei', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    /*color: #2c3e50;*/
    background-color: #f5f5f5;
    /*position: fixed;*/
    height: 100%;
    width: 100%;

  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }

  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

</style>
