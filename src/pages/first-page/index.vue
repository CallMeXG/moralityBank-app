<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" :left-options="{showBack: false}">
        <div style="height: 30px">
          <img style="margin-top: 5px" height="40px" src="../../assets/first-page/first-title-3.png">
        </div>
      </x-header>
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="home-page-content" >
        <template v-if="swiperData.length > 0">
          <div class="top-class-box">
            <div class="top-class-fill"></div>
            <div class="ad-father-class">
              <van-swipe class="advertisement" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="(itemSwiper,index) in swiperData" :key="index" @click="enterSwiperDetail(itemSwiper)">
                  <img :src="swiperImageUrl(itemSwiper)" />
                  <p class="swiper-item-title van-ellipsis" v-html="itemSwiper.title"></p>
                </van-swipe-item>
              </van-swipe>
            </div>
          </div>

        </template>


        <div class="grid-content" style="display: none" >
          <ul class="tabs">
            <template v-for="(itemValue,index) in girdData">
              <li @click="itemGridClicked(index)" class="tab-list">
                <img class="image" :src="itemValue.imgIcon">
                <p class="title">{{itemValue.title}}</p>
              </li>
            </template>
          </ul>
        </div>

        <van-grid :border="false" :column-num="4">
          <van-grid-item
            v-for="(itemValue,index) in girdData"
            :icon="itemValue.imgIcon"
            :text="itemValue.title"
            :key="itemValue.title"
            @click="itemGridClicked(index)"
          />
        </van-grid>

        <div class="message-list">
          <div class="title">
            <div class="tag"></div>
            <span>二道风采</span>
          </div>
          <div class="content-list">

            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              success-text="刷新成功"
              @load="onLoad"
            >
              <template v-for="item in messageList">
                <template v-if="item.dataType === 'video'">
                  <video-list :video-item="item"></video-list>
                </template>
                <template v-else>
                  <er-d-message-list :str-type="'B'" :message-obj="item"></er-d-message-list>
                </template>
              </template>
            </van-list>


          </div>
        </div>


      </div>
    </van-pull-refresh>
    <br><br><br><br>

    <van-dialog v-model="yinsiShow" title="服务协议和隐私政策"
                show-cancel-button
                @confirm="yinsiConfirm" @cancel="yinsiConfirm">
      <div class="yinsi-text">请您务必审阅、充分理解"服务协议"和"隐私政策"各条款。
        您可以阅读 <a @click="yinsiAndSerivce('S')">《服务协议》</a>和<a @click="yinsiAndSerivce('Y')">《隐私条款》</a>了解详细信息。
        如您同意，请点击"同意"开始接受我们的服务。</div>
    </van-dialog>

  </div>
</template>

