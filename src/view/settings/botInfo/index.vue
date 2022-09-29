<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {getMe} from "@/api/bot";
import {useLocalStore} from "@/pinia/useLocalStore";
import {storeToRefs} from "pinia";

interface infoType {
  first_name:string
  username:string
  is_bot:Boolean
  supports_inline_queries: Boolean
  can_join_groups: Boolean
  can_read_all_group_messages:Boolean
  id:number
}

const localStore = useLocalStore()
const {token} = storeToRefs(localStore)

const info = ref<infoType>({
  first_name:"",
  username:"",
  is_bot:false,
  supports_inline_queries: false,
  can_join_groups: false,
  can_read_all_group_messages:false,
  id:0
})

onMounted(()=>{
  getMe(token.value,{}).then(
    (res:any)=>{
      info.value = res.result as infoType
    }
  )
})
</script>

<template>
  <div class="bot">
    <div class="box">
      <div class="avatar">
        <img src="https://avatars.githubusercontent.com/u/76736117?v=4" alt="">
      </div>
      <div class="info">
        <van-cell-group>
          <van-cell title="机器人名字" >
            <template #right-icon>
              <span>{{info.first_name}}</span>
            </template>
          </van-cell>
          <van-cell title="机器人地址" >
            <template #right-icon>
              <span><a :href="`https://t.me/${info.username}`">@{{info.username}}</a></span>
            </template>
          </van-cell>
          <van-cell title="机器人ID" >
            <template #right-icon>
              <span>{{info.id}}</span>
            </template>
          </van-cell>
          <van-cell title="是否为机器人" >
            <template #right-icon>
              <van-switch active-color="#07C160" inactive-color="red" size="20px" v-model="info.is_bot" disabled />
            </template>
          </van-cell>
          <van-cell title="支持联机查询" >
            <template #right-icon>
              <van-switch active-color="#07C160" inactive-color="red" size="20px" v-model="info.supports_inline_queries" disabled />
            </template>
          </van-cell>
          <van-cell title="是否能加入群组" >
            <template #right-icon>
              <van-switch active-color="#07C160" inactive-color="red" size="20px" v-model="info.can_join_groups" disabled />
            </template>
          </van-cell>
          <van-cell title="是否能接收所有群组消息" >
            <template #right-icon>
              <van-switch active-color="#07C160" inactive-color="red" size="20px" v-model="info.can_read_all_group_messages" disabled />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>

  </div>
</template>

<style lang="less" scoped>
  .bot{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .box{
      width: 100%;
      background-color: white;
      display: flex;
      flex-direction: row;
      .avatar{
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        justify-content: center;
        img{
          align-self: center;
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      .info{
        flex-grow: 4;
      }
    }
  }
</style>