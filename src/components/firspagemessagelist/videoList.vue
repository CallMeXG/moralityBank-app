<template>
  <div class="video-list-cell" @click="videoItemClicked(videoItem)">
    <p class="title van-multi-ellipsis--l2" v-html="videoItem.title"></p>

    <div class="box">
      <div class="fill"></div>
      <div class="content">
        <video style="width: 100%;height: 100%" :id="'video' + videoItem.id" v-show="showVideo" controls>
          <source :src="videoItem.videoUrl" type="video/mp4">
          <source :src="videoItem.videoUrl" type="video/ogg">
          您的浏览器不支持 video 标签。
        </video>
        <div :style="backgroundDiv" v-show="!showVideo" class="video-back-image">
          <van-icon @click.stop="startPlayer(videoItem.id)" class="iconPlay" name="play-circle-o" />
        </div>
      </div>
    </div>

<!--    <div class="video-class">-->
<!--      <video :id="'video' + videoItem.id" v-show="showVideo" controls>-->
<!--        <source :src="videoItem.videoUrl" type="video/mp4">-->
<!--        <source :src="videoItem.videoUrl" type="video/ogg">-->
<!--        您的浏览器不支持 video 标签。-->
<!--      </video>-->
<!--      <div :style="backgroundDiv" v-show="!showVideo" class="video-back-image">-->
<!--        <van-icon @click.stop="startPlayer(videoItem.id)" class="iconPlay" name="play-circle-o" />-->
<!--      </div>-->
<!--    </div>-->

    <p class="time">{{videoItem.insertTime.substr(0,10)}}</p>

  </div>
</template>

<script>
  export default {
    name: "videoList",
    data() {
      return {
        showVideo: false,
        backgroundDiv:{
          backgroundImage:'url(' + this.videoItem.imageUrl + ')',
          backgroundRepeat:'no-repeat',
          backgroundSize:'auto 100%',
          backgroundPositionX: 'center'
        }
      }
    },

    props: {
      videoItem: Object
    },
    methods:{
      startPlayer(strID){
        this.showVideo = true
        let objVideo = document.getElementById('video' + strID)
        objVideo.play()
      },
      videoItemClicked(itemObj){
        this.$router.push({
          path: '/swiper-detail',
          query:{
            strId: itemObj.id,
            strType: "B"
          }
        })
      }
    }
  }
</script>

<style scoped>

  .box{
    width: calc(100% - 20px);
    position: relative;
    margin: 5px 10px 10px 10px;
  }
  .fill{
    height: 0;
    padding-bottom: 56.3%;
  }
  .content{
    width: 100%;
    height: 100%;
    position: absolute;
    background: #ccc;
    left: 0;
    top: 0;
  }

  .video-back-image{
    width: 100%;
    height: 100%;
    text-align: center;
    background: black;
    position: relative;
  }

  .video-list-cell {
    margin: 5px 5px 0 5px;
    border-bottom: 1px solid #efefef;
  }

  .video-list-cell .title {
    font-size: 18px;
    color: #2e2e2e;
    padding: 5px 10px;
    line-height: 18px;
  }

  .video-list-cell .time {
    font-size: 13px;
    color: #737373;
    padding: 5px 0 5px 10px;
  }


  .content video{
    width: 100%;
    height: 100%;
    background: black;
    border-radius: 5px;
  }
  .content .video-back-image{
    width: 100%;
    height: 100%;
    text-align: center;
    background: black;
    position: relative;
  }
  .content .video-back-image .iconPlay{
    font-size: 60px;
    color: white;
    line-height: 200px;
  }
</style>
