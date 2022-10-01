import {defineStore} from "pinia";

export const useVersionStore = defineStore("version", {
  persist:true,
  state:()=>{
    return {
      version:"1.0.1",
      identification:0, // 9 || 0
      device:0,
      privacy: `<h5>本平台不会窃取或存储所有个人的Bot Token!</h5><h5>本项目开源地址 : <a href="https://github.com/Noi-q/telegram-bot-chat">telegram-bot-chat</a></h5>`
    }
  },
  actions:{
  }
})