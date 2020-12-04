<template>
  <div class="shopping-center-cell">
    <img :src="setGoodsItemImgSrc(goodsItem.commodityImg)">
    <div class="goods-content">
      <p class="goodsName">{{goodsItem.commodityName}}</p>
      <p class="goodsScore">
        <span style="font-size: 16px">{{goodsItem.commodityIntegral}}积分</span>
        <template v-if="goodsItem.commodityStatus === '1'">
          <button class="cell-btn" @click="goodsClicked(goodsItem)">兑换</button>
        </template>
        <template v-if="goodsItem.commodityStatus === '0'">
          <button  @click="goodsClicked(goodsItem)" style="color: #c4c4c4;border-color: #c4c4c4" class="cell-btn" >兑换</button>
        </template>
      </p>
      <div>
        <span class="stock">库存:{{goodsItem.commodityStock}}</span>
      </div>
<!--      <template v-if="goodsItem.commodityStatus === '0'">-->
<!--        <van-tag size="mini" style="margin: 10px 0 0 5px" plain type="warning">商品已下架</van-tag>-->
<!--      </template>-->


    </div>

    <br>
  </div>
</template>

<script>
  import {Dialog} from 'vant'
  import Vue from 'vue'
  Vue.use(Dialog)
  export default {
    name: "listCell",
    props: {
      goodsObj: Object
    },
    data() {
      return {
        goodsItem: this.goodsObj
      }
    },
    methods: {
      goodsClicked(itemsGoods) {

        if (itemsGoods.commodityStatus === '0'){
          Dialog.alert({
            title: "商品已下架"
          })
        }
        else {
          this.$router.push({
            path: '/goods-order',
            query: {
              itemGoods: itemsGoods
            }
          })
        }


      },
      setGoodsItemImgSrc(srcImg) {
        return srcImg
      }
    }
  }
</script>

<style scoped>
  .shopping-center-cell {
    margin: 10px 0 0 10px;
    width: calc((100% - 30px) / 2);
    background: white;
    float: left;
    border-radius: 5px;
    box-shadow: 5px 5px 10px #e0e0e0;
    text-align: center;
    /*height: 227px;*/
  }

  .shopping-center-cell img {
    margin: 5px;
    height: 100px;
  }

  .shopping-center-cell .goods-content {
    text-align: left;
    height: 100%;
  }

  .shopping-center-cell .goodsName {
    font-size: 14px;
    padding: 3px;
    margin: 5px;
  }

  .shopping-center-cell .goodsScore {
    color: orange;
    padding: 0 8px;
    height: 25px;
    line-height: 25px;
  }

  .shopping-center-cell .goodsScore span {
    font-size: 20px;
  }

  .stock {
    font-size: 14px;
    color: #737373;
    padding-left: 10px;
    margin-bottom: 5px;
  }

  .cell-btn {
    width: 60px;
    height: 27px;
    float: right;
    border-radius: 2px;
    border: 1px solid orange;
    background: transparent;
    font-size: 14px;
    color: orange;
  }

</style>
