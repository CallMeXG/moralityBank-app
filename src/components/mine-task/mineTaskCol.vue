<template>
  <div class="col-task-item">
    <p class="task-name">
      <template v-if="item.status === '4'">
        <van-tag plain type="warning" size="large">任务等待开始</van-tag>
      </template>
      <template v-if="item.status === '5'">
        <van-tag plain type="warning" size="large">任务进行中</van-tag>
      </template>
      <template v-if="item.status === '6'">
        <van-tag plain type="warning" size="large">任务待结算</van-tag>
      </template>
      <template v-if="item.status === '7'">
        <van-tag plain type="warning" size="large">结算被驳回</van-tag>
      </template>
      <template v-if="item.status === '8'">
        <van-tag plain type="warning" size="large">任务结算完成</van-tag>
      </template>
      <template v-if="item.status === '9'">
        <van-tag plain type="warning" size="large">任务已取消</van-tag>
      </template>
      <template v-if="item.status === '10'">
        <van-tag plain type="warning" size="large">任务已结束</van-tag>
      </template>
      {{item.demandName}}

    </p>
    <p class="need-volenteer-number">
      {{item.startDate}} 至 {{item.endDate}}
    </p>
    <p class="need-volenteer-number">{{item.phone}}</p>
    <p class="need-volenteer-number">
      {{item.bsStreet.streetName}}{{item.bsCommunity.communityName}}{{item.address}}
    </p>
    <p v-if="item.remark !== undefined" class="need-volenteer-number">
      {{item.remark}}
    </p>

    <p class="image-task-cell">
      <van-uploader :deletable="false"
                    v-model="fileList"
                    multiple :max-count="fileList.length"
      />
    </p>

    <p class="integral-p">
      <span class="integral">{{item.integral}}</span>
      <span>积分/人</span>
    </p>
    <p class="integral-p">
      {{strText}}
    </p>

    <p class="bottom-footer">

      <button v-if="item.status === '7'" style="border-color: orange;color: orange">申诉</button>
      <button v-if="bolEnd" @click="endTaskFunction">结束任务</button>
      <button v-if="bolStart" @click="startTaskFunction"
              style="border-color: #3b46ff;color: #3b46ff">开始任务
      </button>
      <button v-if="bolCancel && !bolStart" @click="cancelTaskFunction"
              style="border-color: red;color: red">取消任务
      </button>

    </p>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Dialog} from 'vant'
  import {Notify} from 'vant';

  // 全局注册
  Vue.use(Notify);
  Vue.use(Dialog)
  export default {
    name: "mineTaskCol",
    props: {
      itemObject: Object
    },
    data() {
      return {
        fileList: [],
        item: this.itemObject,
        taskStatus: '',//任务状态
        bolCancel: false,//取消任务按钮
        bolStart: false,//开始任务按钮
        bolEnd: false,//结束任务按钮
        bolReplay: false,//申诉按钮
        strText: '',//距离任务开始还有多长时间
        startInterval: null
      }
    },
    mounted() {
      if (this.item.photoArray !== undefined) {
        for (let i = 0; i < this.item.photoArray.length; i++) {
          let imageObj = {
            url: this.item.photoArray[i]
          }
          this.fileList.push(imageObj)
        }
      }

      /**  判断取消按钮是否显示
       * 1：status 0、1、2、3、4
       * 2：开始时间减去现在时间 大于 30 分钟
       **/
      /**  判断开始任务按钮是否显示
       * 1：开始时间减去现在时间 小于 30 分钟
       * 2：status 4
       **/
      /**  判断结束任务按钮是否显示
       * 1：status 5
       * 2：开始任务后
       **/
      /**  判断申诉按钮是否显示
       * 1：status 7
       **/


      if (this.item.status === '0' || this.item.status === '1' || this.item.status === '2' || this.item.status === '3' || this.item.status === '4') {
        this.bolCancel = true
      } else {
        this.bolCancel = false
      }

      if (this.item.status === '5') {
        this.bolEnd = true
        this.bolStart = false
      }

      if (this.item.status === '7') {
        this.bolReplay = true
      }

      this.checkStart()

      const that = this
      const timer = setInterval(() => {
        that.checkStart()
        console.log('end===', this.bolEnd)
        if (that.bolStart || this.bolEnd) {
          clearInterval(timer)
        }
      }, 1000)
      this.$once('hook:beforeDestroy',()=>{
        clearInterval(timer)
      })
    },

    methods: {

      //判断开始任务-是否显示
      checkStart() {
        //开始时间差
        let strTimeDif = this.getTimeDifference(this.item.startDate)
        if (strTimeDif > 30 * 60 * 1000) {
          this.bolCancel = true
        } else {
          this.bolCancel = false
          console.log(this.item.status)
          if (strTimeDif < 3600000 && this.item.status < 5) {
            this.bolStart = true
          }
        }
      },
      //时间差
      getTimeDifference(strTime) {
        let date = new Date();
        let dateNow = date.getTime();
        return new Date(strTime).getTime() - dateNow;
      },

      //开始任务接口
      startTaskFunction() {
        this.$api.TaskApi.volunteerStartTask({
          id: this.item.id
        }).then(response => {
          if (response.data.status === 'SUCCESS') {
            this.bolStart = false
            this.bolEnd = true
            Notify({type: 'success', message: '任务已开始'});
            this.$nextTick(() => {
              this.$emit('refresh')
            })
          } else {
            Dialog.alert({
              title: '开始任务失败',
              message: response.data.message
            })
          }
        })
      },
      //取消任务接口
      cancelTaskFunction() {
        Dialog.confirm({
          title: '取消任务',
          message: '您确定要取消该任务吗?'
        }).then(() => {
          this.$api.TaskApi.cancelTask_interface({
            id: this.item.id,
            volunteerId: this.$store.state.userData.id,
          })
            .then(response => {
              if (response.data.status === 'SUCCESS') {
                this.$nextTick(() => {
                  this.$emit('refresh')
                })
              }
            })
        })

      },

      //结束任务
      endTaskFunction() {
        this.$router.push({
          path: '/mine-col-task-end',
          query: {
            itemObj: this.item,
            strStatus: 'A'
          }
        })
      },


      //时间转时间戳
      strTimeToTimeStamp(strTime) {
        let date = new Date();
        let date1 = date.getTime();  //开始时间
        let date2 = new Date(strTime).getTime();    //结束时间
        let date3 = date2 - date1;   //时间差的毫秒数

        //计算出相差天数
        let days = Math.floor(date3 / (24 * 3600 * 1000))
        //计算出小时数
        let leave1 = date3 % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000))
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000))
        //计算相差秒数
        let leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000)
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          console.log('结束')
          return 'start';
        }
        return this.dateStrFormatter(days, ' 天 ')
          + this.dateStrFormatter(hours, ' 小时 ')
          + this.dateStrFormatter(minutes, ' 分钟 ')
          + this.dateStrFormatter(seconds, ' 秒 ')
      },
      dateStrFormatter(strNumber, strDW) {
        if (strNumber > 0) {
          return strNumber + strDW
        } else {
          return ''
        }
      }


    }
  }
