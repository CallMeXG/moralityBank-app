<template>
  <div style="background: white">

    <van-steps :active="active">
      <van-step>选择类别</van-step>
      <van-step>服务详情</van-step>
      <van-step>服务对象</van-step>
      <van-step>附加信息</van-step>
    </van-steps>

    <div v-show="active === 0">
      <van-field
        readonly
        clickable
        required
        name="picker"
        :value="serviceType"
        label="服务类别"
        right-icon="arrow"
        placeholder="选择服务类别"
        @click="showPickerType = true"
      />
      <van-popup v-model="showPickerType" position="bottom">
        <van-picker
          show-toolbar
          :columns="columnsType"
          @confirm="onConfirmType"
          @cancel="showPickerType = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="picker"
        required
        :value="servicePro"
        label="服务项目"
        right-icon="arrow"
        placeholder="选择服务项目"
        @click="showPickerPro = true"
      />
      <van-popup v-model="showPickerPro" position="bottom">
        <van-picker
          show-toolbar
          :columns="columnsPros"
          @confirm="onConfirmPros"
          @cancel="showPickerPro = false"
        />
      </van-popup>
    </div>
    <div v-show="active === 1">
      <template v-if="selProsObject.type === '0'">
        <van-field required name="stepper" label="工作量(次)">
          <template #input>
            <van-stepper v-model="re_needs_workCount" :min-count="1"/>
          </template>
        </van-field>
      </template>
      <template v-if="selProsObject.type === '1'">
        <van-field
          readonly
          clickable
          required
          name="picker"
          :value="re_needs_timeLength"
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
            <van-stepper v-model="re_needs_pNumber" :min-count="1"/>
          </template>
        </van-field>
      </template>
      <template v-if="selProsObject.type === '2'">
        <van-field required name="stepper" label="工作量(件)">
          <template #input>
            <van-stepper v-model="re_needs_workCount" :min-count="1"/>
          </template>
        </van-field>
      </template>


      <van-field
        readonly
        required
        clickable
        name="datetimePicker"
        :value="re_needs_time"
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
        :value="re_needs_timeEnd"
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
    </div>
    <div v-show="active === 2">
      <van-field
        required
        v-model="re_needs_phoneNumber"
        label="联系电话"
        placeholder="联系电话"
      />
      <van-field
        readonly
        clickable
        name="picker"
        required
        :value="re_needs_area"
        label="所在区县"
        right-icon="arrow"
        placeholder="所在区县"
        @click="showPicker_re_needs_area = true"
      />
      <van-popup v-model="showPicker_re_needs_area" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns_area"
          @confirm="onConfirm_area"
          @cancel="showPicker_re_needs_area = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="picker"
        required
        :value="re_needs_street"
        label="所在街道"
        right-icon="arrow"
        placeholder="所在街道"
        @click="showPicker_re_needs_street = true"
      />
      <van-popup v-model="showPicker_re_needs_street" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns_street"
          @confirm="onConfirm_street"
          @cancel="showPicker_re_needs_street = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="picker"
        required
        :value="re_needs_com"
        label="所在社区"
        right-icon="arrow"
        placeholder="所在社区"
        @click="showPicker_re_needs_com = true"
      />
      <van-popup v-model="showPicker_re_needs_com" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns_com"
          @confirm="onConfirm_com"
          @cancel="showPicker_re_needs_com = false"
        />
      </van-popup>

      <van-field
        required
        v-model="re_needs_addr"
        label="详细地址"
        placeholder="小区名、楼层门牌号"
      />
    </div>
    <div v-show="active === 3">
      <van-field
        v-model="message"
        rows="3"
        autosize
        label="需求描述"
        type="textarea"
        placeholder="请输入具体的需求描述"
      />

      <van-field name="other_uploader" label="照片">
        <van-uploader :before-read="beforeRead" :max-count="9" v-model="fileList" slot="input"/>
      </van-field>

      <button @click="submitNeedsClicked" class="addAbility-class">提交申请</button>
    </div>


    <!--    <van-field-->
    <!--      required-->
    <!--      v-model="re_needs_name"-->
    <!--      label="姓名"-->
    <!--      placeholder="姓名"-->
    <!--    />-->

    <!--    <van-field required name="re_needs_sex" label="性别">-->
    <!--      <template #input>-->
    <!--        <van-radio-group v-model="re_needs_sex" direction="horizontal">-->
    <!--          <van-radio name="1">男</van-radio>-->
    <!--          <van-radio name="2">女</van-radio>-->
    <!--        </van-radio-group>-->
    <!--      </template>-->
    <!--    </van-field>-->
    <!--    <van-field-->
    <!--      v-model="re_needs_phone"-->
    <!--      label="电话"-->
    <!--      placeholder="电话"-->
    <!--    />-->

    <div style="text-align: center;line-height: 60px">
      <van-button style="margin-right: 40px" size="small" v-if="active > 0" @click="lastStepClicked" plain
                  hairline
                  type="info">上一步
      </van-button>
      <van-button size="small" v-if="active < 3" @click="nextStepClicked" plain hairline type="primary">下一步
      </van-button>
    </div>


  </div>
