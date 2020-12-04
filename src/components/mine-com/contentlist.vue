<template>
  <div class="content-list-cell">

    <span style="float: left;font-size: 20px;color: #3caaf2;padding-left: 10px" class="icon iconfont" :class="itemData.icon_name"></span>
    <span class="title">{{itemData.title}}</span>
    <span class="right-icons">❯</span>
  </div>
</template>

<script>
  export default {
    name: "contentlist",
    data(){
      return {
        itemData: this.itemContent,
      }
    },
    props:{
      itemContent: Object,
    }
  }
</script>

<style scoped>
  .content-list-cell {
    width: 100%;
    height: 50px;
    margin: 0;
    padding: 0;
  }

  .content-list-cell span {
    line-height: 50px;
    height: 50px;
    font-size: 16px;
    font-weight: bold;
  }

  .title {
    float: left;
    margin-left: 20px;
    color: #474747;
  }

  .right-icons {
    float: right;
    margin-right: 10px;
    color: #dbdbdb;
  }
</style>
