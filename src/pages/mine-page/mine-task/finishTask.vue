<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >结束任务</x-header>
    </van-sticky>

    <div class="text-interduce">
      请注意：<br>
      请确认您实际的工作量与用户发布的工作量是否相同；
      <br>
      您可以根据实际的工作量进行修改; 修改时请务必按照实际工作量进行修改;
      任务提交成功后，管理人员会进行审核;
      <br>

    </div>

    <template v-if="itemTask.zipperAbilityDetail.type === '0'">
      <van-field required name="stepper" label="工作量(次)">
        <template #input>
          <van-stepper v-model="itemTask.demandCount" :min-count="1"/>
        </template>
      </van-field>
    </template>
    <template v-if="itemTask.zipperAbilityDetail.type === '1'">
      <van-field
        readonly
        clickable
        required
        name="picker"
        :value="itemTask.demandCount"
        label="服务时长"
        right-icon="arrow"
        placeholder="选择服务时长"
        @click="re_needs_timeLength_show = true"
      />
      <van-popup v-model="re_needs_timeLength_show" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns_timeLength"
          @confirm="onConfirmTimeLength"
          @cancel="re_needs_timeLength_show = false"
        />
      </van-popup>

      <van-field required name="stepper" label="所需人数">
        <template #input>
          <van-stepper v-model="itemTask.number" :min-count="1"/>
        </template>
      </van-field>
    </template>
    <template v-if="itemTask.zipperAbilityDetail.type === '2'">
      <van-field required name="stepper" label="工作量(件)">
        <template #input>
          <van-stepper v-model="itemTask.demandCount" :min-count="1"/>
        </template>
      </van-field>
    </template>

    <van-field
      v-model="message"
      rows="3"
      autosize
      label="留言"
      type="textarea"
      placeholder="请输入留言"
    />

    <van-field name="uploader" label="文件上传">
      <template #input>
        <van-uploader :before-read="beforeRead" v-model="fileList" :max-count="9"/>
      </template>
    </van-field>

    <button @click="submitNeedsClicked" class="addAbility-class">提交申请</button>


  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import {Toast,Dialog} from 'vant';
  import Vue from 'vue';
  Vue.use(Toast);
  Vue.use(Dialog);

  const timeLength = [
    {"text": "0.5小时", "timeValue": 0.5},
    {"text": "1小时", "timeValue": 1},
    {"text": "1.5小时", "timeValue": 1.5},
    {"text": "2小时", "timeValue": 2},
    {"text": "2.5小时", "timeValue": 2.5},
    {"text": "3小时", "timeValue": 3},
    {"text": "3.5小时", "timeValue": 3.5},
    {"text": "4小时", "timeValue": 4},
    {"text": "4.5小时", "timeValue": 4.5},
    {"text": "5小时", "timeValue": 5},
    {"text": "5.5小时", "timeValue": 5.5},
    {"text": "6小时", "timeValue": 6},
    {"text": "6.5小时", "timeValue": 6.5},
    {"text": "7小时", "timeValue": 7},
    {"text": "7.5小时", "timeValue": 7.5},
    {"text": "8小时", "timeValue": 8}]
  export default {
    name: "finishTask",
    components: {
      XHeader
    },
    data() {
      return {
        itemTask: this.$route.query.itemObj,
        re_needs_timeLength_show: false,
        columns_timeLength: timeLength,
        message: '',
        fileList: []
      }

    },
    methods: {
      beforeRead(file) {
        if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png')
        {
          Toast.fail('请上传png、jpg、jpeg格式的图片')
          return false
        }
        if (file.size > 20971520){
          Toast.fail('上传图片不得大于20M')
          return false
        }
        return true
      },

      //服务时长选择
      onConfirmTimeLength(value) {
        this.itemTask.demandCount = value.timeValue
        this.re_needs_timeLength_show = false
      },

      submitNeedsClicked(){

        let paramsData = new FormData()
        if (this.itemTask.zipperAbilityDetail.type === '1'){
          paramsData.set('number',this.itemTask.number)
        }
        paramsData.set('demandCount',this.itemTask.demandCount)
        paramsData.set('id',this.itemTask.id)
        paramsData.set('description',this.message)
        for (let i = 0; i < this.fileList.length; i++) {
          paramsData.set('fileGroup[' + i + ']',this.fileList[i].file)
        }

        Toast.loading({
          message: '提交中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });

        if (this.$route.query.strStatus === 'A'){
          this.$api.TaskApi.volunteerFinishTask(paramsData)
            .then(response => {
              Toast.clear()
              if (response.status === 200) {
                if (response.data.status === 'SUCCESS') {
                  Toast('提交成功')
                  this.$router.back()
                }
                if (response.data.status === 'FAILED'){
                  Dialog.alert({
                    title: '提交',
                    message: response.data.message,
                    confirmButtonText: '我知道了'
                  }).then(() => {
                    // on close
                  });
                }
              }
            })
        }
        if (this.$route.query.strStatus === 'B'){
          this.$api.TaskApi.volunteerAppealTask(paramsData)
            .then(response => {
              Toast.clear()
              if (response.status === 200) {
                if (response.data.status === 'SUCCESS') {
                  Toast('提交成功')
                  this.$router.back()
                }
                if (response.data.status === 'FAILED'){
                  Dialog.alert({
                    title: '提交',
                    message: response.data.message,
                    confirmButtonText: '我知道了'
                  }).then(() => {
                    // on close
                  });
                }
              }
            })
        }








      }
    }
  }
</script>

<style scoped>
  .text-interduce{
    width: 100%;
    padding: 10px;
    font-size: 12px;
    line-height: 20px;
    color: red;
    background: white;
  }

  .addAbility-class {
    margin: 20px;
    background: #1a80cb;
    color: white;
    border-radius: 5px;
    border: none;
    height: 40px;
    width: calc(100% - 40px);
  }
</style>
