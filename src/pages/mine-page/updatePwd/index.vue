<template>
  <div class="positionClass">
    <x-header class="headerBackgroundColor" >修改密码</x-header>
    <div class="update-pwd-content">
      <p class="title">当前登录账户: {{userPhone}} </p>
      <div class="input-up-class">
        <input type="password" placeholder="请输入新密码" v-model="newPwd"></input>
      </div>
      <div class="input-up-class">
        <input type="password" placeholder="请再次输入密码" v-model="newPwdSec"></input>
      </div>
      <button class="submit-up-btn" @click="submitSaveNewPwd">保存</button>
    </div>

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
        userPhone: '',//用户手机号码
        userPhoneText: '',//用**表示的的手机号码
        newPwd: '',//用户输入的新密码
        newPwdSec: '',//再次输入密码
      }
    },
    mounted() {
      //获取登录用户的手机号码，
      //手机号码中间四位用 **** 表示
      let userMsg = this.$store.state.userData
      this.userPhone = userMsg.loginName
      let phoneNum = userMsg.loginName
      this.userPhoneText = phoneNum.substr(0, 3) + '****' + phoneNum.substr(7, 4)

    },
    methods: {

      //提交保存
      submitSaveNewPwd(){
        let userMsg = this.$store.state.userData
        if (this.newPwd.length === 0){
          this.$vux.alert.show('请输入新密码')
        }else if (this.newPwdSec.length === 0){
          this.$vux.alert.show('请再次输入密码')
        }
        else if (this.newPwdSec !== this.newPwd){
          this.$vux.alert.show('两次输入的密码不一样')
        }
        else {
          let dataParams = {
            password: this.newPwdSec,
            loginUserId: userMsg.id,
            token: userMsg.token
          }

          this.$api.loginapis.updateMinePasswd({
            password: this.newPwdSec,
            loginUserId: userMsg.id,
            token: userMsg.token
          }).then(response => {
            if (response.status === 200){
              if (response.data.status === 'SUCCESS'){
                this.$router.replace('/login')
              }
              else {
                this.$vux.alert.show('修改密码失败，请重试')
              }
            }
            else {
              this.$vux.alert.show('修改密码失败，请重试')
            }
          })


        }

      }
    }
  }
</script>

<style scoped>
  .update-pwd-content {
    margin: 40px 20px;
    background: white;
    box-shadow: 2px 2px 10px #888888;
    border-radius: 5px;
    height: 300px;
  }

  .update-pwd-content .title {
    font-size: 18px;
    padding: 15px;
    margin-top: 15px;
  }

  .input-up-class {
    margin: 5px 10px;
    height: 50px;
    border-bottom: 1px solid gainsboro;
    /*background: #00c794;*/
  }

  .input-up-class input {
    height: 45px;
    border: none;
    width: 70%;
    background: transparent;

  }

  .input-up-class input::placeholder {
    color: #c3c3c3;
  }

  .get-code-btn {
    width: 28%;
    float: right;
    height: 45px;
    background: #00c794;
    color: white;
    border: none;
    border-radius: 10px;
  }

  .submit-up-btn {
    margin: 30px 20px;
    border: none;
    border-radius: 50px;
    height: 50px;
    background: #3caaf2;
    color: white;
    width: calc(100% - 40px);
  }
</style>
