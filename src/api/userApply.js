import baseJS from './base'
import axios from 'axios'

const UserApply = {
  //普通用户认证身份信息
  userApplySubmit_post(params) {
    return axios.post(baseJS.baseURL + '/mobile/mobileCore/saveZipperConfirm',params)
  },
  // userApply_interface(params){
  //   return axios.get(baseJS.baseURL + '/mobile/mobileCore/saveZipperConfirm',{
  //     params:params
  //   },{headers:{'Content-Type': 'application/json'}})
  // },
  //获取用户认证信息,状态
  userApplyStatus_interface(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/findZipperConfirm',{
      params:params
    })
  }
}

export default UserApply
