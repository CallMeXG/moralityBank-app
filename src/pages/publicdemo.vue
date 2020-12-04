<template>
  <div style="height: 100%;width: 100%;position: fixed">
    <section>
      <button @click="add()">点击添加</button>
      <hr/>
      <my-test v-for="(item, index) in people"
               :key="index"
               :index="index"
               :itemC="item"
               @deleteIndex="del"
      ></my-test>
      <button @click="confirm()">确定</button>
    </section>
  </div>
</template>

<script>
  import ViewBox from "vux/src/components/view-box/index";
  import XHeader from "vux/src/components/x-header/index";
  import MyTest from './myTest';

  export default {
    name: "publicdemo",
    components: {XHeader, ViewBox, MyTest},
    data() {
      return {
        people: [{ name: '', phone: '', sex: '' }]
      };
    },
    methods: {
      add() {
        this.people.push({ name: '', phone: '', sex: '' });
      },
      del(val) {
        if (val !== 0) {
          this.people.splice(val, 1);
        }
      },
      confirm() {
        console.log(this.people);
      },
    }
  }
</script>

<style scoped>

</style>
