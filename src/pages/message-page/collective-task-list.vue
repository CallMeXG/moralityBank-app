<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="col-task-div">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          success-text="刷新成功"
          @load="onLoad"
        >
          <template v-for="(item,index) in taskList">
            <col-task-cell @refresh="onRefresh" :item-object="item"></col-task-cell>
          </template>
        </van-list>
        <div @click="touchRefresh" class="refresh-data" v-if="taskList.length === 0">
          暂无数据，点此刷新
        </div>
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
  import ColTaskCell from '../../components/taskListCell/col-task-cell'
  export default {
    name: "collective-task-list",
    components: {
      ViewBox, XHeader, ProsButton, ColTaskCell,
      Popup, Checker, CheckerItem, TaskListCell
    },
    directives: {
      TransferDom
    },
    data() {
      return {
        taskList: [],//获取到的任务列表数据
        loading: false,
        finished: false,
        refreshing: false,
        dataForTaskList: [],
        postParams: {},
      }
    },
    beforeDestroy() {
      this.$Uitl.$off('signSuccess')
    },
    mounted() {
      this.postParams = {
        volunteerId: this.$store.state.userData.id,
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
        console.log('刷新数据')
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
        this.$api.TaskApi.gainCollectiveTaskList_interface(this.postParams).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              if (this.refreshing) {
                this.taskList = []
                this.refreshing = false;
              }
              let tempArray = []
              tempArray = response.data.data.list
              this.taskList = this.taskList.concat(tempArray)

              // for (let i = 0; i < this.taskList.length; i++) {
              //   if (this.taskList[i].status === '2') {
              //     this.dataForTaskList.push(this.taskList[i])
              //   }
              //
              // }

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

      //当数据为空的时候，点击页面进行刷新
      touchRefresh() {
        this.onRefresh()
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


  .col-task-div{
    width: 100%;
  }




</style>

