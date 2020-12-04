import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userData: localStorage.getItem('userMsg'),
  // userData: {
  //   "loginName": "15718822375",
  //   "name": "王红笑",
  //   "userType": "7",
  //   "loginFlag": "1",
  //   "zipperConfirm": {
  //     "userId": "154346489257132032",
  //     "name": "王红笑",
  //     "sex": "1",
  //     "age": "28",
  //     "confirmType": "1",
  //     "credentialType": "1",
  //     "credentialNum": "410928199204034273",
  //     "photoUrlUp": "M00/00/01/wKgBB15t8-mASSB_AADx2H1crLc282.jpg",
  //     "photoUrlDn": "M00/00/01/wKgBB15t8-qAdasYAAAfFcb-0X8040.jpg",
  //     "confirmStatus": "1",
  //     "auditDate": "2020-03-16 09:24:49",
  //     "phoneNumber": "15718822375",
  //     "streetCode": "220105001",
  //     "communityCode": "220105001001",
  //     "address": "华杰大厦8b3",
  //     "notice": "申请书，申请成为志愿者---这里测试的是修改认证申请----1",
  //     "replyInfo": "",
  //     "bsStreet": {
  //       "streetCode": "220105001",
  //       "streetName": "东盛街道",
  //       "delFlag": "0",
  //       "isNewRecord": false
  //     },
  //     "bsCommunity": {
  //       "communityCode": "220105001001",
  //       "communityName": "双安社区",
  //       "delFlag": "0",
  //       "isNewRecord": false
  //     },
  //     "delFlag": "0",
  //     "id": "163506846785601536",
  //     "isNewRecord": false
  //   },
  //   "createDate": "2020-02-19 10:42:51",
  //   "updateBy": {
  //     "loginFlag": "1",
  //     "roleList": [
  //
  //     ],
  //     "delFlag": "0",
  //     "id": "154346489257132032",
  //     "isNewRecord": false
  //   },
  //   "updateDate": "2020-02-19 14:50:51",
  //   "delFlag": "0",
  //   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib3JzY2hlIiwiZXhwIjoxNTg0NTAzNjI5LCJ0cyI6IjE1ODQ0MTcyMjk5MzgifQ.jkpeCBlcflS5lsDDvjDYAKJuQvqvIa4XR_IXLMxmyYo",
  //   "id": "154346489257132032",
  //   "isNewRecord": false
  // }

  // userData: {
  //   "loginName": "15718822371",
  //   "name": "郭德纲",
  //   "loginFlag": "1",
  //   "delFlag": "0",
  //   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib3JzY2hlIiwiZXhwIjoxNTg0NTA3NTY4LCJ0cyI6IjE1ODQ0MjExNjg1OTQifQ.FEVw6j7k_KN7iblpNjIhytI1sxIhBZ7yv3UEG7HOcM4",
  //   "id": "1001",
  //   "isNewRecord": false
  // },

  // userData: {
  //   "loginName":
  //     "15718822372",
  //   "name":
  //     "于谦",
  //   "userType":
  //     "9",
  //   "loginFlag":
  //     "1",
  //   "zipperConfirm":
  //     {
  //       "userId":
  //         "1002", "name":
  //         "于谦服务对象", "sex":
  //         "1", "age":
  //         "99", "confirmType":
  //         "3", "credentialType":
  //         "1", "credentialNum":
  //         "123456789009888912888", "photoUrlUp":
  //         "M00/00/02/wKgBB15xmc-APNOKAAAfD_QwhE8627.jpg", "photoUrlDn":
  //         "M00/00/02/wKgBB15xmdCADJf_AAA1kYdgFUI627.jpg", "confirmStatus":
  //         "1", "auditDate":
  //         "2020-03-18 13:21:51", "phoneNumber":
  //         "15718822372", "streetCode":
  //         "220105001", "communityCode":
  //         "220105001001", "address":
  //         "于谦导师的地址", "notice":
  //         "于谦老师，服务对象的申请书", "replyInfo":
  //         "", "bsStreet":
  //         {
  //           "streetCode":
  //             "220105001", "streetName":
  //             "东盛街道", "delFlag":
  //             "0", "isNewRecord":
  //             false
  //         }
  //       ,
  //       "bsCommunity":
  //         {
  //           "communityCode":
  //             "220105001001", "communityName":
  //             "双安社区", "delFlag":
  //             "0", "isNewRecord":
  //             false
  //         }
  //       ,
  //       "createDate":
  //         "2020-03-18 11:47:28", "delFlag":
  //         "0", "id":
  //         "164509615935979520", "isNewRecord":
  //         false
  //     }
  //   ,
  //   "delFlag":
  //     "0",
  //   "token":
  //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib3JzY2hlIiwiZXhwIjoxNTg0NTk1MzY2LCJ0cyI6IjE1ODQ1MDg5NjY0OTkifQ.LpevfqHP-xdyhI4rKJmsZHjIzSLf6woipt68bOKIhoQ",
  //   "id":
  //     "1002",
  //   "isNewRecord":
  //     false
  // }
  // userData: {
  //   "loginName": "15718822373",
  //   "name": "岳云鹏",
  //   "userType": "6",
  //   "loginFlag": "1",
  //   "zipperConfirm": {
  //     "userId": "1003",
  //     "name": "岳云鹏社区工作人员",
  //     "sex": "2",
  //     "age": "66",
  //     "confirmType": "4",
  //     "credentialType": "1",
  //     "credentialNum": "000090898839283239293",
  //     "photoUrlUp": "M00/00/02/wKgBB15xsjaAPzX9AABCXTMojKU231.jpg",
  //     "photoUrlDn": "M00/00/02/wKgBB15xsjeAP8NeAAA65RRkQJQ420.jpg",
  //     "confirmStatus": "1",
  //     "auditDate": "2020-03-18 13:35:42",
  //     "phoneNumber": "15718822373",
  //     "streetCode": "220105001",
  //     "communityCode": "220105001001",
  //     "address": "岳云鹏地址",
  //     "notice": "岳云鹏申请书修改-1",
  //     "replyInfo": "",
  //     "bsStreet": {"streetCode": "220105001", "streetName": "东盛街道", "delFlag": "0", "isNewRecord": false},
  //     "bsCommunity": {"communityCode": "220105001001", "communityName": "双安社区", "delFlag": "0", "isNewRecord": false},
  //     "createDate": "2020-03-18 13:31:35",
  //     "delFlag": "0",
  //     "id": "164535816343781376",
  //     "isNewRecord": false
  //   },
  //   "delFlag": "0",
  //   "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJib3JzY2hlIiwiZXhwIjoxNTg0NTk2MTUyLCJ0cyI6IjE1ODQ1MDk3NTI4NDIifQ.mKuWPUlnX5F0jFYVh9CcOanzO1jbv1u4-1glUNRpwW0",
  //   "id": "1003",
  //   "isNewRecord": false
  // }

}

export default new Vuex.Store({
  state
})
