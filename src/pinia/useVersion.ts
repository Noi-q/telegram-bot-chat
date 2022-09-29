import {defineStore} from "pinia";

export const useVersionStore = defineStore("version", {
  persist:true,
  state:()=>{
    return {
      version:"1.0.1",
      identification:9,
      device:1231235435
    }
  },
  actions:{
  }
})