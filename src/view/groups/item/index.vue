<script lang="ts" setup>
import {useRouter, useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {groupAllInfoFilter} from "@/tools/data-filter"
import {useLocalStore} from "@/pinia/useLocalStore";
import {storeToRefs} from "pinia";
import {sendGroupMessage} from "@/api/message";
import {Dialog, Notify, Toast} from 'vant';



const router = useRouter()
const route = useRoute()
const localStore = useLocalStore()
const title = ref()
const content = ref()
const sendMessage = ref()
const {token} = storeToRefs(localStore)
const showPopover = ref(false)
const actions = ref([
  {
    text:"原文本"
  },
  {
    text:"markdown"
  },
  {
    text:"html"
  }
])
const popoverType = ref("选择类型")
const mode = ref("")


const onClickLeft = ()=>{
  router.back()
}
const onClickRight = ()=>{}
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

const onSelect = (action:any)=>{
  popoverType.value = action.text
  mode.value = action.text
  return Toast(action.text)
}

const submit = ()=>{
  sendGroupMessage(token.value, {
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
  title.value = route.query.title
  const data = localStore.getChatData()
  content.value = groupAllInfoFilter(JSON.parse(data), Number(route.query.id))
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
    <div class="list" v-for="(item,index) in content" :key="index">
      <div class="item">
        <div class="userinfo">
          <div class="name">
            <span v-if="item.message !== undefined"></span>
            <span v-if="item.channel_post !== undefined"></span>
          </div>
          <div class="avatar channel" v-if="item.message !== undefined">
            <span class="user">{{item.message.from.first_name}}</span>
          </div>
          <div class="avatar channel" v-if="item.channel_post !== undefined">
            <span class="master">频道主</span>
          </div>
        </div>
        <div class="message">
          <div class="date">
            <span v-if="item.message !== undefined">Date : {{formatDate(item.message.date)}}</span>
            <span v-if="item.channel_post !== undefined">Date : {{formatDate(item.channel_post.date)}}</span>
          </div>
          <div class="content">
            <span v-if="item.message !== undefined">Content : {{item.message.text}}</span>
            <span v-if="item.channel_post !== undefined">Content : {{item.channel_post.text}}</span>
          </div>
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
  .title{
    font-weight: bold;
  }
  .message-box{
    margin-top: 10px;
    margin-bottom: 50px;
    padding: 5px;
    .list{
      display: flex;
      flex-direction: column;
      .item{
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        margin-bottom: 10px;
        .userinfo{
          width: 20%;
          display: flex;
          flex-direction: column;
          .name{
            align-self: center;
            span{
              color:green;
              font-weight: bold;
              //font-size: .6em;
            }
          }
          .avatar{
            align-self: center;
            width: 50px;
            height: 50px;
            background-color: red;
            border-radius: 10px;
          }
          .channel{
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: hidden;
            .user{
              color:white;
              font-size: 15px;
            }
            .master{
              color:white;
            }
          }
        }
        .message{
          //flex-grow: 8;
          width: 80%;
          background-color: white;
          margin-left: 5px;
          border-radius: 10px;
          padding: 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .date{
            flex-grow: 1;
          }
          .content{
            flex-grow: 1;
          }
        }
      }
    }
  }
  .send{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>