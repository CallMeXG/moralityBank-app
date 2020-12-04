<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >需求发布</x-header>
    </van-sticky>
    <template v-if="flagSign">
      <template v-if="userMsg.userType === '7' || userMsg.userType === '8'">
        <el-card style="margin: 10px">
          <div slot="header">
            <div class="vol-release-needs">
              <div class="left"></div>
              <div class="right">
                请注意:<br>
                您当前的身份为<span style="font-size: 16px;color: #00c794"> 志愿者</span>，发布需求需要使用积分
              </div>
            </div>
          </div>
          <vol-release></vol-release>
        </el-card>
      </template>
      <template v-else-if="userMsg.userType === '9'">
        <el-card style="margin: 10px">
          <div slot="header">
            请准确填写以下信息
          </div>
          <vol-release></vol-release>
        </el-card>
      </template>
      <template v-else-if="userMsg.userType === '6'">
        <div class="vol-release-needs">
          <el-card style="margin: 10px">
            <div slot="header">
              <div class="vol-release-needs">
                <div class="left"></div>
                <div class="right">
                  请注意:<br>
                  您当前的身份为<span style="font-size: 16px;color: #00c794"> 社区工作人员 </span>，请选择需求发布类型<br>
                  自发需求，需要使用积分<br>
                  需求代发，不会扣除自身的积分
                </div>
              </div>
            </div>
            <van-tabs type="card">
              <van-tab title="需求代发">
                <div class="margin-class"></div>
                <sq-work-realease-needs></sq-work-realease-needs>
              </van-tab>
              <van-tab title="自发需求">
                <div class="margin-class"></div>
                <vol-release></vol-release>
              </van-tab>
            </van-tabs>
          </el-card>


        </div>
        <div style="clear: both"></div>



      </template>
      <template v-else>
        <div class="can-not-show-list">
          <img src="../../assets/icon-bank.svg">
          <p>还未认证身份类型</p>
          <p>认证完成后才可以发布需求</p>
          <button @click="gotoApplyPage">去认证</button>
        </div>
      </template>

    </template>
    <template v-else>
      <div class="can-not-show-list">
        <img src="../../assets/icon-bank.svg">
        <p>您还未登录</p>
        <p>登录后才可以发布需求</p>
        <button @click="gotoSignInPage">登录</button>
      </div>
    </template>




  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import VolRelease from '../../components/release-needs/vol-release'
  import SqWorkRealeaseNeeds from '../../components/release-needs/sqwork-release-needs'

  export default {
    name: "index",
    components: {
      XHeader, VolRelease, SqWorkRealeaseNeeds
    },
    data() {
      return {

        flagSign: false,//用户是否登录
        userMsg: null,//登录用户信息

      }
    },
    mounted() {
      this.userMsg = this.$store.state.userData
      this.flagSign = userIsSign(this.$store.state.userData)
      console.log(this.flagSign)
    },
    methods: {
      //跳转到认证页面
      gotoApplyPage() {
        this.$router.push('/apply-user-type')
      },
      //跳转到登录页面
      gotoSignInPage() {
        this.$router.push('/login')
      },
    }
  }
</script>

<style scoped>
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

  .vol-release-needs {
    font-size: 12px;
    width: 100%;
    background: white;
    color: red;
    line-height: 20px;
    /*margin-bottom: 10px;*/
    /*height: 110px;*/
  }

  .vol-release-needs .left {
    width: 10px;
    float: left;
    height: 50px;
  }

  .vol-release-needs .right {
    /*float: left;*/
    /*padding-top: 10px;*/
    /*padding-left: 10px;*/
    margin: 0 10px;
    padding: 5px 0;
  }

  .margin-class {
    width: 100%;
    height: 10px;
  }

  .positionClass >>> .el-card__header{
    padding: 5px !important;
    border: none;
  }
</style>
