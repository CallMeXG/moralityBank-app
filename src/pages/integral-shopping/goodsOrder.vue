<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >确认订单</x-header>
    </van-sticky>


    <order-cell :price="goodsItemObj.commodityIntegral"
                :title="goodsItemObj.commodityName"
                :goods-image=" goodsItemObj.commodityImg"
                :total-count="goodsItemObj.commodityStock"
                @changeCount="orderChangeCount"
    ></order-cell>

    <div class="goods-order-addr-mine">
      <van-field
        v-model="userMsg.name"
        label="收件人"
      />
      <van-field
        v-model="userMsg.phoneNumber"
        label="手机号码"
      />
      <van-field
        readonly
        clickable
        :value="areaObject.strAreaName"
        label="所在区县"
        placeholder="选择区县"
        right-icon="arrow"
        @click="areaObject.flagShow = true"
      />
      <van-popup v-model="areaObject.flagShow" position="bottom">
        <van-picker
          show-toolbar
          :columns="areaObject.columns"
          @confirm="onConfirmArea"
          @cancel="areaObject.flagShow = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        :value="streetObject.strAreaName"
        label="所在街道"
        placeholder="选择街道"
        right-icon="arrow"
        @click="streetObject.flagShow = true"
      />
      <van-popup v-model="streetObject.flagShow" position="bottom">
        <van-picker
          show-toolbar
          :columns="streetObject.columns"
          @confirm="onConfirmStreet"
          @cancel="streetObject.flagShow = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        :value="communityObject.strAreaName"
        label="所在社区"
        placeholder="选择社区"
        right-icon="arrow"
        @click="communityObject.flagShow = true"
      />
      <van-popup v-model="communityObject.flagShow" position="bottom">
        <van-picker
          show-toolbar
          :columns="communityObject.columns"
          @confirm="onConfirmCommunity"
          @cancel="communityObject.flagShow = false"
        />
      </van-popup>
      <van-field
        v-model="userMsg.address"
        label="详细地址"
      />
      <van-field
        v-model="remarksText"
        placeholder="附加信息"
        label="附加信息"
      />

    </div>
    <div class="goods-order-addr">
      <div class="left-addr-icon">
        <van-icon name="location"/>
      </div>
      <div class="right-addr-detail">
        <p class="top">
          {{userMsg.name}}
          <span>{{userMsg.phoneNumber}}</span>
        </p>
        <p class="addr-text">{{areaObject.strAreaName}}{{streetObject.strAreaName}}{{communityObject.strAreaName}}{{userMsg.address}}</p>
      </div>
    </div>
    <br><br><br><br>
    <div class="mine-submit-bar">
      <van-button @click="OrderOnSubmit" size="small" class="order-submit" round type="danger">提交订单</van-button>
      <span class="total-price">
        <span style="font-size: 12px;color: #444444;padding-right: 10px">总计: </span>
        <span style="padding-right: 5px;font-size: 20px">{{totalPrice}}</span>
        <span style="font-size: 12px;padding-right: 10px;color: #444444"> 积分</span></span>
    </div>

  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import OrderCell from '../../components/shopping-goods/orderCell'
  import Vue from 'vue';
  import {Toast, Dialog} from 'vant';
  Vue.use(Toast);
  Vue.use(Dialog);
  export default {
    name: "goodsOrder",
    components: {
      XHeader, OrderCell
    },
    data() {
      return {
        goodsItemObj: this.$route.query.itemGoods,//商品item
        goodsPrice: this.$route.query.itemGoods.commodityIntegral,//商品单位价格
        totalPrice: this.$route.query.itemGoods.commodityIntegral,//总价，单价乘以数量
        goodsCount: 1,
        remarksText: '',
        userMsg: '',//用户信息，用作地址
        areaObject: {
          columns: [{
            "areaCode": "220105",
            "cityCode": "220100",
            "text": "二道区",
            "shortName": "二道",
            "lng": "125.384727",
            "lat": "43.870823",
            "sort": "3",
            "gmtCreate": "2019-02-28 17:16:58",
            "gmtModified": "2019-02-28 17:17:05",
            "memo": "",
            "dataState": "1",
            "tenantCode": "00000000",
            "delFlag": "0",
            "isNewRecord": false
          }],
          strAreaName: '二道区',
          strAreaCode: '220105',
          flagShow: false
        },//区
        streetObject: {
          columns: [],
          strAreaName: '',
          strAreaCode: '',
          flagShow: false
        },//街道
        communityObject: {
          columns: [],
          strAreaName: '',
          strAreaCode: '',
          flagShow: false
        },//社区
      }
    },
    mounted() {
      this.gainUserMessage()
    },
    methods: {
      //提交订单
      OrderOnSubmit() {

        if (this.userMsg.name === ''){
          Toast('收件人不得为空')
        }
        else if (this.userMsg.phoneNumber === ''){
          Toast('收件人电话不得为空')
        }
        else if (this.areaObject.strAreaCode === ''){
          Toast('所在区县不得为空')
        }
        else if (this.streetObject.strAreaCode === ''){
          Toast('所在街道不得为空')
        }
        else if (this.communityObject.strAreaCode === ''){
          Toast('所在社区不得为空')
        }
        else if (this.userMsg.address === ''){
          Toast('详细地址不得为空')
        }
        else {
          let paramData = new FormData()
          paramData.append('userId',this.$store.state.userData.id)
          paramData.append('name',this.userMsg.name)
          paramData.append('phone',this.userMsg.phoneNumber)
          paramData.append('streetCode',this.streetObject.strAreaCode)
          paramData.append('communityCode',this.communityObject.strAreaCode)
          paramData.append('address',this.userMsg.address)
          paramData.append('orderState','0')
          paramData.append('remarks',this.remarksText)
          paramData.append('zipperCommodityList[0].id',this.goodsItemObj.id)
          paramData.append('zipperCommodityList[0].number',this.goodsCount)
          Toast.loading({
            message: '订单提交中...',
            forbidClick: true,
            loadingType: 'spinner'
          });
          this.$api.Goods.sumitGoodsOrder_interface(paramData)
          .then(response => {
            Toast.clear()
            if (response.status === 200){
              if (response.data.status === 'SUCCESS'){
                this.$router.push('/goods-order-success')
              }
              else {
                Dialog({
                  title: '订单提交失败',
                  message: response.data.message
                })
              }
            }
          })
        }


        // this.$router.push('/goods-order-success')
      },
      //改变商品数量，修改总价
      orderChangeCount(value) {
        this.goodsCount = value
        this.totalPrice = this.goodsPrice * value
      },

      //获取用户信息
      gainUserMessage() {
        this.$api.UserApply.userApplyStatus_interface({
          userId: this.$store.state.userData.id
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              this.userMsg = response.data.data
              this.streetObject.strAreaName = this.userMsg.bsStreet.streetName
              this.streetObject.strAreaCode = this.userMsg.streetCode
              this.communityObject.strAreaName = this.userMsg.bsCommunity.communityName
              this.communityObject.strAreaCode = this.userMsg.communityCode
              this.gainStreetColumnsOrder(this.areaObject.strAreaCode)
            }
          }
        })
      },
      //选择区县
      onConfirmArea(value) {
        this.areaObject.strAreaName = value.text;
        this.areaObject.strAreaCode = value.areaCode;
        this.areaObject.flagShow = false;
        this.streetObject.columns = []
        this.streetObject.strAreaCode = ''
        this.streetObject.strAreaName = ''
        this.gainStreetColumnsOrder(value.areaCode)
      },
      //选择街道
      onConfirmStreet(value) {
        this.streetObject.strAreaName = value.text;
        this.streetObject.strAreaCode = value.streetCode;
        this.streetObject.flagShow = false;
        this.communityObject.columns = []
        this.communityObject.strAreaCode = ''
        this.communityObject.strAreaName = ''
        this.gainCommunityListOrder(value.streetCode)
      },
      //选择社区
      onConfirmCommunity(value) {
        this.communityObject.strAreaName = value.text;
        this.communityObject.strAreaCode = value.areaCode;
        this.communityObject.flagShow = false;
      },
      //获取街道列表
      gainStreetColumnsOrder(strCode) {
        this.$api.AddrList.streetList_interface({
          areaCode: strCode
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              let tempStreet = response.data.data
              for (let i = 0; i < tempStreet.length; i++) {
                let objStreet = {
                  streetId: tempStreet[i].streetId,
                  streetCode: tempStreet[i].streetCode,
                  text: tempStreet[i].streetName
                }
                this.streetObject.columns.push(objStreet)
              }
            }
          }
        })
      },
      //获取社区列表
      gainCommunityListOrder(strCode) {
        this.$api.AddrList.communityList_interface({
          streetCode: strCode
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              let arrCom = response.data.data
              for (let i = 0; i < arrCom.length; i++) {
                let objPro = {
                  communityId: arrCom[i].communityId,
                  communityCode: arrCom[i].communityCode,
                  text: arrCom[i].communityName
                }
                this.communityObject.columns.push(objPro)
              }
            }
          }
        })
      },
    }
  }
