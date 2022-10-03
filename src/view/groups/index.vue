<script lang="ts" setup>
import {getupdates} from "@/api/bot";
import {onMounted, ref} from "vue";
import {groupFilter, noticeFilter} from "@/tools/data-filter";
import {useLocalStore} from "@/pinia/useLocalStore";
import {useRouter} from "vue-router";

const router = useRouter()
const localStore = useLocalStore()
const content = ref()
const notice = ref()
const noticeInfo = ref()
const loading = ref(true)
const showNotice = ref(false)
const showNoticeInfo = ref(false)

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

const goGroup = (item:any)=>{
  console.log(item)
  if(item){
    if(item.message){
      router.push({
        path:"/groups/item",
        query:{
          id:item.message.chat.id,
          title:item.message.chat.title
        }
      })
    }
    if(item.channel_post){
      router.push({
        path:"/groups/item",
        query:{
          id:item.channel_post.chat.id,
          title:item.channel_post.chat.title
        }
      })
    }
  }

}

const checkNotice = ()=>{
  showNotice.value = true
}
const checkNoticeInfo = (item:object)=>{
  console.log(item)
  noticeInfo.value = item
  showNoticeInfo.value = true
}

onMounted(()=>{
  const data = localStore.getChatData()
  const token = localStorage.getItem("token")
  if(data === "" || undefined || null){
    getupdates(`${token}`,{}).then(
      (res:any) => {
        content.value = groupFilter(JSON.parse(data))
        notice.value = noticeFilter(JSON.parse(data))
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
    notice.value = noticeFilter(JSON.parse(data))
    content.value = value
  }
})
</script>

<template>
  <div v-show="loading" class="loading">
    <van-loading type="spinner" />
  </div>
  <van-popup v-model:show="showNoticeInfo" position="top" :style="{ height: '60%' }" >
    <div class="notice-info">
      <ul>
        <li>
          <span v-show="noticeInfo.my_chat_member.chat.type === 'group'">群组名 : {{noticeInfo.my_chat_member.chat.title}}</span>
          <span v-show="noticeInfo.my_chat_member.chat.type === 'channel'">频道名 : {{noticeInfo.my_chat_member.chat.title}}</span>
          <span v-show="noticeInfo.my_chat_member.chat.type === 'supergroup'">群组名 : {{noticeInfo.my_chat_member.chat.title}}</span>
        </li>
        <li>
          <span v-show="noticeInfo.my_chat_member.chat.type === 'group'">群组ID : {{noticeInfo.my_chat_member.chat.id}}</span>
          <span v-show="noticeInfo.my_chat_member.chat.type === 'channel'">频道ID : {{noticeInfo.my_chat_member.chat.id}}</span>
          <span v-show="noticeInfo.my_chat_member.chat.type === 'supergroup'">群组ID : {{noticeInfo.my_chat_member.chat.id}}</span>
        </li>
        <li>
          <span>通知时间 : {{formatDate(noticeInfo.my_chat_member.date)}}</span>
        </li>
        <li style="display: flex;flex-direction: column;">
          <span>操作用户 : {{noticeInfo.my_chat_member.from.first_name}}</span>
          <span>操作用户ID : {{noticeInfo.my_chat_member.from.id}}</span>
          <span>操作用户是否为机器人 : {{noticeInfo.my_chat_member.from.is_bot}}</span>
        </li>
        <li>
          <table border="1">
            <tr>
              <td v-show="noticeInfo.my_chat_member.new_chat_member.status === 'member'">
                新增成员({{noticeInfo.my_chat_member.new_chat_member.status}})
              </td>
              <td v-show="noticeInfo.my_chat_member.new_chat_member.status === 'administrator'">
                新增管理员({{noticeInfo.my_chat_member.new_chat_member.status}})
              </td>
              <td>
                新增用户信息
              </td>
            </tr>
            <tr>
              <td v-show="noticeInfo.my_chat_member.new_chat_member.status === 'member'">
                @{{noticeInfo.my_chat_member.new_chat_member.user.username || noticeInfo.my_chat_member.new_chat_member.user.first_name}}
              </td>
              <td v-show="noticeInfo.my_chat_member.new_chat_member.status === 'administrator'">
                <div style="display: flex;flex-direction: column;">
                  <span style="font-size: 20px;">管理权限:</span>
                  <span>{{noticeInfo.my_chat_member.new_chat_member.can_be_edited===false ? '不可以编辑' : '可以编辑'}}</span>
                  <span>{{noticeInfo.my_chat_member.new_chat_member.can_change_info===false ? '不可以更改信息' : '可以更改信息'}}</span>
                  <span>{{noticeInfo.my_chat_member.new_chat_member.can_delete_messages===false ? '不可以删除消息' : '可以删除消息'}}</span>
                  <span>{{noticeInfo.my_chat_member.new_chat_member.can_invite_users===false ? '不可以邀请用户' : '可以邀请用户'}}</span>
                  <span>{{noticeInfo.my_chat_member.new_chat_member.can_manage_chat===false ? '不可以管理聊天' : '可以管理聊天'}}</span>
                  <span>{{noticeInfo.my_chat_member.new_chat_member.can_manage_video_chats===false ? '不可以管理视频聊天' : '可以管理视频聊天'}}</span>
                  <span>{{noticeInfo.my_chat_member.new_chat_member.can_manage_voice_chats===false ? '不可以管理语音聊天' : '可以管理语音聊天'}}</span>
                  <span>{{noticeInfo.my_chat_member.new_chat_member.can_pin_messages===false ? '不可以置顶消息' : '可以置顶消息'}}</span>
                  <span>{{noticeInfo.my_chat_member.new_chat_member.can_promote_members===false ? '不可以添加新管理员' : '可以添加新管理员'}}</span>
                  <span>{{noticeInfo.my_chat_member.new_chat_member.can_restrict_members===false ? '不可以封禁成员' : '可以封禁成员'}}</span>
                  <span>{{noticeInfo.my_chat_member.new_chat_member.is_anonymous===false ? '不是匿名管理员' : '是匿名管理员'}}</span>
                </div>
              </td>
              <td>
                <div style="display: flex;flex-direction: column;">
                  <span>用户昵称 : {{noticeInfo.my_chat_member.new_chat_member.user.first_name}}</span>
                  <span>用户ID : {{noticeInfo.my_chat_member.new_chat_member.user.id}}</span>
                  <span>是否为机器人 : {{noticeInfo.my_chat_member.new_chat_member.user.is_bot}}</span>
                  <span>用户链接名 : @{{noticeInfo.my_chat_member.new_chat_member.user.username}}</span>
                </div>
              </td>
            </tr>
          </table>
          <span v-show="">
            新成员 :
          </span>
        </li>
      </ul>
    </div>
  </van-popup>
  <van-action-sheet v-model:show="showNotice" title="群组通知">
    <van-cell-group>
      <van-cell center v-for="(item,index) in notice" :key="index" @click="checkNoticeInfo(item)" >
        <template #title>
          <span>{{item.my_chat_member.chat.title}}</span>
        </template>
        <template #value>
          <span>{{item.my_chat_member.new_chat_member.status}}</span>
        </template>
        <template #label>
          <span>{{item.my_chat_member.from.first_name}}</span>
        </template>
      </van-cell>
    </van-cell-group>
  </van-action-sheet>
  <van-cell
    v-for="(item,index) in content"
    :key="index"
    @click="goGroup(item)"
    center
  >
    <template #title>
      <div>
        <span class="title" v-if="item.message !== undefined">{{item.message.chat.title}}</span>
        <span class="title" v-if="item.my_chat_member !== undefined">{{item.my_chat_member.chat.title}}</span>
        <span class="title" v-if="item.channel_post !== undefined">{{item.channel_post.chat.title}}</span>
      </div>
    </template>
    <template #value>
      <div class="content">
        <span v-if="item.message !== undefined">{{item.message.text}}</span>
        <span v-if="item.my_chat_member !== undefined">{{item.my_chat_member.new_chat_member.status}}</span>
        <span v-if="item.channel_post !== undefined">{{item.channel_post.text}}</span>
        <span v-if="item.channel_post !== undefined">{{item.channel_post.pinned_message.text}}</span>
      </div>
    </template>
    <template #label>
      <span v-if="item.message !== undefined">{{formatDate(item.message.date)}}</span>
      <span v-if="item.my_chat_member !== undefined">{{formatDate(item.my_chat_member.date)}}</span>
      <span v-if="item.channel_post !== undefined">{{formatDate(item.channel_post.date)}}</span>
    </template>
  </van-cell>
  <div class="notice">
    <van-button type="primary" @click="checkNotice">通知</van-button>
  </div>
</template>

<style lang="less" scoped>
  .title{
    font-weight: 600;
  }
  .content{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span{
      color:gray;
    }
  }
  .notice{
    position: fixed;
    bottom: 100px;
    right: 20px;
  }
  .notice-info{
    padding: 20px;
    font-size: 15px;
  }
</style>