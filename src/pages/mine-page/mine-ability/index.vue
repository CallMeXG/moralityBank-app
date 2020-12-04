<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >我的能力 <a @click="$router.push('/release-ability')" slot="right"><img src="../../../assets/image/Addto.svg" width="20px"></a></x-header>
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        success-text="刷新成功"
        @load="onLoad"
      >
        <template v-for="item in mineAbilityList">
          <ability-cell :ability-obj="item"></ability-cell>
        </template>
      </van-list>

    </van-pull-refresh>


  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import AbilityCell from '../../../components/mine-ability/abilityCell'

  export default {
    name: "index",
    components: {
      XHeader,
      AbilityCell
    },
    data(){
      return {
        mineAbilityList: [],//用户自身能力集合
        loading: false,
        finished: false,
        refreshing: false,
        pageSize: 5,
        pageNumber: 1,
      }
    },
    mounted() {
      // this.gainMyAbilityList()
    },
    methods:{
      onLoad(){
        this.gainMyAbilityList()
      },
      onRefresh(){
        this.pageNumber = 1
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.refreshing = true;
        this.mineAbilityList = [];
        this.onLoad();
      },
      //
      gainMyAbilityList(){
        this.$api.AbilityApi.gainUserAbilityList_interface({
          userId: this.$store.state.userData.id,
          pageNo: this.pageNumber,
          pageSize: this.pageSize
        })
        .then(response => {
          if (response.status === 200){
            if (response.data.status === 'SUCCESS'){
              if (this.refreshing) {
                this.mineAbilityList = []
                this.refreshing = false;
              }

              let tempArray = response.data.data.list
              this.mineAbilityList = this.mineAbilityList.concat(tempArray)
              this.loading = false;
              this.pageNumber += 1;
              if (this.mineAbilityList.length >= response.data.data.count) {
                this.finished = true;
              }

            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
