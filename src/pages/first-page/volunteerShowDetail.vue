<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >{{itemData.zipperConfirm.name}}</x-header>
    </van-sticky>

    <div class="show-detail-div">
      <div v-html="itemData.introduce"></div>
    </div>

  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "volunteerShowDetail",
    components: {
      XHeader
    },
    data() {
      return {
        itemData: this.$route.query.itemData
      }
    }
  }
</script>

<style scoped>
  .show-detail-div {
    padding: 10px;
    background: white;
    line-height: 20px;
  }
  .show-detail-div a{
    width: 100% !important;
  }
  .show-detail-div >>> img{
    width: 100% !important;
  }
</style>

