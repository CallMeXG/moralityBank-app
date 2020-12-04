<template>
    <div @click="prosButtonClicked" class="each-div" v-bind:class="{'each-div-selected': isActive}">
        {{itemObj.name}}
    </div>
</template>

<script>
    export default {
        name: "prosButton",
        props: {
            itemObj: Object
        },
        data() {
            return {
                isActive: false
            }
        },
        methods: {
            prosButtonClicked() {
                this.isActive = !this.isActive
            }
        }
    }
</script>

<style scoped>

    .each-div {
        /*width: calc( (100% - 40px) / 3 );*/
        height: 30px;
        border-radius: 5px;
        background: #f0f0f0;
        float: left;
        margin: 5px;
        font-size: 12px;
        text-align: center;
        line-height: 30px;
        color: black;
        padding: 0 5px;
        border: 1px solid transparent;
    }

    .each-div-selected {
        border: 1px solid #ff5f5b;
        background: rgba(255, 239, 197, 0.32) !important;
        color: #ff5f5b !important;
    }

</style>
