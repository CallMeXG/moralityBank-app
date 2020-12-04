<template>
  <div id="div" style="background-color: white">
    <img class="applogo" src="../../assets/icon-bank.svg" width="20%">
    <div class="inputDiv">
      <p>手机号</p>
      <input v-model="phoneNum" placeholder="用户名"></input>
      <p>验证码</p>
      <div>
        <input style="float: left;width: 45%" v-model="codeNum" placeholder="验证码"></input>
        <button @click="getCodeButtonClicked()">获取验证码</button>
      </div>
      <div style="clear: both"></div>
      <p style="margin-top: 10px">密码</p>
      <input type="password" v-model="pwdNum" placeholder="密码"></input>
      <p>再次输入密码</p>
      <input type="password" v-model="pwdsecNum" placeholder="再次输入密码"></input>
    </div>
    <template v-if="dataType === 'register'">
      <button @click="submitClicked()" class="loginClass">注册</button>
    </template>
    <template v-if="dataType === 'forgetPwd'">
      <button @click="submitClicked()" class="loginClass">更改密码</button>
    </template>
    <!--<img src="../../assets/backimg.jpg">-->
    <!--<div id="center">-->
      <!--<group>-->
        <!--<x-input :show-clear="false" v-model="phoneNum" class="classInput" placeholder="请输入手机号码"></x-input>-->
        <!--<x-input :show-clear="false" placeholder="请输入验证码" v-model="codeNum">-->
          <!--<x-button :disabled="codeDisabled" id="codeBtn" @click.native="getCodeButtonClicked()" mini slot="right" type="primary">{{codeText}}</x-button>-->
        <!--</x-input>-->
        <!--<x-input :show-clear="false" type="password" v-model="pwdNum" placeholder="请输密码"></x-input>-->
        <!--<x-input :show-clear="false" type="password" v-model="pwdsecNum" placeholder="请再次输入密码号码"></x-input>-->
      <!--</group>-->
      <!--<x-button @click.native="submitClicked()" id="submitBtn" type="primary">{{submitBtnTitle}}</x-button>-->
    <!--</div>-->
  </div>
</template>

