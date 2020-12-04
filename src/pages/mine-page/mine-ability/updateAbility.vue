<template>
  <div class="positionClass">
    <van-sticky>
      <x-header class="headerBackgroundColor" >修改能力<a v-show="showAdd" @click="addButtonClicked" slot="right">添加</a></x-header>
    </van-sticky>
    <template v-for="(item_single,index) in releaseABColumns">
      <update-a-b-components :ab-item-obj="item_single" :key="item_single.id" :ability-r-index="index"
                             ref="child"></update-a-b-components>
    </template>
    <button @click="submitApplyClicked" class="addAbility-class">提交申请</button>
  </div>
</template>

<script>
  import {XHeader, XButton} from 'vux'
  import NormalUser from '../../../components/ability/normal-user'
  import UpdateABComponents from '../../../components/ability/update-ability'
  import OrgVolunteer from '../../../components/ability/org-volunteer'
  import {Dialog, Toast} from 'vant'

  export default {
    name: "updateAbility",
    components: {
      XHeader, NormalUser, OrgVolunteer,
      XButton, UpdateABComponents
    },
    data() {
      return {
        updateItem: this.$route.query.item,//从上一页传过来的值

        releaseAbility_single: 1,//个人发布能力列表
        userType: '',//用户类型 没有 表示普通用户； 7 个人志愿者； 8 组织志愿者； 9 服务对象；
        submitData: [],//提交的参数
        releaseABColumns: [],//
        people: [{name: '', phone: '', sex: ''}],
        showAdd: true,//是否显示添加按钮
      }
    },
    beforeDestroy() {
      this.$Uitl.$off('sendSingleParamsToF')
      this.$Uitl.$off('deleteCard')

    },
    mounted() {
      this.releaseABColumns = this.updateItem.zipperCheckAbilityDetailList
      this.submitData = this.updateItem.zipperCheckAbilityDetailList
      this.releaseAbility_single = this.updateItem.zipperCheckAbilityDetailList.length

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
          this.releaseABColumns.push({})
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

          paramsData.append('id', this.updateItem.id)

          paramsData.append('userId', this.$store.state.userData.id)
          paramsData.append('number', this.submitData.length)


          for (let i = 0; i < this.submitData.length; i++) {
            let objData = this.submitData[i]

            paramsData.append('zipperCheckAbilityDetailList[' + i + '].abilityId', objData.abilityId)
            paramsData.append('zipperCheckAbilityDetailList[' + i + '].abilityDetailId', objData.abilityDetailId)
            paramsData.append('zipperCheckAbilityDetailList[' + i + '].remark', objData.remark)

            if (this.submitData[i].id !== undefined) {
              paramsData.append('zipperCheckAbilityDetailList[' + i + '].id', this.submitData[i].id)
              let strImgUrl = ''
              for (let j = 0; j < objData.fileGroup.length; j++) {
                if (objData.fileGroup[j].url !== undefined) {
                  strImgUrl = objData.fileGroup[j].url + ',' + strImgUrl
                } else {
                  paramsData.append('zipperCheckAbilityDetailList[' + i + '].fileGroup[' + j + ']', objData.fileGroup[j].file)
                }
              }
              paramsData.append('zipperCheckAbilityDetailList[' + i + '].abilityPhotoUrl', strImgUrl)
            } else {
              for (let j = 0; j < objData.fileGroup.length; j++) {
                paramsData.append('zipperCheckAbilityDetailList[' + i + '].fileGroup[' + j + ']', objData.fileGroup[j].file)
              }
            }


          }


          Toast.loading({
            message: '能力提交中...',
            forbidClick: true,
            loadingType: 'spinner',
            duration: 0
          });
          this.$api.AbilityApi.submitAbilityUpdate_interface(paramsData)
            .then(response => {
              Toast.clear()
              if (response.status === 200) {
                if (response.data.status === 'SUCCESS') {
                  this.$router.push('/release-ability-success')
                }
              }
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