</script>

<style scoped>
  .col-task-item {
    margin: 10px;
    /*height: 150px;*/
    background: white;
    border-radius: 5px;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.09);
  }

  .col-task-item .task-name {
    margin-left: 10px;
    padding-top: 10px;
    margin-right: 10px;
    font-size: 18px;
    font-weight: bold;
    line-height: 25px;
  }

  .col-task-item .task-status-p {
    margin: 10px 20px;
  }

  .col-task-item .need-volenteer-number {
    font-size: 14px;
    color: gray;
    margin: 10px 20px;
    line-height: 20px;
  }

  .col-task-item .need-volenteer-number span {
    font-size: 20px;
    margin: 0 10px;
    color: red;
  }

  .col-task-item .bottom-footer {
    height: 40px;
    margin-top: 10px;
    font-size: 14px;
  }

  .col-task-item .bottom-footer button {
    border: 1px solid #e1e1e1;
    height: 30px;
    float: right;
    margin-right: 10px;
    border-radius: 25px;
    color: gray;
    background: transparent;

  }

  .integral-p {
    color: gray;
    font-size: 14px;
    text-align: right;
    margin-right: 20px;
    margin-top: 10px;
  }

  .integral-p .integral {
    font-size: 20px;
    color: red;
    margin-left: 20px;
  }

  .col-task-item .bottom-footer .drew-button {
    float: right;
    margin-right: 15px;
    /*width: 100px;*/
    height: 30px;
    margin-top: -7px;
    color: #3a8ee6;
    border: none;
    background: transparent;
    font-size: 18px;

  }


  .image-task-cell {
    padding-left: 20px;
  }

  .image-task-cell >>> .van-uploader__preview {
    width: 40px;
    height: 40px;
  }

  .image-task-cell >>> .van-uploader__preview-image {
    width: 40px;
    height: 40px;
  }

  .image-task-cell >>> img {
    width: 40px;
    height: 40px;
    float: left;
  }

</style>

