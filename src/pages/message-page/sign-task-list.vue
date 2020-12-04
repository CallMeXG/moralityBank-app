<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-sticky :offset-top="46">
        <van-dropdown-menu>

          <van-dropdown-item title="按任务类别" ref="item1">

            <van-tree-select
              @click-nav="leftNavClicked"
              @click-item="leftNavAbilityDetailClicked"
              :items="abilityItems"
              :active-id.sync="activeAbilityId"
              :main-active-index.sync="activeAbilityIndex"
            />

            <div class="ability-check-bottom">
              <div @click="abilityReset" class="cancel-btn">重置</div>
              <div @click="onConfirm1" class="submit-btn">筛选</div>
            </div>

          </van-dropdown-item>
          <van-dropdown-item title="按区域" ref="item2">
            <van-tree-select
              @click-nav="streetListClicked"
              @click-item="communityListClicked"
              :items="streetListItems"
              :active-id.sync="activeStreetId"
              :main-active-index.sync="activeComIndex"
            />

            <div class="ability-check-bottom">
              <div @click="streetReset" class="cancel-btn">重置</div>
              <div @click="onConfirm2" class="submit-btn">筛选</div>
            </div>
          </van-dropdown-item>

        </van-dropdown-menu>
      </van-sticky>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        success-text="刷新成功"
        @load="onLoad"
      >
        <template v-for="(item,index) in taskList" v-if="item.status ==='2'">
          <task-list-cell @deleteTaskCell="deleteCellWithIndex" :key="item.id" :task-obj="item"
                          :task-index="index"></task-list-cell>
        </template>
      </van-list>
      <div @click="touchRefresh" class="refresh-data" v-if="dataForTaskList.length === 0">
        暂无数据，点此刷新
      </div>
    </van-pull-refresh>
  </div>
</template>


