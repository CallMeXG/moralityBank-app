<template>
<div class="mine-needs-list-cell">
  <div class="el-card-ability">
    <div class="mine-needs-cell-header">
      <p style="height: 30px;line-height: 30px">
        <template v-if="mineNeedsItem.integral !== undefined">
        <span style="float: left;margin: 0 10px;color: #d60000">
          {{mineNeedsItem.integral}}积分
        </span>
        </template>
        <template v-if="mineNeedsItem.status === '0'">
          <van-tag mark style="float: right" class="color-status-0">审核中</van-tag>
        </template>
        <template v-if="mineNeedsItem.status === '1'">
          <van-tag mark style="float: right" type="danger" class="color-status-1">被拒绝</van-tag>
        </template>
        <template v-if="mineNeedsItem.status === '2'">
          <van-tag mark style="float: right" type="primary" class="color-status-2">待领取</van-tag>
        </template>
        <template v-if="mineNeedsItem.status === '3'">
          <van-tag mark style="float: right" type="primary" class="color-status-3">待确认</van-tag>
        </template>
        <template v-if="mineNeedsItem.status === '4'">
          <van-tag mark style="float: right" type="primary" class="color-status-4">待进行</van-tag>
        </template>
        <template v-if="mineNeedsItem.status === '5'">
          <van-tag mark style="float: right" color="#00c794" class="color-status-5">进行中</van-tag>
        </template>
        <template v-if="mineNeedsItem.status === '6'">
          <van-tag mark style="float: right" type="danger" class="color-status-6">待结算</van-tag>
        </template>
        <template v-if="mineNeedsItem.status === '7'">
          <van-tag mark style="float: right" type="danger" class="color-status-7">被驳回</van-tag>
        </template>
        <template v-if="mineNeedsItem.status === '8'">
          <van-tag mark style="float: right" type="danger" class="color-status-8">已结算</van-tag>
        </template>
        <template v-if="mineNeedsItem.status === '9'">
          <van-tag mark style="float: right" color="#f0a306" class="color-status-9">已取消</van-tag>
        </template>
      </p>
      <div style="clear: both"></div>
      <div class="text">
        <span style="font-size: 18px">{{mineNeedsItem.zipperAbilityDetail.name}}</span>
        <template v-if="mineNeedsItem.demandState === '1'">
          <van-tag plain style="margin: 6px 10px">自发</van-tag>
        </template>
        <template v-if="mineNeedsItem.demandState === '2'">
          <van-tag plain style="margin: 6px 10px">代发</van-tag>
        </template>
      </div>
      <div style="clear: both"></div>

    </div>

    <div>
      <van-collapse v-model="activeNames">
        <van-collapse-item :title="'志愿者'" name="1">
          <div class="mine-needs-vol">
            <div style="padding-left: 15px" v-if="mineNeedsItem.volunteerConfirm === undefined || mineNeedsItem.volunteerConfirm === 'undefined'">
              暂无志愿者领取
            </div>
            <div v-else>
              <div class="vol-div-content">
                <p>
                  <span>{{mineNeedsItem.volunteerConfirm.name}}</span>

                  <van-tag v-if="mineNeedsItem.volunteerConfirm.confirmType === '1'" plain >个人志愿者</van-tag>
                  <van-tag v-if="mineNeedsItem.volunteerConfirm.confirmType === '2'" plain >志愿者组织</van-tag>
                  <van-tag v-if="mineNeedsItem.volunteerConfirm.confirmType === '4'" plain >社区工作人员</van-tag>

                  <template v-if="mineNeedsItem.volunteerConfirm.confirmType !== '2'">
                    <template v-if="mineNeedsItem.volunteerConfirm.sex === '1'">
                      <van-tag plain type="primary">男</van-tag>
                    </template>
                    <template v-if="mineNeedsItem.volunteerConfirm.sex === '2'">
                      <van-tag plain type="warning">女</van-tag>
                    </template>
                    <van-tag plain >{{mineNeedsItem.volunteerConfirm.age}}岁</van-tag>
                  </template>

                </p>
                <p>
                  <a style="color: #737373" :href="'tel:/' + mineNeedsItem.volunteerConfirm.phoneNumber">{{mineNeedsItem.volunteerConfirm.phoneNumber}}</a>
                </p>
                <p>
                  {{mineNeedsItem.volunteerConfirm.bsStreet.streetName}}{{mineNeedsItem.volunteerConfirm.bsCommunity.communityName}}{{mineNeedsItem.volunteerConfirm.address}}
                </p>
              </div>

              <div class="vol-div-content-button">
                <template v-if="mineNeedsItem.status === '3'">
                  <div @click="dealVolunterrToService('YES')" class="agree">同意</div>
                  <div @click="dealVolunterrToService('NO')" class="refuse">拒绝</div>
                </template>
              </div>
              <div style="clear: both"></div>

            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item title="需求详细" name="2">
          <div class="mine-needs-cell-content">
            <p class="content-p-style">
              <template v-if="mineNeedsItem.demandState === '1'">
                <span>{{mineNeedsItem.zipperConfirm.name}}</span>
                <span v-if="mineNeedsItem.zipperConfirm.sex === '1'">男</span>
                <span v-if="mineNeedsItem.zipperConfirm.sex === '2'">女</span>
                <span>{{mineNeedsItem.zipperConfirm.age}}岁</span>
              </template>
              <template v-if="mineNeedsItem.demandState === '2'">
                <span>{{mineNeedsItem.zipperUser.userName}}</span>
                <span v-if="mineNeedsItem.zipperUser.userSex === '1'">男</span>
                <span v-if="mineNeedsItem.zipperUser.userSex === '2'">女</span>
                <span>{{mineNeedsItem.zipperUser.userAge}}岁</span>
              </template>


              <van-tag v-if="mineNeedsItem.demandLevel === '1'" style="float: right" plain >
                个人/组织志愿者
              </van-tag>
              <van-tag v-if="mineNeedsItem.demandLevel === '2'" style="float: right" plain >
                个人志愿者
              </van-tag>
              <van-tag v-if="mineNeedsItem.demandLevel === '3'" style="float: right" plain >
                组织志愿者
              </van-tag>
            </p>
            <p class="content-p-style-commen">
              <template v-if="mineNeedsItem.zipperAbilityDetail.type === '0'">
                <van-tag plain>
                  {{mineNeedsItem.demandCount}} 次
                </van-tag>
              </template>
              <template v-if="mineNeedsItem.zipperAbilityDetail.type === '1'">
                <van-tag plain>需{{mineNeedsItem.number}}人</van-tag>
                <van-tag plain>
                  {{mineNeedsItem.demandCount}} 小时
                </van-tag>
              </template>
              <template v-if="mineNeedsItem.zipperAbilityDetail.type === '2'">
                <van-tag plain>
                  {{mineNeedsItem.demandCount}} 件
                </van-tag>
              </template>


            </p>
            <div style="clear: both"></div>
            <p class="content-p-style-commen">
              {{mineNeedsItem.bsStreet.streetName}}{{mineNeedsItem.bsCommunity.communityName}}{{mineNeedsItem.address}}
            </p>
            <p class="content-p-style-commen" style="line-height: 20px">
              {{mineNeedsItem.startDate}} 至 {{mineNeedsItem.endDate}}
            </p>
            <p class="content-p-style-commen" style="line-height: 20px">
              {{mineNeedsItem.remark}}
            </p>
            <p class="content-p-style-commen">
              <van-uploader :deletable="false"
                            v-model="fileList"
                            multiple :max-count="fileList.length"
              />
            </p>
            <p class="content-p-style-commen" style="font-size: 12px">
              {{mineNeedsItem.createDate}}
            </p>

          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
    <template v-if="mineNeedsItem.status === '1' || mineNeedsItem.status === '7'">
      <div class="refuse-reason" v-if="mineNeedsItem.replyInfo !== undefined">
        被拒原因: {{mineNeedsItem.replyInfo}}
      </div>
    </template>


    <van-button @click.native="enterUpdatePage" v-if="mineNeedsItem.status === '1'" style="margin: 10px;float: right"
                size="mini" type="info">修改
    </van-button>
    <van-button @click.native="cancelMineNeeds" plain hairline
                v-if="mineNeedsItem.status === '1' || mineNeedsItem.status === '0' || mineNeedsItem.status === '2'"
                style="margin: 10px;float: left" size="mini" type="danger">取消需求
    </van-button>
    <br>
    <div style="clear: both"></div>
  </div>
