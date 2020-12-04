import baseJS from './base'
import axios from 'axios'

const AddrList = {
  //获取省份列表
  provinceList_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/findAddressList', {
      params: params
    })
  },
  //获取城市列表
  cityList_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/findCityList', {
      params: params
    })
  },
  //获取省区县列表
  areaList_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/findArea', {
      params: params
    })
  },
  //获取街道列表
  streetList_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/findStreetList', {
      params: params
    })
  },
  //获取社区列表
  communityList_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/findCommunityList', {
      params: params
    })
  }

}
export default AddrList
