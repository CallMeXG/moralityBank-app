<template>
  <div class="taskCell">

    <el-card class="box-card">
      <div>
        <div class="content-type">
          <span v-if="taskObj.zipperAbilityDetail !== undefined">{{taskObj.zipperAbilityDetail.name}}</span>
          <template v-if="taskObj.demandState === '1'">
            <van-tag style="margin-left: 10px" round plain>个人发布</van-tag>
          </template>
          <template v-if="taskObj.demandState === '2'">
            <van-tag style="margin-left: 10px" round plain>系统发布</van-tag>
          </template>

        </div>
        <p class="content-pros">
          <template v-if="taskObj.demandState === '1'">
            <span style="margin-right: 10px">{{taskObj.zipperConfirm.name}} </span>
            <template v-if="taskObj.zipperConfirm.sex !== undefined">
              <template v-if="taskObj.zipperConfirm.sex === '1'">
                <span class="sex">男</span>
              </template>
              <template v-if="taskObj.zipperConfirm.sex === '2'">
                <span class="sex" style="color: #cb6fbf">女</span>
              </template>
            </template>
            <template v-if="taskObj.zipperConfirm.age !== undefined">
              <span class="sex">{{taskObj.zipperConfirm.age}}岁</span>
            </template>
          </template>
          <template v-if="taskObj.demandState === '2'">
            <span style="margin-right: 10px">{{taskObj.zipperUser.userName}} </span>
            <template v-if="taskObj.zipperUser.userSex !== undefined">
              <template v-if="taskObj.zipperUser.userSex === '1'">
                <span class="sex">男</span>
              </template>
              <template v-if="taskObj.zipperUser.userSex === '2'">
                <span class="sex">女</span>
              </template>
            </template>
            <template v-if="taskObj.zipperUser.userAge !== undefined">
              <span class="sex">{{taskObj.zipperUser.userAge}}岁</span>
            </template>
          </template>

<!--          <a style="color: #737373" :href="'tel:/' + taskObj.phone">{{taskObj.phone}}</a>-->

        </p>
        <p class="content-pros">
          <template v-if="taskObj.demandLevel === '1'">
            <van-tag type="warning" plain >个人/组织志愿者</van-tag>
          </template>
          <template v-if="taskObj.demandLevel === '2'">
            <van-tag type="warning" plain>仅限个人志愿者</van-tag>
          </template>
          <template v-if="taskObj.demandLevel === '3'">
            <van-tag type="warning" plain >仅限志愿者组织</van-tag>
          </template>
          <template v-if="taskObj.zipperAbilityDetail !== undefined && taskObj.zipperAbilityDetail['type'] === '0'">
            <van-tag type="warning" plain>{{taskObj.demandCount}}次</van-tag>
          </template>
          <template v-if="taskObj.zipperAbilityDetail !== undefined && taskObj.zipperAbilityDetail['type'] === '1'">
            <van-tag type="warning" plain>需 {{taskObj.number}} 人</van-tag>
            <van-tag type="warning" plain>{{taskObj.demandCount}} 小时</van-tag>
          </template>
          <template v-if="taskObj.zipperAbilityDetail !== undefined && taskObj.zipperAbilityDetail['type'] === '2'">
            <van-tag type="warning" plain>{{taskObj.demandCount}}件</van-tag>
          </template>

        </p>
        <p v-if="taskObj.startDate != undefined" class="content-pros">
          {{taskObj.startDate}} 至 {{taskObj.endDate}}
        </p>
        <p class="content-pros">
          <span style="line-height: 20px">
            {{taskObj.bsStreet.streetName}}{{taskObj.bsCommunity.communityName}}{{taskObj.address}}
          </span>
        </p>
        <template v-if="taskObj.distance !== undefined">
          <p class="content-pros" style="line-height: 20px">
            <span>距离我:</span>
            <template v-if="parseInt(taskObj.distance) > 0">
              <span v-if="parseInt(taskObj.distance) <= 1000">{{taskObj.distance}}m</span>
              <span v-if="parseInt(taskObj.distance) > 1000">{{(parseInt(taskObj.distance) / 1000).toFixed(2)}} km</span>
            </template>
            <template v-if="parseInt(taskObj.distance) === 0">
              <span>本街道</span>
            </template>
          </p>

        </template>
        <p class="content-pros remark-content">{{taskObj.remark}}</p>

        <p class="image-task-cell">
          <van-uploader :deletable="false"
                        v-model="fileList"
                        multiple :max-count="fileList.length"
          />
        </p>
        <div style="clear: both;"></div>

      </div>
      <div class="card-footer-taskcell">
        <el-button @click="receiveTaskClicked" style="float: right; padding: 3px 10px;font-size: 16px" type="text">领取任务</el-button>
