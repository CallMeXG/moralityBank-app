<template>
  <div @click="publicCellClicked" class="public-list-cell">
    <img :src=" dataObj.photoUrl">
    <div class="public-list-cell_content">
      <p>
        <template v-if="dataObj.sort === '1'">
          <span class="title" style="color: #cd8a07"> ◉ NO.{{dataObj.sort}}</span>
        </template>
        <template v-else-if="dataObj.sort === '2'">
          <span class="title" style="color: #949083"> ◉ NO.{{dataObj.sort}}</span>
        </template>
        <template v-else-if="dataObj.sort === '3'">
          <span class="title" style="color: #9b2d08"> ◉ NO.{{dataObj.sort}}</span>
        </template>
        <template v-else>
          <span class="title"> ◉ NO.{{dataObj.sort}}</span>
        </template>
      </p>

      <p class="listName">
        <span>{{dataObj.zipperConfirm.name}}</span>
        <template v-if="dataObj.zipperConfirm.sex !== undefined">
          <van-tag v-if="dataObj.zipperConfirm.sex === '1'" plain type="primary">男</van-tag>
          <van-tag v-if="dataObj.zipperConfirm.sex === '2'" plain type="primary">女</van-tag>
        </template>
        <template v-if="dataObj.zipperConfirm.age !== undefined">
          <van-tag plain type="primary">{{dataObj.zipperConfirm.age}}岁</van-tag>
        </template>
      </p>
<!--      <div class="van-multi-ellipsis&#45;&#45;l2 vol-score-intreduce">{{dataObj.introduce}}</div>-->

    </div>
    <div class="public-list-cell_score">
      <span>{{dataObj.rankingInternal}} 积分</span>
    </div>
    <div style="clear: both"></div>

  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        dataObj: this.publicObj
      }
    },
    props: {
      publicObj: Object
    },
    methods:{
      publicCellClicked(){
        this.$router.push({
          path: '/vol-show-detail',
          query:{
            itemData: this.publicObj
          }
        })
      }
    }
  }
</script>

<style scoped>
  .public-list-cell {
    margin: 10px;
    width: calc(100% - 20px);
    height: 70px;
    background: white;
    border-radius: 50px;
  }

  .public-list-cell img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 10px;
    float: left;
  }

  .public-list-cell_content {
    float: left;
    width: calc(100% - 185px);
    height: 70px;
  }

  .public-list-cell .title {
    height: 35px;
    line-height: 35px;
    font-size: 22px;
    font-weight: bold;
    color: #55ceff;
  }

  .public-list-cell_content .listName {
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    font-weight: bold;
    color: #c7908f;
  }

  .public-list-cell_score {
    float: right;
    color: #00c794;
    padding-right: 5px;
    width: 100px;
    line-height: 70px;
  }
  .public-list-cell_score span{
    float: right;
    padding-right: 10px;
  }

</style>
