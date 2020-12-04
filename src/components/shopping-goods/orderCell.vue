<template>
  <div class="order-cell">
    <img :src="goodsImage">
    <div class="content">
      <p class="title">{{title}}</p>
      <p class="price">{{price}}<span style="font-size: 12px"> 积分</span></p>
      <p>
        <van-stepper
                     @change="countChange"
                     class="stepper-left"
                     v-model="count"
                     :max="totalCount"/>
        <span class="count">
          x{{count}}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "orderCell",
    data() {
      return {
        count: 1,
      }
    },
    props: {
      goodsImage: String,
      title: String,
      price: String,
      totalCount: String
    },
    methods:{
      //修改订单 -- 数量
      countChange(value){
        this.$emit('changeCount',value)
      }
    }
  }
</script>

<style scoped>
  .order-cell {
    width: 100%;
    height: 110px;
    background: #fafafa;
  }

  .order-cell img {
    margin: 10px;
    width: 90px;
    height: 90px;
    border-radius: 10px;
    float: left;
  }

  .order-cell .content {
    float: left;
    width: calc(100% - 120px);
    height: 100%;
  }

  .order-cell .content .title {
    padding: 10px;
    font-size: 14px;
  }

  .order-cell .content .price {
    padding: 10px;
    font-size: 18px;
    color: red;
  }

  .order-cell .content .count {
    padding: 10px 15px;
    font-size: 12px;
    color: gray;
    float: right;
  }

  .order-cell .content .stepper-left {
    float: left;
  }
</style>