<script>
  import {Group, Alert} from 'vux'
  import XButton from "vux/src/components/x-button/index";
  import XInput from "vux/src/components/x-input/index";
  import Vue from 'vue'
  import { AlertPlugin } from 'vux'
  Vue.use(AlertPlugin)
  export default {
    name: "index",
    props:{
      dataType:{
        type:String,
        required:true
      }
    },
    components: {
      XInput,
      XButton,
      Group, Alert
    },
    data(){
      return{
        codeText:'获取验证码',
        codeDisabled:false,
        phoneNum:'',
        codeNum:'',
        pwdNum:'',
        pwdsecNum:'',
        submitBtnTitle:''
      }
    },
    mounted() {
      // const innerHeight = window.innerHeight;
      // window.addEventListener('resize', () => {
      //   const newInnerHeight = window.innerHeight;
      //   if (innerHeight > newInnerHeight) {
      //     // 键盘弹出事件处理
      //     document.getElementById('div').style.top = '-150px'
      //
      //   } else {
      //     // 键盘收起事件处理
      //     document.getElementById('div').style.top = '0px'
      //   }
      // });
    },
    beforeMount(){
      if (this.dataType === 'register') {
        this.submitBtnTitle = "注册"
      }else if (this.dataType === 'forgetPwd') {
        this.submitBtnTitle = "修改"
      }
    },
    methods:{
      getCodeButtonClicked(){

        console.log(this.phoneNum)

        if (this.phoneNum !== '') {
          let phoneFlag = checkPhoneNumber(this.phoneNum)
          if (phoneFlag === true){
            this.$api.loginapis.gainCode_interface({
              mobileNumber: this.phoneNum
            }).then(response => {
              if (response.status === 200) {
                if (response.data.status === "SUCCESS") {
                  this.$vux.toast.text('验证码已成功发送到您的手机，请注意查收')
                  let timeOut = 120
                  let self = this
                  this.codeDisabled = true
                  let interval = setInterval(function () {
                    timeOut -= 1
                    self.codeText = timeOut + "s后重新获取"
                    if (timeOut === 0) {
                      clearInterval(interval)
                      self.codeDisabled = false
                      self.codeText = '获取验证码'
                    }

                  },1000)
                }
                if (response.data.status === 'EXCEPTION') {
                  this.$vux.alert.show('今日验证码获取次数超限，请明天再试！')
                }
              }
            })
          }
          else {
            this.$vux.alert.show({
              title:'温馨提示',
              content:'请输入正确手机号码'
            })
          }

        }
        else {
          this.$vux.alert.show({
            title:'温馨提示',
            content:'请输入手机号码'
          })
        }

      },
      submitClicked(){
        if (this.phoneNum === '' || this.codeNum === '' || this.pwdNum === '' || this.pwdsecNum === '') {
          this.$vux.alert.show({
            title:'温馨提示',
            content:'请完整填写信息'
          })
        }
        else {
          //判断两次输入的密码是否相同
          if (this.pwdNum !== this.pwdsecNum) {
            this.$vux.alert.show({
              title:'温馨提示',
              content:'两次输入密码不一样'
            })
          }
          else {

            if (this.dataType === 'register') {
              this.registerFunction()
            }
            else if (this.dataType === 'forgetPwd') {
              this.resetPwdFunction()
            }


          }
        }

      },
      //用户注册
      registerFunction(){
        this.$api.loginapis.userRegister_interface({
          loginName: this.phoneNum,
          password: this.pwdNum,
          newPassword: this.pwdsecNum,
          code: this.codeNum
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              this.$vux.toast.text('用户注册成功,请先去登录...');
              this.$router.go(-1);
            }
            else {
              this.$vux.alert.show('注册失败，请检查后重试！')
            }
          }
        })
      },
      //用户忘记密码
      resetPwdFunction(){
        this.$api.loginapis.userForgetPassword_interface({
          loginName: this.phoneNum,
          password: this.pwdNum,
          newPassword: this.pwdsecNum,
          code: this.codeNum
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              this.$vux.toast.text('用户修改密码成功,请先去登录...');
              this.$router.go(-1);
            }
            else {
              this.$vux.alert.show('密码修改失败，请检查后重试！')
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

  .loginTitle{
    margin-left: 10%;
    font-size: 1.3rem;
    font-weight: bold;
  }
  .applogo{
    margin: 10px 15% 10px 10%;
    border-radius: 5px;
  }
  .inputDiv{
    z-index: 9;
    width: 80%;
    margin-top: 10px;
    margin-left: 10%;
  }
  .inputDiv input{
    margin-top: 10px;
    height: 30px;
    border-radius: 30px;
    padding-left: 30px;
    border: 1px solid #bebebe;
    background-color: white;
    width: calc(100% - 30px);
  }
  .inputDiv p{
    margin-top: 10px;
    font-weight: bold;
  }
  .inputDiv button{
    background-color: #3caaf2;
    border: none;
    float: right;
    margin-top: 12px;
    height: 35px;
    border-radius: 5px;
    color: white;
    /*width: 38%;*/
  }
  .loginClass{
    width: 80%;
    height: 40px;
    margin-left: 10%;
    margin-top: 30px;
    /*background-color: #e75f54;*/
    color: white;
    background-color: #3caaf2;
    /*background: -webkit-linear-gradient(left, #6cfacd, #32c4ec);*/
    /*background: -o-linear-gradient(left,#6cfacd, #32c4ec);*/
    /*background: -moz-linear-gradient(left,#6cfacd, #32c4ec);*/
    /*background: linear-gradient(left,#6cfacd, #32c4ec);*/
    border: none;
    border-radius: 30px;
  }

  /*img{*/
    /*-webkit-filter: blur(10px); !* Chrome, Opera *!*/
    /*-moz-filter: blur(10px);*/
    /*-ms-filter: blur(10px);*/
    /*filter: blur(10px);*/
    /*!*z-index: -1;*!*/
    /*position: fixed;*/
  /*}*/
  #center{
    width: 80%;
    height: 50%;
    position: fixed;
    background-color: white;
    margin-top: 30%;
    margin-left: 10%;
    border-radius: 5px;
  }
  #submitBtn{
    width: 80%;
    margin-left: 10%;
    margin-top: 30px;

  }
</style>