</script>

<style scoped>
  .goods-order-addr {
    width: calc(100% - 20px);
    height: 100px;
    background: white;
    border-radius: 10px;
    margin: 10px;
  }

  .goods-order-addr .left-addr-icon {
    width: 40px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    float: left;
    background: transparent;
    font-size: 24px;
    color: #ff763b;
  }

  .goods-order-addr .right-addr-detail {
    float: left;
    width: calc(100% - 70px);
    height: 100px;
    background: transparent;
  }

  .goods-order-addr .right-addr-detail .top {
    margin: 15px 0 0 0;
    font-size: 18px;
  }

  .goods-order-addr .right-addr-detail .top span {
    font-size: 16px;
    color: gray;
    padding-left: 10px;
  }

  .goods-order-addr .right-addr-detail .addr-text {
    font-size: 14px;
    color: gray;
    padding: 10px 0 0 0;
    line-height: 18px;
  }

  .goods-order-addr .right-arrow {
    float: right;
    width: 30px;
    line-height: 100px;
    height: 100px;
    background: transparent;
    text-align: center;
    color: gray;
  }

  .mine-submit-bar {
    width: 100%;
    height: 50px;
    background: white;
    position: fixed;
    bottom: 0;
    line-height: 50px;
    /*display: none;*/
  }

  .mine-submit-bar .order-submit {
    float: right;
    margin-top: 10px;
    margin-right: 20px;

  }

  .mine-submit-bar .total-price {
    float: right;
    padding-right: 20px;
    color: red;
  }

  .goods-order-addr-mine {
    margin: 10px;
    border-radius: 10px;
    background: white;
    padding: 5px;
  }

</style>
