<template>
  <div class="positionClass">
    <div class="header-logo-div">
      <template v-if="logFlag === false">
        <img @click="toLoginPage" src="../../assets/image/userNull.jpeg">
        <div class="mine-user-content">
          <p class="mine-user-name" style="margin-top: 15px">请先登录</p>
        </div>
      </template>
      <template v-else>

        <template v-if="signMsg.userType === undefined || signMsg.userType === ''">

          <img src="../../assets/icon-bank.svg">
          <div class="mine-user-content">
            <p class="mine-user-name">
              <span>{{signMsg.name}}</span>
            </p>
          </div>

        </template>
        <template v-else>
          <img src="../../assets/icon-bank.svg">
          <div class="mine-user-content">
            <p>
              <span class="mine-user-name">{{signMsg.zipperConfirm.name}}</span>
              <template v-if="signMsg.userType === '6'">
                <van-tag style="float: left;margin-left: 10px" type="warning">社区工作者</van-tag>
              </template>
              <template style="float: left;margin-left: 10px" v-if="signMsg.userType === '7'">
                <van-tag type="warning">个人志愿者</van-tag>
              </template>
              <template style="float: left;margin-left: 10px" v-if="signMsg.userType === '8'">
                <van-tag type="warning">志愿者组织</van-tag>
              </template>
              <template style="float: left;margin-left: 10px" v-if="signMsg.userType === '9'">
                <van-tag type="warning">服务对象</van-tag>
              </template>
            </p>
            <div style="clear: both"></div>
            <p class="mine-user-other">
              <template v-if="signMsg.userType === '7' || signMsg.userType === '9' || signMsg.userType === '6' ">
                <span v-if="signMsg.zipperConfirm.sex === '1'">男</span>
                <span v-if="signMsg.zipperConfirm.sex === '2'">女</span>
                <span>{{signMsg.zipperConfirm.age}}岁</span>
              </template>
            </p>

          </div>


        </template>

      </template>
    </div>

    <div class="content-list-div">
      <template v-for="(itemCon,index) in mineContent">
        <content-list @click.native="topItemClicked(index)" :item-content="itemCon"></content-list>
        <template v-if="index < mineContent.length - 1">
          <div class="content-line"></div>
        </template>
      </template>
    </div>

    <div class="content-list-div">
      <div @click="enterUpdatePassword" class="mine-content-list">
        <span style="padding-left: 10px;float: left;font-size: 20px;color: #3caaf2" class="icon iconfont icon-xiugaimima"></span>
        <span class="title">修改密码</span>
        <span class="right-icons">❯</span>
      </div>
      <div class="content-line"></div>
      <div class="mine-content-list">
        <span style="padding-left: 10px;float: left;font-size: 20px;color: #3caaf2" class="icon iconfont icon-banben"></span>
        <span class="title">当前版本</span>
        <span class="right-icons">1.0.13</span>
      </div>
      <div class="content-line"></div>
      <div @click="yinsiAndSerivce('Y')" class="mine-content-list">
        <span style="padding-left: 10px;float: left;font-size: 20px;color: #3caaf2" class="icon iconfont icon-zhengcexuanchuan"></span>
        <span class="title">隐私政策</span>
        <span class="right-icons">❯</span>
      </div>
      <div class="content-line"></div>
      <div @click="yinsiAndSerivce('S')" class="mine-content-list">
        <span style="padding-left: 10px;float: left;font-size: 20px;color: #3caaf2" class="icon iconfont icon-fuwutiaokuanjiyinsi"></span>
        <span class="title">服务条款</span>
        <span class="right-icons">❯</span>
      </div>
      <div class="content-line"></div>
      <div class="mine-content-list">
        <p @click="login_logoutClicked" class="login-logout-class">{{logButtonText}}</p>
      </div>
    </div>


    <div style="width: 100%;height: 60px;background: transparent"></div>

  </div>

</template>

