<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >详情</x-header>
    </van-sticky>

    <van-swipe class="swipe-class" :autoplay="0">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="goods-name-price-class">
      <p class="price"><span>50</span> 积分</p>
      <p class="name">大米 1 Kg</p>
    </div>

    <van-goods-action>
      <van-goods-action-button type="danger" text="立即兑换" @click="onClickButton" />
    </van-goods-action>

  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import Vue from 'vue';
  import { Lazyload } from 'vant';
  Vue.use(Lazyload);
  export default {
    name: "goodsDetail",
    components: {
      XHeader
    },
    data() {
      return {
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg'
        ]
      }
    },
    methods:{
      onClickButton(){
        this.$router.push('/goods-order')
      }
    }
  }
</script>

<style scoped>
  .swipe-class{
    width: 100%;
    height: 50%;
  }
  .swipe-class img{
    height: 100%;
    width: 100%;
  }
  .goods-name-price-class{
    background: white;
    width: 100%;
    height: 150px;
  }
  .goods-name-price-class .price{
    margin: 0 10px;
    padding-top: 15px;
    font-size: 14px;
    color: red;
  }
  .goods-name-price-class .price span{
    font-size: 20px;
  }
  .goods-name-price-class .name{
    margin: 10px;
    font-size: 14px;
    font-weight: bold;
  }

</style>
