<template>
  <div class="positionClass" style="background: white">
    <div class="re-ability-success-content">
      <van-icon name="checked"/>

      <p>您的能力提交成功</p>
      <p></p>


      <van-button @click="successRelease" plain type="info">我知道了</van-button>

    </div>


  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "reAbilitySuccess",
    components: {
      XHeader
    },
    methods:{
      successRelease(){
        this.$router.replace('/')
      }
    }
  }
</script>

<style scoped>
  .re-ability-success-content {
    text-align: center;
  }
  .re-ability-success-content i{
    color: #1a80cb;
    margin-top: 50px;
    font-size: 100px;
  }
  .re-ability-success-content p{
    margin-top: 50px;
  }
</style>
