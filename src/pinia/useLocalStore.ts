import {defineStore} from "pinia";

export const useLocalStore = defineStore("local", {
  persist:true,// 数据持久化
  state:()=>{
    return {
      token: "",
      bodyColor: "",
      botInfo:{}
    }
  },
  getters:{},
  actions:{
    removeToken(){
      localStorage.removeItem("token")
    },
    getToken(){
      const token:any = localStorage.getItem("token") || ""
      return token
    }
  }
})