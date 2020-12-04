<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >积分管理</x-header>
    </van-sticky>
    <div class="mine-score-manager-content">
      <div class="backImage-null"></div>
      <div class="backImage">
        <p class="title">当前积分</p>
        <p class="score">{{scoreIntegral}}</p>
      </div>
    </div>
<!--    <div @click="receiveScoreClicked" class="score-list">-->
<!--      <p class="title">领取记录</p>-->
<!--      <p class="content">-->
<!--        <span style="color: #1a80cb;font-size: 18px">3</span> 次-->
<!--        <span style="font-size: 18px;padding-left: 10px;color: red">+1000</span>-->
<!--        积分-->
<!--      </p>-->
<!--    </div>-->

<!--    <div @click="consumeScoreClicked" class="score-list">-->
<!--      <p class="title">消耗记录</p>-->
<!--      <p class="content">-->
<!--        <span style="color: #1a80cb;font-size: 18px">3</span> 次-->
<!--        <span style="font-size: 18px;padding-left: 10px;color: red">-200</span>-->
<!--        积分-->
<!--      </p>-->
<!--    </div>-->

    <div @click="receiveScoreClicked" class="score-list-bottom">
      领取记录
    </div>
    <div @click="consumeScoreClicked" class="score-list-bottom">
      消耗记录
    </div>

    <div @click="doTaskClicked" class="score-list-bottom">
      做任务领积分
    </div>
    <div @click="scoreShoppingCenterScoreClicked" class="score-list-bottom">
      积分兑换
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "index",
    components: {
      XHeader
    },
    data(){
      return{
        scoreIntegral: 0,//当前积分
      }
    },
    mounted() {
      this.gainUserScoreManager()
    },
    methods:{
      //领取记录
      receiveScoreClicked(){
        this.$router.push({
          name: 'mine-score-list',
          query:{
            type: 'add'
          }
        })
      },
      //消耗记录
      consumeScoreClicked(){
        this.$router.push({
          name: 'mine-score-list',
          query:{
            type: 'reduce'
          }
        })
      },
      //做任务领积分
      doTaskClicked(){
        this.$router.replace('/message')
      },
      //积分兑换
      scoreShoppingCenterScoreClicked(){
        this.$router.replace('/integal-shopping')
      },
      //获取用户积分
      gainUserScoreManager(){
        this.$api.Goods.gainIntegral_interface({
          userId: this.$store.state.userData.id
        }).then(response => {
          if (response.status === 200){
            if (response.data.status === 'SUCCESS'){
              let userMsg = response.data.data.zipperConfirm
              if (userMsg.residualIntegral !== undefined){
                this.scoreIntegral = userMsg.residualIntegral
              }
            }

          }
        })
      }

    }
  }
</script>

<style scoped>
  .mine-score-manager-content{
    margin: 10px;
    width: calc(100% - 20px);
    height: 200px;
    background: white;
    border-radius: 10px;
    text-align: center;
  }
  .backImage-null{
    width: 100%;
    height: 25px;
    background: transparent;
  }
  .mine-score-manager-content .backImage{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: #3caaf2;
    margin-left: calc( (100% - 150px) / 2 );
  }
  .backImage .title{
    padding-top: 40px;
    color: white;
    font-size: 12px;
  }
  .backImage .score{
    font-size: 26px;
    font-weight: bold;
    color: white;
    padding-top: 15px;
  }

  .score-list{
    margin-left: 10px;
    float: left;
    height: 80px;
    width: calc( (100% - 30px) / 2);
    background: white;
    border-radius: 10px;
  }

  .score-list .title{
    margin: 10px;
  }
  .score-list .content{
    height: 40px;
    line-height: 20px;
    font-size: 12px;
    text-align: center;
    margin-top: 20px;
  }

  .score-list-bottom{
    margin-left: 10px;
    float: left;
    height: 80px;
    width: calc( (100% - 30px) / 2);
    background: white;
    border-radius: 10px;
    line-height: 80px;
    text-align: center;
    margin-top: 10px;
  }

</style>
