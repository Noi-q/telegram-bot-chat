<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import 'vant/es/notify/style';
import 'vant/es/dialog/style';

const bodyColor:any = localStorage.getItem("body") || ""

if(bodyColor === ""){
  document.body.style.backgroundColor = "#202831"
}else {
  document.body.style.backgroundColor = bodyColor
}
</script>

<template>
  <router-view/>
</template>

<style scoped>

</style>
