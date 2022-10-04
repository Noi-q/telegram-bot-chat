<script lang="ts" setup>
import {ref, onMounted} from "vue";
import {getupdates} from "@/api/bot";
import {useRouter} from "vue-router";
import {useLocalStore} from "@/pinia/useLocalStore";
import {filter} from "@/tools/data-filter";
import {Toast} from "vant";


const localStore = useLocalStore()
const router = useRouter()
const content = ref()
const loading = ref(true)
const empty = ref(false)

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

const goChat = (item:any)=>{
  router.push({
    path:"/chat/item",
    query:{
      id:item.message.from.id,
      name:item.message.from.first_name
    }
  })
}

const refresh = ()=>{
  const token = localStorage.getItem("token") || ""
  getupdates(`${token}`,{}).then(
    (res:any) => {
      const value = filter(res.result)
      content.value = value
      loading.value = false
      localStore.setChatData(res.result)
      if(res.ok === true){
        Toast("刷新成功!")
      }
    },
    (err:any) => {
      return err
    }
  )
}

onMounted(()=>{
  const data = localStore.getChatData()
  const token = localStorage.getItem("token") || ""
  if(data === ""){
    getupdates(`${token}`,{}).then(
      (res:any) => {
        const value = filter(res.result)
        content.value = value
        loading.value = false
        localStore.setChatData(res.result)
        if(content.value.length === 0){
          empty.value = true
        }else {
          empty.value = false
        }
      },
      (err:any) => {
        return err
      }
    )
  }else{
    loading.value = false
    const value = filter(JSON.parse(data))
    content.value = value
    if(content.value.length === 0){
      empty.value = true
    }else {
      empty.value = false
    }
  }
})
</script>

<template>
  <div v-show="loading" class="loading">
    <van-loading type="spinner" />
  </div>
  <van-empty v-if="empty" image="error" description="暂无消息">
    <van-button type="success" @click="refresh">点击刷新</van-button>
  </van-empty>
  <van-cell
    v-for="item in content"
    :key="item"
    @click="goChat(item)"
    center
  >
    <template #title>
      <span class="title">{{item.message === undefined ? "" : item.message.chat.first_name}}</span>
    </template>
    <template #value>
      <div class="content">
        <span>{{item.message === undefined ? "" : item.message.text}}</span>
      </div>
    </template>
    <template #label>
      <span>{{formatDate(item.message === undefined ? "" : item.message.date)}}</span>
    </template>
  </van-cell>
</template>

<style lang="less" scoped>
  .title{
    font-weight: 600;
  }
  .loading{
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .content{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span{
      color:gray;
    }
  }
</style>