<script>
  import ErDMessageList from '../../components/firspagemessagelist'
  import VideoList from '../../components/firspagemessagelist/videoList'
  import XHeader from "vux/src/components/x-header/index";
  import {TransferDom,} from 'vux'
  import ViewBox from "vux/src/components/view-box/index";
  import Vue from 'vue'
  import {Dialog} from 'vant'
  Vue.use(Dialog)

  export default {
    name: "index",
    directives: {
      TransferDom
    },
    components: {
      XHeader, ViewBox, ErDMessageList, VideoList
    },
    data() {
      return {
        yinsiShow: false,
        loading: false,
        finished: false,
        refreshing: false,
        pageNo: 1,
        // 首页的轮播图
        swiperData: [],
        //宫格图标、标题
        girdData: [
          {
            imgIcon: require('../../assets/image/up 1.svg'),
            title: '民政风采',
          },
          {
            imgIcon: require('../../assets/image/up 2.svg'),
            title: '需求发布',
          },
          {
            imgIcon: require('../../assets/image/up 3.svg'),
            title: '能力发布',
          },
          {
            imgIcon: require('../../assets/image/up 4.svg'),
            title: '公示榜',
          },
          {
            imgIcon: require('../../assets/image/up 5.svg'),
            title: '志愿者风采',
          },
          {
            imgIcon: require('../../assets/image/up 6.svg'),
            title: '便民信息',
          },
          {
            imgIcon: require('../../assets/image/up 7.svg'),
            title: '积分兑换',
          },
          {
            imgIcon: require('../../assets/image/up 8.svg'),
            title: '志愿者热线',
          }
        ],
        //首页的二道风采
        messageList: [],
      }
    },
    mounted() {
      //轮播图数据
      this.gainSwiperListData()
      //二道风采数据
      //this.onLoad()

      let showPrivce = localStorage.getItem('showP')
      console.log('是否显示隐私弹框====',showPrivce)
      if (showPrivce === undefined || showPrivce === null || showPrivce === ''){
        this.yinsiShow = true
      }
      else {
        localStorage.setItem('showP','N')
      }



    },
    beforeRouteLeave(to,from,next){
      to.meta.isback = false
      next()
    },
    methods: {

      yinsiAndSerivce(strType){
        if (strType === 'S'){
          this.$router.push('/yinsi')
        }
        if (strType === 'Y'){
          this.$router.push('/serivce')
        }
      },
      yinsiConfirm(){
        localStorage.setItem('showP','N')
      },

      //二道风采数据
      onLoad() {
        this.gainAdEDListData()
        this.autoLogin()
      },
      onRefresh() {
        this.pageNo = 1
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.refreshing = true;
        this.messageList = [];
        this.onLoad();
      },

      autoLogin(){
        this.$store.state.userData = null
        localStorage.removeItem('userMsg')
        let autherSign = localStorage.getItem('AutherLoginName')
        if (autherSign === undefined || autherSign === null){
          if (this.$route.query.loginName !== undefined && this.$route.query.loginName !== ''){
            this.$api.loginapis.userAuthorizedLogin_interface({
              loginName: this.$route.query.loginName
            }).then(response => {
              if (response.status === 200)
              {
                if (response.data.status === 'SUCCESS'){
                  this.$store.state.userData = response.data.data
                  localStorage.setItem("AutherLoginName",this.$route.query.loginName)
                  localStorage.setItem('userMsg',JSON.stringify(response.data.data))
                }
              }
            }).catch(error => {

            })
          }
          else {
            let loginName = localStorage.getItem('loginName')
            let loginPwd = localStorage.getItem('loginPwd')
            if (loginName !== undefined && loginPwd !== undefined){
              this.$api.loginapis.login({
                loginName: loginName,
                password: loginPwd
              })
                .then(res => {
                  let loginData = res.data
                  if (loginData.status === "SUCCESS") {

                    this.$store.state.userData = loginData.data
                    localStorage.setItem('loginName',loginName)
                    localStorage.setItem('loginPwd',loginPwd)

                    localStorage.setItem('userMsg',JSON.stringify(loginData.data))

                  }

                })
            }
          }
        }
        else {
          if (this.$route.query.loginName !== undefined && this.$route.query.loginName !== ''){
            let strLoginName = this.$route.query.loginName
            this.$api.loginapis.userAuthorizedLogin_interface({
              loginName: strLoginName
            }).then(response => {
              if (response.status === 200)
              {
                if (response.data.status === 'SUCCESS'){
                  this.$store.state.userData = response.data.data
                  localStorage.setItem("AutherLoginName",his.$route.query.loginName)
                  localStorage.setItem('userMsg',JSON.stringify(response.data.data))
                }
              }
            }).catch(error => {

            })
          }

          else {
            this.$api.loginapis.userAuthorizedLogin_interface({
              loginName: autherSign
            }).then(response => {
              if (response.status === 200)
              {
                if (response.data.status === 'SUCCESS'){
                  this.$store.state.userData = response.data.data
                  localStorage.setItem("AutherLoginName",his.$route.query.loginName)
                  localStorage.setItem('userMsg',JSON.stringify(response.data.data))
                }
              }
            }).catch(error => {

            })
          }

        }
      },
      //首页的gird，8个模块，点击事件
      itemGridClicked(index) {
        //判断用户是否登录，如果未登录，则先跳转到登录页面
        if (index === 1 || index === 2 || index === 6) {
          let loginFlag = this.isLogin()
          if (loginFlag === true) {
            //跳转到能力发布
            if (index === 2) {
              this.$router.push('/release-ability')
            }
            //跳转到需求发布
            if (index === 1) {
              this.$router.push('/release-needs')
            }
            //跳转到需求发布
            if (index === 6) {
              this.$router.push('/integal-shopping')
            }
          }
          //跳转到登录页面
          if (loginFlag === false) {
            this.$router.push('/login')
          }
        }

        //跳转到 便民信息
        if (index === 5) {
          this.$router.push('/bianmin')
        }
        //跳转到 民政风采
        if (index === 0) {
          this.$router.push('/minzheng')
        }
        //跳转到 公示榜
        if (index === 3) {
          this.$router.push('/public-list')
        }
        //跳转到 志愿者风采
        if (index === 4) {
          this.$router.push('/vol-show')
        }
        //跳转到 志愿者热线
        if (index === 7) {
          this.$router.push('/vol-phone')
        }

      },
      // 判断用户是否登录
      isLogin() {
        // 根据vue - store 中的用户数据，进行判断
        let userData = this.$store.state.userData
        // 如果userData 为空，则说明未登录
        if (userData === null) {
          return false
        } else {
          return true
        }

      },
      //获取轮播图列表
      gainSwiperListData() {
        this.$api.HomePageApi.gainFirstPageSwiperList_interface({}).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              this.swiperData = []
              this.swiperData = response.data.data.list
            }
          }
        })
      },
      //轮播图图片url
      swiperImageUrl(itemSwiper) {
        return itemSwiper.imageUrl
      },
      //轮播图，跳转到详情
      enterSwiperDetail(objData) {
        this.$router.push({
          path: '/swiper-detail',
          query: {
            strType: 'A',
            strId: objData.id
          }
        })
      },
      //二道风采数据
      gainAdEDListData() {
        this.$api.HomePageApi.gainFirstPageEDfengcaiList_interface({
          pageNo: this.pageNo,
          pageSize: 5
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              if (this.refreshing) {
                this.messageList = []
                this.refreshing = false;
              }
              this.taskRespTemp = []
              this.taskRespTemp = response.data.data.list
              this.messageList = this.messageList.concat(this.taskRespTemp)
              this.loading = false;
              this.pageNo += 1;
              if (this.messageList.length >= response.data.data.count) {
                this.finished = true;
              }

            }
          }
        })
      },
    }


  }
