import baseJS from './base'
import axios from 'axios'

const loginInterface = {
  //登录
  login(params){
    return axios.get(baseJS.baseURL+'/mobile/login',{
      params:params
    })
  },
  //修改个人密码
  updateMinePasswd(params){
    return axios.get(baseJS.baseURL + '/mobile/zipper/updatePasswd',{
      params:params
    })
  },
  //修改个人资料
  updateMineMessage_interface(params){
    return axios.get(baseJS.baseURL + '/mobile/zipper/updateUserInfo',{
      params:params
    })
  },
  //获取验证码
  gainCode_interface(params){
    return axios.get(baseJS.baseURL + '/api/generl/generate',{
      params:params
    })
  },
  //用户注册
  userRegister_interface(params){
    return axios.get(baseJS.baseURL + '/api/generl/logon',{
      params:params
    })
  },
  //忘记密码，没有登录
  userForgetPassword_interface(params){
    return axios.get(baseJS.baseURL + '/api/generl/updatePasswd',{
      params:params
    })
  },
  //用户授权登录
  userAuthorizedLogin_interface(params){
    return axios.get(baseJS.baseURL + '/mobile/authorizedLogin',{
      params: params
    })
  }
}
export default loginInterface
