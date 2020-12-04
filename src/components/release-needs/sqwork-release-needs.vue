<template>
  <div class="release-ability-class" style="background: white">
    <van-steps :active="sqwactive">
      <van-step>选择类别</van-step>
      <van-step>服务详情</van-step>
      <van-step>服务对象</van-step>
      <van-step>附加信息</van-step>
    </van-steps>

    <div v-show="sqwactive === 0">
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
      <van-field
        readonly
        clickable
        name="picker"
        required
        :value="volSelType"
        label="指定志愿者"
        right-icon="arrow"
        placeholder="指定志愿者"
        @click="showPickerVolType = true"
      />
      <van-popup v-model="showPickerVolType" position="bottom">
        <van-picker
          show-toolbar
          :columns="volSelTypeColumns"
          @confirm="onConfirmVolType"
          @cancel="showPickerVolType = false"
        />
      </van-popup>
      <van-field name="switch" label="自动确认">
        <template #input>
          <van-switch v-model="switchChecked" @input="changeSwitch" />
        </template>
      </van-field>

      <p style="color: red">注意：<br>自动确认表示志愿者申请领取该需求时，自动通过申请；闭关时表示您需要手动管理该志愿者的申请；</p>


    </div>
    <div v-show="sqwactive === 1">
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
        placeholder="选择开始时间"
        @click="showPicker_re_needs_time = true"
      />
      <van-popup v-model="showPicker_re_needs_time" position="bottom">
        <van-datetime-picker
          type="datetime"
          @confirm="onConfirmTime"
          @cancel="showPicker_re_needs_time = false"
          :min-date="minDate"
          v-model="currentDate"
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
    <div v-show="sqwactive === 2">
      <van-field
        required
        v-model="re_needs_name"
        label="姓名"
        placeholder="姓名"
      />
      <van-field
        required
        type="digit"
        v-model="re_needs_age"
        label="年龄"
        placeholder="年龄"
        maxlength="3"
      />


      <van-field required name="re_needs_sex" label="性别">
        <template #input>
          <van-radio-group v-model="re_needs_sex" direction="horizontal">
            <van-radio name="1">男</van-radio>
            <van-radio name="2">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field required
        v-model="re_needs_phone"
        label="电话"
        placeholder="服务对象或代发人员电话"
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
    <div v-show="sqwactive === 3">
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

    <div style="text-align: center;line-height: 60px">

      <van-button style="margin-right: 40px" size="small" v-if="sqwactive > 0" @click="lastStepClickedSQW" plain
                  hairline
                  type="info">上一步
      </van-button>
      <van-button size="small" v-if="sqwactive < 3" @click="nextStepClickedSQW" plain hairline type="primary">下一步
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
    name: "sqwork-release-needs",
    components: {
      Popup
    },
    directives: {
      TransferDom
    },
    data() {
      return {
        switchChecked: true, //是否需要反向确认志愿者
        sqwactive: 0,//步骤条
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

        volSelType: '',//代发需求，指定志愿者类型
        volSelTypeColumns: [
          {text: '个人志愿者/志愿者组织', value: '1'},
          {text: '个人志愿者', value: '2'},
          {text: '志愿者组织', value: '3'},
        ],//代发需求，指定的志愿者类型列表
        volSelTypeVAlue: '',//指定志愿者类型
        showPickerVolType: false,

        re_needs_name: '',//姓名
        re_needs_sex: '1',//性别
        re_needs_age: '',//年龄
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
        strComCode: '',

        re_needs_time: '',//服务时间
        showPicker_re_needs_time: false,//服务时间弹出框
        re_needs_timeEnd: '',//结束时间
        showPicker_re_needs_time_end: false,//结束时间弹框
        columns_time: [],//服务时间选项
        minDate: new Date(),
        currentDate: new Date(),

        re_needs_addr: '',//详细地址
        re_needs_pNumber: 1,//所需人数
        re_needs_timeLength_show: false,//所需时长是否显示
        re_needs_timeLength: '1 小时',//所需时长
        re_needs_timeLength_value: '1',//所需时长value
        columns_timeLength: timeLength,//所需时长的选择范围
        re_needs_workCount: '1',//工作量，件数

        paramDataSQW: new FormData()
      }
    },
    mounted() {
      this.gainNeedsTypesList()
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
      //上一步
      lastStepClickedSQW() {
        if (this.sqwactive > 0) {
          this.sqwactive -= 1
        }
      },
      //下一步
      nextStepClickedSQW() {
        if (this.sqwactive === 0) {
          if (this.serviceId === '') {
            Toast.fail('请选择服务类别')
            return false;
          }
          if (this.serviceProId === '') {
            Toast.fail('请选择服务项目')
            return false;
          }
          if (this.volSelTypeVAlue === '') {
            Toast.fail('请指定志愿者类型')
            return false;
          }

          this.sqwactive = 1
          this.paramDataSQW.set('abilityId', this.serviceId);
          this.paramDataSQW.set('abilityDetailId', this.serviceProId);
          this.paramDataSQW.set('demandLevel', this.volSelTypeVAlue);

          if (this.switchChecked === true){
            this.paramDataSQW.set('demandReconfirm', '0');
          }
          if (this.switchChecked === false){
            this.paramDataSQW.set('demandReconfirm', '1');
          }

          return;
        }
        if (this.sqwactive === 1) {
          // 0 次数； 1 时长； 2 件数
          if (this.selProsObject.type === '0') {
            this.paramDataSQW.set('demandCount', this.re_needs_workCount);
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

            this.paramDataSQW.set('demandCount', this.re_needs_timeLength_value);
            this.paramDataSQW.set('number', this.re_needs_pNumber);


          }
          if (this.selProsObject.type === '2') {
            this.paramDataSQW.append('demandCount', this.re_needs_workCount);
          }

          if (this.re_needs_time === '') {
            Toast.fail('请选择任务开始时间')
            return;
          }
          if (this.re_needs_timeEnd === '') {
            Toast.fail('请选择任务结束时间')
            return;
          }

          this.paramDataSQW.set('startDate', this.re_needs_time);
          this.paramDataSQW.set('endDate', this.re_needs_timeEnd);

          this.sqwactive = 2;
          return;

        }
        if (this.sqwactive === 2) {
          if (this.re_needs_name === '') {
            Toast.fail('请填写服务对象姓名')
            return;
          }
          if (this.re_needs_sex === '') {
            Toast.fail('请填写服务对象性别')
            return;
          }
          if (this.re_needs_age === '') {
            Toast.fail('请填写服务对象年龄')
            return;
          }
          if (parseInt(this.re_needs_age) > 120 ) {
            Toast.fail('年龄在0~120岁之间')
            return;
          }
          if (this.re_needs_phone === '') {
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
          this.paramDataSQW.set('zipperUser.userName', this.re_needs_name)
          this.paramDataSQW.set('zipperUser.userAge', this.re_needs_age)
          this.paramDataSQW.set('zipperUser.userSex', this.re_needs_sex)
          this.paramDataSQW.set('phone', this.re_needs_phone)
          this.paramDataSQW.set('streetCode', this.strStreetCode);
          this.paramDataSQW.set('communityCode', this.strComCode);
          this.paramDataSQW.set('address', this.re_needs_addr);
          this.sqwactive = 3;
          return;
        }
      },

      //服务时长选择
      onConfirmTimeLength(value) {
        this.re_needs_timeLength = value.text
        this.re_needs_timeLength_value = value.timeValue
        this.re_needs_timeLength_show = false
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

        if (this.message.length > 0) {
          this.paramDataSQW.set('remark', this.message);
        }
        if (this.fileList.length > 0) {
          for (let i = 0; i < this.fileList.length; i++) {
            this.paramDataSQW.set('fileGroup[' + i + ']', this.fileList[i].file);
          }
        }
        this.paramDataSQW.set('ascriptionId', this.$store.state.userData.id);


        Toast.loading({
          message: '需求提交中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });
        this.$api.NeedsApi.sqWorkManSubmitNeed_interface(this.paramDataSQW)
          .then(response => {
            Toast.clear()
            if (response.status === 200) {
              if (response.data.status === 'SUCCESS') {
                this.$router.push('/release-needs-success')
              }
              else {
                Dialog.alert({
                  title: "发布失败",
                  message: response.data.message
                })
              }
            }
          }).catch(error => {
          Toast.clear()
        })



      /*

      if (this.serviceId === '') {
        Toast.fail('请选择服务类别')
      } else if (this.serviceProId === '') {
        Toast.fail('请选择服务项目')
      } else if (this.volSelTypeVAlue === '') {
        Toast.fail('请指定志愿者类型')
      } else if (this.strarea === '') {
        Toast.fail('请选择所在区县')
      } else if (this.re_needs_name === '') {
        Toast.fail('请输入服务对象姓名')
      } else if (this.re_needs_age === '') {
        Toast.fail('请输入服务对象年龄')
      } else if (this.re_needs_sex === '') {
        Toast.fail('请选择服务对象性别')
      } else if (this.strStreetCode === '') {
        Toast.fail('请选择所在街道')
      } else if (this.strcommunity === '') {
        Toast.fail('请选择所在社区')
      } else if (this.straddr === '') {
        Toast.fail('请填写详细地址')
      } else if (this.re_needs_pNumber === '') {
        Toast.fail('请选择所需人数')
      } else if (this.re_needs_time === '') {
        Toast.fail('请选择服务时间')
      } else {
        let paramsData = new FormData()
        paramsData.append('zipperUser.userName', this.re_needs_name);
        paramsData.append('zipperUser.userAge', this.re_needs_sex);
        paramsData.append('zipperUser.userSex', this.re_needs_sex);
        paramsData.append('zipperUser.userPhone', this.re_needs_phone);
        paramsData.append('ascriptionId', this.$store.state.userData.id);
        paramsData.append('abilityId', this.serviceId);
        paramsData.append('abilityDetailId', this.serviceProId);
        paramsData.append('demandLevel', this.volSelTypeVAlue);
        paramsData.append('number', this.re_needs_pNumber.toString());
        paramsData.append('startDate', this.re_needs_time);
        paramsData.append('endDate', this.re_needs_time);
        paramsData.append('streetCode', this.strStreetCode);
        paramsData.append('communityCode', this.strComCode);
        paramsData.append('address', this.re_needs_addr);
        paramsData.append('remark', this.message);
        for (let i = 0; i < this.fileList.length; i++) {
          paramsData.append('fileGroup[' + i + ']', this.fileList[i].file);
        }

        Toast.loading({
          message: '需求提交中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });
        this.$api.NeedsApi.sqWorkManSubmitNeed_interface(paramsData)
          .then(response => {
            Toast.clear()
            if (response.status === 200) {
              if (response.data.status === 'SUCCESS') {
                this.$router.push('/release-needs-success')
              }
            }
          }).catch(error => {
          Toast.clear()
        })
      }

       */


        // this.$router.push('/release-needs-success')
      },
      //指定志愿者点击事件
      onConfirmVolType(value) {
        this.volSelType = value.text
        this.volSelTypeVAlue = value.value
        this.showPickerVolType = false
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
        this.strComCode = ''
        this.gainCommunityList(value.streetCode)
      },
      //社区
      onConfirm_com(value) {
        this.re_needs_com = value.text
        this.strComCode = value.communityCode
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


      //时间选择
      onConfirmTime(dataTime) {
        // console.log(value)
        let strTime = this.formatDate(dataTime)
        console.log(strTime)
        this.re_needs_time = strTime
        this.showPicker_re_needs_time = false
      },
      //结束时间
      onConfirmTimeEnd(dataTime){
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
</style>