</div>


</template>

<script>
  import Vue from 'vue';
  import {Toast, Dialog} from 'vant';

  Vue.use(Toast);
  Vue.use(Dialog)
  export default {
    name: "mineNeedsCell",
    props: {
      mineNeedsItem: Object
    },
    data() {
      return {
        fileList: [],
        show: false,
        activeNames: ['1'],
        autoSuccess: ''
      }
    },
    mounted() {

      if (this.mineNeedsItem.photoArray !== undefined) {
        let imageList = this.mineNeedsItem.photoArray
        for (let i = 0; i < imageList.length; i++) {
          this.fileList.push({
            url: imageList[i]
          })
        }
      }

      if (this.mineNeedsItem.demandReconfirm !== undefined){
        if (this.mineNeedsItem.demandReconfirm === '0'){
          this.autoSuccess = '自动确认'
        }
        if (this.mineNeedsItem.demandReconfirm === '1'){
          this.autoSuccess = '手动确认'
        }
      }


    },
    methods: {
      //拒绝/同意志愿者进行服务
      dealVolunterrToService(strType) {
        let strTypeText = ''
        if (strType === 'YES') {
          strTypeText = '您确定要同意该志愿者提供服务吗？'
        }
        if (strType === 'NO') {
          strTypeText = '您确定要拒绝该志愿者提供服务吗？'
        }
        const that = this
        Dialog.confirm({
          message: strTypeText
        }).then(() => {
          // on confirm
          that.dealInterface(strType)
        }).catch(() => {
          // on cancel
        });
      },
      //同意或拒绝服务，接口
      dealInterface(strType) {

        this.$api.NeedsApi.dealVolunterrToService_interface({
          id: this.mineNeedsItem.id,
          state: strType
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              this.show = false
              this.$emit('refreshData')
            }
          }
        })
      },
      //进入我的需求修改页面
      enterUpdatePage() {
        this.$router.push({
          path: '/update-mine-needs',
          query: {
            itemNeeds: this.mineNeedsItem
          }
        })
      },
      //取消该条需求
      cancelMineNeeds() {
        //this.mineNeedsItem.status = '9'

        Toast.loading({
          message: '正在取消需求...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        });
        this.$api.NeedsApi.cancelThisNeeds_interface({
          id: this.mineNeedsItem.id
        }).then(response => {
          Toast.clear()
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              this.mineNeedsItem.status = '9'
            }
          }
        })
      }


    }
  }
