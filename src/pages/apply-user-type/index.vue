<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor">身份认证</x-header>
    </van-sticky>
    <template v-if="userType === '6'">
      <div class="apply-success">
        <p class="content-title">您已成功认证为：</p>
        <p class="user-type">社区工作人员</p>
        <p @click="showDetailClicked" class="show-detail">查看详情 >></p>
      </div>
    </template>
    <template v-if="userType === '7'">
      <div class="apply-success">
        <p class="content-title">您已成功认证为：</p>
        <p class="user-type">个人志愿者</p>
        <p @click="showDetailClicked" class="show-detail">查看详情 >></p>
      </div>
    </template>
    <template v-if="userType === '8'">
      <div class="apply-success">
        <p class="content-title">您已成功认证为：</p>
        <p class="user-type">志愿者组织</p>
        <p @click="showDetailClicked" class="show-detail">查看详情 >></p>
      </div>
    </template>
    <template v-if="userType === '9'">
      <div class="apply-success">
        <p class="content-title">您已成功认证为：</p>
        <p class="user-type">服务对象</p>
        <p @click="showDetailClicked" class="show-detail">查看详情 >></p>
      </div>
    </template>

    <template v-if="userType === undefined || userType === ''">
      <template v-if="flagApply === true">
        <template v-if="applyStatus === '0'">
          <div class="apply-status">
            <p class="title">您已提交身份认证信息</p>
            <p class="type">您申请的身份类型为：
              <span>{{applyType}}</span>
            </p>

            <p class="status">当前状态：
              <span>审核中...</span>
            </p>
          </div>
        </template>
        <template v-if="applyStatus === '2'">
          <div class="apply-status">
            <p class="title">您已提交身份认证信息</p>
            <p class="type">您申请的身份类型为：
              <span>{{applyType}}</span>
            </p>

            <p class="status">当前状态：
              <span style="color: red">被拒绝</span>
            </p>
            <p class="status" style="line-height: 20px;color: #f0898f">被拒原因:{{applyMessage.replyInfo}}</p>
            <p @click="enterUpdatePage" class="update-button">去修改 >></p>
          </div>
        </template>
      </template>

      <template v-else>
        <div class="apply-index-content">
          <div class="apply-index-title">
            请选择您要认证的账户类型
            <br> 认证一旦审核通过，将不可更改，请认真选择
          </div>
          <button style="margin-bottom: 0" @click="checkerClicked('vol')" class="checker-unsel"
                  v-bind:class="{'checker-active': volChecker}">志愿者
          </button>
          <button style="margin-bottom: 0" @click="checkerClicked('sev')" class="checker-unsel"
                  v-bind:class="{'checker-active': seviceObj}">服务对象
          </button>
          <button @click="checkerClicked('sqw')" class="checker-unsel" v-bind:class="{'checker-active': sqWorkMan}">
            社区工作人员
          </button>
          <button @click="nextStape" class="apply-index-next-btn">下一步</button>
        </div>
      </template>

    </template>


  </div>

