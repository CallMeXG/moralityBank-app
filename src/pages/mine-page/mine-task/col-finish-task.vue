<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor">结束任务</x-header>
    </van-sticky>

    <div class="text-interduce">
      请注意：<br>
      请填写备注和上传完成任务时的照片，有助于管理员审核

    </div>

    <van-field
      v-model="message"
      rows="3"
      autosize
      label="备注"
      type="textarea"
      placeholder="请输入备注"
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
  import {Toast, Dialog} from 'vant';
  import Vue from 'vue';

  Vue.use(Toast);
  Vue.use(Dialog);

  export default {
    name: "col-finish-task",
    components: {
      XHeader
    },
    data() {
      return {
        itemTask: this.$route.query.itemObj,
        re_needs_timeLength_show: false,
        message: '',
        fileList: []
      }

    },
    methods: {
      beforeRead(file) {
        if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
          Toast.fail('请上传png、jpg、jpeg格式的图片')
          return false
        }
        if (file.size > 20971520) {
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

      submitNeedsClicked() {
        let paramsData = new FormData()
        paramsData.set('id', this.itemTask.id)
        paramsData.set('description', this.message)
        for (let i = 0; i < this.fileList.length; i++) {
          paramsData.set('fileGroup[' + i + ']', this.fileList[i].file)
        }

        Toast.loading({
          message: '提交中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });

        if (this.$route.query.strStatus === 'A') {
          this.$api.TaskApi.volunteerFinishTask(paramsData)
            .then(response => {
              Toast.clear()
              if (response.status === 200) {
                if (response.data.status === 'SUCCESS') {
                  Toast('提交成功')
                  this.$router.back()
                }
                if (response.data.status === 'FAILED') {
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
        if (this.$route.query.strStatus === 'B') {
          this.$api.TaskApi.volunteerAppealTask(paramsData)
            .then(response => {
              Toast.clear()
              if (response.status === 200) {
                if (response.data.status === 'SUCCESS') {
                  Toast('提交成功')
                  this.$router.back()
                }
                if (response.data.status === 'FAILED') {
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
  .text-interduce {
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
