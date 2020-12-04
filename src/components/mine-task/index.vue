<template>
  <div class="mine-task-cell">
    <div class="header">

      <template v-if="itemTask.integral !== undefined">
        <p class="score">
          <span class="number">{{itemTask.integral}}</span>
          <span class="text">积分</span>
        </p>
      </template>

      <van-tag class="color-status-2" v-if="itemTask.status === '2'"
               style="float: right;margin-top: 10px;margin-right: 10px;width: 100px" mark
               type="danger">服务对象拒绝
      </van-tag>
      <van-tag v-if="itemTask.status === '3'" style="float: right;width: 100px" mark
               class="color-status-3">等待服务对象确认
      </van-tag>
      <van-tag v-if="itemTask.status === '4'" style="float: right;width: 100px" mark
               class="color-status-4">等待任务开始
      </van-tag>
      <van-tag v-if="itemTask.status === '5'" style="float: right;" mark
               class="color-status-5">任务进行中
      </van-tag>
      <van-tag v-if="itemTask.status === '6'" style="float: right;" mark
               class="color-status-6">待结算
      </van-tag>
      <van-tag v-if="itemTask.status === '7'" style="float: right;" mark
               class="color-status-7">被驳回
      </van-tag>
      <van-tag v-if="itemTask.status === '8'" style="float: right;" mark
               class="color-status-8">已完成结算
      </van-tag>

    </div>
    <div class="content">
      <p>
        <span style="font-size: 18px;color: black;font-weight: bold">{{itemTask.zipperAbilityDetail.name}}</span>
        <template v-if="itemTask.demandState === '1'">
          <van-tag plain style="margin-left: 10px">用户发布</van-tag>
        </template>
        <template v-if="itemTask.demandState === '2'">
          <van-tag plain style="margin-left: 10px">系统代发</van-tag>
        </template>
      </p>
      <p v-if="itemTask.demandState === '1'">
        <span>{{itemTask.zipperConfirm.name}}</span>
        <span v-if="itemTask.zipperConfirm.sex === '1'" plain>男</span>
        <span v-if="itemTask.zipperConfirm.sex === '2'" plain>女</span>
        <span>{{itemTask.zipperConfirm.age}}岁</span>
        <a style="color: #737373" :href="'tel:/' + itemTask.phone">{{itemTask.phone}}</a>
      </p>

      <p v-if="itemTask.demandState === '2'">
        <span>{{itemTask.zipperUser.userName}}</span>
        <span v-if="itemTask.zipperUser.userSex === '1'" plain>男</span>
        <span v-if="itemTask.zipperUser.userSex === '2'" plain>女</span>
        <span>{{itemTask.zipperUser.userAge}}岁</span>
        <a style="color: #737373" :href="'tel:/' + itemTask.phone">{{itemTask.phone}}</a>
      </p>
      <p v-if="itemTask.zipperAbilityDetail.type === '0'">
        <van-tag plain>{{itemTask.demandCount}} 次</van-tag>
      </p>
      <p v-if="itemTask.zipperAbilityDetail.type === '1'">
        <van-tag plain>需 {{itemTask.number}} 人</van-tag>
        <van-tag plain>{{itemTask.demandCount}} 小时</van-tag>
      </p>
      <p v-if="itemTask.zipperAbilityDetail.type === '2'">
        <van-tag plain>{{itemTask.demandCount}} 件</van-tag>
      </p>
      <p>
        {{itemTask.startDate}} 至 {{itemTask.endDate}}
      </p>
      <p style="font-size: 14px">
        {{itemTask.bsStreet.streetName}}{{itemTask.bsCommunity.communityName}}{{itemTask.address}}
      </p>
      <div class="cell-remarks">{{itemTask.remark}}</div>
      <p class="image-task-cell">
        <van-uploader :deletable="false"
                      v-model="fileList"
                      multiple :max-count="fileList.length"
        />
      </p>
    </div>

    <template v-if="itemTask.status === '4'">
      <van-divider/>
      <div class="footer">
        <button class="btn-task" @click="startTaskClicked">开始任务</button>
      </div>
    </template>
    <template v-if="itemTask.status === '5'">
      <van-divider/>
      <div class="footer">
        <button @click="fineshTaskClicked" class="btn-task">结束任务</button>
      </div>
    </template>
    <template v-if="itemTask.status === '7'">
      <van-divider/>
      <div class="footer">
        <p v-if="itemTask.replyInfo !== undefined">驳回原因: {{itemTask.replyInfo}}</p>
        <button class="btn-task" @click="appealClicked">申诉</button>
      </div>
    </template>
  </div>
</template>

