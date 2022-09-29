<script lang="ts" setup>
import {getupdates} from "@/api/bot";
import {onMounted} from "vue";

let socket = new WebSocket("ws://javascript.info");
console.log(socket)
onMounted(()=>{
  // const websocket = new WebSocket("https://api.telegram.org/bot5717478650:AAFcq2CnQcVBfC4XeDc7lLakW6_p85vC-jc/getupdates")
  // console.log(websocket)
})
</script>

<template>

</template>

<style scoped>

</style>