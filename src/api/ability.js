import baseJS from './base'
import axios from 'axios'

const AbilityApi = {
  //用户提交能力审核
  submitAbilityApply_interface(params){
    return axios.post(baseJS.baseURL+'/mobile/mobileCore/saveZipperCheckAbility',params)
  },
  //用户提交能力审核
  submitAbilityUpdate_interface(params){
    return axios.post(baseJS.baseURL+'/mobile/mobileCore/saveZipperCheckAbility',params)
  },
  // submitAbilityApply_interface(params){
  //   return axios.get(baseJS.baseURL+'/mobile/mobileCore/saveZipperCheckAbility',{
  //     params: params
  //   })
  // },
  //获取用户自身能力集合
  gainUserAbilityList_interface(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/findZipperCheckAbilityList',{
      params: params
    })
  }

}
export default AbilityApi
