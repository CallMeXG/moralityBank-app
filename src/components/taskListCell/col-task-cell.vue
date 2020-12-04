<template>
  <div class="col-task-item">
    <p class="task-name">
      <template v-if="item.combineStatus === '0'">
        <template v-if="item.receive !== undefined && item.receive === 'receive'">
          <van-tag plain type="warning" size="large">任务已领取</van-tag>
        </template>
      </template>
      <template v-if="item.combineStatus === '1'">
        <van-tag plain type="warning" size="large">任务待开始</van-tag>
      </template>
      <template v-if="item.combineStatus === '2'">
        <van-tag plain type="warning" size="large">任务进行中</van-tag>
      </template>
      <template v-if="item.combineStatus === '3'">
        <van-tag plain type="warning" size="large">任务待结算</van-tag>
      </template>
      <template v-if="item.combineStatus === '4'">
        <van-tag plain type="warning" size="large">任务已结束</van-tag>
      </template>
      <template v-if="item.combineStatus === '5'">
        <van-tag plain type="warning" size="large">任务已取消</van-tag>
      </template>

      {{item.demandName}}

    </p>
    <p class="task-status-p">

    </p>
    <p class="need-volenteer-number">
      需<span>{{item.maxPeople}}</span>人，已报名<span>{{item.countPeople}}</span>人
    </p>
    <p class="need-volenteer-number">
      {{item.startDate}} 至 {{item.endDate}}
    </p>
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

    <van-divider></van-divider>
    <p class="bottom-footer">
      <span class="integral">{{item.demandIntegral}}</span>
      <span>积分/人</span>
      <template v-if="item.combineStatus === '0'">
        <template v-if="item.receive !== undefined && item.receive === 'receive'">
        </template>
        <template v-else>
          <button class="drew-button" @click="drewButonClicked">领取任务</button>
        </template>
      </template>


    </p>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Dialog} from 'vant'
  import { Notify } from 'vant';

  // 全局注册
  Vue.use(Notify);
  Vue.use(Dialog)
  export default {
    name: "col-task-cell",
    props: {
      itemObject: Object
    },
    data(){
      return{
        fileList: [],
        item: this.itemObject,
        taskStatus: '',//任务状态
      }
    },
    mounted() {
      if (this.item.photoArray !== undefined){
        for (let i = 0; i < this.item.photoArray.length; i++) {
          this.fileList.push({
            url: this.item.photoArray[i]
          })
        }
      }

    },
    methods:{
      drewButonClicked(){
        Dialog.confirm({
          title: '您确定要领取该任务吗?',
          message: this.item.demandName + '<br />' + this.item.demandIntegral +' 积分',
          confirmButtonText: '领取'
        }).then(()=>{
          let strUserType = this.$store.state.userData.userType
          if (strUserType === '9'){
            Dialog.alert({
              title: '任务领取失败',
              message: '当前账号为服务对象，不可领取任务'
            })
          }
          else {
            this.receiveTaskFunction()
          }

        })
      },
      receiveTaskFunction(){
        this.$api.TaskApi.receiveColTask_interface({
          volunteerId: this.$store.state.userData.id,
          id: this.item.id
        }).then(response => {
          if (response.data.status === 'SUCCESS'){
            this.item.receive = 'receive'
            this.$nextTick(()=>{
              this.$emit('refresh')
            })
            Notify({ type: 'success', message: '任务领取成功' });
          }
          else {
            Dialog.alert({
              title: '任务领取失败',
              message: response.data.message
            })
          }
        })
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
  .col-task-item .task-status-p{
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
    height: 30px;
    font-size: 14px;
  }

  .col-task-item .bottom-footer .integral {
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