<!--        <template v-if="flagCanReceive">-->
<!--          <el-button disabled @click="receiveTaskClicked" style="float: right; padding: 3px 10px" type="text">领取任务-->
<!--          </el-button>-->
<!--        </template>-->
<!--        <template v-else>-->
<!--          <el-button @click="receiveTaskClicked" style="float: right; padding: 3px 10px;font-size: 16px" type="text">领取任务</el-button>-->
<!--        </template>-->
        <template v-if="taskObj.integral !== undefined">
          <p style="float: left;margin-left: 10px;font-size: 12px;color: red;" >
            <span style="font-size: 18px;font-weight: bold">{{taskObj.integral}}</span>
            <span>积分</span>
          </p>
        </template>
        <div style="clear: both"></div>
<!--        <p v-show="flagCanReceive" class="card-header-not-reason">{{cantReasion}}</p>-->
      </div>
    </el-card>


    <van-dialog v-model="show" title="您确定要领取该任务吗？" show-cancel-button @confirm="receiveTaskInterface">
      <div class="alert-task">
        <p v-if="taskObj.zipperAbilityDetail !== undefined">{{taskObj.zipperAbilityDetail.name}}</p>
        <p v-if="taskObj.demandState === '1'">
          <span style="color: #1a80cb;margin-right: 10px">{{taskObj.zipperConfirm.name}} </span>
          <template v-if="taskObj.zipperConfirm.sex !== undefined">
            <template v-if="taskObj.zipperConfirm.sex === '1'">
              <span class="sex">男</span>
            </template>
            <template v-if="taskObj.zipperConfirm.sex === '2'">
              <span class="sex" style="color: #cb6fbf">女</span>
            </template>
          </template>
          <template v-if="taskObj.zipperConfirm.age !== undefined">
            <span class="sex">{{taskObj.zipperConfirm.age}}岁</span>
          </template>
        </p>
        <p v-if="taskObj.demandState === '2'">
          <span style="color: #1a80cb;margin-right: 10px">{{taskObj.zipperUser.userName}} </span>
          <template v-if="taskObj.zipperUser.userSex !== undefined">
            <template v-if="taskObj.zipperUser.userSex === '1'">
              <span class="sex">男</span>
            </template>
            <template v-if="taskObj.zipperUser.userSex === '2'">
              <span class="sex" style="color: #cb6fbf">女</span>
            </template>
          </template>
          <template v-if="taskObj.zipperUser.userAge !== undefined">
            <span class="sex">{{taskObj.zipperUser.userAge}}岁</span>
          </template>
        </p>
        <p>
          {{taskObj.bsStreet.streetName}}{{taskObj.bsCommunity.communityName}}{{taskObj.address}}
        </p>
      </div>
    </van-dialog>
  </div>

</template>

