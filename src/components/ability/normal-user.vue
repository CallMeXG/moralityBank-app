<template>
  <div class="positionClass">
    <div class="normal-text">您当前状态为普通用户，暂时不具备发布能力的权限，请先去申请认证账户类型</div>
    <button @click="gotoApply" class="apply-btn">去认证</button>
  </div>
</template>

<script>
    export default {
        name: "normal-user",
      methods:{
        gotoApply(){
          this.$router.push('/apply-user-type')
        }
      }
    }
</script>

<style scoped>
  .normal-text{
    text-align: center;
    margin: 100px 30px;
    line-height: 25px;
  }
  .apply-btn{
    width: 70%;
    margin: 50px 15%;
    height: 50px;
    color: white;
    background: #3caaf2;
    border: none;
    border-radius: 10px;
    font-size: 18px;
  }

</style>