</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "index",
    components: {
      XHeader
    },
    data() {
      return {
        volChecker: false,//是否选中志愿者
        seviceObj: false,//是否选中服务对象
        sqWorkMan: false,//是否选中社区工作人员
        selType: '',//选择的申请类型
        userType: '',//用户类型
        applyStatus: '',//用户申请状态
        flagApply: false,//用户是否提交过申请,false 表示用户未申请过 ； true表示用户提交过申请
        applyType: '',//用户申请的身份类型
        applyMessage: '',//用户申请认证填写的信息
      }
    },
    mounted() {
      this.userType = this.$store.state.userData.userType
      // if (this.userType === '' || this.userType === undefined){
      this.gainApplyStatus()
      // }

    },
    methods: {
      //选中志愿者，志愿者选项改变class
      //选中服务对象，服务对象改变class
      checkerClicked(typeChecker) {
        this.selType = typeChecker
        if (typeChecker === 'vol') {
          this.volChecker = true
          this.seviceObj = false
          this.sqWorkMan = false
        }
        if (typeChecker === 'sev') {
          this.volChecker = false
          this.seviceObj = true
          this.sqWorkMan = false
        }
        if (typeChecker === 'sqw') {
          this.volChecker = false
          this.seviceObj = false
          this.sqWorkMan = true
        }
      },

      //下一步
      nextStape() {
        if (this.selType === '') {
          this.$vux.alert.show('请选择认证类型')
        } else {
          if (this.selType === 'vol') {
            this.$router.push({
              name: 'apply-vol-type',
              query: {
                selType: this.selType
              }
            })
          }
          if (this.selType === 'sev') {
            this.$router.push({
              name: 'apply-service-input'
            })
          }
          if (this.selType === 'sqw') {
            this.$router.push({
              name: 'apply-sqwork-input'
            })
          }

        }
      },

      //认证过的用户，进入详情页面
      showDetailClicked() {
        this.$router.push({
          name: 'show-apply-detail',
          query: {
            appleObj: this.applyMessage
          }
        })
      },

      //用户已经提交认证，但还未通过
      gainApplyStatus() {
        this.$api.UserApply.userApplyStatus_interface({
          userId: this.$store.state.userData.id
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              if (response.data.data !== undefined) {
                this.applyMessage = response.data.data
                this.flagApply = true
                this.applyStatus = response.data.data.confirmStatus

                if ((this.userType === null || this.userType === '') && this.applyStatus === '1') {
                  this.refreshSign()
                }
                const _this = this
                switch (response.data.data.confirmType) {
                  case "1":
                    _this.applyType = '个人志愿者'
                    if (_this.applyStatus === '1') {
                      _this.userType = '7'
                    }
                    break;
                  case '2':
                    _this.applyType = '志愿者组织'
                    if (_this.applyStatus === '1') {
                      _this.userType = '8'
                    }
                    break;
                  case '3':
                    _this.applyType = '服务对象'
                    if (_this.applyStatus === '1') {
                      _this.userType = '9'
                    }
                    break;
                  case '4':
                    _this.applyType = '社区工作者'
                    if (_this.applyStatus === '1') {
                      _this.userType = '6'
                    }
                    break;
                  default:
                    break;
                }
              } else {
                this.flagApply = false
              }

            }
          }

        })
      },

      refreshSign() {
        this.$store.state.userData = null
        let loginName = localStorage.getItem('loginName')
        let loginPwd = localStorage.getItem('loginPwd')
        this.$api.loginapis.login({
          loginName: loginName,
          password: loginPwd
        })
          .then(res => {
            let loginData = res.data
            if (loginData.status === "SUCCESS") {

              this.$store.state.userData = loginData.data
              localStorage.setItem('loginName', loginName)
              localStorage.setItem('loginPwd', loginPwd)
              localStorage.setItem('userMsg', JSON.stringify(loginData.data))
              this.userType = this.$store.state.userData.userType

            }

          })

      },

      //去修改认证信息
      enterUpdatePage() {
        if (this.applyMessage.confirmType === '1') {
          this.$router.push({
            path: '/apply-vol-input',
            query: {
              updateMsg: this.applyMessage
            }
          })
        }
        if (this.applyMessage.confirmType === '2') {
          this.$router.push({
            path: '/apply-vol-org-input',
            query: {
              updateMsg: this.applyMessage
            }
          })
        }
        if (this.applyMessage.confirmType === '3') {
          this.$router.push({
            path: '/apply-service-input',
            query: {
              updateMsg: this.applyMessage
            }
          })
        }
        if (this.applyMessage.confirmType === '4') {
          this.$router.push({
            path: '/apply-sqwork-input',
            query: {
              updateMsg: this.applyMessage
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .apply-index-title {
    text-align: center;
    margin-top: 50px;
    line-height: 25px;
  }

  .checker-unsel {
    width: 70%;
    margin: 50px 15%;
    height: 50px;
    color: gray;
    border: 1px solid gray;
    background: transparent;
    border-radius: 5px;
  }

  .checker-active {
    color: white;
    background: #1a80cb;
    border: 1px solid #1a80cb;
  }

  .apply-index-next-btn {
    width: 70%;
    margin: 50px 15%;
    height: 50px;
    color: white;
    border: none;
    background: orange;
    border-radius: 50px;
  }

  .apply-success {
    margin: 10px;
    background: white;
    height: 200px;
    border-radius: 10px;
  }

  .apply-success .content-title {
    padding: 10px;
    color: #9b9b9b;
  }

  .apply-success .user-type {
    font-size: 30px;
    color: #00c794;
    text-align: center;
    padding-top: 40px;
    position: relative;
  }

  .apply-success .show-detail {
    margin-top: 70px;
    float: right;
    padding: 0 10px 10px 0;
    font-size: 12px;
    color: #1a80cb;
  }

  .apply-status {
    margin: 10px;
    /*height: 150px;*/
    background: white;
    border-radius: 10px;
  }

  .apply-status .title {
    margin: 10px;
    font-size: 14px;
    color: gray;
    padding: 10px;
  }

  .apply-status .type {
    margin: 10px;
    font-size: 14px;
    color: gray;
    padding: 10px;
  }

  .apply-status .type span {
    color: #00c794;
    font-size: 18px;
  }

  .apply-status .status {
    font-size: 14px;
    color: gray;
    padding: 10px 10px 10px 20px;
  }

  .apply-status .status span {
    font-size: 24px;
    color: #1a80cb;
  }

  .update-button {
    font-size: 14px;
    color: #1a80cb;
    text-align: right;
    padding-right: 15px;
    padding-bottom: 5px;
  }

</style>
