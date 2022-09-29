<script lang="ts" setup>
import {ref} from "vue";
import {useRoute} from 'vue-router'
import {sendMessage} from "../../api/message";

const route:any = useRoute()
const message = JSON.parse(route.query.data)
const token = localStorage.getItem("token")
const text = ref("")

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

const submit = ()=>{
  sendMessage(`${token}`,{
    chat_id:message.message.from.id,
    text: text.value
  }).then(
    res =>{
      console.log(res)
    }
  )
}
</script>


<template>
  <div class="user">
    <div class="item">
      <div class="username">
        <div class="title">
          Message_id: <span> {{message.message.message_id}}</span>
        </div>
        <span class="name">Name: {{message.message.from.first_name}}</span>
        <span class="date">Date: {{formatDate(message.message.date)}}</span>
        <div class="content">
          <span>Content: {{message.message.text}}</span>
        </div>
      </div>
    </div>
    <div class="submit">
      <van-field v-model="text" placeholder="请输入回复内容" />
      <van-button type="primary" @click="submit">发送</van-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .user{
    .item{
      .username{
        display: flex;
        flex-direction: column;
        background-color: white;
        .title{
          span{
            color:black;
            font-size: 30px;
          }
        }
        span{
          color: white;
        }
        .name{
          font-size: 1.5rem;
          color:#07C160;
        }
        .date{
          font-size: 15px;
          color: red;
        }
        .content{
          span{
            color:skyblue;
          }
        }
      }
    }
  }
  .submit{
    display: flex;
  }
</style>