<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >志愿者热线</x-header>
    </van-sticky>
    <template v-for="item in phoneList">
      <div class="vol-phone-list">
        <div class="left-content">
          <p class="phone-name">{{item.title}}</p>
          <p class="phone-number">{{item.number}}</p>
          <p class="phone-addr">{{item.address}}</p>
        </div>
        <div class="right-icon-div">
          <a :href="'tel:' + item.number">
            <van-icon name="phone-circle" />
          </a>

        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "volunteerPhone",
    components: {
      XHeader
    },
    data(){
      return{
        phoneList: [],//获取到的热线列表
      }
    },
    mounted() {
      this.gainVolunteerPhoneList()
    },
    methods:{
      gainVolunteerPhoneList(){
        this.$api.CommenApi.gainVolPhoneList_interface({

        }).then(response => {
          if (response.status === 200){
            if (response.data.status === 'SUCCESS'){
              this.phoneList = response.data.data
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .vol-phone-list{
    margin: 10px;
    height: 100px;
    background: white;
    border-radius: 10px;
  }
  .vol-phone-list .right-icon-div{
    float: right;
    width: 50px;
    /*height: 100px;*/
    background: transparent;
    text-align: center;
    line-height: 100px;
    font-size: 32px;
    color: #00c794;
  }

  .vol-phone-list .right-icon-div a:link{
    color: #00c794;
  }
  .vol-phone-list .right-icon-div a:visited{
    color: #00c794;
  }

  .vol-phone-list .left-content{
    width: calc(100% - 50px);
    height: 100px;
    float: left;
  }
  .vol-phone-list .left-content .phone-name{
    margin: 15px 10px;
    color: black;
  }
  .vol-phone-list .left-content .phone-number{
    margin: 10px;
    color: #1a80cb;
  }
  .vol-phone-list .left-content .phone-addr{
    margin: 10px;
    font-size: 12px;
    color: gray;
  }




</style>
