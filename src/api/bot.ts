import Axios from "../plugins/axios";

namespace User {
  export interface LoginResData {
    result: object
    ok: boolean
  }
}

export const getMe = (token: string,params:any) =>{
  return Axios.get("/bot" + token + "/getMe", params)
}


export const getupdates = (token: string,params:any) =>{
  return Axios.get<User.LoginResData>("/bot" + token + "/getupdates", params)
}