<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >志愿者风采</x-header>
    </van-sticky>

    <template v-for="item in dataList">
      <div @click="volunteerListClicked(item)" class="vol-show-cell">

        <img :src="showImageUrl(item)" width="100px" height="110px">
        <div class="content">
          <p class="title">
            {{item.zipperConfirm.name}}
          </p>
          <p style="font-size: 12px;color: gray">
            <template v-if="item.zipperConfirm.sex !== undefined">
              <van-tag v-if="item.zipperConfirm.sex === '1'" plain type="primary">男</van-tag>
              <van-tag v-if="item.zipperConfirm.sex === '2'" plain type="primary">女</van-tag>
            </template>
            <template v-if="item.zipperConfirm.age !== undefined">
              <van-tag plain type="primary">{{item.zipperConfirm.age}}岁</van-tag>
            </template>
          </p>
          <div v-if="item.honoraryTitle !== undefined" class="volunteer-detail">
            {{item.honoraryTitle}}
          </div>
          <p class="detail">点击查看详情>>></p>
        </div>

      </div>
    </template>

  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "volunteerShow",
    components: {
      XHeader
    },
    data(){
      return{
      dataList: []
      }
    },
    mounted() {
      this.gainListData()
    },
    methods: {
      volunteerListClicked(itemObj) {
        this.$router.push({
          path: '/vol-show-detail',
          query:{
            itemData: itemObj
          }
        })
      },
      gainListData(){
        this.$api.HomePageApi.gainVolunteerFengCaiList()
        .then(response => {
          if (response.status === 200){
            if (response.data.status === 'SUCCESS'){
              this.dataList = response.data.data.list
            }
          }
        })
      },
      showImageUrl(item){
        if (item.photoUrl !== undefined){
          return  item.photoUrl
        }
        else {
          return require('../../assets/icon-bank.svg')
        }

      }
    }
  }
</script>

<style scoped>
  .vol-show-cell {
    margin: 10px;
    width: calc(100% - 20px);
    height: 100px;
    /*background: linear-gradient(to bottom right, #ff3a24, #ff934a, #f0c78a);*/
    /*box-shadow: 2px 2px 10px rgba(26, 128, 203, 0.31);*/
    border-radius: 5px;
    background: white;
  }

  .vol-show-cell img {
    width: 80px;
    height: 80px;
    margin: 10px;
    float: left;
    border-radius: 5px;
  }

  .vol-show-cell .content {
    float: right;
    width: calc(100% - 100px);
  }

  .vol-show-cell .content .title {
    padding: 10px 0 10px 0;
    color: black;
    font-weight: bold;
    /*color: white;*/
  }

  .vol-show-cell .volunteer-detail {
    font-size: 12px;
    color: gray;
    margin-top: 10px;
    line-height: 15px;
    padding-right: 5px;
  }
  .vol-show-cell .detail{
    text-align: right;
    padding-right: 10px;
    font-size: 12px;
    color: #8dc5ff;
  }

</style>
