<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" :left-options="{showBack:false}">
        <div class="header-options">
          <div class="header-option-button button-left"
               :class="{CheckButton:headerTab === 0,unCheckButton:headerTab === 1}"
               @click="headerTabsClicked('left')">个人任务
          </div>
          <div class="header-option-button button-right"
               :class="{CheckButton:headerTab === 1,unCheckButton:headerTab === 0}"
               @click="headerTabsClicked('right')">集体任务
          </div>
        </div>
      </x-header>
    </van-sticky>

    <template v-if="flagSignIn === false">
      <div class="can-not-show-list">
        <img src="../../assets/icon-bank.svg">
        <p>您还未登录</p>
        <p>登录后才可查看任务</p>
        <button @click="gotoSignInPage">登录</button>
      </div>
    </template>
    <template v-else>
      <template v-if="flagCanShowList === true">
        <sign-task-list v-show="headerTab === 0"></sign-task-list>
        <collective-task-list ref="colList" v-show="headerTab === 1"></collective-task-list>
      </template>
      <template v-else>
        <div class="can-not-show-list">
          <img src="../../assets/icon-bank.svg">
          <p>还未认证身份类型</p>
          <p>认证完成后才可查看任务</p>
          <button @click="gotoApplyPage">去认证</button>
        </div>
      </template>
    </template>

    <br><br><br>

  </div>
</template>

<script>
  import XHeader from "vux/src/components/x-header/index";
  import ViewBox from "vux/src/components/view-box/index";
  import signTaskList from './sign-task-list'
  import CollectiveTaskList from './collective-task-list'

  export default {
    name: "index",
    components: {
      signTaskList, CollectiveTaskList,
      ViewBox, XHeader
    },

    data() {
      return {
        flagSignIn: false,//用户是否登录
        flagCanShowList: false,//用户类型，普通用户则不显示list，
        headerTab: 0,
        headerValue: 'left'
      }
    },
    beforeDestroy() {
      this.$Uitl.$off('signSuccess')
    },
    mounted() {
      this.checkSignStatus()
      const that = this
      this.$Uitl.$on('signSuccess', function () {
        that.checkSignStatus()
      })
    },
    methods: {
      checkSignStatus() {
        //是否登录
        this.flagSignIn = this.isLogin()
        //判断用户类型，是普通用户还是志愿者、服务对象或社区工作人员
        if (this.flagSignIn) {
          this.flagCanShowList = this.isSpecialUserType()
        }
        if (this.flagSignIn) {
          this.postParams = {
            userId: this.$store.state.userData.id,
            pageNo: 1,
            pageSize: 5
          }
        }
      },

      //判断是否登录
      isLogin() {
        let userData = this.$store.state.userData
        if (userData === undefined || userData === null || userData === '') {
          return false;
        } else {
          return true
        }
      },
      //判断登录用户的类型
      isSpecialUserType() {
        let userType = this.$store.state.userData.userType
        if (userType === '' || userType === undefined || userType === null) {
          return false;
        } else {
          return true;
        }
      },

      //跳转到认证页面
      gotoApplyPage() {
        this.$router.push('/apply-user-type')
      },
      //跳转到登录页面
      gotoSignInPage() {
        this.$router.push('/login')
      },

      headerTabsClicked(value) {
        if (value === 'right'){
          if (this.flagSignIn){
            this.$refs.colList.onRefresh()
          }

        }
        if (value === this.headerValue) {
          return;
        } else {
          this.headerValue = value
          if (this.headerTab === 0) {
            this.headerTab = 1
            return;
          }
          if (this.headerTab === 1) {
            this.headerTab = 0
            return;
          }
        }
      }


    }
  }
</script>

<style>
  .van-collapse-item__content {
    padding: 5px;
  }

</style>

<style scoped>

  .header-options {
    height: 35px;
    width: 200px;
    position: absolute;
    left: calc(50% - 100px);
    top: 6px;
    border-radius: 5px;
  }

  .header-options .header-option-button {
    float: left;
    height: 100%;
    width: calc(50% - 0.5px);
    font-size: 14px;
    line-height: 35px;
  }

  .header-options .button-left {
    border-radius: 5px 0 0 5px;
  }

  .header-options .button-right {
    border-radius: 0 5px 5px 0;
    float: right;
  }

  .CheckButton {
    background: orange;
    color: white;
  }

  .unCheckButton {
    background: white;
    color: black;
  }

  .can-not-show-list {
    margin: 50px 20px;
    text-align: center;
  }
  .can-not-show-list img {
    width: 100px;
    height: 100px;
  }

  .can-not-show-list p {
    margin-top: 15px;
    color: gray;
  }

  .can-not-show-list button {
    width: 40%;
    margin: 30px 30%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background: #3caaf2;
    color: white;
  }

</style>
