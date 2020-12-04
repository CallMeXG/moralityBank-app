<template>
    <div class="guideFather">
      <transition name="fade">
        <div v-if="show" class="swiperClass">
          <swiper height="100%" class="swiperClass" dots-position="center">
            <swiper-item class="swiperItemClass">
              <img src="../../assets/guide1.png">
            </swiper-item >
            <swiper-item class="swiperItemClass">
              <img src="../../assets/guide2.png">
            </swiper-item>
            <swiper-item class="swiperItemClass">
              <img src="../../assets/guide3.png">
              <x-button class="enterButton"  @click.native="enterNextPage">立即体验</x-button>
            </swiper-item>
          </swiper>
        </div>
      </transition>

    </div>
</template>

<script>
  import {Swiper,SwiperItem} from "vux";
  import XButton from "vux/src/components/x-button/index";

  const imageList = [
    '../../assets/001.png',
    '../../assets/003.png',
    '../../assets/002.png'
  ]
    export default {
        name: "index",
      components: {XButton, SwiperItem, Swiper},
      data(){
          return {
            guideImageList: imageList,
            show: true
          }
      },
      watch:{
        $route(to,from){
        }
      },
      methods:{
          enterNextPage(){

            this.show = !this.show;
            const that = this
            setTimeout(function () {
              that.$router.push('/')
            },1500)
          }
      }
    }
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 2.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .enterButton{
    margin-top: -100px;
    width: 40%;
    background-color: #ff976a;
    color: white;
    border-radius: 30px;
  }
  img{
    height: 100%;
    width: 100%;
  }
  .swiperItemClass{
    height: 100%;
    width: 100%;
  }
  .swiperClass{
    width: 100%;
    height: 100%;
    /*position: fixed;*/
  }
.guideFather{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
