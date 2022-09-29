<script lang="ts" setup>
import {useRouter} from "vue-router";
const router = useRouter()

const back = ()=>{
  router.go(-1)
}
</script>

<template>
  <van-nav-bar
    title="User"
    :safe-area-inset-top="true"
    :fixed="true"
    :placeholder="true"
    :border="true"
  >
    <template #left>
      <van-icon name="arrow-left" size="22" color="white" @click="back"/>
    </template>
  </van-nav-bar>
</template>

<style>
</style>