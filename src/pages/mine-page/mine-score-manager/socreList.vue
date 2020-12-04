<template>
  <div class="positionClass" style="background: white">
    <van-sticky>
      <x-header class="headerBackgroundColor" >{{scoreTitle}}</x-header>
    </van-sticky>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="score-list-cell" v-for="item in list">
          <div class="text-left">
            <p v-if="item.billState === '0'">兑换商品</p>
            <p v-if="item.billState === '1'">提供服务</p>
            <p v-if="item.billState === '2'">发布需求</p>
            <p v-if="item.billState === '3'">取消需求</p>
            <p style="color: gray;font-size: 12px">{{item.createDate}}</p>
          </div>
          <template v-if="strState === '1'">
            <span class="socre-right">+{{item.integral}}</span>
          </template>
          <template v-if="strState === '0'">
            <span class="socre-right">-{{item.integral}}</span>
          </template>

        </div>
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "socreList",
    components: {
      XHeader
    },
    mounted() {
      let typeQ = this.$route.query.type
      if (typeQ === 'add'){
        this.scoreTitle = '领取记录'
        this.strState = '1'
      }
      if (typeQ === 'reduce'){
        this.scoreTitle = '消耗记录'
        this.strState = '0'
      }
    },
    data() {
      return {
        list: [],
        loading: false,
        finished: false,
        refreshing: false,
        scoreTitle: '',
        pageNo: 1,
        pageSize: 10,
        strState: ''
      };
    },
    methods: {
      onLoad() {
        this.gainScoreList()
      },
      onRefresh(){
        this.pageNo = 1
        // 清空列表数据
        this.finished = false;
        // 重新加载数据
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true;
        this.refreshing = true;
        this.list = [];
        this.onLoad();
      },

      gainScoreList(){
        this.$api.Goods.scoreGetOrSet_interface({
          userId: this.$store.state.userData.id,
          state: this.strState,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }).then(response => {
          if (response.status === 200){
            if (response.data.status === 'SUCCESS'){
              if (this.refreshing) {
                this.list = []
                this.refreshing = false;
              }

              let tempArray = response.data.data.list
              this.list = this.list.concat(tempArray)
              this.loading = false;
              this.pageNo += 1;
              if (this.list.length >= response.data.data.count) {
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

  .score-list-cell{
    width: calc(100% - 20px);
    margin: 0 10px;
    height: 50px;
    background: white;
    border-bottom: 1px solid #efefef;
  }

  .score-list-cell .text-left{
    width: 60%;
    float: left;
    height: 40px;
    padding-left: 10px;
  }

  .text-left p{
    width: 90%;
    height: 25px;
    line-height: 25px;
  }
  .score-list-cell .socre-right{
    float: right;
    line-height: 50px;
    height: 50px;
    display: inline-block;
    padding-right: 20px;
    font-size: 18px;
    color: red;
  }

</style>
