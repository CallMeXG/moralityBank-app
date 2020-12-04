<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >公示榜</x-header>
    </van-sticky>

    <img src="../../assets/image/vol-score-list.jpg" class="back-image">
    <div class="vol-list-content">
      <template v-for="itemObj in publicListData">
        <public-list-cell :public-obj="itemObj"></public-list-cell>
      </template>
    </div>


  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import PublicListCell from '../../components/pbulic-list'

  export default {
    name: "index",
    components: {
      XHeader, PublicListCell
    },
    data() {
      return {
        publicListData: []
        //   [
        //   {
        //     number: '1',
        //     userName: '廖理纯',
        //     imgSrc: require('../../assets/image/vol-1.jpg'),
        //     score: '1000',
        //     intreduce: '廖理纯2013年获“身边雷锋·最美北京人”先进个人、2014年被评为十大“北京榜样”，2015年获首都精神文明建设奖、“全国道德模范提名奖”，2016年被评为“首都道德模范”， 获得2016年宣传推选学雷锋志愿服务“四个100”先进典型活动“最美志愿者”称号。'
        //   },
        //   {
        //     number: '2',
        //     userName: '叶如陵',
        //     imgSrc: require('../../assets/image/vol-2.jpg'),
        //     score: '900',
        //     intreduce: '近年来，叶如陵被评为全国最美志愿者、全国优秀党员、中国红十字“志愿者之星”奖章、全国离退休干部先进个人、全国孝星敬老楷模、全国优秀志愿者、首都道德模范、“北京奥运会、残奥会”先进个人、全国卫生系统先进个人、北京市群众心目中的好党员、北京市首批五星级志愿者。'
        //   },
        //   {
        //     number: '3',
        //     userName: '贺玉凤',
        //     imgSrc: require('../../assets/image/vol-3.jpg'),
        //     score: '800',
        //     intreduce: '20多年来，贺玉凤在延庆妫河两岸义务捡拾了数以万计的塑料袋、快餐盒等白色垃圾。如今家人包括孙儿都参与了她的志愿环保活动，她还组织了有百余人参与的“夕阳传递”环保志愿服务队，定期到妫河两岸、各大景区、海坨山冬奥会赛场等地开展志愿环保活动。'
        //   },
        //   {
        //     number: '4',
        //     userName: '黄军珲',
        //     imgSrc: require('../../assets/image/vol-4.jpg'),
        //     score: '700',
        //     intreduce: '作为一名志愿者，在参与志愿服务活动过程中，我一直以“奉献、友爱、互助、进步”的志愿者精神来激励自己，无私奉献，乐于助人，服务社会，履行好志愿者所应尽的责任和义务，实现自我人生的价值。'
        //   },
        //
        // ]
      }
    },
    mounted() {
      this.gainDataList()
    },
    methods:{
      gainDataList(){
        this.$api.HomePageApi.gainZipperRankingList({

        }).then(response => {
          if (response.status === 200){
            if (response.data.status === 'SUCCESS'){
              this.publicListData = response.data.data.list
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .back-image {
    width: 100%;
    height: 200px;
  }

  .vol-list-content {
    background: transparent;
    width: 100%;
    margin-top: -50px;
    z-index: 2;
    position: absolute;
  }
</style>
