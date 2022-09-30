<script lang="ts" setup>
import {ref, onMounted} from "vue";
import {getupdates} from "@/api/bot";
import {RouteParamsRaw, useRouter} from "vue-router";
import {useLocalStore} from "@/pinia/useLocalStore";
import {filter} from "@/tools/data-filter";



const localStore = useLocalStore()
const router = useRouter()
const content = ref()
const loading = ref(true)

const formatDate = (item:number)=>{
  let date = new Date(item * 1000)
  let y = date.getFullYear()
  let MM:any = date.getMonth()+1
  MM = MM < 10 ? ('0' + MM) : MM
  let d:any = date.getDate()
  d = d < 10 ? ('0' + d) : d
  let h:any = date.getHours()
  h = h < 10 ? ('0' + h) : h
  let m:any = date.getMinutes()
  m = m < 10 ? ('0' + m) : m
  let s:any = date.getSeconds()
  s = s < 10 ? ('0' + s) : s
  return y + '-' + MM + '-' + d + ' ' + h + ":" + m + ":" + s
}

const goChat = (item:RouteParamsRaw)=>{
  router.push({
    path:"/user",
    query:{
      data:JSON.stringify(item)
    }
  })
}

onMounted(()=>{
  const data = localStore.getChatData()
  const token = localStorage.getItem("token")
  if(data === ""){
    getupdates(`${token}`,{}).then(
      (res:any) => {
        const value = filter(res.result)
        content.value = value
        loading.value = false
        localStore.setChatData(res.result)
      },
      (err:any) => {
        return err
      }
    )
  }else{
    loading.value = false
    const value = filter(JSON.parse(data))
    content.value = value
  }

})
</script>

<template>
  <div v-show="loading" class="loading">
    <van-loading type="spinner" />
  </div>
  <van-cell
    v-for="item in content"
    :key="item"
    :title="item.message.chat.first_name"
    :value="item.message.text"
    :label="formatDate(item.message.date)"
    @click="goChat(item)"
  />
</template>

<style lang="less" scoped>
  .loading{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>