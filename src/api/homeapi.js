import baseJS from './base'
import axios from 'axios'

const HomeApi = {
  //获取首页数据
  gainListData(params) {
    return axios.get(baseJS.baseURL + '/mobile/zipper/gainRealTimeGuardians', {
      params: params
    })
  },
  //获取首页跟多数据
  gainListDataWithMac(params) {
    return axios.get(baseJS.baseURL + '/mobile/business/gainTemperatureCurve', {
      params: params
    })
  },

  //获取实时首页数据
  gainHomeRealTimeStatus(params) {
    return axios.get(baseJS.baseURL + '/mobile/statistics/gainRealTime', {
      params: params
    })
  },
  //获取首页轮播图数据
  gainFirstPageSwiperList_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/gainAdvertisementList', {
      params: params
    })
  },
  //获取首页轮播图数据详情
  gainFirstPageSwiperDetailList_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/gainAdvertisement', {
      params: params
    })
  },
  //获取首页二道风采数据
  gainFirstPageEDfengcaiList_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/gainElegantDemeanorList', {
      params: params
    })
  },
  //获取首页二道风采数据详情
  gainFirstPageEDfengcaiDetailList_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/gainElegantDemeanor', {
      params: params
    })
  },
  //获取首页民政风采数据
  gainFirstPageMinZhengList_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/gainCivilList', {
      params: params
    })
  },
  //获取首页民政风采数据详情
  gainFirstPageMinZhengDetailList_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/gainCivil', {
      params: params
    })
  },
  //获取首页便民信息数据
  gainFirstPageBianMinList_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/gainConvenienceList', {
      params: params
    })
  },
  //获取首页便民信息数据详情
  gainFirstPageBianMinDetailList_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/gainConvenience', {
      params: params
    })
  },

  //获取公示榜数据
  gainZipperRankingList(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/getZipperRankingList',{
      params: params
    })
  },
  //获取志愿者风采数据
  gainVolunteerFengCaiList(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/getExcellentVolunteerList',{
      params: params
    })
  }
}

export default HomeApi
