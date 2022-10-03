<script lang="ts" setup>
import {ref, onMounted} from "vue"
import {useRouter} from "vue-router";
import {useUserStore} from "@/pinia/useUserStore";
import {useLocalStore} from "@/pinia/useLocalStore";
import {Notify} from "vant";
import {getMe} from "@/api/bot";
import axios from "axios";

const userStore = useUserStore()
const localStore = useLocalStore()
const router = useRouter()
const token = ref("")
const loading = ref(false)

const submit = ()=>{
  loading.value = true
  getMe(`${token.value}`,{}).then(
    (res:any) =>{
      if(res.ok === true){
        Notify({ type: 'success', message: '登录成功!' });
        loading.value = false
        userStore.token = token.value
        localStore.token = token.value
        localStorage.setItem("token", token.value)
        router.push({
          path:"/chat"
        })
      }else{
        Notify({ type: 'danger', message: '登录失败!' });
      }
    },
    (err:any) =>{
      loading.value = false
      Notify({ type: 'danger', message: '请检查网络和token!' });
    }
  )
}
onMounted(()=>{
  userStore.verify()
  axios.get("https://raw.githubusercontent.com/Noi-q/telegram-bot-chat/master/typeHTML.json").then(
    res => {
      console.log(res)
      localStorage.setItem("documents", res.data)
    }
  )
})
</script>

<template>
  <div class="loginForm">
    <div class="formTitle">
      <span>Telegram登录</span>
    </div>
    <div class="formInput">
      <input type="text" placeholder="请输入Token" v-model="token">
    </div>
    <div class="submit">
      <van-button
        style="width: 130px;"
        :loading="loading"
        @click="submit"
        loading-text="登录中..."
      >登录</van-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .loginForm{
    .formTitle{
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: 1.5rem;
      span{
        color: white;
        font-size: 25px;
        font-weight: bolder;
      }
    }
    .formInput{
      display: flex;
      flex-direction: column;
      margin-top: 3rem;
      input{
        padding-left: 1rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        padding-right: 1rem;
        font-size: 1em;
        margin-top: 1rem;
      }
    }
    .submit{
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-top: 5rem;
      //button{
      //  width: 50%;
      //  height: 50px;
      //  font-size: 1.3rem;
      //  background-color: green;
      //  color: white;
      //  border: none;
      //  border-radius: 5px;
      //  outline: skyblue;
      //}
    }
  }
</style>