</script>

<style scoped>
  .el-card-ability {
    margin: 10px 15px 20px 15px;
    padding: 0;
    background: white;
    border-radius: 10px;
    box-shadow: 5px 5px 10px #c3c3c3;

  }


  el-card-ability >>> .van-collapse-item__content {
    padding: 5px 16px !important;
  }

  .el-card-ability >>> .van-divider {
    margin: 6px 0 !important;
  }


  .mine-needs-cell-header {
    width: 100%;
    /*height: 30px;*/
    /*line-height: 30px;*/
  }
  .mine-needs-cell-header >>> .van-tag {
    font-size: 14px;
  }
  .vol-div-content >>> .van-tag{
    font-size: 12px;
  }

  .mine-needs-cell-header .text {
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
    float: left;
    margin-left: 10px;
  }

  .mine-needs-cell-content {
    width: 100%;
    /*height: 100px;*/
  }

  .mine-needs-cell-content .content-p-style {
    margin: 5px 10px;
    font-size: 16px;
    color: #737373;
  }

  .mine-needs-cell-content .content-p-style-commen {
    margin: 5px 10px;
    font-size: 16px;
    color: gray;
  }

  .content-p-style-commen >>> .van-uploader__preview {
    width: 40px;
    height: 40px;
  }

  .content-p-style-commen >>> .van-uploader__preview-image {
    width: 40px;
    height: 40px;
  }

  .content-p-style-commen >>> img {
    width: 40px;
    height: 40px;
    float: left;
  }

  .mine-needs-cell-content .content-p-style span {
    margin-right: 6px;
  }

  .mine-needs-cell-footer {
    width: 95%;
    margin-left: 4%;
    font-size: 16px;
    line-height: 30px;
    height: 30px;
    color: gray;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }

  .dialog-com-class .content {
    /*width: 200px;*/
    height: 200px;
    padding: 16px 16px;
    overflow-y: auto;
    color: #1a80cb;
    text-align: center;
  }

  .dialog-com-class .content p {
    line-height: 30px;
    font-size: 14px;
  }

  .dialog-com-class .footer {
    width: 100%;
    height: 40px;
    /*background: #1a80cb;*/
    position: absolute;
    bottom: 2px;
    border-top: 1px solid #e1e1e1;
  }

  .dialog-com-class .footer .agree {
    width: calc((100% - 3px) / 2);
    float: right;
    /*background: #00c794;*/
    color: #00c794;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .dialog-com-class .footer .refuse {
    width: calc((100% - 3px) / 2);
    float: left;
    border-right: 1px solid #e1e1e1;
    /*background: #ff4d48;*/
    color: red;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .vol-div-content {
    margin: 0 0 0 15px;
    width: calc(70% - 15px);
    float: left;
    height: 95px;
    font-size: 16px;
  }

  .vol-div-content p {
    line-height: 25px;
  }

  .vol-div-content-button {
    width: 20%;
    float: right;
    min-height: 70px;
    font-size: 16px;
  }

  .vol-div-content-button .refuse {
    width: 100%;
    float: left;
    border-right: 1px solid #e1e1e1;
    color: #afafaf;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 12px;
  }

  .vol-div-content-button .agree {
    width: 100%;
    float: left;
    border-right: 1px solid #e1e1e1;
    color: #00c794;
    height: 35px;
    line-height: 35px;
    text-align: center;
  }

  .mine-needs-vol {
    width: 100%;
    /*min-height: 50px;*/
    /*color: #f0a306;*/
  }
  .mine-needs-list-cell >>> .van-collapse-item__content{
    padding: 5px;
  }

  .refuse-reason {
    margin: 10px;
    font-size: 12px;
    color: #ff4641;
  }

</style>
