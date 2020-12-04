<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >修改需求</x-header>
    </van-sticky>
    <div class="detail">
      请注意：<br>
      带 * 号的选项为可修改项，其他项目不可修改
    </div>

    <van-field disabled
               v-model="needsData.zipperAbility.name"
               label="服务类别"
    />
    <van-field disabled
               v-model="needsData.zipperAbilityDetail.name"
               label="服务项目"
    />
    <template v-if="needsData.demandState === '2'">
      <van-field required name="switch" label="自动确认">
        <template #input>
          <van-switch v-model="switchChecked" @input="changeSwitch" />
        </template>
      </van-field>
    </template>

    <template v-if="needsData.zipperAbilityDetail.type === '0'">
      <van-field required name="stepper" label="工作量(次)">
        <template #input>
          <van-stepper v-model="needsData.demandCount" :min-count="1"/>
        </template>
      </van-field>
    </template>
    <template v-if="needsData.zipperAbilityDetail.type === '1'">
      <van-field
        readonly
        clickable
        required
        name="picker"
        :value="needsData.demandCount"
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
          <van-stepper v-model="needsData.number" :min-count="1"/>
        </template>
      </van-field>
    </template>
    <template v-if="needsData.zipperAbilityDetail.type === '2'">
      <van-field required name="stepper" label="工作量(件)">
        <template #input>
          <van-stepper v-model="needsData.demandCount" :min-count="1"/>
        </template>
      </van-field>
    </template>

    <van-field
      readonly
      required
      clickable
      name="datetimePicker"
      :value="needsData.startDate"
      label="开始时间"
      placeholder="点击选择时间"
      @click="showPicker_re_needs_time = true"
    />
    <van-popup v-model="showPicker_re_needs_time" position="bottom">
      <van-datetime-picker
        type="datetime"
        :min-date="new Date()"
        @confirm="onConfirmTime"
        @cancel="showPicker_re_needs_time = false"
      />
    </van-popup>
    <van-field
      readonly
      required
      clickable
      name="datetimePicker"
      :value="needsData.endDate"
      label="结束时间"
      placeholder="点击选择时间"
      @click="showPicker_re_needs_time_end = true"
    />
    <van-popup v-model="showPicker_re_needs_time_end" position="bottom">
      <van-datetime-picker
        type="datetime"
        :min-date="new Date()"
        @confirm="onConfirmTimeEnd"
        @cancel="showPicker_re_needs_time_end = false"
      />
    </van-popup>

    <template v-if="this.$store.state.userData.userType === '6' && needsData.demandState === '2'">
      <van-field disabled
                 v-model="needsData.zipperUser.userName"
                 label="服务对象姓名"
      />
      <template v-if="needsData.zipperUser.userSex === '1'">
        <van-field disabled
                   placeholder="男"
                   label="服务对象性别"
        />
      </template>
      <template v-if="needsData.zipperUser.userSex === '2'">
        <van-field disabled
                   placeholder="女"
                   label="服务对象性别"
        />
      </template>

      <van-field disabled
                 v-model="needsData.zipperUser.userAge"
                 label="服务对象年龄"
      />
    </template>

    <van-field disabled
               v-model="needsData.phone"
               label="联系电话"
    />
    <van-field disabled
               v-model="needsData.bsStreet.streetName"
               label="所在街道"
    />
    <van-field disabled
               v-model="needsData.bsCommunity.communityName"
               label="所在社区"
    />

    <van-field disabled
               v-model="needsData.address"
               label="详细地址"
    />
    <van-field disabled
               v-model="needsData.remark"
               label="需求描述"
    />
    <van-field name="other_uploader" label="照片">
      <van-uploader :deletable="false" :max-count="9" v-model="fileList" slot="input"/>
    </van-field>

    <button @click="submitMineNeedsClicked" class="update-mine-needs-submit">提交申请</button>

  </div>
</template>

