<template>
  <div class="positionClass">
    <van-sticky><x-header class="headerBackgroundColor" >身份认证</x-header></van-sticky>
    <div class="apply-index-content">
      <div class="apply-index-title">
        请选择您要认证的志愿者类型
      </div>
      <button @click="checkerClicked('single')" class="checker-unsel" v-bind:class="{'checker-active': vol_single}">个人志愿者
      </button>
      <button @click="checkerClicked('org')" class="checker-unsel" v-bind:class="{'checker-active': vol_org}">志愿者公司/组织
      </button>
      <button @click="nextStape" class="apply-index-next-btn">下一步</button>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: "checker-vol-type",
    components: {
      XHeader
    },
    data() {
      return {
        vol_single: false,//是否选中志愿者
        vol_org: false,//是否选中服务对象
        selType_vol: '',//选择的申请类型
      }
    },
    methods: {
      //选中志愿者，志愿者选项改变class
      //选中服务对象，服务对象改变class
      checkerClicked(typeChecker) {
        this.selType_vol = typeChecker
        if (typeChecker === 'single') {
          this.vol_single = true
          this.vol_org = false
        }
        if (typeChecker === 'org') {
          this.vol_single = false
          this.vol_org = true
        }
      },

      //下一步
      nextStape() {
        if (this.selType_vol === '') {
          this.$vux.alert.show('请选择认证志愿者类型')
        } else {
          if (this.selType_vol === 'single'){
            this.$router.push({
              name: 'apply-vol-input',
              query: {
                selType_vol: this.selType_vol
              }
            })
          }
          if (this.selType_vol === 'org'){
            this.$router.push({
              name: 'apply-vol-org-input',
              query: {
                selType_vol: this.selType_vol
              }
            })
          }

        }
      }
    }
  }
</script>

<style scoped>
  .apply-index-title {
    text-align: center;
    margin-top: 50px;
    line-height: 25px;
  }

  .checker-unsel {
    width: 70%;
    margin: 50px 15%;
    height: 50px;
    color: gray;
    border: 1px solid gray;
    background: transparent;
    border-radius: 5px;
  }

  .checker-active {
    color: white;
    background: #1a80cb;
    border: 1px solid #1a80cb;
  }

  .apply-index-next-btn {
    width: 70%;
    margin: 50px 15%;
    height: 50px;
    color: white;
    border: none;
    background: orange;
    border-radius: 50px;
  }
</style>
