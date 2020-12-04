import baseJS from './base'
import axios from 'axios'

const Goods = {
  //获取积分商品列表
  gainGoodsListData_interface(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/findCommodityList',{
      params:params
    })
  },
  //提交订单
  sumitGoodsOrder_interface(params){
    return axios.post(baseJS.baseURL + '/mobile/mobileCore/saveZipperOrder',params)
  },
  //获取历史订单
  gainHistOrder_interface(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/findOrderList',{
      params: params
    })
  },
  //获取积分管理
  gainIntegral_interface(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/getConfirmIntegral',{
      params: params
    })
  },
  //积分领取、消耗记录
  scoreGetOrSet_interface(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/getBillDetailList',{
      params: params
    })
  },
  //取消订单
  cancelOrder_interface(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/revokeOrder',{
      params: params
    })
  }

}

export default Goods
