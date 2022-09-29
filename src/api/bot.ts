// getMe

import Axios from "../plugins/axios";

// namespace Bot {
//   export interface LoginReqForm {
//     // account: string
//     // password: string
//     // token: string
//   }
//   //
//   export interface LoginResData {
//     result: object
//     ok: boolean
//   }
// }

export const getMe = (token: string,params:any) =>{
  return Axios.get("/bot" + token + "/getMe", params)
}