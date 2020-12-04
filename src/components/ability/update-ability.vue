<template>
  <div style="margin: 10px">
    <el-card>
      <div slot="header" class="clearfix">
        <span>填写能力信息</span>
        <el-button @click="deleteRealeaseCar" style="color: red;float: right; padding: 3px 0" type="text">删除</el-button>
      </div>
      <div class="release-ability-class" style="background: white">
        <van-field required
                   readonly
                   clickable
                   name="picker"
                   :value="serviceType"
                   label="能力类别"
                   right-icon="arrow"
                   placeholder="选择能力类别"
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
          readonly required
          clickable
          name="picker"
          label="能力项目"
          right-icon="arrow"
          placeholder="选择能力项目"
          @click="selectServicePros = true"
        />
        <div class="selected-pro">
          <template v-for="itemResult in proResult">
            <el-tag size="mini">{{itemResult}}</el-tag>
          </template>
        </div>


        <van-field
          v-model="message"
          rows="3"
          autosize
          label="能力描述"
          type="textarea"
          placeholder="请输入个人能力描述"
        />

        <van-field name="other_uploader" label="照片">
          <van-uploader :before-read="beforeRead" v-model="fileList" slot="input"/>
        </van-field>

        <div v-transfer-dom>

          <popup v-model="selectServicePros" position="right" width="50%" style="background-color: white">
            <div class="ability-pro-title">请选择能力项目</div>
            <van-checkbox-group v-model="proResult">
              <van-cell-group>
                <van-cell
                  v-for="(item, index) in columnsPros"
                  clickable
                  :key="item.id"
                  :title="item.name"
                  @click="toggle(index,item)"
                >
                  <van-checkbox slot="right-icon" :name="item.name" ref="checkboxes"/>
                </van-cell>
              </van-cell-group>
            </van-checkbox-group>

            <button @click="gainallresult" class="pro-save">关闭</button>
          </popup>
        </div>
      </div>
    </el-card>
  </div>

</template>

<script>
  import {TransferDom, Popup} from 'vux'
  import {Dialog, Toast} from 'vant'
  import Vue from 'vue'
  Vue.use(Dialog)
  Vue.use(Toast)

  export default {
    name: "update-ability",
    components: {
      Popup
    },
    directives: {
      TransferDom
    },
    props: {
      abilityRIndex: Number,
      abItemObj: Object
    },
    data() {
      return {
        selectServicePros: false,//右侧弹出菜单，选择服务项目
        showPickerType: false,//服务类别，大类
        showPickerPro: false,//服务项目，小类
        serviceType: '',//服务类别，大类
        servicePro: '',//服务项目，小类
        columnsType: [],//服务类别，大类
        columnsPros: [],//服务项目，小类
        proResult: [],//选中的小类集合
        selProsResult: [],//选中的小类集合，数据
        message: '',
        fileList: [],
        typeId: '',//选择的大类的ID
        prosId: '',//选择的小类的ID
      };
    },
    mounted() {
      let tempArray = Object.keys(this.abItemObj)
      if (tempArray.length !== 0) {
        this.serviceType = this.abItemObj.zipperAbility.name
        this.typeId = this.abItemObj.abilityId

        for (let i = 0; i < this.abItemObj.zipperAbilityDetailList.length; i++) {
          this.proResult.push(this.abItemObj.zipperAbilityDetailList[i].name)
          this.selProsResult.push({
            id: this.abItemObj.zipperAbilityDetailList[i].id
          })
        }

        this.message = this.abItemObj.remark
        if (this.abItemObj.photoArray !== undefined) {
          for (let i = 0; i < this.abItemObj.photoArray.length; i++) {
            this.fileList.push({
              url:  this.abItemObj.photoArray[i]
            })
          }
        }

        this.gainAbilityProsList(this.abItemObj.abilityId)
      }


      this.gainAbilityTypesList()
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
      //删除
      deleteRealeaseCar() {
        Dialog.confirm({
          message: '你确定要删除该条能力吗？'
        }).then(() => {
          this.$Uitl.$emit('deleteCard', this.abilityRIndex)
        }).catch(() => {

        });
        // this.$Uitl.$emit('deleteCard',this.abilityRIndex)
      },
      //右侧弹框中复选框勾选事件
      toggle(index, objItem) {

        //判断选项是否选中
        let flagChecked = this.$refs.checkboxes[index].checked
        //选中时，selProsResult 添加选中项
        if (flagChecked === false) {
          this.selProsResult.push(objItem);
        }
        //取消选中时，selProsResult，查找取消项的index，然后删除
        if (flagChecked === true) {
          let indexSel = this.selProsResult.indexOf(objItem)
          if (indexSel !== -1) {
            this.selProsResult.splice(indexSel, 1);
          }
        }
      },

      //大类点击选择事件
      onConfirmType(value) {
        this.serviceType = value.text
        this.showPickerType = false
        this.columnsPros = []
        this.selProsResult = []
        this.proResult = []
        this.typeId = value.id
        this.prosId = ''
        this.gainAbilityProsList(value.id)

      },
      //获取当前组件的值，向父组件传递参数
      gainThisInputContent() {

        if (this.typeId === '') {
          Dialog({
            message: '请选择能力类别'
          })
        } else if (this.selProsResult.length === 0) {
          Dialog({
            message: '请选择能力项目'
          })
        } else {
          let strProsId = ''
          for (let i = 0; i < this.selProsResult.length; i++) {
            if (i === 0) {
              strProsId = this.selProsResult[i].id
            } else {
              strProsId = strProsId + ',' + this.selProsResult[i].id
            }
          }

          let fileGroupList = []

          for (let i = 0; i < this.fileList.length; i++) {
            fileGroupList.push(this.fileList[i])
          }

          let params = {
            abilityId: this.typeId,
            abilityDetailId: strProsId,
            remark: this.message,
            fileGroup: fileGroupList,
          }
          if (this.abItemObj.id !== undefined){
            params.id = this.abItemObj.id
          }

          this.$Uitl.$emit('sendSingleParamsToF', params, this.abilityRIndex)
        }


      },
      //小类弹出框，关闭按钮事件
      gainallresult() {
        console.log(this.selProsResult)
        this.selectServicePros = false
      },

      //获取能力类别
      gainAbilityTypesList() {
        this.$api.CommenApi.gainJobTypes().then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              let tempArray = response.data.data
              for (let i = 0; i < tempArray.length; i++) {
                let tempObj = {
                  text: tempArray[i].name,
                  id: tempArray[i].id
                }
                this.columnsType.push(tempObj)
              }

            }
          }
        })
      },
      //获取能力项目
      gainAbilityProsList(id) {
        this.$api.CommenApi.gainProsList({
          abilityId: id
        }).then(response => {
          if (response.status === 200) {
            if (response.data.status === 'SUCCESS') {
              this.columnsPros = response.data.data
            }
          }
        })
      }
    },
  }
</script>
<style>
  .el-card__body {
    padding: 5px !important;
  }

  .van-cell__title span {
    font-size: 12px !important;
  }
</style>
<style scoped>

  .release-ability-class {
    background: white;
    /*margin: 10px 10px;*/
    border-radius: 5px;
  }

  .ability-pro-title {
    padding: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #1a80cb;
  }

  .pro-save {
    margin: 20px;
    width: calc(100% - 40px);
    background: #1a80cb;
    color: white;
    height: 40px;
    border: none;
    border-radius: 5px;
  }

  .selected-pro {
    margin: 10px 20px;
  }

  .selected-pro span {
    font-size: 12px;
    margin: 5px;
  }
</style>