</script>


<style scoped>
  /*首页中的导航栏*/
  .vant-home-page-header {
    background: #1a80cb;
    height: 45px;
  }

  /*导航栏标题*/
  .vant-home-page-header >>> .van-nav-bar__title {
    color: white !important;
  }

  .top-class-box{
    width: 100%;
    position: relative;
    /*margin: 0;*/
  }
  .top-class-box .top-class-fill{
    height: 0;
    padding-bottom: 56.3%;
  }
  .top-class-box .ad-father-class {
    background: linear-gradient(#3caaf2 ,#67ccf5);
    /*background-color: #3caaf2;*/
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .advertisement{
    margin: 10px;
    border-radius: 5px;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
  }

  /*轮播-广告*/

  .advertisement .swiper-item{
    background: #00c794;
    margin: 10px;
    height: 180px !important;
  }
  .advertisement img{
    width: 100%;
    height: 100%;
  }


  .swiper-item-title {
    display: none;
    position: absolute;
    z-index: 2;
    margin-top: -45px;
    color: white;
    width: 90%;
    height: 30px;
    background: rgba(71, 71, 71, 0.31);
    line-height: 30px;
    padding-left: 10px;
  }

  /*轮播宫格*/
  .swipe-gird {
    /*height: 150px;*/
    background-color: #5d5d5d;
  }

  /*下面部分的信息列表*/
  .message-list {
    margin-top: 10px;
    width: 100%;
    background: white;
  }

  .message-list .title {
    height: 35px;
    line-height: 35px;
    background-color: white;
  }

  .message-list .title .tag {
    width: 2px;
    height: 10px;
    margin-top: 12px;
    background-color: #1a80cb;
    float: left;
    margin-left: 10px;
  }

  .message-list .title span {
    margin-left: 8px;
    font-size: 16px;
    font-weight: bold;
  }

  .message-list .content-list {
    margin-top: 1px;
    width: 100%;
    /*width: calc(100% - 15px);*/
    /*margin-left: 10px;*/
    /*border-top: 1px solid #efefef;*/
  }

  .service-grid{
    width: auto;
    height: 150px;
    background: #00c794;
    overflow-x: auto;
    overflow-y: hidden;
    transform: translateX(1000px);
  }



  /* 隐藏下方的滚动条 */
  .tabs::-webkit-scrollbar {
    background-color: transparent;
  }

  .tabs {
    -ms-overflow-style: none;
  }

  .tabs {
    overflow: -moz-scrollbars-none;
  }

  ul,
  li {
    list-style: none;
  }

  li .image{
    width: 50px;
    margin-top: 20px;
  }
  li p{
    margin-top: 20px;
  }

  .tabs {
    overflow-x: scroll;
    display: -webkit-box;
    display: flex;
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    background: transparent;
    margin-right: 10px;
  }

  .tab-list {
    padding: 0 10px;
    text-align: center;
    -webkit-flex: 1 0 auto;
    flex: 1 0 auto;
    background-color: white;
    height: 130px;
    border-radius: 5px;
    box-shadow: 3px 4px 8px #d7d7d7;
    width: 80px;
    margin: 10px;
  }
  .grid-content{
    width: 100%;
    height: 140px;
  }

  .home-page-content >>> .van-grid-item__content{
    /*padding: 5px;*/
  }
  .home-page-content >>> i{
    font-size: 40px;
  }
  .home-page-content >>> .van-grid-item__text{
    color: black;
  }


  .yinsi-text{
    padding: 10px;
    font-weight: 100;
    font-size: 14px;
    color: #464646;
    line-height: 20px;
  }
  .yinsi-text a{
    color: #1a80cb;
  }

</style>
