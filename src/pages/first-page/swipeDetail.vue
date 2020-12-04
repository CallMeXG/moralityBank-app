<template>
  <div class="positionClass" style="background: white">
    <van-sticky>
      <x-header class="headerBackgroundColor" >详情</x-header>
    </van-sticky>
    <p class="detail-title" v-html="item.title"></p>
    <p class="detail-time">{{item.insertTime}}</p>
    <div v-if="item.textContent !== undefined" class="detail-content" v-html="item.textContent"></div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "swipeDetail",
    components: {
      XHeader
    },
    data() {
      return {
        item: new Object(),
        htmlData: '<p>hello world</p><p><strong>hello world</strong></p>'
      }
    },
    beforeRouteLeave(to,from,next){
      to.meta.isback = true;
      next()

    },
    // beforeMount() {
    //   this.item = this.$route.query.itemObj
    // },
    mounted() {


      let contentType = this.$route.query.strType;
      let contentId = this.$route.query.strId

      // A 轮播图； B 二道风采  C 民政风采； D 便民信息
      if (contentType === 'A') {
        this.$api.HomePageApi.gainFirstPageSwiperDetailList_interface({
          id: contentId
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              this.item = response.data.data
            }
          }
        })
      }
      if (contentType === 'B') {
        this.$api.HomePageApi.gainFirstPageEDfengcaiDetailList_interface({
          id: contentId
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              this.item = response.data.data
            }
          }
        })
      }
      if (contentType === 'C') {
        this.$api.HomePageApi.gainFirstPageMinZhengDetailList_interface({
          id: contentId
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              this.item = response.data.data
            }
          }
        })
      }
      if (contentType === 'D') {
        this.$api.HomePageApi.gainFirstPageBianMinDetailList_interface({
          id: contentId
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              this.item = response.data.data
            }
          }
        })
      }

    },
    updated() {
      let imageArray = document.getElementsByTagName('img')
      console.log(imageArray)
      for (let i = 0; i < imageArray.length; i++) {
        let imgObj = imageArray[i]
        imgObj.style.width = '100%'
      }
    }
  }
</script>

<style scoped>
  .detail-content {
    background: white;
    padding: 0 20px;
    line-height: 25px !important;
    font-size: 14px !important;
  }
  .detail-title{
    padding: 10px;
    font-size: 20px;
    line-height: 25px;
  }
  .detail-time{
    font-size: 14px;
    color: gray;
    padding-left: 10px;
    padding-bottom: 10px;
  }

  .detail-content >>> img {
    /*width: 90% !important;*/
  }
  .detail-content >>> embed{
    width: 100%;
  }

  .detail-content >>> p{
    font-size: 16px !important;
  }
</style>
