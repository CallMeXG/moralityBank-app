<template>
  <div class="positionClass" style="background: white">

    <div class="order-success">
      您已完成下单
    </div>

    <div style="text-align: center">
      <van-button @click="orderKonw" plain type="info">我知道了</van-button>
    </div>



  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "goodsOrderSuccess",
    components: {
      XHeader
    },
    methods:{
      orderKonw(){
        this.$router.replace('/')
      }
    }
  }
</script>

<style scoped>
  .order-success {
    width: 100%;
    height: 200px;
    background: white;
    text-align: center;
    padding-top: 50px;
    color: gray;
  }
</style>
