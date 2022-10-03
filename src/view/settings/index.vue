<script lang="ts" setup>
import { Dialog } from 'vant';
import {useRouter} from "vue-router";
import {useUserStore} from "@/pinia/useUserStore";
import {useLocalStore} from "@/pinia/useLocalStore";
import {useVersionStore} from "@/pinia/useVersion";
import {onMounted, ref, watch} from 'vue'
import { colorEvent } from 'v3-color-picker';
import {storeToRefs} from "pinia";
import {getMe} from "@/api/bot";



interface infoType {
  first_name:string
  username:string
  is_bot:Boolean
  supports_inline_queries: Boolean
  can_join_groups: Boolean
  can_read_all_group_messages:Boolean
  id:number
}


const info = ref<infoType>({
  first_name:"",
  username:"",
  is_bot:false,
  supports_inline_queries: false,
  can_join_groups: false,
  can_read_all_group_messages:false,
  id:0
})
const router = useRouter()
const localStore = useLocalStore()
const userStore = useUserStore()
const versionStore = useVersionStore()
const {token} = storeToRefs(localStore)
const {version, identification, device, privacy} = storeToRefs(versionStore)
const colorOptions:any = ref({
  value: "rgba(255,0,0,0.5)",
  btn: true,
  theme: "light",
  width:300
});
const status = ref(false)
const showShare = ref(false)
const showAuthor = ref(false)
const robotInfo = ref(false)
const connectStatus = ref(false)
const options = [
  [
    { name: '复制网站链接', icon: 'link' }
  ]
]


const logout = ()=>{
  Dialog({
    title:"提示",
    message:"请确认是否退出登录!",
    showCancelButton:true
  }).then(()=>{
    localStorage.removeItem("token")
    userStore.token = ""
    router.push({
      path:"/login"
    })
  }).catch(()=>{})
}



const handlePrivacy = ()=>{
  Dialog({
    title:"隐私政策",
    message:privacy.value,
    confirmButtonColor:"green",
    allowHtml:true
  })
}

const handleAuthor = ()=>{
  showAuthor.value = true
}


const botInfo = ()=>{
  router.push({
    path:"/bot_info",
    query:{
      title:"机器人信息"
    }
  })
}

async function setColor(){
  const body:string = await localStorage.getItem("body") || ""
  document.body.style.backgroundColor = body
}


async function CustomSETCOLOR(event:any){
  colorEvent(event, colorOptions.value)
  event.preventDefault()
}
function handleShare(){
  showShare.value = !showShare.value
}
function selectShare(option: any, index: number){
  console.log(option, index)
}


watch(()=>colorOptions.value.value,(n, o)=>{
  localStorage.setItem("body", colorOptions.value.value)
  setColor()
})



onMounted(()=>{
  getMe(token.value,{}).then(
    (res:any)=>{
      info.value = res.result as infoType
      connectStatus.value = true
    },
    (err:any)=>{
      connectStatus.value = false
    }
  )
  const body:string = localStorage.getItem("body") || ""
  if(body === ""){
    colorOptions.value.value = "black"
  }else{
    colorOptions.value.value = body
  }
  setColor()

  if(token.value === "" || null || undefined){
    status.value = false
  }else{
    status.value = true
  }

  // ->解析有问题 @!!
  // const jsonDoc = JSON.parse(docMD)
  // documentsMD.value = jsonDoc.markdown
  // <-解析有问题 @!!
})
</script>