</template>

<script>
  import {TransferDom, Popup} from 'vux'
  import Vue from 'vue';
  import {Toast,Dialog} from 'vant';

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
    name: "vol-release",
    components: {
      Popup
    },
    directives: {
      TransferDom
    },
    data() {
      return {
        active: 0,
        showPickerType: false,//服务类别，大类
        showPickerPro: false,//服务项目，小类
        serviceType: '',//服务类别，大类
        serviceId: '',//服务大类ID
        serviceProId: '',//服务小类ID
        servicePro: '',//服务项目，小类
        columnsType: [],//服务类别，大类
        columnsPros: [],//服务项目，小类
        selProsObject: '',//选中的服务项目小类
        proResult: [],
        message: '',//需求描述
        fileList: [],

        re_needs_name: '',//姓名
        re_needs_sex: '1',//性别
        re_needs_phone: '',//电话
        re_needs_area: '',//区县
        showPicker_re_needs_area: false,//区县弹出框
        columns_area: [{
          "areaCode": "220105",
          "cityCode": "220100",
          "text": "二道区",
          "shortName": "二道",
          "lng": "125.384727",
          "lat": "43.870823",
          "sort": "3",
          "gmtCreate": "2019-02-28 17:16:58",
          "gmtModified": "2019-02-28 17:17:05",
          "memo": "",
          "dataState": "1",
          "tenantCode": "00000000",
          "delFlag": "0",
          "isNewRecord": false
        }],//区县选项

        re_needs_street: '',//街道
        showPicker_re_needs_street: false,//街道弹出框
        columns_street: [],//街道选项
        strStreetCode: '',//街道code

        re_needs_com: '',//社区
        showPicker_re_needs_com: false,//社区弹出框
        columns_com: [],//社区选项
        strcommunityCode: '',

        re_needs_time: '',//服务时间
        showPicker_re_needs_time: false,//服务时间弹出框
        columns_time: [],//服务时间选项

        re_needs_timeEnd: '',//结束时间
        showPicker_re_needs_time_end: false,//结束时间弹框


        re_needs_addr: '',//详细地址
        re_needs_pNumber: 1,//所需人数
        re_needs_timeLength_show: false,//所需时长是否显示
        re_needs_timeLength: '1 小时',//所需时长
        re_needs_timeLength_value: '1',//所需时长value
        columns_timeLength: timeLength,//所需时长的选择范围
        paramsData: new FormData(),

        re_needs_workCount: '1',//工作量，件数
        re_needs_phoneNumber: '',//服务对象手机号码


      }
    },
    mounted() {
      this.gainNeedsTypesList()

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
      //下一步按钮点击事件
      nextStepClicked() {

        if (this.active === 0) {
          if (this.serviceId === '') {
            Toast.fail('请选择服务类别')
            return false;
          } else if (this.serviceProId === '') {
            Toast.fail('请选择服务项目')
            return false;
          } else {
            this.active = 1
            this.paramsData.set('abilityId', this.serviceId);
            this.paramsData.set('abilityDetailId', this.serviceProId);
            return;
          }

        }
        if (this.active === 1) {
          // 0 次数； 1 时长； 2 件数
          if (this.selProsObject.type === '0') {
            this.paramsData.set('demandCount', this.re_needs_workCount);
          }
          if (this.selProsObject.type === '1') {

            if (this.re_needs_timeLength === '') {
              Toast.fail('请选择服务时长')
              return;
            }
            if (this.re_needs_pNumber === 0) {
              Toast.fail('请填写所需人数')
              return;
            }

            this.paramsData.set('demandCount', this.re_needs_timeLength_value);
            this.paramsData.set('number', this.re_needs_pNumber);


          }
          if (this.selProsObject.type === '2') {
            this.paramsData.append('demandCount', this.re_needs_workCount);
          }

          if (this.re_needs_time === '') {
            Toast.fail('请选择任务开始时间')
            return;
          }
          if (this.re_needs_timeEnd === '') {
            Toast.fail('请选择任务结束时间')
            return;
          }

          this.paramsData.set('startDate', this.re_needs_time);
          this.paramsData.set('endDate', this.re_needs_timeEnd);

          let userType = this.$store.state.userData.userType
          if (userType === '7' || userType === '8' || userType === '6') {
            let paramsForIntegral = new FormData()
            paramsForIntegral.set('userId',this.$store.state.userData.id)
            paramsForIntegral.set('abilityDetailId',this.paramsData.get('abilityDetailId'))
            paramsForIntegral.set('demandCount',this.paramsData.get('demandCount'))
            if (this.paramsData.get('number') !== null){
              paramsForIntegral.set('number',this.paramsData.get('number'))
            }

            this.$api.NeedsApi.volunteerSubmitNeedIntegral_interface(paramsForIntegral).then(response => {
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
                      this.active = 2;
                    }
                    return;
                  }).catch(() => {
                    // on cancel
                    return;
                  });
                }
              }
            })
          }

          if (userType === '9'){
            this.active = 2;
            return ;
          }



        }
        if (this.active === 2) {
          if (this.re_needs_phoneNumber === '') {
            Toast.fail('请填写联系电话')
            return;
          }
          if (this.re_needs_area === '') {
            Toast.fail('请选择所在区县')
            return;
          }
          if (this.re_needs_street === '') {
            Toast.fail('请选择所在街道')
            return;
          }
          if (this.strcommunityCode === '') {
            Toast.fail('请选择所在社区')
            return;
          }
          if (this.re_needs_addr === '') {
            Toast.fail('请填写详细地址')
            return;
          }
          this.paramsData.set('phone', this.re_needs_phoneNumber)
          this.paramsData.set('streetCode', this.strStreetCode);
          this.paramsData.set('communityCode', this.strcommunityCode);
          this.paramsData.set('address', this.re_needs_addr);
          this.active = 3;
          return;
        }
        if (this.active === 3) {

          return;
        }

      },
      //上一步按钮点击事件
      lastStepClicked() {
        if (this.active > 0) {
          this.active -= 1
        }
      },

      //获取大类
      gainNeedsTypesList() {
        this.$api.CommenApi.gainJobTypes().then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              let tempArr = response.data.data
              for (let i = 0; i < tempArr.length; i++) {
                let objTemp = {
                  text: tempArr[i].name,
                  id: tempArr[i].id
                }
                this.columnsType.push(objTemp)
              }
            }
          }
        })
      },
      //获取小类
      gainNeedsProsList(id) {
        this.$api.CommenApi.gainProsList({
          abilityId: id
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              let tempArr = response.data.data
              for (let i = 0; i < tempArr.length; i++) {
                let objTemp = {
                  text: tempArr[i].name,
                  id: tempArr[i].id,
                  type: tempArr[i].type
                }
                this.columnsPros.push(objTemp)
              }
            }
          }
        })
      },
      //大类点击选择事件
      onConfirmType(value) {
        this.serviceType = value.text
        this.showPickerType = false
        this.servicePro = ''
        this.columnsPros = []
        this.serviceId = value.id
        this.serviceProId = ''
        this.selProsObject = ''
        this.gainNeedsProsList(value.id)
      },
      //小类点击选择事件
      onConfirmPros(value) {
        this.servicePro = value.text
        this.showPickerPro = false
        this.serviceProId = value.id
        this.selProsObject = value
      },
      //提交需求发布
      submitNeedsClicked() {


        this.paramsData.set('userId', this.$store.state.userData.id);

        if (this.message.length > 0) {
          this.paramsData.set('remark', this.message);
        }
        if (this.fileList.length > 0) {
          for (let i = 0; i < this.fileList.length; i++) {
            this.paramsData.set('fileGroup[' + i + ']', this.fileList[i].file);
          }
        }

        Toast.loading({
          message: '需求提交中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });

        let userType = this.$store.state.userData.userType

        if (userType === '7' || userType === '8' || userType === '6') {

          this.$api.NeedsApi.volunteerSubmitNeed_interface(this.paramsData)
            .then(response => {
              Toast.clear()
              if (response.status === 200) {
                if (response.data.status === 'SUCCESS') {
                  this.$router.push('/release-needs-success')
                }
                if (response.data.status === 'FAILED'){
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
        if (userType === '9'){
          this.$api.NeedsApi.saveZipperDemandsubmitNeeds_interface(this.paramsData)
            .then(response => {
              Toast.clear()
              if (response.status === 200) {
                if (response.data.status === 'SUCCESS') {
                  this.$router.push('/release-needs-success')
                }
                if (response.data.status === 'FAILED'){
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

      },
      //服务时长选择
      onConfirmTimeLength(value) {
        this.re_needs_timeLength = value.text
        this.re_needs_timeLength_value = value.timeValue
        this.re_needs_timeLength_show = false
      },
      //区县选择
      onConfirm_area(value) {
        this.re_needs_area = value.text
        this.showPicker_re_needs_area = false
        this.re_needs_com = '';
        this.re_needs_street = '';
        this.strStreetCode = ''
        this.gainStreetData(value.areaCode)
      },
      //街道
      onConfirm_street(value) {
        this.re_needs_street = value.text
        this.showPicker_re_needs_street = false
        this.strStreetCode = value.streetCode
        this.re_needs_com = ''
        this.strcommunityCode = ''
        this.gainCommunityList(value.streetCode)
      },
      //社区
      onConfirm_com(value) {
        this.re_needs_com = value.text
        this.strcommunityCode = value.communityCode
        this.showPicker_re_needs_com = false
      },
      //获取街道数据
      gainStreetData(strCode) {
        this.$api.AddrList.streetList_interface({
          areaCode: strCode
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              let arrPro = response.data.data
              for (let i = 0; i < arrPro.length; i++) {
                let objPro = {
                  streetId: arrPro[i].streetId,
                  streetCode: arrPro[i].streetCode,
                  text: arrPro[i].streetName
                }
                this.columns_street.push(objPro)
              }
            }
          }
        })
      },
      //获取社区列表
      gainCommunityList(streetCode) {
        this.$api.AddrList.communityList_interface({
          streetCode: streetCode
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              var arrPro = response.data.data
              for (let i = 0; i < arrPro.length; i++) {
                let objPro = {
                  communityId: arrPro[i].communityId,
                  communityCode: arrPro[i].communityCode,
                  text: arrPro[i].communityName
                }
                this.columns_com.push(objPro)
              }
            }
          }
        })
      },


      //时间选择   开始时间
      onConfirmTime(dataTime) {
        // console.log(value)
        let strTime = this.formatDate(dataTime)
        this.re_needs_time = strTime
        this.showPicker_re_needs_time = false
      },
      //结束时间选择
      onConfirmTimeEnd(dataTime) {
        let strTime = this.formatDate(dataTime)
        this.re_needs_timeEnd = strTime
        this.showPicker_re_needs_time_end = false
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
      }
    }
  }
</script>

<style scoped>
  .addAbility-class {
    margin: 20px;
    background: #1a80cb;
    color: white;
    border-radius: 5px;
    border: none;
    height: 40px;
    width: calc(100% - 40px);
  }

  .release-ability-class {
    margin: 10px;
  }

</style>
