<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >我的需求<a @click="$router.push('/release-needs')" slot="right"><img src="../../../assets/image/Addto.svg" width="20px"></a></x-header>
    </van-sticky>

    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        success-text="刷新成功"
        @load="onLoad"
      >
        <template v-for="item in needsList">
          <mine-needs-cell @refreshData="refreshList" :mine-needs-item="item"></mine-needs-cell>
        </template>
      </van-list>

    </van-pull-refresh>



    <br><br>

  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import MineNeedsCell from '../../../components/mine-needs/mineNeedsCell'

  export default {
    name: "index",
    components: {
      XHeader, MineNeedsCell
    },
    data(){
      return{
        needsList: [],//我的需求list
        mineNeedPageSize: 5,
        mineNeedPageNumber: 1,
        loading: false,
        finished: false,
        refreshing: false,
      }
    },
    mounted() {
      // this.gainMineNeeds()
    },
    methods:{
      //获取我发布的需求
      gainMineNeeds(){
        this.$api.NeedsApi.gainMineReleaseNeeds_interface({
          ascriptionId: this.$store.state.userData.id,
          pageNo: this.mineNeedPageNumber,
          pageSize: this.mineNeedPageSize
        }).then(response => {
          if (response.status === 200){
            if (response.data.status === 'SUCCESS'){

              if (this.refreshing) {
                this.needsList = []
                this.refreshing = false;
              }

              let tempArray = response.data.data.list
              this.needsList = this.needsList.concat(tempArray)
              this.loading = false;
              this.mineNeedPageNumber += 1;
              if (this.needsList.length >= response.data.data.count) {
                this.finished = true;
              }

            }
            else {
              this.finished = true;
              this.loading = true;
              this.refreshing = false;
            }
          }
        })
      },
      //同意或拒绝后，刷新数据
      refreshList(){
        this.needsList = []
        this.gainMineNeeds()
      },

      onLoad(){
        this.gainMineNeeds()
      },
      onRefresh(){
        this.mineNeedPageNumber = 1
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.refreshing = true;
        this.needsList = [];
        this.onLoad();
      }
    }
  }
</script>

<style scoped>

</style>