<script>
  import ContentList from '../../components/mine-com/contentlist'
  import {Dialog} from 'vant'
  import Vue from 'vue'

  Vue.use(Dialog)

  export default {
    name: "index",
    components: {
      ContentList
    },
    data() {
      return {
        logFlag: false,//用户是否登录
        mineContent: [
          {
            title: '身份认证',
            icon_name: 'icon-authenticate'
          },
          {
            title: '我的能力',
            icon_name: 'icon-RectangleCopy'
          },
          {
            title: '我的需求',
            icon_name: 'icon-xuqiufabu'
          },
          {
            title: '我的任务',
            icon_name: 'icon-zu'
          },
          {
            title: '积分管理',
            icon_name: 'icon-jifen'
          }
        ],//下面的功能菜单项目
        logButtonText: '',//下面的登录/退出登录 要显示的文字
        signMsg: new Object()
      }
    },
    mounted() {

      this.logFlag = this.isLogin()
      if (this.logFlag) {
        this.signMsg = this.$store.state.userData
      }
    },
    methods: {

      yinsiAndSerivce(strType){
        if (strType === 'Y'){
          this.$router.push('/serivce')
        }
        if (strType === 'S'){
          this.$router.push('/yinsi')
        }
      },

      //当用户没有登录时，点击头像，进入登录页面
      toLoginPage() {
        this.$router.push('/login')
      },
      //下面的登录/退出登录按钮，
      login_logoutClicked() {
        let loginFlag = this.isLogin()
        //用户已经登录，执行退出登录的逻辑
        if (loginFlag === true) {
          this.$store.state.userData = null
          localStorage.removeItem('userMsg')
          localStorage.removeItem('loginName')
          localStorage.removeItem('loginPwd')
          localStorage.removeItem('AutherLoginName')
          this.logFlag = this.isLogin()
          this.$Uitl.$emit('signSuccess')
        } else { //用户未登录，跳转到登录页面
          this.$router.push('/login')
        }
      },
      //判断是否用户登录
      isLogin() {
        let userState = this.$store.state.userData
        if (userState === null) {
          this.logButtonText = '登 录';
          return false;
        } else {
          this.logButtonText = '退出登录';
          return true;
        }
      },
      //修改密码
      enterUpdatePassword() {
        // this.$router.push('/update-pwd')
        let loginFlag = this.isLogin()
        //用户已经登录，执行退出登录的逻辑
        if (loginFlag === true) {
          this.$router.push('/update-pwd')
        } else { //用户未登录，跳转到登录页面
          this.$router.push('/login')
        }

      },
      //上面部分点击事件
      topItemClicked(index) {

        if (this.isLogin() === true) {
          switch (index) {
            case 0:
              this.$router.push('/apply-user-type')
              break;
            case 1:
              if (this.$store.state.userData.userType !== undefined) {
                if (this.$store.state.userData.userType === '9') {
                  Dialog.alert({
                    message: '您是服务对象，无法开启此功能'
                  }).then(() => {
                    // on close
                  });
                } else {
                  this.$router.push('/mine-ability')
                }
              } else {
                Dialog.alert({
                  message: '当前账户为普通类型，请先去完成身份认证'
                }).then(() => {
                  // on close
                });
              }
              break;
            case 2:

              this.$router.push('/mine-needs')
              break;
            case 3:
              if (this.$store.state.userData.userType !== undefined) {
                if (this.$store.state.userData.userType === '9') {
                  Dialog.alert({
                    message: '您是服务对象，无法开启此功能'
                  }).then(() => {
                    // on close
                  });
                } else {
                  this.$router.push('/mine-task-manager')
                }
              } else {
                Dialog.alert({
                  message: '当前账户为普通类型，请先去完成身份认证'
                }).then(() => {
                  // on close
                });
              }
              break;
            case 4:
              if (this.$store.state.userData.userType !== undefined) {
                if (this.$store.state.userData.userType === '9') {
                  Dialog.alert({
                    message: '您是服务对象，无法开启此功能'
                  }).then(() => {
                    // on close
                  });
                } else {
                  this.$router.push('/mine-score-manager')
                }
              } else {
                Dialog.alert({
                  message: '当前账户为普通类型，请先去完成身份认证'
                }).then(() => {
                  // on close
                });
              }
              break;
            default:
              break;
          }
        } else {
          this.$router.push('/login')
        }
      }
    }
  }
</script>

<style scoped>
  .header-logo-div {
    height: 130px;
    background: linear-gradient(to bottom right, #67ccf5, #3caaf2);
    margin: 10px;
    border-radius: 5px;
  }

  .header-logo-div img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    margin: 30px 0 0 30px;
    /*border: 2px solid #f9f9f9;*/
    float: left;
  }

  .mine-user-content{
    float: left;
    height: 100px;
    margin-top: 35px;
    margin-left: 10px;
    width: calc(100% - 120px);

  }
  .mine-user-content .mine-user-name{
    color: white;
    font-size: 20px;
    font-weight: bold;
    float: left;
    margin-right: 10px;
  }
  .mine-user-content .mine-user-other{
    margin: 15px 0 0 0 ;
  }
  .mine-user-content .mine-user-other span{
    margin-right: 10px;
    font-size: 14px;
  }


  .header-logo-div p {
    color: white;
    font-size: 12px;
  }

  .content-list-div {
    /*height: 300px;*/
    margin: 10px;
    background: white;
    border-radius: 9px;
  }

  .content-line {
    margin: 0 0 0 50px;
    height: 1px;
    background: #ebebeb;
  }

  .mine-content-list {
    height: 50px;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .mine-content-list span {
    line-height: 50px;
    height: 50px;
    font-size: 16px;
    font-weight: bold;
  }

  .mine-content-list .title {
    float: left;
    margin-left: 20px;
    color: #474747;

  }

  .mine-content-list .right-icons {
    float: right;
    margin-right: 10px;
    color: #dbdbdb;
  }

  .mine-content-list .login-logout-class {
    line-height: 50px;
    margin: 0;
    padding: 0;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }


  .color-list {
    width: 100%;
    margin-bottom: 100px;
    display: none;
  }

  .color-list p {
    width: 100%;
    height: 30px;
    color: white;
    margin: 10px 0;
    text-align: center;
    line-height: 30px;
  }
</style>
