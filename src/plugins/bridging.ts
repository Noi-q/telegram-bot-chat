import Axios from "@/plugins/axios";

const local = localStorage.getItem("local") || ""

const updateMessage = (setToken:string)=>{
  if(setToken === ""){
    if(JSON.parse(local).token === ""){
      return Promise.reject("404")
    }
    localStorage.removeItem("token")
    return Promise.reject("404")
  }else{
    return Axios.get("/bot" + setToken + "/getupdates", {})
  }
}

export default updateMessage


