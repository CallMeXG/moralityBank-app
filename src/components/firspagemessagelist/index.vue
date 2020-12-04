<template>
  <div @click="messageListClicked(itemObj)" class="list">
    <div class="list-left">
      <div class="list-content">
        <div class="title" v-html="itemObj.title"></div>
      </div>
      <div class="time">{{itemObj.insertTime.substr(0,10)}}</div>
    </div>
    <div class="main-img">
      <img class="list-image" :src="listImageSrc(itemObj.imageUrl)">
    </div>


  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        itemObj: this.messageObj
      }
    },
    props: {
      messageObj: Object,
      strType: String
    },
    methods: {
      messageListClicked(itemObj) {
        this.$router.push({
          path: '/swiper-detail',
          query: {
            strId: itemObj.id,
            strType: this.strType
          }
        })
      },

      listImageSrc(imgSrc) {
        return imgSrc
      }
    }
  }
</script>

<style scoped>
  .list {
    height: 110px;
    border-bottom: 1px solid #efefef;
    background: white;
    padding: 0 5px;
  }

  .list-left {
    float: left;
    width: calc(100% - 150px);
    height: 100px;
    margin: 0 5px;
  }

  .list-content {
    /*height: 80px;*/
    /*height: 70px;*/
  }

  .list-content .title {
    font-size: 18px;
    color: #2e2e2e;
    line-height: 25px;
    padding-top: 20px;
    padding-left: 10px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .list-left .time {
    font-size: 13px;
    color: gray;
    height: 20px;
    margin-top: 10px;
    padding-left: 10px;
  }
.main-img{
  width: 140px;
  float: right;
  height: 110px;
}
  .list-image {
    /*float: right;*/
    height: 90px;
    width: 120px;
    margin: 10px 10px 10px 0;
    border-radius: 3px;

  }

</style>
