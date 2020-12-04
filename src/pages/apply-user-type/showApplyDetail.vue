<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >认证详情</x-header>
    </van-sticky>
    <van-field disabled label="认证类型" v-model="applyType"/>
    <van-field disabled label="姓名" v-model="name"/>
    <template v-if="this.detailObj.confirmType === '1' || this.detailObj.confirmType === '3' || this.detailObj.confirmType === '4'">
      <van-field disabled label="性别" v-model="sex"/>
      <van-field disabled label="年龄" v-model="age"/>
    </template>


    <van-field disabled label="证件类型" v-model="usercredentialType"/>
    <van-field disabled label="证件号码" v-model="credentialNum"/>
    <van-field disabled label="证件照片">
      <template #input>
        <van-uploader :deletable="false" :max-count="credentialPhoto.length" v-model="credentialPhoto"/>
      </template>
    </van-field>
    <van-field disabled label="所在街道" v-model="atStreet"/>
    <van-field disabled label="所在社区" v-model="atCom"/>
    <van-field disabled label="详细地址" v-model="atAddress"/>
    <van-field disabled autosize rows="3" type="textarea" label="申请书" v-model="notice"/>
  </div>

</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "showApplyDetail",
    components: {
      XHeader
    },
    data() {
      return {
        detailObj: this.$route.query.appleObj,
        name: '',
        applyType: '',
        sex: '',
        age: '',
        usercredentialType: '',
        credentialNum: '',
        credentialPhoto: [],
        atStreet: '',
        atCom: '',
        atAddress: '',
        notice: ''
      }
    },
    mounted() {

      if (this.detailObj.confirmType === '1') {
        this.applyType = '个人志愿者'
      }
      if (this.detailObj.confirmType === '2') {
        this.applyType = '志愿者组织'
      }
      if (this.detailObj.confirmType === '3') {
        this.applyType = '服务对象'
      }
      if (this.detailObj.confirmType === '4') {
        this.applyType = '社区工作人员'
      }
      this.name = this.detailObj.name

      if (this.detailObj.sex === '1') {
        this.sex = '男'
      }
      if (this.detailObj.sex === '2') {
        this.sex = '女'
      }
      this.age = this.detailObj.age
      if (this.detailObj.credentialType === '1') {
        this.usercredentialType = '身份证'
      }
      if (this.detailObj.credentialType === '2') {
        this.usercredentialType = '营业执照'
      }
      this.credentialNum = this.detailObj.credentialNum

      this.credentialPhoto = [
        {
          url:  this.detailObj.photoUrlUp
        },
        {
          url:  this.detailObj.photoUrlDn
        }
      ]

      this.atStreet = this.detailObj.bsStreet.streetName
      this.atCom = this.detailObj.bsCommunity.communityName
      this.atAddress = this.detailObj.address
      if (this.detailObj.notice !== undefined){
        this.notice = this.detailObj.notice
      }


    }
  }
</script>

<style scoped>

</style>
