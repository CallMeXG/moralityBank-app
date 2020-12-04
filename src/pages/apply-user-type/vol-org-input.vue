<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >志愿者认证</x-header>
    </van-sticky>
    <p style="margin: 10px;font-size: 14px;color: gray">您要认证的账户类型为: <span style="color: red">公司/组织志愿者</span></p>
    <p style="margin: 10px;font-size: 14px;color: #00c794;line-height: 20px">
      以下信息全部为必填项；我们会对您的信息进行审核，请务必填写真实有效的信息；</p>
    <van-form @submit="onSubmit">
      <van-field
        required
        v-model="name"
        name="name"
        label="公司/组织名称"
        placeholder="公司/组织名称"
        autosize
        type="textarea"
        :rules="[{ required: true, message: '此项为必填项' }]"
      />

      <van-field required
                 v-model="credentialNum"
                 name="credentialNum"
                 label="证件号码"
                 placeholder="证件号码"
                 :rules="[{ required: true, message: '此项为必填项' }]"
      />

      <van-field required name="uploader" label="证件正面照片">
        <van-uploader :before-read="beforeRead" v-model="uploader" :max-count="1" slot="input"/>
      </van-field>
      <van-field required name="uploader" label="证件反面照片">
        <van-uploader :before-read="beforeRead" v-model="uploader_down" :max-count="1" slot="input"/>
      </van-field>


      <!--      <van-field-->
      <!--        readonly-->
      <!--        clickable-->
      <!--        name="strprovince"-->
      <!--        :value="strprovince"-->
      <!--        label="所在省份"-->
      <!--        placeholder="所在省份"-->
      <!--        right-icon="arrow"-->
      <!--        @click="showPickerPro = true"-->
      <!--      />-->

      <!--      <van-popup v-model="showPickerPro" position="bottom">-->
      <!--        <van-picker-->
      <!--          show-toolbar-->
      <!--          :columns="columnsPro"-->
      <!--          @confirm="onConfirmPro"-->
      <!--          @cancel="showPickerPro = false"-->
      <!--        />-->
      <!--      </van-popup>-->

      <!--      <van-field-->
      <!--        readonly-->
      <!--        clickable-->
      <!--        name="strcity"-->
      <!--        :value="strcity"-->
      <!--        label="所在城市"-->
      <!--        placeholder="所在城市"-->
      <!--        right-icon="arrow"-->
      <!--        @click="showPickercity = true"-->
      <!--      />-->

      <!--      <van-popup v-model="showPickercity" position="bottom">-->
      <!--        <van-picker-->
      <!--          show-toolbar-->
      <!--          :columns="columnsCity"-->
      <!--          @confirm="onConfirmCity"-->
      <!--          @cancel="showPickercity = false"-->
      <!--        />-->
      <!--      </van-popup>-->

      <van-field required
                 readonly
                 clickable
                 name="strarea"
                 :value="strarea"
                 label="所在区县"
                 placeholder="所在区县"
                 right-icon="arrow"
                 @click="showPickerarea = true"
      />

      <van-popup v-model="showPickerarea" position="bottom">
        <van-picker
          show-toolbar
          :columns="columnsArea"
          @confirm="onConfirmArea"
          @cancel="showPickerarea = false"
        />
      </van-popup>

      <van-field required
                 readonly
                 clickable
                 name="strstreet"
                 :value="strstreet"
                 label="所在街道"
                 placeholder="所在街道"
                 right-icon="arrow"
                 @click="showPickerstreet = true"
      />

      <van-popup v-model="showPickerstreet" position="bottom">
        <van-picker
          show-toolbar
          :columns="columnsStreet"
          @confirm="onConfirmStreet"
          @cancel="showPickerstreet = false"
        />
      </van-popup>

      <van-field required
                 readonly
                 clickable
                 name="strcommunity"
                 :value="strcommunity"
                 label="所在社区"
                 placeholder="所在社区"
                 right-icon="arrow"
                 @click="showPickercom = true"
      />

      <van-popup v-model="showPickercom" position="bottom">
        <van-picker
          show-toolbar
          :columns="columnsCommunity"
          @confirm="onConfirmCommunity"
          @cancel="showPickercom = false"
        />
      </van-popup>

      <van-field required
                 v-model="straddr"
                 name="straddr"
                 label="详细地址"
                 placeholder="楼层门牌号等信息"
                 :rules="[{ required: true, message: '此项为必填项' }]"
      />


      <p style="margin: 10px 15px 5px 15px">以下信息为选填</p>
      <van-field
        v-model="introduction"
        rows="5"
        autosize
        label="申请书"
        type="textarea"
        placeholder="申请书"
      />
      <van-field name="other_uploader" label="其他证件">
        <van-uploader :before-read="beforeRead" v-model="other_uploader" slot="input"/>
      </van-field>


      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>


  </div>
