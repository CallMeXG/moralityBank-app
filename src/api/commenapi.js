import baseJS from './base'
import axios from 'axios'

const CommenApi = {
  //获取任务类别
  gainJobTypes(params){
    return axios.get(baseJS.baseURL+'/mobile/mobileCore/findZipperAblitityList',{
      params:params
    })
  },
  //获取任务项目
  gainProsList(params){
    return axios.get(baseJS.baseURL+'/mobile/mobileCore/findZipperAbilityDetailList',{
      params:params
    })
  },
  //获取志愿者热线
  gainVolPhoneList_interface(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/findHotLineList',{
      params: params
    })
  },
  //获取我的任务列表数据
  gainMineTaskInterface(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/findVolunteerDemandList',{
      params: params
    })
  }
}
export default CommenApi
