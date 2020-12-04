<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor">我的任务</x-header>
    </van-sticky>
    <van-tabs v-model="taskActive">
      <van-tab title="个人任务">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            success-text="刷新成功"
            @load="onLoad"
          >
            <template v-for="item in mineTAskList">
              <mine-task-cell :item-task="item"></mine-task-cell>
            </template>

          </van-list>

        </van-pull-refresh>
      </van-tab>
      <van-tab title="集体任务">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            success-text="刷新成功"
            @load="onLoad"
          >
            <template v-for="item in mineColTaskList">
              <mine-c-ol-task @refresh="onRefresh" :item-object="item"></mine-c-ol-task>
            </template>

          </van-list>

        </van-pull-refresh>

      </van-tab>
    </van-tabs>


  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import MineTaskCell from '../../../components/mine-task'
  import MineCOlTask from '../../../components/mine-task/mineTaskCol'

  export default {
    name: "index",
    components: {
      XHeader, MineTaskCell, MineCOlTask
    },
    data() {
      return {
        mineTAskList: [],//我的任务列表数据--普通任务
        mineColTaskList: [],//我的集体任务列表数据
        loading: false,
        finished: false,
        refreshing: false,
        pageSize: 5,
        pageNumber: 1,
        taskActive: 0
      }
    },
    mounted() {

    },
    methods: {
      //获取我的任务列表
      gainMineTaskData() {
        this.$api.CommenApi.gainMineTaskInterface({
          volunteerId: this.$store.state.userData.id,
          pageNo: this.pageNumber,
          pageSize: this.pageSize
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === "SUCCESS") {
              if (this.refreshing) {
                this.mineTAskList = []
                this.refreshing = false;
              }

              let tempArray = response.data.data.list
              let tempA1 = []
              let tempA2 = []

              for (let i = 0; i < tempArray.length; i++) {
                if (tempArray[i]['demandType'] === 'combine') {
                  tempA2.push(tempArray[i])
                } else {
                  tempA1.push(tempArray[i])
                }
              }
              this.mineTAskList = this.mineTAskList.concat(tempA1)
              this.mineColTaskList = this.mineColTaskList.concat(tempA2)
              this.loading = false;
              this.pageNumber += 1;
              console.log()
              if ((this.mineTAskList.length + this.mineColTaskList.length) >= response.data.data.count) {
                this.finished = true;
              }
            } else {
              this.finished = true;
              this.loading = true;
              this.refreshing = false;
            }
          }
        })
      },
      onLoad() {
        this.gainMineTaskData()
      },
      onRefresh() {
        this.pageNumber = 1
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.refreshing = true;
        this.mineTAskList = [];
        this.mineColTaskList = [];
        this.onLoad();
      }
    }
  }
</script>

<style scoped>

</style>
