<template>
  <div class="positionClass" style="background: white;height: 120%">
    <van-sticky>
      <x-header class="headerBackgroundColor" >登录</x-header>
    </van-sticky>

    <div id="LoginDiv">
      <img class="applogo" src="../../assets/icon-bank.svg" width="20%">

      <p class="loginTitle">
        <span>注册登录</span>
        <br>
        <span style="font-size: 0.7rem;color: gray;">Sign in to continue</span>
      </p>
      <div class="inputDiv">
        <p>手机号</p>
        <input v-model="user_Name" placeholder="用户名"></input>
        <p>密码</p>
        <input type="password" v-model="user_password" placeholder="密码"></input>
      </div>
      <button @click="loginButtonClicked()" class="loginClass">登录</button>
      <div style="margin-top: 30px;height: 20px">
        <router-link to="/register" class="classFR" id="register">注册账户</router-link>
        <router-link to="/forget" class="classFR" id="forgetPwd">忘记密码</router-link>
      </div>

      <router-view></router-view>
    </div>


  </div>
</template>

<script>
  import {Group, XHeader} from 'vux'
  import XInput from "vux/src/components/x-input/index";
  import XButton from "vux/src/components/x-button/index";

  export default {
    name: "login",
    components: {
      XButton,
      XInput,
      Group, XHeader
    },
    data() {
      return {
        user_Name: '',
        user_password: ''
      }
    },
    mounted() {

    },
    methods: {
      loginButtonClicked() {

        if (this.user_Name === '') {
          this.$vux.toast.show({
            text: "请输入用户名",
            type: "warn"
          })
          return false
        }
        if (this.user_password === '') {
          this.$vux.toast.show({
            text: "请输入用密码",
            type: "warn"
          })
          return false
        }
        this.$api.loginapis.login({
          loginName: this.user_Name,
          password: this.user_password
        })
          .then(res => {
          let loginData = res.data
          if (loginData.status === "SUCCESS") {
            this.$vux.toast.show({
              text: "登录成功",
              type: "success"
            })

            this.$Uitl.$emit('signSuccess')

            this.$store.state.userData = loginData.data
            localStorage.setItem('loginName',this.user_Name)
            localStorage.setItem('loginPwd',this.user_password)


            localStorage.setItem('userMsg',JSON.stringify(loginData.data))

            this.$router.replace('/')
            // this.$router.push('/')

            // this.$router.push({
            //   path:'/'
            // })
            this.$store.state.changeFirstImage = true
          } else {
            this.$vux.toast.show({
              text: "登录失败，请检查用户名和密码是否正确",
              type: "warn"
            })
            return false
          }

        })


      }
    }
  }


</script>

<style scoped>


  .loginTitle {
    margin-left: 10%;
    font-size: 1.8rem;
    font-weight: bold;
  }

  .applogo {
    margin: 60px 15% 10px 10%;
    border-radius: 5px;
  }

  .inputDiv {
    z-index: 9;
    width: 80%;
    margin-top: 30px;
    margin-left: 10%;
  }

  .inputDiv input {
    margin-top: 10px;
    height: 40px;
    border-radius: 30px;
    padding-left: 30px;
    border: 1px solid #bebebe;
    background-color: white;
    width: calc(100% - 30px);
  }

  .inputDiv p {
    margin-top: 10px;
    font-weight: bold;
  }


  .backImage {
    -webkit-filter: blur(10px); /* Chrome, Opera */
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
    position: fixed;
    z-index: -1;
  }

  .loginClass {
    width: 80%;
    height: 40px;
    margin-left: 10%;
    margin-top: 30px;
    color: white;
    background-color: #3caaf2;
    border: none;
    border-radius: 30px;
  }

  .classFR {
    color: #3caaf2;
  }

  #register {
    float: left;
    margin-left: 10%;
  }

  #forgetPwd {
    float: right;
    margin-right: 10%;
  }

  .net-setting-pillow {
    text-align: center;
    float: right;
    margin: 30px;
  }

  .net-setting-pillow a {
    color: #2acb9e;
  }

  #LoginDiv {
    /*position: fixed;*/
    width: 100%;
    height: 100%;
  }

</style>
