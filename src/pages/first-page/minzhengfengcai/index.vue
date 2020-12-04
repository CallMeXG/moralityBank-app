<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >民政风采</x-header>
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        success-text="刷新成功"
        @load="onLoad"
      >
        <template v-for="item in mzListData">
          <er-d-message-list :str-type="'C'" :message-obj="item"></er-d-message-list>
        </template>
      </van-list>

    </van-pull-refresh>
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
        mzListData: [],
        loading: false,
        finished: false,
        refreshing: false,
        pageNo: 1
      }
    },
    mounted() {
      // this.gainCivilListData()
    },
    methods: {
      onLoad(){
        this.gainCivilListData()
      },
      onRefresh(){
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
        this.$api.HomePageApi.gainFirstPageMinZhengList_interface({
          pageNo: this.pageNo,
          pageSize: 5
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


    }
  }
</script>

<style scoped>

</style>
