<script lang="ts" setup>
import { ref } from 'vue';
const active = ref("0");
</script>

<template>
  <!--
  <van-nav-bar
    title="Chat Bot"
    :safe-area-inset-top="true"
    :fixed="true"
    :placeholder="true"
    :border="true"
    :z-index="999"
  >
    <template #left>
      <van-icon name="wap-nav" size="22" color="white"/>
    </template>
  </van-nav-bar>
  -->
  <router-view/>
  <van-tabbar
    v-model="active"
    :safe-area-inset-bottom="true"
    :fixed="true"
    :placeholder="true"
    :route="true"
    active-color="#000"
  >
    <van-tabbar-item name="0" icon="chat-o" to="/chat" :replace="true">聊天</van-tabbar-item>
    <van-tabbar-item name="1" icon="friends-o" to="/groups" :replace="true">群组</van-tabbar-item>
    <van-tabbar-item name="2" icon="setting-o" to="/settings" :replace="true">设置</van-tabbar-item>
  </van-tabbar>
</template>

<style lang="less" scoped>
</style>