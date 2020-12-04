// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import baseApi from './api/base'
import {AlertPlugin,ToastPlugin,ConfirmPlugin} from 'vux'
import api from './api'
import store from '../src/store/store'
import userData from '../static/userData'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Uitl from '../src/assets/Unit'
import moment from 'moment'
import 'moment/locale/zh-cn'
import VueHtml5Plus from "vue-html5plus/src";
moment.locale('zh-cn')
import Vant from 'vant'
import 'vant/lib/index.css'
import './assets/style/public.css'
import 'babel-polyfill'
require('es6-promise').polyfill()

Vue.use(Vant)

Vue.use(VueHtml5Plus)

Vue.prototype.$moment = moment

Vue.prototype.$Uitl = Uitl

Vue.use(ElementUI)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.prototype.$echarts = echarts
Vue.prototype.$baseApi = baseApi

/* eslint-disable no-new */

var onPlusReady = function (callback, context = this) {
  if (window.plus) {
    callback.call(context)
  }
  else {
    document.addEventListener('plusready',callback.bind(context))
  }
}
Vue.mixin({

  beforeCreate () {

    onPlusReady(() => { this.plusReady = true }, this)

  },

  methods: {

    onPlusReady: onPlusReady

  }

})

new Vue({
  el: '#app',
  router,
  store,
  userData,
  components: { App},
  template: '<App/>',
  plusReady: function () {

  }
})
