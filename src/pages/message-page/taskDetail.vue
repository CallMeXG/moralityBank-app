<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >任务详情</x-header>
    </van-sticky>
    <van-field
      disabled
      v-model="taskDetailItem.zipperAbility.name"
      label="任务类别"
    />
    <van-field
      disabled
      v-model="taskDetailItem.zipperAbilityDetail.name"
      label="任务项目"
    />
    <van-field
      disabled
      v-model="taskDetailItem.zipperUser.userName"
      label="姓名"
    />

    <van-field
      disabled
      v-model="sex"
      label="性别"
    />

    <van-field
      disabled
      v-model="taskDetailItem.zipperUser.userAge"
      label="年龄"
    />
    <van-field
      disabled
      v-model="taskDetailItem.zipperUser.userPhone"
      label="联系方式"
    />
    <van-field
      disabled
      v-model="address"
      label="地址"
    />
    <van-field
      disabled
      v-model="taskDetailItem.zipperAbilityDetail.name"
      label="任务详情"
    />
    <van-field
      disabled
      v-model="taskDetailItem.zipperAbilityDetail.name"
      label="照片"
    />
    <van-field
      disabled
      v-model="taskDetailItem.zipperAbilityDetail.name"
      label="任务项目"
    />
    <van-field
      disabled
      v-model="taskDetailItem.zipperAbilityDetail.name"
      label="任务项目"
    />
    <van-field
      disabled
      v-model="taskDetailItem.zipperAbilityDetail.name"
      label="任务项目"
    />
    <van-field
      disabled
      v-model="taskDetailItem.zipperAbilityDetail.name"
      label="任务项目"
    />

  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "taskDetail",
    components: {
      XHeader
    },
    props: {
      detailObj: Object
    },
    data() {
      return {
        sex: '',
        address: '',
        taskDetailItem: this.$route.query.taskItem
      };
    },
    mounted() {
      console.log('==' + JSON.stringify(this.$route.query.taskItem))
      if (this.taskDetailItem.zipperUser.userSex === '1') {
        this.sex = '男'
      }
      if (this.taskDetailItem.zipperUser.userSex === '2') {
        this.sex = '女'
      }
      this.address = this.taskDetailItem.bsStreet.streetName + this.taskDetailItem.bsCommunity.communityName + this.taskDetailItem.address
    },
    methods: {},
  }
</script>

<style scoped>

</style>
