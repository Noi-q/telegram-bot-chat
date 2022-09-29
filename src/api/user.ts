import Axios from "../plugins/axios";

namespace User {
  export interface LoginReqForm {
    // account: string
    // password: string
    // token: string
  }
  //
  export interface LoginResData {
    result: object
    ok: boolean
  }
}

export const login = (token: string,params:User.LoginReqForm) =>{
  return Axios.get<User.LoginResData>("/bot" + token + "/getupdates", params)
}