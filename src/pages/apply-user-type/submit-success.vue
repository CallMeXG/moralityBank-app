<template>
  <div class="positionClass" style="background: white">
    <div style="text-align: center">
      <van-icon class="success-icon" name="clock" size="150px" color="#00c794"/>
      <div class="text-style">您的认证信息已提交，正式进入审核阶段</div>
      <div class="text-style">请保持所填手机号码畅通，我们近期可能会有工作人员与您取得联系</div>
      <button style="background-color: transparent;border: none" @click="successClicked">我知道了</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "submit-success",
    methods:{
      successClicked(){
        this.$router.replace('/mine')
      }
    }
  }
</script>

<style scoped>
  .success-icon{
    margin-top: 50px;
  }
  .text-style{
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    color: gray;
    line-height: 25px;
    font-size: 14px;
  }
  button{
    margin-top: 150px;
    color: #1a80cb;
  }
</style>