<script>
  import XHeader from "vux/src/components/x-header/index";
  import ViewBox from "vux/src/components/view-box/index";
  import {TransferDom, Popup, Checker, CheckerItem} from 'vux'
  import TaskListCell from '../../components/taskListCell'
  import ProsButton from '../../components/taskListCell/prosButton'

  export default {
    name: "sign-task-list",
    components: {
      ViewBox, XHeader, ProsButton,
      Popup, Checker, CheckerItem, TaskListCell
    },
    directives: {
      TransferDom
    },
    data() {
      return {
        serviceType: '',//筛选服务大类
        taskList: [],//获取到的任务列表数据
        loading: false,
        finished: false,
        refreshing: false,
        dataForTaskList: [],

        abilityItems: [],//大类，小类选择列表
        activeAbilityId: 0,//大类默认
        activeAbilityIndex: 0,//小类默认
        activeAbDetail: {},//小类选择数据

        streetListItems: [],//街道列表
        activeStreetId: 0,
        activeComIndex: 0,
        activeComDetail: {},
        postParams: {},
        currentDate:new Date(),
        minDate: new Date(),

      }
    },
    beforeDestroy() {
      this.$Uitl.$off('signSuccess')
    },
    mounted() {

      this.gainTaskType()
      this.gainStreetListData()

      this.postParams = {
        userId: this.$store.state.userData.id,
        pageNo: 1,
        pageSize: 5
      }

    },
    methods: {

      //加载数据
      onLoad() {
        this.gainTaskInterface()
      },
      //下拉刷新
      onRefresh() {
        this.page_index = 1
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.refreshing = true;
        this.taskList = [];
        this.postParams.pageNo = 1
        this.onLoad();
      },

      //获取任务列表
      gainTaskInterface() {
        this.$api.TaskApi.gainTask_interface(this.postParams).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              if (this.refreshing) {
                this.taskList = []
                this.refreshing = false;
              }
              let tempArray = []
              tempArray = response.data.data.list
              this.taskList = this.taskList.concat(tempArray)

              for (let i = 0; i < this.taskList.length; i++) {
                if (this.taskList[i].status === '2') {
                  this.dataForTaskList.push(this.taskList[i])
                }

              }

              this.loading = false;
              this.postParams.pageNo += 1;
              if (this.taskList.length >= response.data.data.count) {
                this.finished = true;
              }
            }
            else {
              this.finished = true;
              this.loading = true;
              this.refreshing = false;
            }

          }
        }).catch(error => {

        })
      },

      //领取成功，删除数据
      deleteCellWithIndex(index) {
        this.taskList.splice(index, 1)
      },
      //获取任务大类别
      gainTaskType() {
        this.abilityItems = []
        this.$api.CommenApi.gainJobTypes()
          .then(response => {
            if (response.status === 200) {
              if (response.data.status === 'SUCCESS') {
                let respData = response.data.data
                for (let i = 0; i < respData.length; i++) {
                  this.abilityItems.push({
                    id: respData[i].id,
                    text: respData[i].name
                  })
                }
                this.gainTaskPros(this.abilityItems[this.activeAbilityIndex].id)
              }
            }
          })
      },
      //获取任务小类别选项
      gainTaskPros(typeId) {
        this.$api.CommenApi.gainProsList({
          abilityId: typeId
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              let respData = response.data.data
              let tempArray = []
              for (let i = 0; i < respData.length; i++) {
                tempArray.push({
                  id: respData[i].id,
                  text: respData[i].name
                })
              }
              this.abilityItems[this.activeAbilityIndex].children = tempArray
            }
          }
        })
      },
      //当数据为空的时候，点击页面进行刷新
      touchRefresh() {
        this.onRefresh()
      },
      //服务类别，项目 ；点击大类，获取小类
      leftNavClicked(index) {
        this.activeAbilityIndex = index
        this.gainTaskPros(this.abilityItems[this.activeAbilityIndex].id)
      },
      //服务类别，点击选中小类
      leftNavAbilityDetailClicked(data) {
        this.activeAbDetail = data
        this.postParams.abilityDetailId = data.id
      },

      //服务项目确定筛选
      onConfirm1() {
        this.$refs.item1.toggle();
        this.onRefresh()
      },
      //筛选街道社区
      streetListClicked(index) {
        this.activeComIndex = index
      },
      communityListClicked(data) {
        this.postParams.communityCode = data.id
      },
      onConfirm2() {
        this.$refs.item2.toggle();
        this.onRefresh()
      },
      selectedTime(date){
      },
      onConfirm3() {
        this.$refs.item3.toggle();
        let strTime = this.gainformatDate(this.currentDate)
        this.postParams.startDate = strTime
        this.onRefresh()
      },
      gainformatDate(date) {
        let myyear = date.getFullYear();
        let mymonth = date.getMonth() + 1;
        let myweekday = date.getDate();

        if (mymonth < 10) {
          mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
          myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth + "-" + myweekday);
      },

      //服务类别重置
      abilityReset() {
        this.activeAbilityIndex = 0;
        this.activeAbilityId = 0;
        if (this.postParams.abilityDetailId !== undefined) {
          delete this.postParams.abilityDetailId
        }
        this.$refs.item1.toggle()
        this.onRefresh()
      },
      //街道社区重置
      streetReset() {
        this.activeStreetId = 0;
        this.activeComIndex = 0;
        if (this.postParams.communityCode !== undefined) {
          delete this.postParams.communityCode
        }
        this.$refs.item2.toggle()
        this.onRefresh()
      },
      //时间重置
      resetTime(){
        if (this.postParams.startDate !== undefined){
          delete this.postParams.startDate
        }
        this.$refs.item3.toggle()
        this.onRefresh()
      },

      gainStreetListData() {
        this.streetListItems = []
        this.$api.AddrList.streetList_interface({
          areaCode: '220105'
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              let respData = response.data.data
              for (let i = 0; i < respData.length; i++) {
                this.streetListItems.push({
                  id: respData[i].streetCode,
                  text: respData[i].streetName
                })
                this.gainCommunityListData(respData[i].streetCode, i)
              }

            }
          }
        })
      },
      gainCommunityListData(strStreetCode, index) {
        this.$api.AddrList.communityList_interface({
          streetCode: strStreetCode
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              let respData = response.data.data
              let tempArray = []
              for (let i = 0; i < respData.length; i++) {
                tempArray.push({
                  id: respData[i].communityCode,
                  text: respData[i].communityName
                })
              }
              this.streetListItems[index].children = tempArray
            }
          }
        })


      },

    }
  }
</script>

<style scoped>

  .popup-div-class {
    width: 100%;
    height: 100%;
    background: white;
  }


  .submit-buttom {
    position: absolute;
    bottom: 0;
    height: 40px;
    width: 100%;
  }

  .submit-buttom button {
    float: right;
    margin: 5px 10px;
    height: 30px;
    width: 40%;
    background: #1a80cb;
    color: white;
    border: none;
    border-radius: 15px;
  }

  .task-list-pro-div {
    width: 100%;
    /*height: 200px;*/
    background: transparent;
  }

  .can-not-show-list {
    margin: 50px 20px;
    text-align: center;
  }

  .can-not-show-list img {
    width: 100px;
    height: 100px;
  }

  .can-not-show-list p {
    margin-top: 15px;
    color: gray;
  }

  .can-not-show-list button {
    width: 40%;
    margin: 30px 30%;
    height: 40px;
    border-radius: 5px;
    border: none;
    background: #3caaf2;
    color: white;
  }

  .refresh-data {
    width: 100%;
    height: 400px;
    line-height: 400px;
    color: gray;
    text-align: center;
  }


  .ability-check-bottom {
    width: 100%;
    height: 50px;
  }

  .ability-check-bottom .cancel-btn {
    width: 50%;
    background: #ef5053;
    float: left;
    line-height: 50px;
    text-align: center;
    color: white;
  }

  .ability-check-bottom .submit-btn {
    width: 50%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: white;
    background: #2c6cd9;
    float: left;
  }

  .ability-check-bottom >>> .van-calendar__header-title {
    display: none;
  }

  .ability-check-bottom >>> .van-calendar__month-title {
    display: none;
  }

</style>
