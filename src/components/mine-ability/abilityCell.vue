<template>
  <div class="el-card-ability">
    <template v-if="itemAB.state === '0'">
      <van-tag style="float: left;padding-top: 3px;width: 20%;text-align: center" mark type="primary">审核中</van-tag>
    </template>
    <template v-if="itemAB.state === '1'">
      <van-tag style="float: left;padding-top: 3px;width: 60%;text-align: center" mark type="success">已通过</van-tag>
    </template>
    <template v-if="itemAB.state === '2'">
      <van-tag style="float: left;padding-top: 3px;width: 40%;text-align: center" mark type="danger">未通过</van-tag>
    </template>

    <van-collapse v-model="activeNames">
      <div class="mine-ability-cell " v-for="(item,index) in itemAB.zipperCheckAbilityDetailList">
        <van-collapse-item :title="item.zipperAbility.name" :name="index.id">
          <div class="mine-ability-cell-tag">
            <template v-for="itemTags in item.zipperAbilityDetailList">
              <van-tag class="tag" plain>{{itemTags.name}}</van-tag>
            </template>
          </div>
          <div class="remark">{{item.remark}}</div>
          <div class="image-cell">
            <van-uploader :deletable="false"
                          v-model="fileList[index]"
            />
          </div>
        </van-collapse-item>
      </div>
    </van-collapse>

    <div v-if="itemAB.replyInfo !== undefined" class="reason-refuse">
      {{itemAB.replyInfo}}
    </div>

    <div class="mine-ability-time">
      <span>
        {{itemAB.createDate}}
      </span>
      <template v-if="itemAB.state === '2'">
        <van-button @click.native="enterUpdatePage" style="float: right" size="mini" type="info">修改</van-button>
      </template>
    </div>

    <br>

  </div>
</template>

<script>
  export default {
    name: "abilityCell",
    data() {
      return {
        itemAB: this.abilityObj,//数据cell
        activeNames: [0],
        fileList: [],//图片
      }
    },
    props: {
      abilityObj: Object
    },
    mounted() {
      this.fileList = []
      let tempObj = this.itemAB.zipperCheckAbilityDetailList
      for (let i = 0; i < tempObj.length; i++) {
        let tempImage = []
        if (tempObj[i].photoArray !== undefined){
          for (let j = 0; j < tempObj[i].photoArray.length; j++) {
            tempImage.push({
              url:  tempObj[i].photoArray[j]
            })
          }
          this.fileList.push(tempImage)
        }
      }

    },
    methods:{
      enterUpdatePage(){
        this.$router.push({
          name: 'update-ability',
          query:{
            item: this.itemAB
          }
        })
      }
    },
    setFile(files){
      console.log('BBBBB==',files)
    }
  }
</script>

<style scoped>
  .el-card-ability {
    margin: 10px;
    padding: 0;
    background: white;
    width: calc(100% - 20px);
    /*height: 100px;*/
    border-radius: 0 10px 5px 5px;
    box-shadow: 2px 2px 10px #afafaf;
  }

  .el-card-ability >>> .van-tag{
    font-size: 14px;
  }

  .mine-ability-cell >>> .van-collapse-item__content {
    padding: 5px 16px !important;
  }

  .mine-ability-cell .remark {
    line-height: 20px;
    font-size: 16px;
    color: gray;
    margin-top: 10px;
  }

  .mine-ability-cell-tag {
    width: 100%;
  }

  .mine-ability-cell-tag .tag {
    margin-right: 5px;
  }

  .image-cell {
    margin-top: 10px;
  }
  .image-cell >>> .van-uploader__upload{
    display: none;
  }
  .image-cell >>> .van-uploader__preview {
    width: 40px;
    height: 40px;
  }

  .image-cell >>> .van-uploader__preview-image {
    width: 40px;
    height: 40px;
  }

  .image-cell >>> img {
    width: 40px;
    height: 40px;
    float: left;
  }

  .mine-ability-time {
    font-size: 12px;
    color: gray;
    margin: 10px 10px 0 10px;
    height: 15px;
  }

  .reason-refuse{
    margin: 5px;
    font-size: 12px;
    color: #f06156;
  }
</style>