<template>
  <van-share-sheet
    v-model:show="showShare"
    title="立即分享给好友"
    :options="options"
    :safe-area-inset-bottom="true"
    @select="selectShare"
  />

  <van-popup
    v-model:show="showAuthor"
    closeable
    round
    position="bottom"
    :style="{ height: '80%' }"
  >
    <br/><br/>
    <div class="author">
      <ul class="author-box">
        <li class="box-item">
          <img class="avatar" src="https://avatars.githubusercontent.com/u/76736117?v=4" alt="">
        </li>
        <li class="box-item">
          <span>Author :</span>
          <a href="https://github.com/Noi-q">&nbsp;Noi-q</a>
        </li>
        <li class="box-item">
          <span>Email :</span>
          <a>&nbsp;noi.vcal@gmail.com</a>
        </li>
        <li class="box-item">
          <span>Github :</span>
          <a href="https://github.com/Noi-q">&nbsp;https://github.com/Noi-q</a>
        </li>
        <li class="box-item">
          <span>开源地址 :</span>
          <a href="https://github.com/Noi-q/telegram-bot-chat">&nbsp;telegram-bot-chat(点我)</a>
        </li>
        <li class="box-item">
          <span>官方频道 :</span>
          <a href="https://t.me/tg_bot_chat">&nbsp;加入频道(点我)</a>
        </li>
        <li class="box-item">
          <span>付费版购买地址 :</span>
        </li>
        <li class="box-item">
          <span>都来了要不打赏作者一杯咖啡?</span>
        </li>
        <li class="box-item">
          <img class="zfb" src="../../assets/zfb.jpg" alt="">
        </li>
      </ul>
    </div>
  </van-popup>

  <van-action-sheet v-model:show="robotInfo" title="Robot information">
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
  </van-action-sheet>
  <van-action-sheet v-model:show="documents" title="语法文档">
    <v-md-preview text="#### Telegram Bot HTML/Markdown语法支持"></v-md-preview>
    <v-md-preview :text="documentsMD"></v-md-preview>
  </van-action-sheet>

  <van-cell-group inset style="margin-top: 20px;" class="set-title">
    <van-cell title="当前登录状态(Current login status)">
      <template #right-icon>
        <div class="tag" :style="{backgroundColor:status === true ? '#07c160' : 'red'}"></div>
      </template>
    </van-cell>
    <van-cell title="当前连接状态(Current connection status)">
      <template #right-icon>
        <div class="tag" :style="{backgroundColor:connectStatus === true ? '#07c160' : 'red'}"></div>
      </template>
    </van-cell>
    <van-cell title="机器人信息(Robot information)" is-link @click="robotInfo=true" />
    <van-cell title="自定义背景色(Custom background color)">
      <template #right-icon>
        <div  @click="CustomSETCOLOR" :style="{width:'20px',height:'20px',backgroundColor:colorOptions.value}"></div>
      </template>
    </van-cell>
  </van-cell-group>

  <van-cell-group inset style="margin-top: 20px;" class="set-title">
    <van-cell title="导出记录" is-link />
    <van-cell title="指令列表" is-link />
    <van-cell title="导入插件" is-link />
    <van-cell title="插件列表" is-link />
  </van-cell-group>

  <van-cell-group inset style="margin-top: 20px;" class="set-title">
    <van-cell title="HTML/Markdown语法支持文档" is-link url=""/>
  </van-cell-group>

  <van-cell-group inset style="margin-top: 20px;" class="set-title">
    <van-cell title="分享应用(Sharing apps)" is-link @click="handleShare"/>
    <van-cell title="隐私政策(Privacy Policy)" is-link @click="handlePrivacy"/>
    <van-cell title="关于作者(About the author)" is-link @click="handleAuthor"/>
    <van-cell title="官方频道(Official channel)" is-link url="https://t.me/tg_bot_chat"/>
    <van-cell title="版本(Version)" :value="version" />
  </van-cell-group>

  <div style="margin-top: 20px;">
    <van-cell-group inset class="set-title">
      <van-cell title="退出登录(Log Out)" is-link @click="logout"></van-cell>
    </van-cell-group>
    <span class="version">{{identification === 9 ? "付费版" : "免费版"}}</span>
    <span class="version">设备号 : {{device}}</span>
  </div>
</template>

<style lang="less" scoped>
  .author{
    padding: 20px;
    .author-box{
      display: flex;
      flex-direction: column;
      .box-item{
        display: flex;
        flex-direction: row;
        font-style: italic;
        line-height: 30px;
        span{
          font-weight: bold;
          font-style: italic;
          font-size: 1.1em;
        }
        .avatar{
          width: 20%;
          height: 20%;
          margin: 0 auto;
          border-radius: 50%;
        }
        .zfb{
          width: 70%;
        }
        a{
          font-weight: bold;
          font-size: 1.1em;
        }
      }
    }
  }
  .set-title{
    font-weight: 600;
    font-style: italic;
  }
  .tag{
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }
  .version{
    display: block;
    margin: 20px;
    color: white;
    font-weight: bold;
    font-style: italic;
  }
  .card{
    display: flex;
    flex-direction: row;
    justify-content: center;
    .box{
      margin-top: .6rem;
      width: 92%;
      height: 5rem;
      background-color: white;
      border-radius: 10px;
      .title{
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 60px;
        span{
          align-self: center;
          font-weight: bolder;
          font-size: 1.2em;
        }
      }
    }
  }
</style>