<script>
  import Vue from 'vue';
  import {Toast,Dialog} from 'vant';

  Vue.use(Toast);
  Vue.use(Dialog)

  export default {
    name: "index",
    props: {
      taskObj: Object,
      taskIndex: Number
    },
    data() {
      return {
        remarkShowLine: true,//附加信息是否全部显示
        show: false,
        fileList: [],
        flagCanReceive: false,//是否可领取该任务
        cantReasion: '',//不可领取的原因
      }
    },
    mounted() {

      if (this.taskObj.photoArray !== undefined) {
        for (let i = 0; i < this.taskObj.photoArray.length; i++) {
          this.fileList.push({
            url:  this.taskObj.photoArray[i]
          })
        }
      }

      let strUserType = this.$store.state.userData.userType

      let objReceive = this.returnCantReceiveReasion(strUserType, this.taskObj.demandLevel)
      this.flagCanReceive = objReceive.flag
      this.cantReasion = objReceive.str
    },
    methods: {
      //任务列表，点击进入详情页
      taskCellClicked() {
        this.$router.push({
          name: 'task-detail',
          query: {
            taskItem: this.taskObj
          }
        })
      },
      remarkMessageClicked() {
        this.remarkShowLine = !this.remarkShowLine;
      },

      //领取任务点击事件
      receiveTaskClicked() {
        //this.show = true

        let strUserType = this.$store.state.userData.userType
        let objReceive = this.returnCantReceiveReasion(strUserType, this.taskObj.demandLevel)
        let strFlag = objReceive.flag
        let strReason = objReceive.str

        if (strFlag === true){
          Dialog.alert({
            title: '领取任务失败',
            message: strReason
          })
        }
        else {
          this.show = true
        }



      },
      //任务领取接口
      receiveTaskInterface() {
        // this.$emit('deleteTaskCell',this.taskIndex)
        this.$api.TaskApi.receiveTask_interface({
          id: this.taskObj.id,
          volunteerId: this.$store.state.userData.id
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              Toast.success('任务领取成功！')
              this.$emit('deleteTaskCell', this.taskIndex)
            }
            else if (response.data.status === 'NOTABILITY'){
              Dialog.alert({
                title: '任务领取失败',
                message: '您没有领取该任务所需的能力，请先去【首页】--【能力发布】中申请符合该任务的能力'
              }).then(()=>{

              })
            }
            else {
              Toast.fail(response.data.message)
            }
          }
        })
      },

      //是否显示不可领取原因
      returnCantReceiveReasion(strUserType, strLevel) {
        if (strUserType === '7') {
          if (strLevel === '3') {
            return {
              flag: true,
              str: '该任务只限组织志愿者'
            };
          }
        }
        if (strUserType === '8') {
          if (strLevel === '2') {
            return {
              flag: true,
              str: '该任务只限个人志愿者'
            };
          }
        }
        if (strUserType === '9') {
          return {
            flag: true,
            str: '您是服务对象，不可领取任务'
          };
        }
        return {
          flag: false,
          str: ''
        }
      }
    }
  }
</script>
<style>
  .el-card__header {
    padding: 15px !important;
  }

  .el-card__body {
    padding: 0 !important;
  }
</style>
<style scoped>
  .taskCell {
    background: white;
    margin: 10px 10px 20px 10px;
    width: calc(100% - 20px);
    /*height: 400px;*/
    border-radius: 5px 10px 5px 5px;
  }

  .card-header-not-reason {
    float: right;
    color: red;
    font-size: 12px;
    padding: -2px;
  }

  .taskCell .content-type {
    margin: 10px 10px 0 10px;
    padding-top: 5px;
    color: black;
    font-weight: bold;
    font-size: 16px;
  }

  .content-pros .sex {
    font-size: 14px;
    color: #737373;
    margin: 0 10px 0 0;
  }


  .content-pros {
    margin: 5px 10px 0 10px;
    padding-top: 5px;
    color: #737373;
    font-size: 16px;
  }

  .remark-content {
    margin-bottom: 5px;
    padding-bottom: 5px;
    line-height: 23px;
  }


  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 120px;
    height: 120px;
    background-color: #fff;
  }

  .image-task-cell {
    padding-left: 10px;
  }

  .image-task-cell >>> .van-uploader__preview {
    width: 40px;
    height: 40px;
  }

  .image-task-cell >>> .van-uploader__preview-image {
    width: 40px;
    height: 40px;
  }

  .image-task-cell >>> img {
    width: 40px;
    height: 40px;
    float: left;
  }

  .alert-task {
    height: 150px;
    padding: 10px 10px;
    text-align: center;
    color: #1a80cb;
  }

  .alert-task p {
    height: 30px;
    line-height: 30px;
  }

  .alert-task .sex {
    color: #1a80cb;
    margin: 0 10px 0 0;
  }

  .card-footer-taskcell{
    height: 30px;
    border-top: 1px solid #ededed;
    padding-top: 10px;
  }

  .taskCell >>> .van-tag{
    font-size: 14px;
  }


</style>