<script>
  import {XHeader} from 'vux'
  import Vue from 'vue';
  import {Toast, Dialog} from 'vant';

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
    name: "updateMineNeeds",
    components: {
      XHeader
    },
    data() {
      return {
        needsData: this.$route.query.itemNeeds,
        re_needs_timeLength_show: false,
        columns_timeLength: timeLength,//所需时长的选择范围
        showPicker_re_needs_time: false,
        showPicker_re_needs_time_end: false,
        fileList: [],
        switchChecked: true,
      }
    },
    mounted() {
      if (this.needsData.photoArray !== undefined) {
        for (let i = 0; i < this.needsData.photoArray.length; i++) {
          this.fileList.push({
            url:  this.needsData.photoArray[i]
          })
        }
      }
      if (this.needsData.demandReconfirm !== undefined){
        if (this.needsData.demandReconfirm === '0'){
          this.switchChecked = true
        }
        if (this.needsData.demandReconfirm === '1'){
          this.switchChecked = false
        }
      }

    },
    methods: {
      changeSwitch(checked){

        if (checked === false)
        {
          Dialog.confirm({
            message: '您确定要关闭吗？关闭以后，您需要手动管理领取该任务的志愿者'
          }).then(() => {
            this.switchChecked = checked;
          }).catch(()=>{
            this.switchChecked = !checked;
          });
        }

      },
      onConfirmTimeLength(value) {
        this.re_needs_timeLength_show = false
        this.needsData.demandCount = value.timeValue
      },
      onConfirmTimeEnd(dataTime) {
        let strTime = this.formatDate(dataTime)
        this.needsData.endDate = strTime
        this.showPicker_re_needs_time_end = false
      },
      onConfirmTime(dataTime) {
        let strTime = this.formatDate(dataTime)
        this.needsData.startDate = strTime
        this.showPicker_re_needs_time = false
      },
      formatDate(timeStamp) {
        let time = timeStamp,
          y = time.getFullYear(),
          m = time.getMonth() + 1,
          d = time.getDate(),
          h = time.getHours(),
          mm = time.getMinutes(),
          s = time.getSeconds();

        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
      },
      add0(m) {
        return m < 10 ? '0' + m : m;
      },

      submitMineNeedsClicked() {

        let userType = this.$store.state.userData.userType
        let params = new FormData()
        params.set('id', this.needsData.id)
        params.set('abilityId', this.needsData.abilityId)
        params.set('abilityDetailId', this.needsData.abilityDetailId)
        params.set('ascriptionId', this.needsData.ascriptionId)
        params.set('demandCount', this.needsData.demandCount)
        let strType = this.needsData.zipperAbilityDetail.type
        if (strType === '1') {
          params.set('number', this.needsData.number)
        }
        params.set('startDate', this.needsData.startDate)
        params.set('endDate', this.needsData.endDate)
        params.set('streetCode', this.needsData.streetCode)
        params.set('communityCode', this.needsData.communityCode)
        params.set('address', this.needsData.address)
        params.set('phone', this.needsData.phone)
        params.set('remark', this.needsData.remark)



        if (this.needsData.photoArray !== undefined) {
          let strPhoto = ''
          for (let i = 0; i < this.needsData.photoArray.length; i++) {
            if (i === 0){
              strPhoto = this.needsData.photoArray[i]
            }
            else {
              strPhoto = this.needsData.photoArray[i] + ',' + strPhoto
            }
          }
          params.set('photoUrl', strPhoto)
        }

        if (userType === '6'){

          // 个人发布
          if (this.needsData.demandState === '1'){
            params.set('userId', this.needsData.userId)
            this.submitInterface_volunteer(params)
          }
          //代发
          if (this.needsData.demandState === '2'){
            params.set('zipperUser.userName', this.needsData.zipperUser.userName)
            params.set('zipperUser.userAge', this.needsData.zipperUser.userAge)
            params.set('zipperUser.userSex', this.needsData.zipperUser.userSex)
            if (this.switchChecked === true){
              params.set('demandReconfirm', '0');
            }
            if (this.switchChecked === false){
              params.set('demandReconfirm', '1');
            }
            Toast.loading({
              message: '需求提交中...',
              forbidClick: true,
              loadingType: 'spinner',
              duration: 0
            });
            this.$api.NeedsApi.sqWorkManSubmitNeed_interface(params)
            .then(response => {
              Toast.clear()
              if (response.status === 200) {
                if (response.data.status === 'SUCCESS') {
                  this.$router.push('/release-needs-success')
                }
                if (response.data.status === 'FAILED') {
                  Dialog.alert({
                    title: '发布失败',
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
        if (userType === '9') {
          params.set('userId', this.needsData.userId)
          this.submitInterface_serviceObject_daifa(params)
        }
        if (userType === '7' || userType === '8') {
          params.set('userId', this.needsData.userId)
          this.submitInterface_volunteer(params)
        }
      },
      //提交修改接口 --- 服务对象--///--代发
      submitInterface_serviceObject_daifa(params) {
        Toast.loading({
          message: '需求提交中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });
        this.$api.NeedsApi.saveZipperDemandsubmitNeeds_interface(params)
          .then(response => {
            Toast.clear()
            if (response.status === 200) {
              if (response.data.status === 'SUCCESS') {
                this.$router.push('/release-needs-success')
              }
              if (response.data.status === 'FAILED') {
                Dialog.alert({
                  title: '发布失败',
                  message: response.data.message,
                  confirmButtonText: '我知道了'
                }).then(() => {
                  // on close
                });
              }
            }
          }).catch(error => {
          Toast.clear()
        })
      },
      //提交修改接口 --- 志愿者
      submitInterface_volunteer(params) {

        let postParams = new FormData()
        postParams.set('userId',this.needsData.userId)
        postParams.set('abilityDetailId',this.needsData.abilityDetailId)
        postParams.set('demandCount',this.needsData.demandCount)
        let strType = this.needsData.zipperAbilityDetail.type

        if (strType === '1') {
          postParams.set('number', this.needsData.number)
        }
        Toast.loading({
          message: '正在计算所需积分...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });
        this.$api.NeedsApi.volunteerSubmitNeedIntegral_interface(postParams)
        .then(response => {
          Toast.clear()
          if (response.status === 200){
            if (response.data.status === 'SUCCESS'){

              let thisIntegral = response.data.data.integral
              let totalIntegral = response.data.data.zipperConfirm.residualIntegral
              let strMessage = ''
              let titleText = ''
              let flagIntegral = false
              if(totalIntegral !== undefined){
                if (parseInt(totalIntegral) > parseInt(thisIntegral)){
                  flagIntegral = true
                  strMessage = '账户剩余 ' + totalIntegral + ' 积分<br>' + '本次将要消耗' + response.data.data.integral + '积分<br>您确定要继续发布吗？'

                }
                else {
                  titleText = '剩余积分不足'
                  strMessage = '账户剩余 ' + totalIntegral + ' 积分<br>' + '本次将要消耗' + response.data.data.integral + '积分'
                }

              }
              else {
                titleText = '剩余积分不足'
                strMessage = '账户剩余 0 积分<br>' + '本次将要消耗 ' + response.data.data.integral + ' 积分';
              }

              Dialog.confirm({
                title: titleText,
                message: strMessage
              }).then(() => {
                // on confirm
                if (flagIntegral){
                  this.volunteerUpdateNeeds(params)
                }
                return;
              }).catch(() => {
                // on cancel
                return;
              });
            }
          }
        }).catch(error => {
          Toast.clear()
        })

      },
      volunteerUpdateNeeds(params){
        this.$api.NeedsApi.volunteerSubmitNeed_interface(params)
          .then(response => {
            Toast.clear()
            if (response.status === 200) {
              if (response.data.status === 'SUCCESS') {
                this.$router.push('/release-needs-success')
              }
              if (response.data.status === 'FAILED') {
                Dialog.alert({
                  title: '发布失败',
                  message: response.data.message,
                  confirmButtonText: '我知道了'
                }).then(() => {
                  // on close
                });
              }
            }
          }).catch(error => {
          Toast.clear()
        })
      }

    }
  }
</script>

<style scoped>
  .detail {
    width: 100%;
    height: 40px;
    background: white;
    color: red;
    font-size: 14px;
    line-height: 20px;
    padding: 5px;
  }

  .positionClass >>> .van-uploader__upload {
    display: none;
  }

  .update-mine-needs-submit {
    margin: 20px;
    background: #1a80cb;
    color: white;
    border-radius: 5px;
    border: none;
    height: 40px;
    width: calc(100% - 40px);
  }

</style>
