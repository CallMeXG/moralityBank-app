<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >积分商城<a @click="orderHistoryClicked" style="font-size: 20px" slot="right"><van-icon name="clock-o" /></a></x-header>
    </van-sticky>

    <!--    <div class="top-content">-->
    <!--      <div class="top-null"></div>-->
    <!--      <div class="top-mine-score">当前积分: <span>1000</span> </div>-->
    <!--    </div>-->

    <div style="height: 100%;overflow-y: auto">
      <template v-for="item in goodsList">
        <shooping-center-list-cell v-if="item.commodityStatus !== '0'" :goods-obj="item"></shooping-center-list-cell>
      </template>

    </div>


  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import ShoopingCenterListCell from '../../components/shopping-center/listCell'

  export default {
    name: "index",
    components: {
      XHeader, ShoopingCenterListCell
    },
    data(){
      return {
        goodsList: [],//商品列表
      }
    },
    mounted() {
      this.gainGoodsListData()
    },
    methods:{
      //获取商品列表
      gainGoodsListData(){
        this.$api.Goods.gainGoodsListData_interface({

        }).then(response => {
          console.log(response)
          if (response.status === 200){
            if (response.data.status === 'SUCCESS'){
              this.goodsList = response.data.data.list
            }
          }
        })
      },
      //进入历史订单
      orderHistoryClicked(){
        this.$router.push('/goods-history')
      }
    }
  }
</script>

<style scoped>
  .top-content {
    /*width: 100%;*/
    height: 150px;
    background: linear-gradient(to bottom right, #d4956a, #ffd46f);;
    text-align: center;
    margin: 10px;
    border-radius: 10px;
  }

  .top-null {
    width: 100%;
    height: 20px;
    background: transparent;
  }

  .top-mine-score {
    font-size: 18px;
    color: white;
    /*width: 100px;*/
    /*height: 100px;*/
    /*background: #1a80cb;*/
    /*color: #00c794;*/
    /*border-radius: 50%;*/
    /*margin-left: calc((100% - 100px) / 2);*/
    /*line-height: 100px;*/
  }

  .top-mine-score span {
    font-size: 26px;
    color: red;
  }


</style>
