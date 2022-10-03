import Axios from "../plugins/axios";

namespace Message {
  export interface SendMessage {
    chat_id: number
    text: string
  }
  export interface sendGroupMessage {
    chat_id: number
    text: string
    parse_mode: string
  }
}

// 发送消息
export const sendMessage = (token: string, params:Message.SendMessage) =>{
  return Axios.post("/bot" + token + "/sendMessage"+`?chat_id=${params.chat_id}&text=${params.text}`)
}
// 发送群组消息
export const sendGroupMessage = (token:string, params:Message.sendGroupMessage)=>{
  return Axios.post("/bot" + token + "/sendMessage" + `?chat_id=${params.chat_id}&text=${params.text}&parse_mode=${params.parse_mode}`)
}