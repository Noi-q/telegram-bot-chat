<script lang="ts" setup>
import {getupdates} from "@/api/bot";
import {onMounted, ref} from "vue";
import {groupFilter} from "@/tools/data-filter";
import {useLocalStore} from "@/pinia/useLocalStore";

const localStore = useLocalStore()
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

onMounted(()=>{
  // const data = localStorage.getItem("data") || ""
  const data = localStore.getChatData()
  const token = localStorage.getItem("token")
  if(data === ""){
    getupdates(`${token}`,{}).then(
      (res:any) => {
        content.value = groupFilter(JSON.parse(data))
        loading.value = false
        localStore.setChatData(res.result)
      },
      (err:any) => {
        return err
      }
    )
  }else{
    loading.value = false
    const value:any[] = groupFilter(JSON.parse(data))
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
    :title="item.message.chat.title"
    :value="'Last- '+item.message.from.first_name+' : '+item.message.text"
    :label="formatDate(item.message.date)"
  />
</template>

<style scoped>

</style>