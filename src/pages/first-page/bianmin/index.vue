<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >便民信息</x-header>
    </van-sticky>
    <div id="bianmin">
      <van-tabs v-model="active" @change="onClick">
        <van-tab title="招聘求职">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              success-text="刷新成功"
              @load="onLoad"
            >
              <template v-for="item in mzListData">
                <er-d-message-list :str-type="'D'" :message-obj="item"></er-d-message-list>
              </template>
            </van-list>

          </van-pull-refresh>
        </van-tab>
        <van-tab title="二手交易">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              success-text="刷新成功"
              @load="onLoad"
            >
              <template v-for="item in mzListData">
                <er-d-message-list :str-type="'D'" :message-obj="item"></er-d-message-list>
              </template>
            </van-list>

          </van-pull-refresh>
        </van-tab>
        <van-tab title="房屋出租">
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
              v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              success-text="刷新成功"
              @load="onLoad"
            >
              <template v-for="item in mzListData">
                <er-d-message-list :str-type="'D'" :message-obj="item"></er-d-message-list>
              </template>
            </van-list>

          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>

  </div>
</template>

<script>
  import XHeader from "vux/src/components/x-header/index";
  import ErDMessageList from '../../../components/firspagemessagelist'

  export default {
    name: "index",
    components: {
      XHeader, ErDMessageList
    },
    data() {
      return {
        active: 0,
        mzListData: [],
        loading: false,
        finished: false,
        refreshing: false,
        pageNo: 1,
        selType: 1
      }
    },
    methods: {
      onClick(name) {
        this.mzListData = []
        this.pageNo = 1
        this.selType = name + 1
        this.refreshing = false;
        this.loading = true;
        this.finished = false;
        this.onLoad()
        localStorage.setItem('BMActive',name)
      },
      onLoad() {
        this.gainCivilListData()
      },
      onRefresh() {
        this.pageNo = 1
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.refreshing = true;
        this.mzListData = [];
        this.onLoad();
      },
      //民政风采
      gainCivilListData() {
        this.$api.HomePageApi.gainFirstPageBianMinList_interface({
          pageNo: this.pageNo,
          pageSize: 5,
          convenienceType: this.selType
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {

              if (this.refreshing) {
                this.mzListData = []
                this.refreshing = false;
              }
              this.taskRespTemp = []
              this.taskRespTemp = response.data.data.list
              this.mzListData = this.mzListData.concat(this.taskRespTemp)
              this.loading = false;
              this.pageNo += 1;
              if (this.mzListData.length >= response.data.data.count) {
                this.finished = true;
              }

            }
          }
        })
      },
    },

    activated() {
      let isBackStr = this.$route.meta.isback
      if (isBackStr === false){
        this.active = 0;
        this.loading = true
        this.refreshing = false;
        let strActive = localStorage.getItem('BMActive');
        if (strActive === '0'){
          const that = this
          setTimeout(function () {
            that.finished = true;
          },1000)
        }
        else {
          this.finished = false;
        }
      }
    }
  }
</script>

<style scoped>
  #bianmin >>> .van-tabs__line {
    background-color: #1a80cb !important;
  }
</style>
