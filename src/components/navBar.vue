<script lang="ts" setup>
import {useRouter, useRoute, LocationQueryValue} from "vue-router";
const router = useRouter()
const route = useRoute()

const back = ()=>{
  router.go(-1)
}
const title:LocationQueryValue|LocationQueryValue[] = route.query.title
const setTitle = String(title)
</script>

<template>
  <van-nav-bar
    :title="setTitle"
    :safe-area-inset-top="true"
    :fixed="true"
    :placeholder="true"
    :border="true"
  >
    <template #left>
      <van-icon name="arrow-left" size="22" color="white" @click="back"/>
    </template>
  </van-nav-bar>
  <router-view/>
</template>

<style>
</style>