<script>
  import {Dialog} from 'vant'
  import Vue from 'vue'

  Vue.use(Dialog)

  export default {
    name: "index",
    props: {
      itemTask: Object
    },
    data() {
      return {
        fileList: [],//照片
      }
    },
    mounted() {
      if (this.itemTask.photoArray !== undefined) {
        for (let i = 0; i < this.itemTask.photoArray.length; i++) {
          let imageObj = {
            url: this.itemTask.photoArray[i]
          }
          this.fileList.push(imageObj)
        }
      }
    },
    methods: {
      //开始任务
      startTaskClicked() {

        Dialog.confirm({
          title: '开始任务',
          message: "您已到达任务地点，并确认开始服务吗？"
        }).then(() => {
          this.$api.TaskApi.volunteerStartTask({
            id: this.itemTask.id
          }).then(response => {
            if (response.status === 200) {
              if (response.data.status === 'SUCCESS') {
                this.itemTask.status = '5'
              }
            }
          })
        }).catch(() => {

        });


      },
      //结束任务
      fineshTaskClicked() {


        //1、判断是否代发，直接进入完成可修改页面
        //2、自发的，要判断发布者是否为服务对象
        let strType = this.itemTask.demandState
        if (strType === '2') {
          this.$router.push({
            path: '/mine-task-end',
            query: {
              itemObj: this.itemTask,
              strStatus: 'A'
            }
          })
        }
        if (strType === '1') {
          if (this.itemTask.zipperConfirm.confirmType === '1' || this.itemTask.zipperConfirm.confirmType === '2') {
            Dialog.confirm({
              title: '结束任务',
              message: "您确认要结束服务吗？"
            }).then(() => {
              let params = new FormData()
              params.set('id', this.itemTask.id)
              this.$api.TaskApi.volunteerFinishTask(params).then(response => {
                if (response.status === 200) {
                  if (response.data.status === 'SUCCESS') {
                    this.itemTask.status = '6'
                  }
                }
              })
            }).catch(() => {

            });


          } else {
            this.$router.push({
              path: '/mine-task-end',
              query: {
                itemObj: this.itemTask,
                strStatus: 'A'
              }
            })
          }
        }
      },
      //申诉
      appealClicked() {
        console.log('aaaaa===', this.itemTask.demandState)
        let strType = this.itemTask.demandState
        if (strType === '2') {
          this.$router.push({
            path: '/mine-task-end',
            query: {
              itemObj: this.itemTask,
              strStatus: 'B'
            }
          })
        }
        if (strType === '1') {
          if (this.itemTask.zipperConfirm.confirmType === '1' || this.itemTask.zipperConfirm.confirmType === '2') {
            Dialog.confirm({
              title: '申诉',
              message: "您确认要申诉吗？"
            }).then(() => {
              let params = new FormData()
              params.set('id', this.itemTask.id)
              this.$api.TaskApi.volunteerAppealTask(params).then(response => {
                if (response.status === 200) {
                  if (response.data.status === 'SUCCESS') {
                    this.itemTask.status = '6'
                  }
                }
              })
            }).catch(() => {

            });


          } else {
            this.$router.push({
              path: '/mine-task-end',
              query: {
                itemObj: this.itemTask,
                strStatus: 'B'
              }
            })
          }
        }
      }
    }
  }
</script>

<style scoped>
  .mine-task-cell >>> .van-tag {
    font-size: 10px;
  }

  .mine-task-cell {
    margin: 20px 15px;
    background: white;
    border-radius: 10px;
    box-shadow: 5px 5px 10px #c0c0c0;
  }

  .mine-task-cell .header {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #efefef;
  }

  .mine-task-cell .header .score {
    line-height: 40px;
    padding-left: 10px;
    float: left;
  }

  .mine-task-cell .header .score .number {
    font-size: 18px;
    color: #d60000;
  }

  .mine-task-cell .header .score .text {
    font-size: 14px;
    color: #d60000;
  }

  .mine-task-cell .header .title {
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    padding-left: 10px;
  }

  .mine-task-cell .content {
    margin: 5px 10px;
    color: #737373;
    font-size: 16px;
  }

  .mine-task-cell .content p {
    line-height: 25px;
    font-size: 14px;
  }

  .mine-task-cell .footer {
    width: 100%;
    line-height: 15px;
    text-align: right;
    padding-bottom: 10px;

  }

  .mine-task-cell .footer p {
    text-align: left;
    font-size: 12px;
    color: #ff7615;
    padding: 5px 10px;
  }

  .mine-task-cell .footer >>> .van-button {
    margin-top: 10px;
    margin-right: 10px;
  }

  .mine-task-cell >>> .van-divider {
    margin: 5px 0 !important;
  }

  .cell-remarks {
    padding: 5px 0;
    font-size: 14px;
  }

  .image-task-cell {
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

    color: #6d6dde;
  }


  .btn-task {
    height: 25px;
    border: 1px solid #1a80cb;
    font-size: 14px;
    border-radius: 50px;
    margin-right: 10px;
    background: transparent;
    color: #1a80cb;
  }
</style>
