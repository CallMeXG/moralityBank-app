<template>
  <div class="history-order">
    <van-tag v-if="itemOrder.state === '0'" mark color="#72a6b2" style="float: left">待发货</van-tag>
    <van-tag v-if="itemOrder.state === '1'" mark color="#e54d52" style="float: left">已取消</van-tag>
    <van-tag v-if="itemOrder.state === '2'" mark color="#2c6eb2" style="float: left">待签收</van-tag>
    <van-tag v-if="itemOrder.state === '3'" mark color="#0bb20c" style="float: left">已签收</van-tag>
    <van-tag v-if="itemOrder.state === '4'" mark color="#b2417f" style="float: left">已撤销</van-tag>

    <div style="clear: both"></div>
    <img :src=" itemOrder.zipperCommodityList[0].commodityImg">
    <div class="content">
      <div class="title van-multi-ellipsis--l2">{{itemOrder.zipperCommodityList[0].commodityName}}</div>
      <div class="price">
        <span>单价:</span>
        <span style="font-size: 14px;">{{itemOrder.zipperCommodityList[0].commodityIntegral}}</span>
        <span>积分</span>
      </div>
      <div class="total">
        <span>x{{itemOrder.zipperCommodityList[0].number}}</span>
        <span>合计</span>
        <span style="font-size: 16px;font-weight: bold;color: red">{{itemOrder.subtraction}}</span>
        <span>积分</span>
      </div>
      <p class="time">{{itemOrder.createDate}}</p>
    </div>
    <div style="clear: both"></div>
    <template v-if="itemOrder.courierCompany !== undefined">
      <p class="send-detail">
        <span>{{itemOrder.courierCompany}}:</span>
        <span>{{itemOrder.courierNumber}}</span>
      </p>
    </template>

    <p v-if="itemOrder.state === '4' && itemOrder.notice !== undefined" class="cancel-reason">{{itemOrder.notice}}</p>
    <button @click="userCancelOrder"
            v-if="itemOrder.state === '0' || itemOrder.state === '2'"
            class="cancel-btn">取消订单</button>
    <div style="clear: both"></div>
  </div>
</template>

<script>
  export default {
    name: "historyCell",
    props: {
      itemOrder: Object
    },
    methods:{
      userCancelOrder(){
        this.$api.Goods.cancelOrder_interface({
          id: this.itemOrder.id
        }).then(response => {
          if (response.status === 200){
            if (response.data.status === 'SUCCESS'){
              this.itemOrder.state = '1'
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .history-order {
    margin: 10px;
    background: white;
    border-radius: 5px;
  }

  .history-order img {
    float: left;
    width: 100px;
    height: 100px;
    margin: 10px;
    border-radius: 3px;
  }
  .history-order .content{
    float: left;
    height: 120px;
    width: calc(100% - 120px);
  }
  .history-order .content .title{
    padding: 10px;
    font-size: 14px;
  }
  .history-order .content .price{
    font-size: 12px;
    color: gray;
    padding: 5px 10px;
  }
  .history-order .content .total{
    font-size: 12px;
    color: gray;
    padding: 10px 10px;
  }
  .history-order .content .time{
    font-size: 12px;
    padding: 5px 10px;
    color: #a9a7a6;
  }
  .cancel-btn{
    width: 70px;
    height: 25px;
    font-size: 12px;
    border: 1px solid #c4c4c4;
    color: gray;
    background: transparent;
    border-radius: 50px;
    float: right;
    margin: 10px 10px 10px 0;
  }
  .cancel-reason{
    font-size: 12px;
    color: red;
    padding: 5px;
  }
  .send-detail{
    font-size: 12px;
    color: gray;
    padding: 5px;
  }
</style>
