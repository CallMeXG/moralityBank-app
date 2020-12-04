<template>

  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >能力发布<a v-show="showAdd" @click="addButtonClicked" slot="right">添加</a></x-header>
    </van-sticky>

    <template v-if="userType === undefined || userType === null || userType === ''">
      <normal-user></normal-user>
    </template>
    <template v-else>
      <template v-if="userType === '6' || userType === '7' || userType === '8'">
        <template v-for="(item_single,index) in releaseABColumns">
          <single-volunteer :key="item_single" :ability-r-index="index" ref="child"></single-volunteer>
        </template>
        <button @click="submitApplyClicked" class="addAbility-class">提交申请</button>
      </template>
      <template v-if="userType === '9'">
        <div class="release-ability-serivce">
          <p>您当前的账户类型为:<span>服务对象</span></p>
          <p>您不具备发布能力的权限</p>
        </div>
      </template>
    </template>


    <!--    <button @click="addButtonClicked" class="addAbility-class">+ 添加</button>-->


  </div>
</template>

<script>
  import {XHeader, XButton} from 'vux'
  import NormalUser from '../../components/ability/normal-user'
  import SingleVolunteer from '../../components/ability/single-volunteer'
  import OrgVolunteer from '../../components/ability/org-volunteer'
  import {Dialog, Toast} from 'vant'

  export default {
    name: "index",
    components: {
      XHeader, NormalUser, OrgVolunteer,
      XButton, SingleVolunteer
    },
    data() {
      return {
        releaseAbility_single: 1,//个人发布能力列表
        userType: '',//用户类型 没有 表示普通用户； 7 个人志愿者； 8 组织志愿者； 9 服务对象；
        submitData: [],//提交的参数
        releaseABColumns: [0],//
        people: [{name: '', phone: '', sex: ''}],
        showAdd: false,//是否显示添加按钮
      }
    },
    beforeDestroy() {
      this.$Uitl.$off('sendSingleParamsToF')
      this.$Uitl.$off('deleteCard')

    },
    mounted() {
      this.userType = this.$store.state.userData.userType
      console.log('user type =', this.userType)
      if (this.userType === '6' || this.userType === '7' || this.userType === '8') {
        this.showAdd = true
      }
      if (this.userType === '9') {
        this.showAdd = false
      }
      const that = this
      this.$Uitl.$on('sendSingleParamsToF', function (value, index) {
        that.submitData.push(value)
        that.postSubmitData()
      })
      this.$Uitl.$on('deleteCard', function (value) {
        that.del(value)
      })

    },
    methods: {
      //删除一条能力
      del(val) {
        if (this.releaseABColumns.length > 1) {
          this.releaseABColumns.splice(val, 1)
        } else {
          Dialog({
            message: '最少提交一条能力'
          })
        }

      },
      //添加一条能力
      addButtonClicked() {
        Dialog.confirm({
          message: '你确定要添加一条能力吗？'
        }).then(() => {
          this.releaseAbility_single += 1;
          this.releaseABColumns.push(this.releaseAbility_single)
        }).catch(() => {

        });
      },
      //提交申请按钮点击事件，让各个子组件把个信息返回过来
      submitApplyClicked() {
        this.submitData = []
        for (let i = 0; i < this.releaseABColumns.length; i++) {
          this.$refs.child[i].gainThisInputContent()
        }
      },
      //提交数据接口
      postSubmitData() {

        if (this.submitData.length === this.releaseAbility_single) {

          let paramsData = new FormData()
          paramsData.append('userId', this.$store.state.userData.id)
          paramsData.append('number', this.submitData.length)

          for (let i = 0; i < this.submitData.length; i++) {
            let objData = this.submitData[i]
            paramsData.append('zipperCheckAbilityDetailList[' + i + '].abilityId', objData.abilityId)
            paramsData.append('zipperCheckAbilityDetailList[' + i + '].abilityDetailId', objData.abilityDetailId)
            paramsData.append('zipperCheckAbilityDetailList[' + i + '].remark', objData.remark)
            for (let j = 0; j < objData.fileGroup.length; j++) {
              paramsData.append('zipperCheckAbilityDetailList[' + i + '].fileGroup[' + j + ']', objData.fileGroup[j])
            }
          }
          Toast.loading({
            message: '能力提交中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0
          });
          this.$api.AbilityApi.submitAbilityApply_interface(paramsData)
            .then(response => {
              Toast.clear()
              if (response.status === 200) {
                if (response.data.status === 'SUCCESS') {
                  this.$router.push('/release-ability-success')
                }
              }
            }).catch(error => {
            Toast.clear()
          })
        }


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

  .release-ability-serivce {
    width: 100%;
    margin-top: 100px;
    height: 100px;
    text-align: center;
  }

  .release-ability-serivce p {
    color: gray;
    font-size: 14px;
    line-height: 30px;
  }

  .release-ability-serivce span {
    font-size: 18px;
    color: #00c794;
  }
</style>
