import baseJS from './base'
import axios from 'axios'

const NeedsApi = {
  //提交需求----服务对象
  saveZipperDemandsubmitNeeds_interface(params){
    return axios.post(baseJS.baseURL+'/mobile/mobileCore/saveZipperDemand',params)
  },
  //社区工作人员，需求代发
  sqWorkManSubmitNeed_interface(params){
    return axios.post(baseJS.baseURL + '/mobile/mobileCore/saveCommunity',params)
  },
  //志愿者发布需求   ；  修改需求
  volunteerSubmitNeed_interface(params){
    return axios.post(baseJS.baseURL + '/mobile/mobileCore/volunteerDemand',params)
  },
  //获取我发布的需求列表
  gainMineReleaseNeeds_interface(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/findZipperDemandList',{
      params: params
    })
  },
  //同意或拒绝志愿者进行服务
  dealVolunterrToService_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/demandForCoordinate',{
      params: params
    })
  },
  //取消需求
  cancelThisNeeds_interface(params) {
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/cancelDemand',{
      params: params
    })
  },
  //志愿者发布需求 ---- 先计算所需积分
  volunteerSubmitNeedIntegral_interface(params){
    return axios.post(baseJS.baseURL + '/mobile/mobileCore/getDemandIntegral',params)
  },


}
export default NeedsApi