</template>

<script>
  import Vue from 'vue';
  import {Form} from 'vant';

  Vue.use(Form);
  import {Toast} from 'vant';

  Vue.use(Toast);

  import {XHeader} from 'vux'

  export default {
    name: "vol-org-input",
    components: {
      XHeader
    },
    data() {
      return {
        name: '',//公司名称
        columns: ['身份证', '军官证'],//证件类型
        showPicker: false,
        credentialType: '身份证',//证件类型
        credentialNum: '',//证件号码
        uploader: [],//证件照片
        uploader_down: [],//证件照片1
        strprovince: '',//省
        showPickerPro: false,
        strcity: '',//市
        showPickercity: false,
        strarea: '',//区县
        showPickerarea: false,
        strstreet: '',//街道
        showPickerstreet: false,
        straddr: '',//详细地址

        showPickercom: false,
        strcommunity: '',//社区
        columnsCommunity: ['双安社区', '亚太社区'],//社区列表
        strCommunityCode: '',
        introduction: '',//自我介绍

        columnsPro: [],//省份列表
        columnsCity: [],//城市列表
        columnsArea: [{
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
        }],//区县列表
        columnsStreet: [],//街道份列表

        strProCode: '',
        strCityCode: '',
        strAreaCode: '220105',
        strStreetCode: '',

        other_uploader: [],//其他证件照片，可选填
      }
    },
    mounted() {

      let queryObj = this.$route.query.updateMsg
      if (queryObj !== undefined) {
        this.name = queryObj.name
        this.credentialNum = queryObj.credentialNum
        this.uploader = [{
          url: queryObj.photoUrlUp
        }]
        this.uploader_down = [{
          url: queryObj.photoUrlDn
        }]

        this.strarea = this.columnsArea[0].text
        this.gainStreetList()

        this.strstreet = queryObj.bsStreet.streetName
        this.strStreetCode = queryObj.streetCode
        this.gainCommunityList(this.strStreetCode)
        this.strcommunity = queryObj.bsCommunity.communityName
        this.strCommunityCode = queryObj.communityCode
        this.straddr = queryObj.address

        if (queryObj.notice !== undefined) {
          this.introduction = queryObj.notice
        }
        if (queryObj.otherPhotoArr !== undefined){
          for (let i = 0; i < queryObj.otherPhotoArr.length; i++) {
            this.other_uploader.push({
              url: queryObj.otherPhotoArr[i]
            })
          }
        }
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
      //提交信息
      onSubmit(values) {

        if (this.uploader.length === 0) {
          Toast.fail('请上传证件正面照片')
        } else if (this.uploader_down.length === 0) {
          Toast.fail('请上传证件反面照片')
        } else if (this.strarea === '' || this.strstreet === '' || this.strcommunity === '') {
          Toast.fail('请选择所在区县、街道、社区')
        } else {
          let paramsData = new FormData()
          paramsData.append('userId', this.$store.state.userData.id)
          paramsData.append('name', values.name)
          paramsData.append('confirmType', '2')
          paramsData.append('credentialType', '2')
          paramsData.append('credentialNum', values.credentialNum)
          paramsData.append('streetCode', this.strStreetCode)
          paramsData.append('communityCode', this.strCommunityCode)
          paramsData.append('address', this.straddr)
          paramsData.append('notice', this.introduction)

          if (this.uploader[0].url !== undefined) {
            paramsData.append('photoUrlUp', this.uploader[0].url)
          } else {
            paramsData.append('photoUp', this.uploader[0].file)
          }
          if (this.uploader_down[0].url !== undefined) {
            paramsData.append('photoUrlDn', this.uploader_down[0].url)
          } else {
            paramsData.append('photoDn', this.uploader_down[0].file)
          }
          if (this.other_uploader.length > 0){

            let otherImgUrl = []
            let otherImgFile = []
            for (let i = 0; i < this.other_uploader.length; i++) {
              //是URL
              if (this.other_uploader[i].url !== undefined){
                otherImgUrl.push(this.other_uploader[i])
              }
              //是file
              if (this.other_uploader[i].file !== undefined){
                otherImgFile.push(this.other_uploader[i])
              }
            }
            if (otherImgUrl.length > 0){
              let strOtherImgUrl = ''
              for (let i = 0; i < otherImgUrl.length; i++) {
                strOtherImgUrl = otherImgUrl[i].url + ',' + strOtherImgUrl
              }
              paramsData.append('otherPhotoUrl', strOtherImgUrl)
            }
            if (otherImgFile.length > 0){
              for (let i = 0; i < otherImgUrl.length; i++) {
                paramsData.append('photoGroup[' + i + ']', otherImgFile[i].file)
              }
            }
          }
          if (this.$route.query.updateMsg !== undefined) {
            paramsData.append('id', this.$route.query.updateMsg.id)
          }

          this.orgVolunteerApplySubmit(paramsData)


        }


        //this.$router.push('/apply-submit-success')
      },
      orgVolunteerApplySubmit(params) {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
          message: '信息提交中...'
        });
        this.$api.UserApply.userApplySubmit_post(params)
          .then(response => {
            Toast.clear()
            if (response.status === 200) {
              if (response.data.status === 'SUCCESS') {
                this.$router.push('/apply-submit-success')
              }
            }
          }).catch(error => {
          Toast.clear()
        })
      },
      // 证件类型
      onConfirm(value) {
        this.credentialType = value;
        this.showPicker = false;
      },
      //省份选择
      onConfirmPro(value) {
        console.log(value)
        this.strprovince = value.text;
        this.strcity = '';
        this.strarea = '';
        this.strstreet = '';
        this.strProCode = value.provinceCode
        this.showPickerPro = false
        this.columnsCity = []
        this.columnsArea = []
        this.columnsStreet = []
        this.gainCityList()
      },
      //市区选择
      onConfirmCity(value) {
        console.log(value)
        this.strcity = value.text;
        this.strarea = '';
        this.strstreet = '';
        this.strCityCode = value.cityCode
        this.showPickercity = false
        this.columnsArea = []
        this.columnsStreet = []
        this.gainAreaList()
      },
      //区县选择
      onConfirmArea(value) {
        console.log(value)
        this.strarea = value.text;
        this.strAreaCode = value.areaCode
        this.showPickerarea = false
        this.strstreet = '';
        this.columnsStreet = []
        this.gainStreetList()
      },
      //街道选择
      onConfirmStreet(value) {
        this.strstreet = value.text;
        this.strStreetCode = value.streetCode
        this.showPickerstreet = false
        this.strcommunity = ''
        this.columnsCommunity = []
        this.gainCommunityList(this.strStreetCode)
      },
      //社区选择
      onConfirmCommunity(value) {
        this.strcommunity = value.text;
        this.strCommunityCode = value.communityCode
        this.showPickercom = false
      },
      //获取省份列表
      gainProvinceList() {
        this.$api.AddrList.provinceList_interface({}).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              var arrPro = response.data.data
              for (let i = 0; i < arrPro.length; i++) {
                let objPro = {
                  provinceId: arrPro[i].provinceId,
                  provinceCode: arrPro[i].provinceCode,
                  text: arrPro[i].provinceName
                }
                this.columnsPro.push(objPro)
              }
            }
          }
        })
      },
      //获取城市列表
      gainCityList() {
        this.$api.AddrList.cityList_interface({
          provinceCode: this.strProCode
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              var arrPro = response.data.data
              for (let i = 0; i < arrPro.length; i++) {
                let objPro = {
                  cityId: arrPro[i].cityId,
                  cityCode: arrPro[i].cityCode,
                  text: arrPro[i].cityName
                }
                this.columnsCity.push(objPro)
              }
            }
          }
        })
      },
      //获取区县列表
      gainAreaList() {
        this.$api.AddrList.areaList_interface({
          cityCode: this.strCityCode
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              var arrPro = response.data.data
              for (let i = 0; i < arrPro.length; i++) {
                let objPro = {
                  areaId: arrPro[i].areaId,
                  areaCode: arrPro[i].areaCode,
                  text: arrPro[i].areaName
                }
                this.columnsArea.push(objPro)
              }
            }
          }
        })
      },
      //获取街道列表
      gainStreetList() {
        this.$api.AddrList.streetList_interface({
          areaCode: this.strAreaCode
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              var arrPro = response.data.data
              for (let i = 0; i < arrPro.length; i++) {
                let objPro = {
                  streetId: arrPro[i].streetId,
                  streetCode: arrPro[i].streetCode,
                  text: arrPro[i].streetName
                }
                this.columnsStreet.push(objPro)
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
                this.columnsCommunity.push(objPro)
              }
            }
          }
        })
      },


    },
  }
</script>

<style scoped>

</style>

