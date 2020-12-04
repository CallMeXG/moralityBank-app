import baseJS from './base'
import axios from 'axios'

const TaskApi = {
  //任务大厅，获取任务列表
  gainTask_interface(params){
    return axios.get(baseJS.baseURL+'/mobile/mobileCore/volunteerFindTaskList',{
      params:params
    })
  },
  //领取任务接口
  receiveTask_interface(params){
    return axios.get(baseJS.baseURL+'/mobile/mobileCore/applyForCoordinate',{
      params:params
    })
  },
  //志愿者开始任务
  volunteerStartTask(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/startDemand',{
      params: params
    })
  },
  //志愿者结束任务
  volunteerFinishTask(params){
    return axios.post(baseJS.baseURL + '/mobile/mobileCore/finishDemand',params)
  },
  //志愿者申诉
  volunteerAppealTask(params){
    return axios.post(baseJS.baseURL + '/mobile/mobileCore/supplementDemand',params)
  },
  //任务大厅，获取集体任务列表
  gainCollectiveTaskList_interface(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/findCombineList',{
      params: params
    })
  },
  //任务大厅，集体任务领取
  receiveColTask_interface(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/receiveDemandAgent',{
      params: params
    })
  },

  //我的任务，集体任务中取消任务
  cancelTask_interface(params){
    return axios.get(baseJS.baseURL + '/mobile/mobileCore/cancelReceiveDemand',{
      params: params
    })
  }



}
export default TaskApi
