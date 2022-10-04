<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from 'vue-router'
import {Dialog, Notify, Toast} from "vant";
import {userAllInfoFilter} from "@/tools/data-filter";
import {useLocalStore} from "@/pinia/useLocalStore";
import {storeToRefs} from "pinia";
import {sendUserMessage} from "@/api/message";

const route = useRoute()
const router = useRouter()
const localStore = useLocalStore()
const {token} = storeToRefs(localStore)
const title = route.query.name
const content = ref()
const actions = ref([
  {
    id:1,
    text:"原文本"
  },
  {
    id:2,
    text:"markdown"
  },
  {
    id:3,
    text:"html"
  }
])
const showPopover = ref(false)
const popoverType = ref("选择类型")
const mode = ref("")
const sendMessage = ref("")

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

const onClickLeft = ()=>{
  router.back()
}

const onSelect = (action:any)=>{
  if(action.id === 1){
    mode.value = ""
  }else {
    mode.value = action.text
  }
  popoverType.value = action.text
  return Toast(action.text)
}

const submit = ()=>{
  sendUserMessage(token.value, {
    chat_id:Number(route.query.id),
    parse_mode:mode.value,
    text:sendMessage.value
  }).then(
    (res:any)=>{
      if(res.ok === true){
        Notify({ type: 'success', message: '发送成功' });
      }
      sendMessage.value = ""
    },
    (err:any)=>{
      if(err === 400){
        Dialog({
          title:"错误提示",
          message:"您输入的内容不符合Telegram官方模板语法",
          confirmButtonColor:"red",
          allowHtml:true
        })
      }
    }
  )
}

onMounted(()=>{
  const data = localStore.getChatData()
  content.value = userAllInfoFilter(JSON.parse(data), Number(route.query.id))
  console.log(content.value)
})

</script>


<template>
  <van-nav-bar
    left-arrow
    :fixed="true"
    :placeholder="true"
    :safe-area-inset-top="true"
    @click-left="onClickLeft"
  >
    <template #title>
      <span class="title">{{title}}</span>
    </template>
  </van-nav-bar>
  <div class="message-box">
    <div class="item" v-for="(item,index) in content" :key="index">
      <div class="avatar">
        <div class="pic"></div>
      </div>
      <div class="message">
        <div class="date">
          <span>Date : {{formatDate(item.message.date)}}</span>
        </div>
        <div class="info">
          <span>{{item.message.text}}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="send">
    <van-field
      v-model="sendMessage"
      rows="1"
      autosize
      type="textarea"
      placeholder="请输入消息内容"
      show-word-limit
    >
      <template #button>
        <van-popover placement="top" v-model:show="showPopover" :actions="actions" @select="onSelect">
          <template #reference>
            <van-button type="primary">{{popoverType}}</van-button>
          </template>
        </van-popover>
        <van-button style="margin-left: 2px;" type="primary" @click="submit">发送</van-button>
      </template>
    </van-field>
  </div>
</template>

<style lang="less" scoped>
  .message-box{
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-bottom: 50px;
    .item{
      display: flex;
      flex-direction: row;
      margin-top: 10px;
      margin-bottom: 10px;
      .avatar{
        width: 20%;
        .pic{
          width: 50px;
          height: 50px;
          background-color: #576b95;
          border-radius: 50%;
        }
      }
      .message{
        width: 80%;
        background-color: white;
        border-radius: 10px;
        padding: 5px;
      }
    }
  }
  .send{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>