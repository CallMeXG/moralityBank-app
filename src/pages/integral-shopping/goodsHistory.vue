<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >历史订单</x-header>
    </van-sticky>

    <template v-for="item in orderList">
      <history-order-cell :item-order="item"></history-order-cell>
    </template>
    <br><br>
  </div>
</template>

<script>
  import HistoryOrderCell from '../../components/shopping-goods/historyCell'
  import {XHeader} from 'vux'

  export default {
    name: "goodsHistory",
    components: {
      XHeader, HistoryOrderCell
    },
    data(){
      return{
        orderList: [],//历史订单合集
      }
    },
    mounted() {
      this.gainHistoryOrder()
    },
    methods:{
      //获取历史订单
      gainHistoryOrder(){
        this.$api.Goods.gainHistOrder_interface({
          userId: this.$store.state.userData.id
        }).then(response =>{
          if (response.status === 200){
            if (response.data.status === 'SUCCESS'){
              this.orderList = response.data.data
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
