import Axios from "../plugins/axios";

namespace Message {
  export interface SendMessage {
    chat_id: number
    text: string
  }
}

// 发送消息
export const sendMessage = (token: string, params:Message.SendMessage) =>{
  return Axios.post("/bot" + token + "/sendMessage"+`?chat_id=${params.chat_id}&text=${params.text}`)
}