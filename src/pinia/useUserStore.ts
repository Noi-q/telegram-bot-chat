import { defineStore } from "pinia"
import {getMe} from "../api/bot";
import router from "../router";

export const useUserStore = defineStore("user", {
  state(){
    return {
      token:""
    }
  },
  actions:{
    verify(){
      const token = localStorage.getItem("token") || ""
      try {
        if(this.token === token){
          try {
            getMe(`${token}`,{}).then(
              (res:any) => {
                if(res.ok === true){
                  router.push({
                    path:"/chat"
                  })
                }else {
                  return ""
                }
              },
              (err:any) => {
                return err
              }
            )
          }catch (e) {
            return e
          }
        }
      } catch (err){
        return err
      }
    }
  }
})