<template>
    <div id="div" style="height: 100%;width: 100%">
      <x-header class="headerBackgroundColor" >注册</x-header>
      <rest-and-register style="height: 100%" :data-type="propsType"></rest-and-register>
    </div>
</template>

<script>
  import RestAndRegister from '../../components/restAndRegister/index'
  import XHeader from "vux/src/components/x-header/index";
    export default {
        name: "index",
      components: {
        XHeader,
        RestAndRegister
      },
      data(){
          return{
            propsType:'register'
          }
      }
    }
</script>

<style scoped>


</style>
